import * as THREE from "three";
import type { Flyer } from "../services/flyerService";

// A single WebGL context serves the entire normal-flow portfolio.
let renderer: THREE.WebGLRenderer | undefined;
const jobs = new Set<(time: number) => void>();
let frame = 0, last = 0, users = 0;
function wake() {
  if (!frame && jobs.size && !document.hidden) frame = requestAnimationFrame(tick);
}
function tick(now: number) {
  frame = 0;
  if (document.hidden || !jobs.size) return;
  if (now - last > 33) {
    last = now;
    Array.from(jobs).slice(0, 8).forEach(draw => draw(now));
  }
  wake();
}
function getRenderer() {
  if (!renderer) {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true,
      preserveDrawingBuffer: true, powerPreference: "low-power" });
    renderer.setSize(800, 1200, false);
    renderer.setClearColor(0, 0);
    renderer.setScissorTest(true);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.addEventListener("visibilitychange", wake);
  }
  return renderer;
}

export function mountPaper(host: HTMLElement, output: HTMLCanvasElement, page: Flyer,
  model: { shape: number; bend: number; direction: number }, paused: () => boolean,
  ready: (value: boolean) => void) {
  let gpu: THREE.WebGLRenderer;
  try { gpu = getRenderer(); } catch { return () => {}; }
  users++;
  const ctx = output.getContext("2d");
  const scene = new THREE.Scene();
  const aspect = page.height / page.width;
  const camera = new THREE.PerspectiveCamera(30, 1 / (aspect * 1.12), 0.1, 20);
  camera.position.z = aspect * 2.22;
  const mobile = matchMedia("(max-width: 639px)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const geometry = new THREE.PlaneGeometry(1, aspect, 24, 36);
  const original = Float32Array.from(geometry.attributes.position.array);
  const front = new THREE.MeshStandardMaterial({ roughness: 0.86, metalness: 0, side: THREE.FrontSide });
  const back = new THREE.MeshStandardMaterial({ color: 0xf4f0e6, roughness: 0.95, side: THREE.BackSide });
  const paper = new THREE.Group();
  const face = new THREE.Mesh(geometry, front);
  const reverse = new THREE.Mesh(geometry, back);
  reverse.position.z = -0.0015;
  face.castShadow = true; reverse.castShadow = true;
  paper.add(face, reverse);
  paper.rotation.set(-0.07, model.direction * 0.12, 0);
  scene.add(paper);
  const ambient = new THREE.HemisphereLight(0xffffff, 0xb8b0a4, 2.2);
  const key = new THREE.DirectionalLight(0xfff9f0, 2.2);
  key.position.set(-2, 3, 5); key.castShadow = true;
  key.shadow.mapSize.set(512, 512);
  key.shadow.camera.left = -1.5; key.shadow.camera.right = 1.5;
  key.shadow.camera.top = 2; key.shadow.camera.bottom = -2;
  key.shadow.normalBias = 0.015; key.shadow.bias = -0.0002;
  const fill = new THREE.DirectionalLight(0xe9efff, 0.65); fill.position.set(3, -1, 2);
  scene.add(ambient, key, fill);
  const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.15 });
  const shadowGeometry = new THREE.PlaneGeometry(3, aspect * 3);
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.position.z = -0.12; shadow.receiveShadow = true; scene.add(shadow);
  let texture: THREE.Texture | undefined, visible = false, disposed = false;
  let dirty = true, time = 0, previous = 0, shown = false, started = false;
  const image = new Image();
  let sourceBrightness = 0;
  const probe = document.createElement("canvas");
  probe.width = probe.height = 24;
  const probeContext = probe.getContext("2d", { willReadFrequently: true });
  const brightness = (source: CanvasImageSource) => {
    if (!probeContext) return 0;
    probeContext.clearRect(0, 0, 24, 24);
    probeContext.drawImage(source, 0, 0, 24, 24);
    const pixels = probeContext.getImageData(0, 0, 24, 24).data;
    let sum = 0, count = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] > 200) { sum += Math.max(pixels[i], pixels[i + 1], pixels[i + 2]); count++; }
    }
    return count ? sum / count : 0;
  };
  const fallback = () => { shown = false; ready(false); jobs.delete(draw); };
  // CORS is required for WebGL; the ordinary img remains the failure fallback.
  image.crossOrigin = "anonymous";
  image.sizes = "(max-width: 639px) 85vw, (max-width: 1023px) 43vw, 32vw";
  const loadTexture = () => {
    if (disposed || !visible || !image.naturalWidth) return;
    // Freeze the selected responsive rendition before uploading to WebGL.
    // Safari can change an HTMLImageElement's srcset selection during resize.
    const source = document.createElement("canvas");
    const factor = Math.min(1, 1536 / Math.max(image.naturalWidth, image.naturalHeight));
    source.width = Math.max(1, Math.round(image.naturalWidth * factor));
    source.height = Math.max(1, Math.round(image.naturalHeight * factor));
    const sourceContext = source.getContext("2d");
    if (!sourceContext) { fallback(); return; }
    try {
      sourceContext.drawImage(image, 0, 0, source.width, source.height);
      sourceBrightness = brightness(source);
    } catch { fallback(); return; }
    texture?.dispose(); texture = new THREE.CanvasTexture(source);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, gpu.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true; front.map = texture; front.needsUpdate = true;
    dirty = true; jobs.add(draw); wake();
  };
  image.onload = loadTexture;
  image.onerror = fallback;
  function draw(now: number) {
    if (!ctx || !texture || !visible || disposed) return;
    const still = reduced.matches || paused();
    if (!dirty && still) { previous = now; return; }
    if (!still && previous) time += Math.min((now - previous) / 1000, 0.05);
    previous = now;
    const strength = model.bend + (still ? 0 : Math.sin(time * 0.65 + model.shape) * 0.055);
    const angle = model.shape === 0 ? model.direction * 0.3
      : model.shape === 1 ? Math.PI / 2 + model.direction * 0.3 : model.direction * 0.85;
    const ax = Math.cos(angle), ay = Math.sin(angle);
    const extent = Math.abs(ax) * 0.5 + Math.abs(ay) * aspect * 0.5;
    const length = Math.min(1, aspect) * (model.shape === 0 ? 0.48 : 0.35);
    const radius = length / (strength * (mobile.matches ? 0.75 : 1));
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = original[i * 3], y = original[i * 3 + 1];
      const d = Math.max(0, x * ax + y * ay - extent + length);
      const theta = d / radius, retreat = radius * Math.sin(theta) - d;
      position.setXYZ(i, x + retreat * ax, y + retreat * ay, radius * (1 - Math.cos(theta)));
    }
    position.needsUpdate = true; geometry.computeVertexNormals();
    paper.rotation.y = model.direction * 0.12 + (still ? 0 : Math.sin(time * 0.24) * 0.025);
    const dark = document.documentElement.classList.contains("dark");
    ambient.intensity = dark ? 2 : 2.2;
    shadowMaterial.opacity = dark ? 0.32 : 0.15;
    const scale = Math.min(devicePixelRatio || 1, mobile.matches ? 1.25 : 1.5);
    const w = Math.max(1, Math.min(800, Math.round(host.clientWidth * scale), Math.floor(1200 / (aspect * 1.12))));
    const h = Math.max(1, Math.round(w * aspect * 1.12));
    if (output.width !== w || output.height !== h) { output.width = w; output.height = h; }
    gpu.setViewport(0, 0, w, h); gpu.setScissor(0, 0, w, h);
    try {
      if (gpu.getContext().isContextLost()) { fallback(); return; }
      // render() may log a GPU/texture failure without throwing an exception.
      // Never hide the real artwork merely because render() returned.
      gpu.render(scene, camera);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(gpu.domElement, 0, 1200 - h, w, h, 0, 0, w, h);
      if (!shown || dirty) {
        const renderedBrightness = brightness(output);
        if (renderedBrightness < 2 || (sourceBrightness > 40 && renderedBrightness < sourceBrightness * 0.25)) {
          fallback(); return;
        }
      }
      if (!shown) { ready(true); shown = true; }
      dirty = false;
    } catch { fallback(); }
  }
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting; previous = 0;
    if (visible) {
      if (!started) { started = true; if (page.srcset) image.srcset = page.srcset; image.src = page.src; }
      else if (!texture && image.complete && image.naturalWidth) loadTexture();
      dirty = true; jobs.add(draw); wake();
    } else {
      jobs.delete(draw); output.width = output.height = 1; shown = false; ready(false);
      texture?.dispose(); texture = undefined; front.map = null;
      key.shadow.map?.dispose(); key.shadow.map = null;
    }
  });
  visibility.observe(host);
  const invalidate = () => { dirty = true; wake(); };
  const resize = new ResizeObserver(invalidate); resize.observe(host);
  const theme = new MutationObserver(invalidate);
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  reduced.addEventListener("change", invalidate); mobile.addEventListener("change", invalidate);
  return () => {
    disposed = true; jobs.delete(draw); visibility.disconnect(); resize.disconnect(); theme.disconnect();
    reduced.removeEventListener("change", invalidate); mobile.removeEventListener("change", invalidate);
    image.onload = null; image.onerror = null; texture?.dispose(); geometry.dispose(); front.dispose(); back.dispose();
    shadowGeometry.dispose(); shadowMaterial.dispose(); key.shadow.map?.dispose();
    if (--users === 0) {
      cancelAnimationFrame(frame); frame = 0; renderer?.dispose(); renderer = undefined;
      document.removeEventListener("visibilitychange", wake);
    }
  };
}
