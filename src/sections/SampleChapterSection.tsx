import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { BookOpen, ChevronDown, ChevronUp, Share2, Copy, Check } from 'lucide-react';

interface SampleChapterSectionProps {
  className?: string;
}

const chapterExcerpt = `
The chamber smells like caves. Like stone that has never seen sun. Vance runs his hand along the wall and feels it pulse—not a heartbeat, something slower. A frequency. The crystals embedded in the organic matrix respond to his touch with a glow that fades the moment he looks at it directly.

Six chambers. Six soldiers. The last hour.

Mira is at the entrance to her chamber, hand pressed flat against the aperture. She's been there for ten minutes. Testing the seal. Measuring the exact boundary between inside and out. Her fingers trace the edge where organic meets air, and she mouths numbers—calculating something only she can see.

"You're going to wear a groove in it," Vance says.

"I'm finding where it ends," she says. "Everything ends somewhere. You just have to know where."

That's what makes her Limited. Not a weakness—a discipline. She can hold a line because she can see lines. In training, she'd refused to spar with Theo. His boundlessness made her nauseous.

Vance has known her for four years. She was his first assignment out of selection—a joint operation in a facility that no longer exists. She'd saved his life by knowing exactly where a wall ended and a load-bearing structure began. Brought the whole thing down on the enemy, left a gap exactly wide enough for him to crawl through. She'd calculated the gap while under fire. She'd been smiling.

"Where does it end?" he asks now.

"Three millimeters in from the visible edge," she says. "There's a membrane you can't see. The real boundary."

Of course there is.

She finally looks at him. Her eyes are steady, measuring him the way she measures everything. "You're scared," she says.

"I'm ready," he says. "It's not the same thing."

"No. But you're both."

He doesn't argue. She's never wrong about edges.
`;

const SampleChapterSection = ({ className = '' }: SampleChapterSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.chapter-content'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VEL: Vibration Expansion Legion',
          text: 'Read the first chapter of this haunting sci-fi novel',
          url: window.location.href
        });
      } catch {
        // User cancelled
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      ref={sectionRef}
      id="sample-chapter"
      className={`relative py-24 ${className}`}
      style={{ background: 'linear-gradient(180deg, #05060B 0%, #0B0E17 100%)' }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/starfield.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto px-6">
        <div className="chapter-content">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2EC3E5]/30 bg-[#2EC3E5]/5 mb-6">
              <BookOpen className="w-4 h-4 text-[#2EC3E5]" />
              <span className="font-rajdhani text-xs tracking-[0.2em] text-[#2EC3E5]"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
              >
                SAMPLE CHAPTER
              </span>
            </div>
            <h2 className="font-orbitron text-[clamp(28px,4vw,48px)] font-bold tracking-[0.06em] mb-4"
              style={{ 
                color: '#F2F5FA',
                textShadow: '0 0 40px rgba(46,195,229,0.4), 0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              CHAPTER 1: THE LAMINAR
            </h2>
            <p className="font-inter"
              style={{ color: '#A7B0C8', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
            >
              The deployment. The last hour before translation.
            </p>
          </div>

          {/* Chapter Content Card */}
          <div className="relative border border-white/10 rounded-lg overflow-hidden"
            style={{ background: 'rgba(11, 14, 23, 0.9)', backdropFilter: 'blur(8px)' }}
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#2EC3E5]/50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#2EC3E5]/50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#2EC3E5]/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#2EC3E5]/50" />

            {/* Text Content */}
            <div 
              className={`p-8 md:p-12 transition-all duration-500 ${
                isExpanded ? '' : 'max-h-[500px] overflow-hidden relative'
              }`}
            >
              <div className="prose prose-invert max-w-none">
                {chapterExcerpt.split('\n\n').map((paragraph, idx) => (
                  <p 
                    key={idx} 
                    className="font-inter text-[15px] leading-[1.9] mb-6"
                    style={{ 
                      color: '#F2F5FA',
                      textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-32"
                  style={{ background: 'linear-gradient(180deg, transparent 0%, #0B0E17 100%)' }}
                />
              )}
            </div>

            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-4 flex items-center justify-center gap-2 border-t border-white/10 hover:bg-white/5 transition-colors"
            >
              <span className="font-rajdhani text-sm tracking-[0.1em]"
                style={{ color: '#A7B0C8', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
              >
                {isExpanded ? 'Show Less' : 'Continue Reading'}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#A7B0C8]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#A7B0C8]" />
              )}
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="https://www.amazon.com/dp/B0GM3732YJ?_encoding=UTF8&psc=1&ref_=cm_sw_r_ffobk_cp_ud_dp_1W8DIUUIHISG8R9B14DL_1&bestFormat=true"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Read Full Book
            </a>
            
            <button
              onClick={handleShare}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Chapter
            </button>
            
            <button
              onClick={handleCopy}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
          </div>

          {/* Reading time */}
          <p className="text-center font-rajdhani text-xs mt-6 tracking-[0.1em]"
            style={{ color: 'rgba(167, 176, 200, 0.6)', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
          >
            5 MIN READ • 300 PAGES TOTAL
          </p>
        </div>
      </div>
    </section>
  );
};

export default SampleChapterSection;
