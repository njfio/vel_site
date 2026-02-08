import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ShoppingCart, ExternalLink, Book, Tablet, BookOpen, Sparkles } from 'lucide-react';

interface OrderSectionProps {
  className?: string;
}

const retailers = [
  { name: 'Barnes & Noble', icon: Book, href: '#' },
  { name: 'Bookshop', icon: BookOpen, href: '#' },
  { name: 'Apple Books', icon: Tablet, href: '#' },
];

const OrderSection = ({ className = '' }: OrderSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const retailersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const retailersEl = retailersRef.current;

    if (!section || !content || !retailersEl) return;

    const ctx = gsap.context(() => {
      const retailerButtons = retailersEl.querySelectorAll('.retailer-btn');

      gsap.fromTo(content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(retailerButtons,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: retailersEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="order"
      className={`relative min-h-screen py-24 ${className}`}
    >
      {/* Starfield background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/starfield.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0"
        style={{ background: 'rgba(5, 6, 11, 0.7)' }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
        {/* HUD Frame */}
        <div 
          className="w-[min(760px,78vw)] hud-frame p-12"
          style={{ 
            background: 'rgba(5, 6, 11, 0.6)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 80px rgba(46,195,229,0.1), inset 0 0 80px rgba(46,195,229,0.05)'
          }}
        >
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />
          <div className="hud-accent-corner top-0 left-0" />
          <div className="hud-accent-corner bottom-0 right-0" />

          {/* Content */}
          <div ref={contentRef} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2EC3E5]/30 bg-[#2EC3E5]/5 mb-6">
              <Sparkles className="w-4 h-4 text-[#2EC3E5]" />
              <span className="font-rajdhani text-xs tracking-[0.2em] text-[#2EC3E5]"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
              >
                AVAILABLE NOW
              </span>
            </div>

            <h2 className="font-orbitron text-[clamp(32px,4.5vw,56px)] font-bold tracking-[0.06em] mb-4"
              style={{ 
                color: '#F2F5FA',
                textShadow: '0 0 40px rgba(46,195,229,0.5), 0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              SECURE YOUR COPY
            </h2>
            
            <p className="font-inter mb-10 max-w-[480px] mx-auto"
              style={{ 
                color: '#A7B0C8',
                textShadow: '0 2px 8px rgba(0,0,0,0.9)'
              }}
            >
              Available in hardcover, paperback, and digital. Choose your format and hold the line.
            </p>

            {/* Primary CTA */}
            <a 
              href="https://www.amazon.com/dp/B0GM3732YJ?_encoding=UTF8&psc=1&ref_=cm_sw_r_ffobk_cp_ud_dp_1W8DIUUIHISG8R9B14DL_1&bestFormat=true"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-4 mb-8 glow-pulse"
            >
              <ShoppingCart className="w-5 h-5" />
              Order on Amazon
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Retailers */}
            <div ref={retailersRef} className="flex flex-wrap justify-center gap-4 mt-8">
              {retailers.map((retailer) => {
                const Icon = retailer.icon;
                return (
                  <a
                    key={retailer.name}
                    href={retailer.href}
                    className="retailer-btn btn-secondary inline-flex items-center gap-2 text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    {retailer.name}
                  </a>
                );
              })}
            </div>

            {/* Small print */}
            <p className="font-inter text-[11px] mt-10"
              style={{ color: 'rgba(167, 176, 200, 0.6)', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            >
              Available in all formats. Order your copy today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
