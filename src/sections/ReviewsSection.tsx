import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Quote, Star } from 'lucide-react';

interface ReviewsSectionProps {
  className?: string;
}

const reviews = [
  {
    quote: "The most haunting sci-fi I've read in years. A meditation on consciousness disguised as a military thriller.",
    author: "Early Reader",
    role: "ARC Review",
    rating: 5
  },
  {
    quote: "Like Starship Troopers meets Solaris—if the enemy was time itself. Philosophical science fiction at its finest.",
    author: "Beta Review",
    role: "Advanced Copy",
    rating: 5
  },
  {
    quote: "I finished it and immediately started again. Four thousand years of subjective time, and I wanted more.",
    author: "ARC Reader",
    role: "Pre-Release",
    rating: 5
  }
];

const ReviewsSection = ({ className = '' }: ReviewsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.review-card');

      // Header animation
      gsap.fromTo(header,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      cardElements.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="reviews"
      className={`relative min-h-screen py-24 ${className}`}
      style={{ background: 'linear-gradient(180deg, #05060B 0%, #0B0E17 50%, #05060B 100%)' }}
    >
      {/* Subtle starfield overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url('/starfield.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 max-w-[min(920px,82vw)] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#2EC3E5] text-[#2EC3E5]" />
            ))}
          </div>
          <h2 className="font-orbitron text-[clamp(28px,4vw,48px)] font-bold tracking-[0.06em]"
            style={{ 
              color: '#F2F5FA',
              textShadow: '0 0 40px rgba(46,195,229,0.4), 0 4px 20px rgba(0,0,0,0.9)'
            }}
          >
            WHAT READERS ARE SAYING
          </h2>
        </div>

        {/* Review Cards */}
        <div ref={cardsRef} className="space-y-8">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="review-card"
              style={{ background: 'rgba(11, 14, 23, 0.7)', backdropFilter: 'blur(8px)' }}
            >
              <Quote className="w-8 h-8 text-[#2EC3E5]/40 mb-4" />
              <p className="font-inter text-[clamp(15px,1.3vw,18px)] leading-relaxed mb-6"
                style={{ 
                  color: '#F2F5FA',
                  textShadow: '0 2px 6px rgba(0,0,0,0.9)'
                }}
              >
                "{review.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-[#2EC3E5]/40" />
                <div>
                  <div className="font-rajdhani text-sm tracking-[0.1em]"
                    style={{ color: '#F2F5FA', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                  >
                    {review.author}
                  </div>
                  <div className="font-rajdhani text-[10px] tracking-[0.15em]"
                    style={{ color: '#A7B0C8', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                  >
                    {review.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
