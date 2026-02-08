import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Clock, Hourglass, Shield } from 'lucide-react';

interface ContinuumSectionProps {
  className?: string;
}

const ContinuumSection = ({ className = '' }: ContinuumSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hud = hudRef.current;
    const textBlock = textBlockRef.current;
    const stats = statsRef.current;

    if (!section || !hud || !textBlock || !stats) return;

    const ctx = gsap.context(() => {
      const statChips = stats.querySelectorAll('.stat-chip');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(textBlock,
        { opacity: 0, scale: 0.92, y: '6vh' },
        { opacity: 1, scale: 1, y: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(statChips,
        { opacity: 0, y: '10vh' },
        { opacity: 1, y: 0, stagger: 0.03, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(textBlock,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 0, scale: 1.04, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(statChips,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '6vh', stagger: 0.02, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(hud,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="continuum"
      className={`section-pinned ${className}`}
    >
      {/* HUD Frame - Mobile optimized */}
      <div 
        ref={hudRef}
        className="absolute left-[3vw] sm:left-[5vw] lg:left-[7vw] top-[5vh] sm:top-[7vh] lg:top-[9vh] w-[94vw] sm:w-[90vw] lg:w-[86vw] h-[90vh] sm:h-[86vh] lg:h-[82vh] hud-frame"
        style={{ background: 'rgba(5, 6, 11, 0.6)', backdropFilter: 'blur(4px)' }}
      >
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />
        <div className="hud-accent-corner top-0 left-0" />
        <div className="hud-accent-corner bottom-0 right-0" />

        <div className="absolute left-0 right-0 top-[10vh] sm:top-[12vh] h-px bg-gradient-to-r from-transparent via-[#2EC3E5]/30 to-transparent" />

        <div className="relative w-full h-full p-[3vw] sm:p-[4vw] flex flex-col items-center justify-center">
          {/* Center Text Block */}
          <div 
            ref={textBlockRef}
            className="text-center max-w-[90vw] lg:max-w-[64vw] px-2"
          >
            <h2 className="font-orbitron text-[clamp(20px,7vw,64px)] font-bold tracking-[0.06em] mb-4 sm:mb-6"
              style={{ 
                color: '#F2F5FA',
                textShadow: '0 0 40px rgba(46,195,229,0.5), 0 0 80px rgba(46,195,229,0.25), 0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              THE CONTINUUM DOES NOT FORGIVE
            </h2>
            <p className="font-inter text-[clamp(12px,3.5vw,18px)] leading-relaxed max-w-full lg:max-w-[54vw] mx-auto"
              style={{ 
                color: '#A7B0C8',
                textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
              }}
            >
              Three years of physical time. Four to six thousand years of subjective time. 
              The Idle-Reflective does not attack—it simply is. To exist here is to resist. 
              To resist is to erode. And still, they hold.
            </p>
          </div>

          {/* Stats Row - Stack on mobile */}
          <div 
            ref={statsRef}
            className="absolute bottom-[8vh] sm:bottom-[10vh] left-[2vw] right-[2vw] flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 lg:gap-12"
          >
            <div className="stat-chip flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border border-white/20"
              style={{ background: 'rgba(5, 6, 11, 0.7)', backdropFilter: 'blur(8px)' }}
            >
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#2EC3E5] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="font-orbitron text-xl sm:text-2xl font-bold"
                  style={{ color: '#F2F5FA', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
                >
                  3
                </div>
                <div className="font-rajdhani text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em]"
                  style={{ color: '#A7B0C8', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                >
                  YEARS DEPLOYED
                </div>
              </div>
            </div>

            <div className="stat-chip flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border border-white/20"
              style={{ background: 'rgba(5, 6, 11, 0.7)', backdropFilter: 'blur(8px)' }}
            >
              <Hourglass className="w-5 h-5 sm:w-6 sm:h-6 text-[#2EC3E5] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="font-orbitron text-xl sm:text-2xl font-bold"
                  style={{ color: '#F2F5FA', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
                >
                  4,000+
                </div>
                <div className="font-rajdhani text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em]"
                  style={{ color: '#A7B0C8', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                >
                  SUBJECTIVE YEARS
                </div>
              </div>
            </div>

            <div className="stat-chip flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border border-white/20"
              style={{ background: 'rgba(5, 6, 11, 0.7)', backdropFilter: 'blur(8px)' }}
            >
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#2EC3E5] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="font-orbitron text-xl sm:text-2xl font-bold"
                  style={{ color: '#F2F5FA', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
                >
                  ONE
                </div>
                <div className="font-rajdhani text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em]"
                  style={{ color: '#A7B0C8', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                >
                  WALL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContinuumSection;
