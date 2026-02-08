import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ChevronRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hud = hudRef.current;
    const title = titleRef.current;
    const cover = coverRef.current;
    const meta = metaRef.current;
    const cta = ctaRef.current;

    if (!section || !hud || !title || !cover || !meta || !cta) return;

    const ctx = gsap.context(() => {
      gsap.set([hud, title, cover, meta, cta], { opacity: 0 });

      const loadTl = gsap.timeline({ delay: 0.2 });

      loadTl.fromTo(hud,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }
      );

      const titleWords = title.querySelectorAll('.word');
      loadTl.fromTo(titleWords,
        { opacity: 0, y: 30, rotateX: 25, filter: 'blur(10px)' },
        { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'power3.out' },
        '-=0.5'
      );

      loadTl.fromTo(cover,
        { opacity: 0, x: '15vw', rotateY: -30, scale: 0.9 },
        { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      );

      const chips = meta.querySelectorAll('.meta-chip');
      loadTl.fromTo(chips,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' },
        '-=0.5'
      );

      loadTl.fromTo(cta,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      gsap.to(cover, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([hud, title, cover, meta, cta], { opacity: 1, x: 0, scale: 1 });
          }
        }
      });

      scrollTl.fromTo(title,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(cover,
        { x: 0, rotate: -2, opacity: 1 },
        { x: '18vw', rotate: 6, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(meta,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(cta,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(hud,
        { scale: 1, opacity: 1 },
        { scale: 1.08, opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className={`section-pinned ${className}`}
    >
      {/* HUD Frame - Mobile optimized */}
      <div 
        ref={hudRef}
        className="absolute left-[3vw] sm:left-[5vw] lg:left-[7vw] top-[5vh] sm:top-[7vh] lg:top-[9vh] w-[94vw] sm:w-[90vw] lg:w-[86vw] h-[90vh] sm:h-[86vh] lg:h-[82vh] hud-frame"
        style={{ background: 'rgba(5, 6, 11, 0.5)', backdropFilter: 'blur(2px)' }}
      >
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />
        <div className="hud-accent-corner top-0 left-0" />
        <div className="hud-accent-corner bottom-0 right-0" />

        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(46,195,229,0.1) 50%, transparent 100%)',
            animation: 'shimmer 4s ease-in-out infinite'
          }}
        />

        {/* Content - Mobile responsive layout */}
        <div className="relative w-full h-full p-[3vw] sm:p-[4vw] flex flex-col lg:block">
          {/* Eyebrow Label */}
          <div className="lg:absolute lg:left-[2vw] lg:top-[6vh] mb-2 lg:mb-0">
            <span className="font-rajdhani text-[10px] sm:text-[11px] tracking-[0.25em] text-[#2EC3E5]"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
            >
              TRANSMISSION
            </span>
          </div>

          {/* Title Block - Full width on mobile, left on desktop */}
          <div 
            ref={titleRef}
            className="lg:absolute lg:left-[2vw] lg:top-[14vh] lg:w-[38vw] text-center lg:text-left"
          >
            <h1 className="font-orbitron text-[clamp(40px,12vw,96px)] font-black tracking-[0.08em] leading-none"
              style={{ 
                color: '#F2F5FA',
                textShadow: '0 0 30px rgba(46,195,229,0.5), 0 0 60px rgba(46,195,229,0.3), 0 0 100px rgba(46,195,229,0.15), 0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              <span className="word inline-block">VEL</span>
            </h1>
            <h2 className="font-orbitron text-[clamp(11px,3vw,22px)] font-semibold tracking-[0.12em] mt-2 sm:mt-3"
              style={{ 
                color: '#A7B0C8',
                textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
              }}
            >
              <span className="word inline-block">VIBRATION</span>{' '}
              <span className="word inline-block">EXPANSION</span>{' '}
              <span className="word inline-block">LEGION</span>
            </h2>
            <p className="font-inter text-[clamp(12px,3.5vw,16px)] leading-relaxed mt-4 sm:mt-6 max-w-full lg:max-w-[32vw] mx-auto lg:mx-0"
              style={{ 
                color: '#A7B0C8',
                textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.7)'
              }}
            >
              Six soldiers enter the Continuum to hold the line against the Idle-Reflective. 
              Across millennia, they will transform—some will dissolve, some will evolve, 
              and one will become the wall between everything and nothing.
            </p>
          </div>

          {/* Meta Chips - Wrap on mobile */}
          <div 
            ref={metaRef}
            className="lg:absolute lg:left-[2vw] lg:top-[48vh] flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-4 lg:mt-0"
          >
            <span className="meta-chip text-[9px] sm:text-[11px]" style={{ background: 'rgba(5, 6, 11, 0.7)', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>Military Sci-Fi</span>
            <span className="meta-chip text-[9px] sm:text-[11px]" style={{ background: 'rgba(5, 6, 11, 0.7)', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>Philosophical Fiction</span>
            <span className="meta-chip text-[9px] sm:text-[11px]" style={{ background: 'rgba(5, 6, 11, 0.7)', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>300 Pages</span>
          </div>

          {/* Book Cover - Smaller on mobile, positioned below text */}
          <div 
            ref={coverRef}
            className="lg:absolute lg:right-[4vw] lg:top-[12vh] mt-6 lg:mt-0 flex justify-center lg:block"
            style={{ perspective: '1000px' }}
          >
            <div className="relative group">
              <img 
                src="/book-cover.jpg" 
                alt="VEL: Vibration Expansion Legion book cover"
                className="w-[45vw] sm:w-[35vw] lg:w-[26vw] max-w-[280px] lg:max-w-[380px] h-auto transition-all duration-500 group-hover:scale-105"
                style={{ 
                  transform: 'rotate(-2deg) rotateY(-5deg)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(46,195,229,0.2), 0 0 120px rgba(46,195,229,0.1)',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))'
                }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(46,195,229,0.2) 0%, transparent 70%)',
                  transform: 'scale(1.2)'
                }}
              />
            </div>
          </div>

          {/* CTA - Bottom on mobile */}
          <div 
            ref={ctaRef}
            className="lg:absolute lg:right-[6vw] lg:top-[68vh] text-center lg:text-right mt-6 lg:mt-0"
          >
            <a 
              href="https://www.amazon.com/dp/B0GM3732YJ?_encoding=UTF8&psc=1&ref_=cm_sw_r_ffobk_cp_ud_dp_1W8DIUUIHISG8R9B14DL_1&bestFormat=true"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base glow-pulse"
            >
              <Sparkles className="w-4 h-4" />
              Pre-Order Now
              <ChevronRight className="w-4 h-4" />
            </a>
            <div className="mt-3 sm:mt-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('six-ways');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-rajdhani text-xs sm:text-sm tracking-[0.1em] text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
              >
                Read the first chapter →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
