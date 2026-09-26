import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MagneticCursorProps {
  enabled?: boolean;
}

export default function MagneticCursor({ enabled = true }: MagneticCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const raf = useRef(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    const sync = () => {
      setReduced(motion.matches);
      setFinePointer(fine.matches);
    };
    sync();
    motion.addEventListener('change', sync);
    fine.addEventListener('change', sync);
    return () => {
      motion.removeEventListener('change', sync);
      fine.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled || reduced || !finePointer) return;

    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const target = e.target as Element | null;
      hovering.current = Boolean(
        target?.closest?.('a, button, [data-magnetic], [role="button"]'),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    const tick = () => {
      const lerp = 0.18;
      ring.current.x += (pos.current.x - ring.current.x) * lerp;
      ring.current.y += (pos.current.y - ring.current.y) * lerp;

      if (dotRef.current) {
        const s = hovering.current ? 1.65 : 1;
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${s})`;
      }
      if (ringRef.current) {
        const s = hovering.current ? 1.85 : 1;
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${s})`;
        ringRef.current.style.opacity = hovering.current ? '0.95' : '0.55';
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, reduced, finePointer]);

  if (!enabled || reduced || !finePointer) return null;

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-[100]',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      aria-hidden
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-10 w-10 rounded-full border border-white/80"
        style={{
          boxShadow: '0 0 22px rgba(255,255,255,0.55), inset 0 0 12px rgba(255,255,255,0.15)',
          willChange: 'transform, opacity',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-white"
        style={{
          boxShadow: '0 0 14px rgba(255,255,255,0.95), 0 0 28px rgba(255,255,255,0.45)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
