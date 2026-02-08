import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { BookOpen, Mail, Globe } from 'lucide-react';

interface AuthorSectionProps {
  className?: string;
}

const AuthorSection = ({ className = '' }: AuthorSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hud = hudRef.current;
    const portrait = portraitRef.current;
    const text = textRef.current;

    if (!section || !hud || !portrait || !text) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(portrait,
        { opacity: 0, x: '-18vw', scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(text,
        { opacity: 0, x: '18vw' },
        { opacity: 1, x: 0, ease: 'none' },
        0.05
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(portrait,
        { opacity: 1, x: 0 },
        { opacity: 0, x: '-10vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(text,
        { opacity: 1, x: 0 },
        { opacity: 0, x: '10vw', ease: 'power2.in' },
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
      id="author"
      className={`section-pinned ${className}`}
    >
      {/* HUD Frame */}
      <div 
        ref={hudRef}
        className="absolute left-[7vw] top-[9vh] w-[86vw] h-[82vh] hud-frame"
      >
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />
        <div className="hud-accent-corner top-0 left-0" />
        <div className="hud-accent-corner bottom-0 right-0" />

        <div className="relative w-full h-full p-[4vw]">
          {/* Portrait - Left Side */}
          <div 
            ref={portraitRef}
            className="absolute left-[3vw] top-[14vh]"
          >
            <div className="relative">
              <img 
                src="/author-portrait.jpg" 
                alt="Nicholas Ferguson, author of VEL"
                className="w-[30vw] max-w-[420px] h-[46vh] object-cover"
                style={{ 
                  boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
                }}
              />
              {/* Cyan edge highlight */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#2EC3E5]" />
            </div>
          </div>

          {/* Text Block - Right Side */}
          <div 
            ref={textRef}
            className="absolute right-[4vw] top-[16vh] w-[40vw]"
          >
            {/* Eyebrow */}
            <span className="font-rajdhani text-[11px] tracking-[0.25em] text-[#2EC3E5] mb-4 block">
              AUTHOR
            </span>

            <h2 className="font-orbitron text-[clamp(28px,3.5vw,48px)] font-bold tracking-[0.06em] text-glow mb-6">
              NICHOLAS FERGUSON
            </h2>

            <p className="font-inter text-[clamp(14px,1.2vw,17px)] leading-relaxed text-[#A7B0C8] mb-8">
              A story about identity, memory, and what we become when we hold on long enough. 
              VEL is military science fiction at the edge of philosophy—where the war is real, 
              but the enemy is existence itself.
            </p>

            <div className="flex flex-col gap-4">
              <a 
                href="https://www.amazon.com/dp/B0GM3732YJ?_encoding=UTF8&psc=1&ref_=cm_sw_r_ffobk_cp_ud_dp_1W8DIUUIHISG8R9B14DL_1&bestFormat=true"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-3 w-fit"
              >
                <BookOpen className="w-4 h-4" />
                Read the First Chapter
              </a>
              
              <a
                href="https://njf.io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-3 w-fit"
              >
                <Globe className="w-4 h-4" />
                Author Portfolio
              </a>

              <button
                onClick={() => window.open('mailto:media@veltactical.com', '_blank')}
                className="font-rajdhani text-sm tracking-[0.1em] text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors inline-flex items-center gap-2 w-fit"
              >
                <Mail className="w-4 h-4" />
                Request Interview / Media Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
