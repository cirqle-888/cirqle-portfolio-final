import { useEffect, useRef, useState } from "react";
import type { Flyer } from "../services/flyerService";

type Point = { x: number; y: number; z: number; u: number; v: number; shade: number };

/** A continuous bent sheet, projected into a small canvas once on load/resize.
 * Motion stays on the outer CSS transform, not hundreds of texture redraws.
 * Source pixels are the existing responsive image; no export or pixel reads.
 */
export function FlyerPaperMockup({ page, shape, bend, direction }: {
  page: Flyer; shape: number; bend: number; direction: number;
}) {
  const host = useRef<HTMLSpanElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    const box = host.current, img = image.current, output = canvas.current;
    if (!box || !img || !output) return;
    let near = false, frame = 0;
    const draw = () => {
      frame = 0;
      if (!near || !img.complete || !img.naturalWidth) return;
      const width = box.clientWidth;
      if (!width) return;
      const height = width * page.height / page.width;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const mobile = window.matchMedia("(max-width: 639px)").matches;
      const cols = mobile ? 14 : 22, rows = mobile ? 20 : 30;
      const totalHeight = height * 1.12;
      const dark = document.documentElement.classList.contains("dark");
      try {
        output.width = Math.ceil(width * ratio);
        output.height = Math.ceil(totalHeight * ratio);
        const ctx = output.getContext("2d");
        if (!ctx) return;
        ctx.scale(ratio, ratio);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        const points: Point[] = [];
        for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
          const u = i / cols, v = j / rows;
          let x = (u - 0.5) * width * 0.86;
          let y = (v - 0.5) * height * 0.86;
          // Cylindrical bends preserve distance along the paper surface.
          // A largely flat centre keeps printed type and product rows intact.
          const angle = shape === 0 ? direction * 0.28
            : shape === 1 ? Math.PI / 2 + direction * 0.24
              : direction * 0.82;
          const ax = Math.cos(angle), ay = Math.sin(angle);
          const extent = Math.abs(ax) * width * 0.43 + Math.abs(ay) * height * 0.43;
          const along = x * ax + y * ay;
          const curlLength = Math.min(width, height) * (shape === 0 ? 0.48 : 0.32);
          const distance = Math.max(0, along - (extent - curlLength));
          const radius = curlLength / (bend * (mobile ? 0.72 : 1));
          const theta = distance / radius;
          const retreat = radius * Math.sin(theta) - distance;
          x += retreat * ax;
          y += retreat * ay;
          const z = radius * (1 - Math.cos(theta));
          const yaw = direction * 0.09, pitch = -0.07;
          const xx = x * Math.cos(yaw) + z * Math.sin(yaw);
          const zz = z * Math.cos(yaw) - x * Math.sin(yaw);
          const yy = y * Math.cos(pitch) - zz * Math.sin(pitch);
          const depth = y * Math.sin(pitch) + zz * Math.cos(pitch);
          const perspective = width * 4 / (width * 4 - depth);
          points.push({ x: width / 2 + xx * perspective,
            y: height * 0.48 + yy * perspective, z: depth, u, v,
            shade: Math.min(0.16, (1 - Math.cos(theta)) * 0.23 + Math.sin(theta) * 0.045) });
        }
        const triangles: Point[][] = [];
        for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
          const a = j * (cols + 1) + i, b = a + cols + 1;
          triangles.push([points[a], points[a + 1], points[b]],
            [points[a + 1], points[b + 1], points[b]]);
        }
        triangles.sort((a, b) => a.reduce((s, p) => s + p.z, 0) - b.reduce((s, p) => s + p.z, 0));
        const surface = document.createElement("canvas");
        surface.width = output.width; surface.height = Math.ceil(height * ratio);
        const ink = surface.getContext("2d");
        if (!ink) return;
        ink.scale(ratio, ratio);
        for (const triangle of triangles) textureTriangle(ink, img, triangle);
        // Fine exposed paper edge follows the same continuous surface.
        const perimeter = [
          ...points.slice(0, cols + 1),
          ...Array.from({ length: rows }, (_, j) => points[(j + 1) * (cols + 1) + cols]),
          ...points.slice(rows * (cols + 1), rows * (cols + 1) + cols).reverse(),
          ...Array.from({ length: rows - 1 }, (_, j) => points[(rows - j - 1) * (cols + 1)]),
        ];
        ink.beginPath();
        perimeter.forEach((p, i) => i ? ink.lineTo(p.x, p.y) : ink.moveTo(p.x, p.y));
        ink.closePath(); ink.lineWidth = 0.7;
        ink.strokeStyle = "rgba(238,234,225,0.75)"; ink.stroke();
        const floor = Math.max(...points.map(p => p.y)) + 3;
        // Soft studio contact shadow lies below the sheet, never over artwork.
        ctx.save();
        ctx.translate(width * 0.52, floor + 3);
        ctx.scale(1, 0.16);
        const shadow = ctx.createRadialGradient(0, 0, 1, 0, 0, width * 0.46);
        shadow.addColorStop(0, dark ? "rgba(0,0,0,0.38)" : "rgba(49,42,39,0.12)");
        shadow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = shadow; ctx.fillRect(-width / 2, -width / 2, width, width);
        ctx.restore();
        // Reflect the actual curved surface and fade it into the white floor.
        const reflection = document.createElement("canvas");
        reflection.width = output.width; reflection.height = output.height;
        const reflected = reflection.getContext("2d");
        if (reflected) {
          reflected.scale(ratio, ratio);
          reflected.translate(0, floor * 1.25);
          reflected.scale(1, -0.25);
          reflected.drawImage(surface, 0, 0, width, height);
          reflected.setTransform(ratio, 0, 0, ratio, 0, 0);
          reflected.globalCompositeOperation = "destination-in";
          const fade = reflected.createLinearGradient(0, floor, 0, floor + height * 0.13);
          fade.addColorStop(0, dark ? "rgba(0,0,0,0.025)" : "rgba(0,0,0,0.05)"); fade.addColorStop(1, "rgba(0,0,0,0)");
          reflected.fillStyle = fade;
          reflected.fillRect(0, 0, width, totalHeight);
          ctx.drawImage(reflection, 0, 0, width, totalHeight);
          reflection.width = reflection.height = 1;
        }
        ctx.save();
        ctx.shadowColor = dark ? "rgba(0,0,0,0.4)" : "rgba(34,29,25,0.14)";
        ctx.shadowBlur = width * 0.035 * ratio;
        ctx.shadowOffsetY = width * 0.02 * ratio;
        ctx.drawImage(surface, 0, 0, width, height);
        ctx.restore();
        surface.width = surface.height = 1;
        setReady(true);
      } catch {
        // Unsupported canvas/image rendering leaves the original img visible.
        setReady(false);
      }
    };
    const schedule = () => { if (near && !frame) frame = requestAnimationFrame(draw); };
    const visibility = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) schedule();
      else { cancelAnimationFrame(frame); frame = 0; output.width = output.height = 1; setReady(false); }
    }, { rootMargin: "150px" });
    visibility.observe(box);
    const resize = new ResizeObserver(schedule); resize.observe(box);
    const theme = new MutationObserver(schedule);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    schedule();
    return () => { visibility.disconnect(); resize.disconnect(); theme.disconnect(); cancelAnimationFrame(frame); };
  }, [page.src, page.width, page.height, shape, bend, direction, loaded]);

  return <span ref={host} className={`sf-mockup${ready ? " sf-mockup--ready" : ""}`}
    style={{ aspectRatio: `${page.width} / ${page.height * 1.12}` }}>
    <img ref={image} className="sf-original" src={page.src} srcSet={page.srcset || undefined}
      sizes="(max-width: 639px) 85vw, (max-width: 1023px) 43vw, 32vw"
      alt={page.title || "Supermarket campaign flyer"} width={page.width} height={page.height}
      loading="lazy" decoding="async" onLoad={() => setLoaded(n => n + 1)} />
    <canvas ref={canvas} aria-hidden="true" />
  </span>;
}

