import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { NavSectionId, portfolioContent } from '@/lib/portfolio-content';
import HeroCanvas from '@/components/HeroCanvas';

const PORTRAIT = '/portrait.png';
const BRAND_RED = '#FF0000';

interface HeroProps {
  onNavigate: (section: NavSectionId) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { profile } = portfolioContent;
  const firstName = profile.name.split(' ')[0] ?? profile.name;
  const portraitRef = useRef<HTMLDivElement>(null);
  const widePortraitRef = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      const wide = window.innerWidth > 1250;
      target.x = nx * (wide ? 10 : 12);
      target.y = ny * (wide ? 6 : 8);
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      const wide = window.innerWidth > 1250;
      const compact = portraitRef.current;
      const wideImg = widePortraitRef.current;

      if (!wide && compact) {
        compact.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scale(1.06)`;
      }
      if (wide && wideImg) {
        wideImg.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce]);

  return (
    <section
      id="home"
      className="hero-luxury relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      style={{ backgroundColor: BRAND_RED }}
      data-testid="section-hero"
    >
      {/* ≤1250: full-bleed portrait + atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#FF0000] min-[1251px]:hidden">
        <div ref={portraitRef} className="hero-portrait-track absolute will-change-transform">
          <img
            src={PORTRAIT}
            alt=""
            className="hero-portrait-img h-full w-full"
            draggable={false}
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] min-[1251px]:hidden"
        style={{
          maskImage:
            'radial-gradient(ellipse 55% 60% at 50% 38%, transparent 0%, transparent 45%, black 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 55% 60% at 50% 38%, transparent 0%, transparent 45%, black 78%)',
        }}
      >
        <HeroCanvas className="opacity-80" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[42%] bg-gradient-to-t from-black/65 via-black/25 to-transparent min-[1251px]:hidden" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[min(100%,28rem)] bg-gradient-to-r from-black/45 via-black/15 to-transparent min-[1251px]:hidden" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-black/30 to-transparent min-[1251px]:hidden" />

      {/*
        Shared hero stage:
        - ≤1250: absolute bottom-left copy over full-bleed image
        - >1250: 2-col grid, vertically centered copy + tall right portrait
      */}
      <div className="hero-stage relative z-10 h-full">
        <div className="hero-copy-wrap">
          <motion.div
            className="pointer-events-auto hero-copy"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <motion.p
              className="hero-greeting text-[0.7rem] font-medium uppercase tracking-[0.35em] text-white/85 sm:text-xs"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Hi, I&apos;m
            </motion.p>
            <motion.h1
              className="hero-script mt-1 text-6xl leading-none text-white sm:text-7xl md:text-8xl"
              data-testid="text-hero-name"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {firstName}
            </motion.h1>
            <motion.p
              className="hero-bio mt-5 text-sm leading-relaxed text-white/88 sm:text-[0.95rem]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Full-stack engineer crafting products with Node.js, React, Next.js &amp; OpenAPI.
              Leading OpenAPI Visual Design at Apiwiz.
              Previously shipped Jio Loans &amp; Jio Finance at Reliance Jio.
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap items-center gap-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.65 }}
            >
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                data-testid="button-view-resume"
                className="hero-btn-solid inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Resume
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
              </a>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                data-magnetic
                data-testid="button-get-in-touch"
                className="hero-btn-glass inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-[20px] transition-transform duration-200 hover:scale-[1.03] hover:bg-white/18 active:scale-[0.98]"
              >
                Let&apos;s Talk
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-wide-portrait">
          <motion.div
            className="hero-wide-portrait-inner"
            initial={reduce ? false : { opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <img
              ref={widePortraitRef}
              src={PORTRAIT}
              alt={`${profile.name} portrait`}
              className="hero-wide-img will-change-transform"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
