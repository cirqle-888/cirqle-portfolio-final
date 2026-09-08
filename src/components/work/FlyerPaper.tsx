import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { FlyerGroup } from "../../services/flyerService";

/**
 * The supermarket flyers as real sheets of paper, in WebGL.
 *
 * Each flyer is ONE subdivided plane. A vertex shader rolls the part of it
 * beyond a straight line around a cylinder, so the sheet stays flat and
 * rectangular except near one corner, where it curves smoothly and turns over
 * far enough to show its blank back.
 *
 * Why not CSS: a page curl in CSS has to be built from a chain of flat hinged
 * strips, and a tight roll then shows the strips themselves — combing along
 * the edge, blades sticking out past the silhouette. A vertex shader deforms
 * one continuous surface, which is what paper actually is.
 *
 * One canvas for the whole section, one draw call per sheet.
 */

/** Cross-page vertex resolution. Enough for a smooth roll, cheap to skin. */
const SEG_X = 48;
const SEG_Y = 64;

/** Deterministic pseudo-random in [-1, 1]; the scene must not reshuffle. */
function jitter(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}
const roll = (seed: number) => (jitter(seed) + 1) / 2;

const vertexShader = /* glsl */ `
  uniform vec2  uCurlDir;    // unit vector, the direction the roll travels
  uniform float uCurlLine;   // where the roll starts, along uCurlDir
  uniform float uRadius;     // radius of the roll
  uniform float uMaxAngle;   // how far it is allowed to come over
  uniform float uFlat;       // 1 = curled, 0 = smoothed out (hover)
                             // NB: the curl helper's parameter must NOT be
                             // named flat - GLSL reserves that as an
                             // interpolation qualifier and the shader then
                             // fails to compile, silently, at runtime.

  varying vec2  vUv;
  varying vec3  vNormalW;
  varying vec3  vViewDir;
  varying float vRolled;     // 0 on the flat part, 1 at the tip of the roll

  // Roll everything past uCurlLine around a cylinder. Points before the line
  // are untouched, so the sheet stays flat and rectangular where it matters.
  // The arc is continuous at the line: sin/cos start out linear there, so the
  // surface leaves the flat plane without a crease.
  vec3 curl(vec3 p, float amount, out float rolled) {
    float d = dot(p.xy, uCurlDir) - uCurlLine;
    rolled = 0.0;
    if (d <= 0.0 || amount <= 0.0) return p;

    float radius = uRadius / max(amount, 0.001);
    float theta  = d / radius;
    float t      = min(theta, uMaxAngle);
    rolled       = t / uMaxAngle;

    vec2  base = p.xy - uCurlDir * d;               // foot of the roll
    vec2  xy   = base + uCurlDir * (radius * sin(t));
    float z    = radius * (1.0 - cos(t));

    // Past the maximum the paper carries on straight, tangent to the arc —
    // otherwise the last ring of vertices bunches up into a knot.
    float extra = max(0.0, theta - uMaxAngle) * radius;
    xy += uCurlDir * (extra * cos(t));
    z  += extra * sin(t);

    return vec3(xy, z);
  }

  void main() {
    vUv = uv;

    float rolled;
    vec3 p = curl(position, uFlat, rolled);
    vRolled = rolled;

    // Normals from the deformed surface itself, by sampling two neighbours.
    // Cheaper and steadier than an analytic derivative through the clamp.
    float e = 0.01;
    float ignored;
    vec3 px = curl(position + vec3(e, 0.0, 0.0), uFlat, ignored);
    vec3 py = curl(position + vec3(0.0, e, 0.0), uFlat, ignored);
    vec3 n  = normalize(cross(px - p, py - p));

    vec4 world = modelMatrix * vec4(p, 1.0);
    vNormalW   = normalize(mat3(modelMatrix) * n);
    vViewDir   = normalize(cameraPosition - world.xyz);

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uLight;

  varying vec2  vUv;
  varying vec3  vNormalW;
  varying vec3  vViewDir;
  varying float vRolled;

  void main() {
    vec3 n = normalize(vNormalW);
    // A back-facing fragment is the underside of the sheet; light it as if it
    // were facing us, or the paper goes black the moment it turns over.
    if (!gl_FrontFacing) n = -n;

    vec3  l    = normalize(uLight);
    float diff = clamp(dot(n, l), 0.0, 1.0);
    float spec = pow(clamp(dot(reflect(-l, n), vViewDir), 0.0, 1.0), 42.0);

    vec3 colour;
    if (gl_FrontFacing) {
      // Printed side: the artwork, essentially at its own colours. The light
      // only shapes the part that curves — a strong diffuse term made every
      // sheet a different brightness depending on how it happened to lean,
      // and the flyers stopped looking like one set of prints.
      colour = texture2D(uMap, vUv).rgb * (0.94 + 0.10 * diff) + spec * 0.05;
    } else {
      // Reverse: unprinted matte stock, a little darker than the print, and
      // darker still deep in the roll where less light reaches it.
      vec3 stock = vec3(0.90, 0.888, 0.862) * (1.0 - 0.16 * vRolled);
      colour = stock * (0.80 + 0.22 * diff);
    }

    // Contact shading: the underside of the curl shadows the page below it.
    colour *= 1.0 - 0.10 * vRolled * (gl_FrontFacing ? 1.0 : 0.0);

    gl_FragColor = vec4(colour, 1.0);
  }
`;

