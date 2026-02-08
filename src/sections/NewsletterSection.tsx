import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Send, Sparkles, Bell, Gift } from 'lucide-react';

interface NewsletterSectionProps {
  className?: string;
}

const benefits = [
  { icon: Bell, text: 'Release day notifications' },
  { icon: Gift, text: 'Exclusive bonus content' },
  { icon: Sparkles, text: 'Early access to sequels' },
];

const NewsletterSection = ({ className = '' }: NewsletterSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.newsletter-card'),
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section 
      ref={sectionRef}
      id="newsletter"
      className={`relative py-24 ${className}`}
      style={{ background: '#05060B' }}
    >
      {/* Background glow */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(46,195,229,0.15) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-[600px] mx-auto px-6">
        <div className="newsletter-card border border-[#2EC3E5]/30 rounded-xl p-8 md:p-12"
          style={{ 
            background: 'linear-gradient(180deg, #0B0E17 0%, #05060B 100%)',
            boxShadow: '0 0 60px rgba(46,195,229,0.1), inset 0 0 60px rgba(46,195,229,0.05)'
          }}
        >
          {/* Decorative */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: '#05060B', border: '1px solid rgba(46,195,229,0.3)' }}
          >
            <Mail className="w-6 h-6 text-[#2EC3E5]" />
          </div>

          {/* Content */}
          <div className="text-center pt-4">
            <h2 className="font-orbitron text-[clamp(24px,3vw,36px)] font-bold tracking-[0.06em] mb-3"
              style={{ 
                color: '#F2F5FA',
                textShadow: '0 0 30px rgba(46,195,229,0.4), 0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              JOIN THE LEGION
            </h2>
            <p className="font-inter mb-8"
              style={{ color: '#A7B0C8', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
            >
              Subscribe for exclusive updates, behind-the-scenes content, and early access to the next chapter in the VEL saga.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10"
                    style={{ background: 'rgba(5, 6, 11, 0.5)' }}
                  >
                    <Icon className="w-4 h-4 text-[#2EC3E5]" />
                    <span className="font-rajdhani text-xs tracking-[0.1em]"
                      style={{ color: '#A7B0C8', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                    >
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(34, 197, 94, 0.2)' }}
                >
                  <Sparkles className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-orbitron text-xl mb-2"
                  style={{ color: '#22C55E', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
                >
                  WELCOME TO THE LEGION
                </h3>
                <p className="font-inter"
                  style={{ color: '#A7B0C8', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                >
                  Check your inbox for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-lg font-inter text-[#F2F5FA] placeholder:text-[#A7B0C8]/50 focus:outline-none transition-all"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn-primary inline-flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="font-inter text-[11px] mt-6"
              style={{ color: 'rgba(167, 176, 200, 0.5)', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            >
              No spam. Unsubscribe anytime. Your email is protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
