import { useEffect, useState } from 'react';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="bg-[#05060B]/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-rajdhani text-xs tracking-[0.3em] text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors"
          >
            VEL
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-6 md:gap-8">
            {[
              { label: 'Squad', id: 'characters' },
              { label: 'Chapter', id: 'sample-chapter' },
              { label: 'Author', id: 'author' },
              { label: 'Order', id: 'order' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-rajdhani text-xs tracking-[0.15em] text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors uppercase"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
