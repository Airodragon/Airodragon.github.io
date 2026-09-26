import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 64;
const LERP_FACTOR = 0.26;
const DEADZONE_RATIO = 0.12;
const BG_HEX = '#e11c13';

function lerpAngle(from: number, to: number, t: number): number {
  let diff = to - from;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return from + diff * t;
}

function normalizeAngle(a: number): number {
  let x = a;
  while (x < 0) x += Math.PI * 2;
  while (x >= Math.PI * 2) x -= Math.PI * 2;
  return x;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = async () => {
      try {
        if (img.decode) await img.decode();
      } catch {
        /* decode optional */
      }
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

interface CharacterTrackerProps {
  className?: string;
  /** Face hotspot as fraction of canvas (0–1). Default: visual center of portrait. */
  faceCenter?: { x: number; y: number };
}

export default function CharacterTracker({
  className,
  faceCenter = { x: 0.5, y: 0.42 },
}: CharacterTrackerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const centerRef = useRef<HTMLImageElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, has: false });
  const smoothedAngleRef = useRef(0);
  const frameIndexRef = useRef(0);
  const inDeadzoneRef = useRef(false);
  const rafRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const paths = Array.from({ length: FRAME_COUNT }, (_, i) =>
      `/frames/frame_${String(i).padStart(2, '0')}.webp`,
    );

    (async () => {
      try {
        const [frames, center] = await Promise.all([
          Promise.all(paths.map(loadImage)),
          loadImage('/frames/center.webp'),
        ]);
        if (cancelled) return;
        framesRef.current = frames;
        centerRef.current = center;
        setReady(true);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      reducedMotionRef.current = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, has: true };
    };
    const onLeave = () => {
      pointerRef.current.has = false;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const faceX = w * faceCenter.x;
      const faceY = h * faceCenter.y;
      const ptr = pointerRef.current;

      let drawCenter = !ptr.has;
      if (ptr.has) {
        const dx = ptr.x - faceX;
        const dy = ptr.y - faceY;
        const dist = Math.hypot(dx, dy);
        const deadzone = DEADZONE_RATIO * Math.min(w, h);
        if (dist < deadzone) {
          drawCenter = true;
          inDeadzoneRef.current = true;
        } else {
          inDeadzoneRef.current = false;
          const target = Math.atan2(dy, dx);
          if (reducedMotionRef.current) {
            smoothedAngleRef.current = target;
          } else {
            smoothedAngleRef.current = lerpAngle(
              smoothedAngleRef.current,
              target,
              LERP_FACTOR,
            );
          }
          const ang = normalizeAngle(smoothedAngleRef.current);
          frameIndexRef.current = Math.round((ang / (Math.PI * 2)) * FRAME_COUNT) % FRAME_COUNT;
        }
      }

      // Exactly one opaque frame — no alpha blending / ghosting
      ctx.globalAlpha = 1;
      ctx.fillStyle = BG_HEX;
      ctx.fillRect(0, 0, w, h);

      const img =
        drawCenter && centerRef.current
          ? centerRef.current
          : framesRef.current[frameIndexRef.current];

      if (img) {
        drawCover(ctx, img, w, h);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [ready, faceCenter.x, faceCenter.y]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        backgroundColor: BG_HEX,
        opacity: ready || failed ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    />
  );
}

export { BG_HEX };