function textureTriangle(ctx: CanvasRenderingContext2D, img: HTMLImageElement, p: Point[]) {
  const [a, b, c] = p;
  const sx = a.u * img.naturalWidth, sy = a.v * img.naturalHeight;
  const ux = (b.u - a.u) * img.naturalWidth, uy = (b.v - a.v) * img.naturalHeight;
  const vx = (c.u - a.u) * img.naturalWidth, vy = (c.v - a.v) * img.naturalHeight;
  const det = ux * vy - uy * vx;
  if (Math.abs(det) < 0.00001) return;
  const aa = ((b.x - a.x) * vy - (c.x - a.x) * uy) / det;
  const bb = ((b.y - a.y) * vy - (c.y - a.y) * uy) / det;
  const cc = ((c.x - a.x) * ux - (b.x - a.x) * vx) / det;
  const dd = ((c.y - a.y) * ux - (b.y - a.y) * vx) / det;
  ctx.save(); ctx.beginPath();
  // A tiny triangle overlap eliminates antialiasing seams without stretching
  // the texture coordinates or creating visible strips in the printed sheet.
  const cx = (a.x + b.x + c.x) / 3, cy = (a.y + b.y + c.y) / 3;
  p.forEach((point, i) => {
    const dx = point.x - cx, dy = point.y - cy, length = Math.hypot(dx, dy) || 1;
    const x = point.x + dx / length * 0.35, y = point.y + dy / length * 0.35;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.closePath(); ctx.clip();
  ctx.transform(aa, bb, cc, dd, a.x - aa * sx - cc * sy, a.y - bb * sx - dd * sy);
  ctx.drawImage(img, 0, 0);
  const shade = (a.shade + b.shade + c.shade) / 3;
  ctx.fillStyle = `rgba(27,23,19,${shade})`;
  ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
  ctx.restore();
}
