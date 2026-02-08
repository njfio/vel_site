import { Mail, Twitter, Instagram, BookOpen, Globe } from 'lucide-react';

interface FooterSectionProps {
  className?: string;
}

const FooterSection = ({ className = '' }: FooterSectionProps) => {
  return (
    <footer 
      className={`relative py-16 ${className}`}
      style={{ background: '#0B0E17' }}
    >
      <div className="max-w-[920px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="font-orbitron text-2xl font-bold tracking-[0.15em] mb-2"
              style={{ 
                color: '#F2F5FA',
                textShadow: '0 0 20px rgba(46,195,229,0.4), 0 2px 8px rgba(0,0,0,0.9)'
              }}
            >
              VEL
            </div>
            <div className="font-rajdhani text-xs tracking-[0.2em]"
              style={{ color: '#A7B0C8', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
            >
              VIBRATION EXPANSION LEGION
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a 
              href="mailto:hello@veltactical.com"
              className="text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="#"
              className="text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#"
              className="text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.amazon.com/dp/B0GM3732YJ?_encoding=UTF8&psc=1&ref_=cm_sw_r_ffobk_cp_ud_dp_1W8DIUUIHISG8R9B14DL_1&bestFormat=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors"
              aria-label="Amazon"
            >
              <BookOpen className="w-5 h-5" />
            </a>
            <a
              href="https://njf.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A7B0C8] hover:text-[#2EC3E5] transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6 text-[11px] font-rajdhani tracking-[0.1em]"
            style={{ color: 'rgba(167, 176, 200, 0.6)' }}
          >
            <button className="hover:text-[#2EC3E5] transition-colors"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            >
              Privacy
            </button>
            <button className="hover:text-[#2EC3E5] transition-colors"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            >
              Terms
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="font-inter text-[11px]"
            style={{ color: 'rgba(167, 176, 200, 0.4)', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
          >
            © 2026 Nicholas Ferguson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