/** A soft blob, drawn under each sheet so it does not float free of the page. */
function shadowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(4, 2, 14, 0.62)");
  g.addColorStop(0.55, "rgba(4, 2, 14, 0.28)");
  g.addColorStop(1, "rgba(4, 2, 14, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface Sheet {
  mesh: THREE.Mesh;
  shadow: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  group: THREE.Group;
  startIndex: number;
  /** Resting pose, so the float can wander around it. */
  base: { x: number; y: number; z: number; rx: number; ry: number; rz: number };
  phase: number;
  drift: number;
  material: THREE.ShaderMaterial;
}

interface Props {
  groups: FlyerGroup[];
  onOpen: (startIndex: number) => void;
  reduceMotion: boolean;
}

export function FlyerPaper({ groups, onOpen, reduceMotion }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Read from the pointer handler without rebuilding the scene when the
  // parent re-renders. Assigned in an effect, not during render.
  const openRef = useRef(onOpen);
  useEffect(() => {
    openRef.current = onOpen;
  }, [onOpen]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || groups.length === 0) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    renderer.domElement.className = "flyer-canvas";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const shadowMap = shadowTexture();

    const sheets: Sheet[] = [];
    const disposables: { dispose(): void }[] = [shadowMap];

    // ── Build one sheet per flyer ──────────────────────────────────────────
    groups.forEach((group) => {
      const flyer = group.pages[0];
      const seed = group.startIndex + 1;
      const r = (n: number) => jitter(seed * 7 + n);

      const aspect = flyer.width / flyer.height || 0.75;
      const height = 1;
      const width = height * aspect;

      const geometry = new THREE.PlaneGeometry(width, height, SEG_X, SEG_Y);
      disposables.push(geometry);

      // Which corner catches the air. Four directions, so a shelf of sheets
      // is not four copies of the same gesture.
      const corner = Math.floor(roll(seed * 7 + 20) * 4);
      const dir = new THREE.Vector2(
        corner === 0 || corner === 3 ? 1 : -1,
        corner < 2 ? -1 : 1,
      ).normalize();

      // One sheet in five stays nearly flat: a set where every corner curls
      // reads as an effect, not as paper.
      const lazy = roll(seed * 7 + 21) < 0.2;
      const reach = lazy ? 0.1 : 0.16 + roll(seed * 7 + 22) * 0.16;

      // The roll starts this far out along the diagonal, measured from the
      // centre, so only the outer `reach` of the sheet takes part.
      const half = (Math.abs(dir.x) * width + Math.abs(dir.y) * height) / 2;
      const curlLine = half * (1 - reach) * 0.92;

      const texture = loader.load(flyer.src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      disposables.push(texture);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        uniforms: {
          uMap: { value: texture },
          uCurlDir: { value: dir },
          uCurlLine: { value: curlLine },
          uRadius: { value: (lazy ? 0.13 : 0.055 + roll(seed * 7 + 23) * 0.05) },
          uMaxAngle: { value: lazy ? 1.1 : 2.5 + roll(seed * 7 + 24) * 1.5 },
          uLight: { value: new THREE.Vector3(-0.35, 0.85, 0.75) },
          uFlat: { value: 1 },
        },
      });
      disposables.push(material);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.startIndex = group.startIndex;

      const shadowGeo = new THREE.PlaneGeometry(width * 1.5, height * 1.5);
      disposables.push(shadowGeo);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowMap,
        transparent: true,
        depthWrite: false,
        opacity: 0.85,
      });
      disposables.push(shadowMat);
      const shadow = new THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>(shadowGeo, shadowMat);
      // Offset down and to the side, away from the light, and far enough back
      // to read as cast on the ground rather than printed on the sheet.
      shadow.position.set(0.07, -0.11, -0.34);

      const holder = new THREE.Group();
      holder.add(shadow);
      holder.add(mesh);
      // Sheets are not all the same size or the same distance away: without
      // this they read as a grid of tiles that happen to be curled.
      const scale = 0.975 + roll(seed * 7 + 27) * 0.05;
      holder.scale.setScalar(scale);
      scene.add(holder);

      sheets.push({
        mesh,
        shadow,
        group: holder,
        startIndex: group.startIndex,
        base: {
          x: 0,
          y: 0,
          // Small on purpose. Sheets at wildly different depths and angles
          // read as debris; a portfolio wants printed work laid out, with
          // just enough variation that it is not a grid of stamps.
          z: r(2) * 0.08,
          rx: r(3) * 0.035,
          ry: r(4) * 0.05,
          rz: r(5) * 0.045,
        },
        phase: roll(seed * 7 + 25) * Math.PI * 2,
        // A full breath takes the best part of a minute. Anything quicker and
        // the eye tracks it instead of the work.
        drift: 0.09 + roll(seed * 7 + 26) * 0.07,
        material,
      });

      // Entrance: a short settle from just above the resting place. The old
      // version started sheets metres up and staggered by index, so a visitor
      // arriving mid-animation met a shower of flyers crossing each other.
      if (!reduceMotion) holder.position.y = 0.55;
    });

    // ── Layout ─────────────────────────────────────────────────────────────
    // Sheets sit on a grid whose column count follows the viewport, and the
    // camera is pulled back far enough to frame the whole grid.
    let columns = 4;
    let landed = reduceMotion;
    const started = performance.now();

    const layout = () => {
      const w = host.clientWidth;
      columns = w >= 1024 ? 4 : w >= 700 ? 3 : 2;
      const rows = Math.ceil(sheets.length / columns);

      // Cells only a little larger than a sheet: the gaps are the drift and
      // the tilt, not empty room. Too generous and the section reads as a
      // sparse scatter of stamps rather than a table of flyers.
      const cell = { x: 0.98, y: 1.22 };
      const gridW = columns * cell.x;
      const gridH = rows * cell.y;

      sheets.forEach((sheet, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const seed = sheet.startIndex + 1;
        sheet.base.x = (col - (columns - 1) / 2) * cell.x + jitter(seed * 3 + 1) * 0.07;
        sheet.base.y = -(row - (rows - 1) / 2) * cell.y + jitter(seed * 3 + 2) * 0.06;
        sheet.group.position.x = sheet.base.x;
        if (landed) sheet.group.position.y = sheet.base.y;
        sheet.group.position.z = sheet.base.z;
      });

      // Height FIRST, then size the renderer to it. Measuring the host before
      // setting its height reads whatever the stylesheet's placeholder was, and
      // the canvas ends up a different shape from the box it sits in.
      const h = Math.min(Math.max((w * gridH) / gridW / 1.05, 420), 1500);
      host.style.height = `${h}px`;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;

      // Frame the grid: whichever of width or height needs more room wins.
      const halfFov = (camera.fov * Math.PI) / 180 / 2;
      const vFit = (gridH / 2 + 0.16) / Math.tan(halfFov);
      const hFit = (gridW / 2 + 0.12) / (Math.tan(halfFov) * camera.aspect);
      camera.position.set(0, 0, Math.max(vFit, hFit));
      camera.updateProjectionMatrix();
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    // ── Pointer ────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: Sheet | null = null;

    const pick = (event: PointerEvent): Sheet | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(sheets.map((s) => s.mesh), false)[0];
      return hit ? sheets.find((s) => s.mesh === hit.object) ?? null : null;
    };

    const onMove = (e: PointerEvent) => {
      const next = pick(e);
      if (next === hovered) return;
      hovered = next;
      renderer.domElement.style.cursor = next ? "pointer" : "";
    };
    const onClick = (e: PointerEvent) => {
      const sheet = pick(e);
      if (sheet) openRef.current(sheet.startIndex);
    };
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerdown", onClick);

    // ── Frame loop ─────────────────────────────────────────────────────────
    // Paused while the section is off screen: a portfolio page should not be
    // turning the fan for a section nobody is looking at.
    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { rootMargin: "120px" },
    );
    observer.observe(host);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const t = (performance.now() - started) / 1000;
      let allLanded = true;

      sheets.forEach((sheet, i) => {
        const { base } = sheet;

        if (!landed) {
          const from = base.y + 0.55;
          const delay = i * 0.06;
          const k = Math.min(1, Math.max(0, (t - delay) * 0.9));
          const eased = 1 - Math.pow(1 - k, 3);
          sheet.group.position.y = from + (base.y - from) * eased;
          if (k < 1) allLanded = false;
        }

        const wobble = reduceMotion ? 0 : 1;
        const s = t * sheet.drift + sheet.phase;
        sheet.group.position.y += wobble * Math.sin(s) * 0.005;
        sheet.group.rotation.x = base.rx + wobble * Math.sin(s * 0.8) * 0.006;
        sheet.group.rotation.y = base.ry + wobble * Math.cos(s * 0.6) * 0.010;
        sheet.group.rotation.z = base.rz + wobble * Math.sin(s * 0.5) * 0.005;

        // Pointing at a sheet settles its curl and lifts it towards the camera.
        const wanted = hovered === sheet ? 0.25 : 1;
        const uFlat = sheet.material.uniforms.uFlat;
        uFlat.value += (wanted - uFlat.value) * 0.08;
        const lift = hovered === sheet ? 0.16 : 0;
        sheet.group.position.z += (base.z + lift - sheet.group.position.z) * 0.1;
        sheet.shadow.material.opacity = hovered === sheet ? 0.5 : 0.85;
      });

      if (!landed && allLanded) landed = true;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerdown", onClick);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [groups, reduceMotion]);

  return <div ref={hostRef} className="flyer-stage" aria-hidden />;
}

export default FlyerPaper;
