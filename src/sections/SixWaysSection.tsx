import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Eye, Database, Expand, Zap, Target, Shield } from 'lucide-react';

interface SixWaysSectionProps {
  className?: string;
}

const abilities = [
  {
    name: 'RECEPTIVE',
    description: 'Feel everything, everywhere, all at once.',
    icon: Eye,
    character: 'Amara'
  },
  {
    name: 'COLLECTION',
    description: 'Catalog what cannot be understood.',
    icon: Database,
    character: 'Harlow'
  },
  {
    name: 'LIMITLESS',
    description: 'Expand beyond the edges of self.',
    icon: Expand,
    character: 'Theo'
  },
  {
    name: 'RADIATION',
    description: 'Push outward—force without form.',
    icon: Zap,
    character: 'Frost'
  },
  {
    name: 'LIMITED',
    description: 'See the line where things end.',
    icon: Target,
    character: 'Mira'
  },
  {
    name: 'RESISTANT',
    description: 'Hold on when everything pulls apart.',
    icon: Shield,
    character: 'Vance'
  }
];

const SixWaysSection = ({ className = '' }: SixWaysSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hud = hudRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !hud || !headline || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.ability-card');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(headline,
        { opacity: 0, y: '-10vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(cardElements,
        { opacity: 0, y: '18vh', scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.02, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(headline,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(cardElements,
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: '10vh', scale: 0.98, stagger: 0.015, ease: 'power2.in' },
        0.7
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
      id="six-ways"
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

        <div className="relative w-full h-full p-[3vw] sm:p-[4vw] flex flex-col">
          {/* Headline */}
          <div 
            ref={headlineRef}
            className="text-center lg:text-left mb-4 lg:mb-0 lg:absolute lg:left-[2vw] lg:top-[6vh]"
          >
            <h2 className="font-orbitron text-[clamp(22px,6vw,52px)] font-bold tracking-[0.08em]"
              style={{ 
                color: '#F2F5FA',
                textShadow: '0 0 30px rgba(46,195,229,0.4), 0 0 60px rgba(46,195,229,0.2), 0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              SIX WAYS OF BEING
            </h2>
            <p className="font-inter text-[clamp(11px,3vw,16px)] mt-2 sm:mt-3 max-w-full lg:max-w-[50vw] mx-auto lg:mx-0"
              style={{ 
                color: '#A7B0C8',
                textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
              }}
            >
              Each legionnaire carries a property of existence—disciplines that define the shape of consciousness.
            </p>
          </div>

          {/* Ability Cards - Grid responsive */}
          <div 
            ref={cardsRef}
            className="flex-1 flex items-center justify-center lg:absolute lg:left-[2vw] lg:right-[2vw] lg:top-[22vh]"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 w-full max-w-full">
              {abilities.map((ability, index) => {
                const Icon = ability.icon;
                return (
                  <div 
                    key={ability.name}
                    className="ability-card relative p-3 sm:p-4 lg:p-5 flex flex-col items-center text-center group cursor-pointer"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      background: 'rgba(5, 6, 11, 0.7)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2EC3E5]/10 flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 group-hover:bg-[#2EC3E5]/20 transition-all duration-300">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2EC3E5]" />
                    </div>
                    <h3 className="font-orbitron text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.15em] mb-1 sm:mb-2"
                      style={{ color: '#F2F5FA', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
                    >
                      {ability.name}
                    </h3>
                    <p className="font-inter text-[8px] sm:text-[9px] lg:text-[10px] leading-relaxed hidden sm:block"
                      style={{ color: '#A7B0C8', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                    >
                      {ability.description}
                    </p>
                    <div className="mt-auto pt-2 sm:pt-4">
                      <span className="font-rajdhani text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#2EC3E5]/70">
                        {ability.character}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
                      style={{
                        boxShadow: 'inset 0 0 30px rgba(46,195,229,0.15), 0 0 30px rgba(46,195,229,0.1)'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixWaysSection;
