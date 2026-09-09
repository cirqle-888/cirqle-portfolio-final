import { useEffect, useRef, useState } from "react";
import type { Flyer } from "../services/flyerService";

export function FlyerPaperMockup({ page, shape, bend, direction, paused }: {
  page: Flyer; shape: number; bend: number; direction: number; paused: boolean;
}) {
  const host = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frozen = useRef(paused);
  frozen.current = paused;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const box = host.current, output = canvas.current;
    if (!box || !output) return;
    let disposed = false, cleanup: (() => void) | undefined;
    import("./flyerStudio3d").then(({ mountPaper }) => {
      if (!disposed) cleanup = mountPaper(box, output, page, { shape, bend, direction },
        () => frozen.current, setReady);
    }).catch(() => { if (!disposed) setReady(false); });
    return () => { disposed = true; cleanup?.(); };
  }, [page.src, page.srcset, page.width, page.height, shape, bend, direction]);
  return <span ref={host} className={`sf-mockup${ready ? " sf-mockup--ready" : ""}`}
    style={{ aspectRatio: `${page.width} / ${page.height * 1.12}` }}>
    <img className="sf-original" src={page.src} srcSet={page.srcset || undefined}
      sizes="(max-width: 639px) 85vw, (max-width: 1023px) 43vw, 32vw"
      alt={page.title || "Supermarket campaign flyer"} width={page.width} height={page.height}
      loading="lazy" decoding="async" />
    <canvas ref={canvas} aria-hidden="true" />
  </span>;
}
