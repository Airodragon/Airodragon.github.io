import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { NavSectionId, portfolioContent } from '@/lib/portfolio-content';
import HeroCanvas from '@/components/HeroCanvas';

const PORTRAIT_WEBP = '/portrait.webp';
const PORTRAIT_PNG = '/portrait.png';
const WIDE_MQ = '(min-width: 1251px)';

interface HeroProps {
  onNavigate: (section: NavSectionId) => void;
}

function PortraitPicture({
  className,
  alt,
  imgRef,
}: {
  className?: string;
  alt: string;
  imgRef?: React.Ref<HTMLImageElement>;
}) {
  return (
    <picture>
      <source srcSet={PORTRAIT_WEBP} type="image/webp" />
      <img
        ref={imgRef}
        src={PORTRAIT_PNG}
        alt={alt}
        className={className}
        draggable={false}
        decoding="async"
        fetchPriority="high"
      />
    </picture>
  );
}

export default function Hero({ onNavigate }: HeroProps) {
  const { profile } = portfolioContent;
  const firstName = profile.name.split(' ')[0] ?? profile.name;
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const widePortraitRef = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();
  const [isWide, setIsWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(WIDE_MQ).matches,
  );
  const [heroInView, setHeroInView] = useState(true);
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(WIDE_MQ);
    const sync = () => setIsWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) {
      setShowScrollCue(false);
      return;
    }
    const onScroll = () => {
      if (window.scrollY > 40) setShowScrollCue(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    let raf = 0;
    let running = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const apply = () => {
      const compact = portraitRef.current;
      const wideImg = widePortraitRef.current;
      if (!isWide && compact) {
        compact.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scale(1.06)`;
      }
      if (isWide && wideImg) {
        wideImg.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
    };

    const tick = () => {
      if (!running) return;
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      apply();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden || !heroInView) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      if (document.hidden || !heroInView) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      target.x = nx * (isWide ? 8 : 12);
      target.y = ny * (isWide ? 5 : 8);
    };

    const onVisibility = () => {
      if (document.hidden || !heroInView) stop();
      else start();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();

    return () => {
      stop();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce, isWide, heroInView]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-luxury relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      style={{ backgroundColor: 'var(--brand-red)' }}
      data-testid="section-hero"
    >
      {/* ≤1250: full-bleed portrait + atmosphere (unmounted on wide) */}
      {!isWide && (
        <>
          <div
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ backgroundColor: 'var(--brand-red)' }}
          >
            <div ref={portraitRef} className="hero-portrait-track absolute will-change-transform">
              <PortraitPicture
                alt=""
                className="hero-portrait-img h-full w-full"
              />
            </div>
          </div>

          {heroInView && (
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                maskImage:
                  'radial-gradient(ellipse 55% 60% at 50% 38%, transparent 0%, transparent 45%, black 78%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 55% 60% at 50% 38%, transparent 0%, transparent 45%, black 78%)',
              }}
            >
              <HeroCanvas className="opacity-80" active={heroInView} />
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[42%] bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[min(100%,28rem)] bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-black/30 to-transparent" />
        </>
      )}

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
              {profile.heroBio}
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

        {isWide && (
          <div className="hero-wide-portrait">
            <motion.div
              className="hero-wide-portrait-inner"
              initial={reduce ? false : { opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <PortraitPicture
                imgRef={widePortraitRef}
                alt={`${profile.name} portrait`}
                className="hero-wide-img will-change-transform"
              />
            </motion.div>
          </div>
        )}
      </div>

      {!reduce && showScrollCue && (
        <motion.button
          type="button"
          data-magnetic
          aria-label="Scroll to about"
          onClick={() => onNavigate('about')}
          className="hero-scroll-cue pointer-events-auto absolute bottom-5 left-1/2 z-20 -translate-x-1/2 inline-flex flex-col items-center gap-1.5 text-white/70 transition-colors hover:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.28em]">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" strokeWidth={1.75} />
        </motion.button>
      )}
    </section>
  );
}
