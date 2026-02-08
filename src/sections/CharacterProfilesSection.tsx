import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Eye, Database, Expand, Zap, Target, Shield, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface CharacterProfilesSectionProps {
  className?: string;
}

const characters = [
  {
    name: 'VANCE',
    fullName: 'Sergeant Evander Vance',
    ability: 'RESISTANT',
    abilityDesc: 'The inability to let go. The one who holds.',
    icon: Shield,
    image: '/character-vance.jpg',
    color: '#2EC3E5',
    quote: "I'll anchor you. That's what I do.",
    description: "The Anchor. Vance carries Resistance—the inability to let go. He's the one who makes things solid, who holds the line when everything pulls apart. But his gift is also his curse: he cannot release anything, even when release would be mercy.",
    stats: { discipline: 95, empathy: 60, combat: 85, resolve: 100 }
  },
  {
    name: 'AMARA',
    fullName: 'Sergeant Amara Yuen',
    ability: 'RECEPTIVE',
    abilityDesc: 'Feel everything, everywhere, all at once.',
    icon: Eye,
    image: '/character-amara.jpg',
    color: '#A855F7',
    quote: "It's not hostile. It's just... there. It's been there forever.",
    description: "The Sensor. Amara's Receptivity lets her feel the Continuum at the edges of perception. She feels everything—too much. In a place where existence wants to merge, her ability to receive is both gift and burden.",
    stats: { discipline: 70, empathy: 100, combat: 55, resolve: 80 }
  },
  {
    name: 'FROST',
    fullName: 'Corporal Frost',
    ability: 'RADIATION',
    abilityDesc: 'Push outward—force without form.',
    icon: Zap,
    image: '/character-frost.jpg',
    color: '#EF4444',
    quote: "What if I go in there and I can't hold it? What if I just... detonate?",
    description: "The Weapon. Frost radiates destructive force he cannot stop. His gift is to push outward, always outward—and everything he loves gets burned. He's been fighting his entire life. The idea of not fighting is inconceivable.",
    stats: { discipline: 60, empathy: 40, combat: 100, resolve: 90 }
  },
  {
    name: 'MIRA',
    fullName: 'Specialist Mira',
    ability: 'LIMITED',
    abilityDesc: 'See the line where things end.',
    icon: Target,
    image: '/character-mira.jpg',
    color: '#10B981',
    quote: "Everything ends somewhere. You just have to know where.",
    description: "The Tactician. Mira sees boundaries with mathematical precision. She can hold a line because she can see lines. In training, she'd refused to spar with Theo—his boundlessness made her nauseous.",
    stats: { discipline: 90, empathy: 65, combat: 80, resolve: 85 }
  },
  {
    name: 'THEO',
    fullName: 'Private Theo',
    ability: 'LIMITLESS',
    abilityDesc: 'Expand beyond the edges of self.',
    icon: Expand,
    image: '/character-theo.jpg',
    color: '#F59E0B',
    quote: "Staying small isn't discipline for me. It's torture. It's eleven years of suffocation.",
    description: "The Expansive. Theo cannot stop expanding. He spent eleven years in a containment facility, his presence swallowed by walls designed to absorb everything he was. In the Continuum, he finally has room to be the size he actually is.",
    stats: { discipline: 45, empathy: 85, combat: 60, resolve: 75 }
  },
  {
    name: 'HARLOW',
    fullName: 'Lieutenant Harlow',
    ability: 'COLLECTION',
    abilityDesc: 'Catalog what cannot be understood.',
    icon: Database,
    image: '/character-harlow.jpg',
    color: '#6366F1',
    quote: "We're not dying. We're translating. Identity is more portable than we think.",
    description: "The Philosopher. Harlow catalogs and comprehends what cannot be understood. He's been studying transition states for eleven years—religious texts, near-death research, neurological mapping. He makes trades with other people's losses.",
    stats: { discipline: 85, empathy: 50, combat: 70, resolve: 95 }
  }
];

const CharacterProfilesSection = ({ className = '' }: CharacterProfilesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeCharacter = characters[activeIndex];
  const Icon = activeCharacter.icon;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.section-header'),
        { opacity: 0, y: 30 },
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

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.fromTo(content,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeIndex]);

  const nextCharacter = () => {
    setActiveIndex((prev) => (prev + 1) % characters.length);
  };

  const prevCharacter = () => {
    setActiveIndex((prev) => (prev - 1 + characters.length) % characters.length);
  };

  return (
    <section 
      ref={sectionRef}
      id="characters"
      className={`relative min-h-screen py-16 sm:py-24 ${className}`}
      style={{ background: '#05060B' }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/starfield.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="section-header text-center mb-8 sm:mb-16">
          <span className="font-rajdhani text-[10px] sm:text-[11px] tracking-[0.25em] text-[#2EC3E5] mb-2 sm:mb-4 block"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
          >
            THE THIRD EXPANSION LEGION
          </span>
          <h2 className="font-orbitron text-[clamp(26px,8vw,56px)] font-bold tracking-[0.06em]"
            style={{ 
              color: '#F2F5FA',
              textShadow: '0 0 40px rgba(46,195,229,0.4), 0 4px 20px rgba(0,0,0,0.9)'
            }}
          >
            MEET THE SQUAD
          </h2>
          <p className="font-inter mt-2 sm:mt-4 max-w-[90%] sm:max-w-[600px] mx-auto text-[clamp(12px,3.5vw,16px)]"
            style={{ 
              color: '#A7B0C8',
              textShadow: '0 2px 8px rgba(0,0,0,0.9)'
            }}
          >
            Six soldiers. Six properties of existence. Each carries a discipline that defines the shape of consciousness itself.
          </p>
        </div>

        {/* Character Display - Stack on mobile */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Image Side */}
          <div className="relative order-1">
            <div className="relative aspect-[3/4] max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] mx-auto overflow-hidden rounded-lg border border-white/10 group">
              <img 
                src={activeCharacter.image}
                alt={activeCharacter.fullName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div 
                className="absolute inset-0 opacity-40"
                style={{ background: `linear-gradient(180deg, transparent 50%, ${activeCharacter.color}60 100%)` }}
              />
              <div 
                className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[9px] sm:text-[10px] font-rajdhani tracking-[0.15em] sm:tracking-[0.2em] font-semibold"
                style={{ background: activeCharacter.color, color: '#05060B' }}
              >
                {activeCharacter.ability}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <button 
                onClick={prevCharacter}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[#2EC3E5] hover:bg-[#2EC3E5]/10 transition-all"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {characters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      idx === activeIndex ? 'w-4 sm:w-6 bg-[#2EC3E5]' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextCharacter}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[#2EC3E5] hover:bg-[#2EC3E5]/10 transition-all"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="lg:pl-8 order-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${activeCharacter.color}20`, border: `1px solid ${activeCharacter.color}50` }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: activeCharacter.color }} />
              </div>
              <div className="min-w-0">
                <h3 className="font-orbitron text-[clamp(24px,6vw,40px)] font-bold tracking-[0.08em] truncate"
                  style={{ 
                    color: '#F2F5FA',
                    textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                  }}
                >
                  {activeCharacter.name}
                </h3>
                <p className="font-rajdhani text-xs sm:text-sm tracking-[0.1em] truncate"
                  style={{ color: '#A7B0C8', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                >
                  {activeCharacter.fullName}
                </p>
              </div>
            </div>

            <p className="font-inter text-xs sm:text-sm mb-4 sm:mb-6"
              style={{ color: activeCharacter.color, textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
            >
              {activeCharacter.abilityDesc}
            </p>

            {/* Quote */}
            <div className="relative pl-4 sm:pl-6 border-l-2 border-white/20 mb-4 sm:mb-6">
              <Quote className="absolute -left-2.5 sm:-left-3 -top-1 w-5 h-5 sm:w-6 sm:h-6 text-white/20" />
              <p className="font-inter text-sm sm:text-lg italic leading-relaxed"
                style={{ color: '#F2F5FA', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
              >
                "{activeCharacter.quote}"
              </p>
            </div>

            <p className="font-inter text-xs sm:text-base leading-relaxed mb-6 sm:mb-8"
              style={{ color: '#A7B0C8', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
            >
              {activeCharacter.description}
            </p>

            {/* Stats */}
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(activeCharacter.stats).map(([stat, value]) => (
                <div key={stat} className="flex items-center gap-2 sm:gap-4">
                  <span className="font-rajdhani text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] uppercase w-16 sm:w-24 flex-shrink-0"
                    style={{ color: '#A7B0C8', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                  >
                    {stat}
                  </span>
                  <div className="flex-1 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${value}%`,
                        background: `linear-gradient(90deg, ${activeCharacter.color}80, ${activeCharacter.color})`
                      }}
                    />
                  </div>
                  <span className="font-orbitron text-xs sm:text-sm w-8 sm:w-10 text-right flex-shrink-0"
                    style={{ color: activeCharacter.color, textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Character Thumbnails - Horizontal scroll on mobile */}
        <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 overflow-x-auto pb-2 sm:pb-0 px-1 sm:px-0">
          {characters.map((char, idx) => {
            const CharIcon = char.icon;
            return (
              <button
                key={char.name}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-all flex-shrink-0 ${
                  idx === activeIndex 
                    ? 'border-[#2EC3E5] bg-[#2EC3E5]/10' 
                    : 'border-white/10 hover:border-white/30 bg-white/5'
                }`}
              >
                <CharIcon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: idx === activeIndex ? '#2EC3E5' : char.color }} />
                <span className="font-rajdhani text-[10px] sm:text-xs tracking-[0.08em] sm:tracking-[0.1em]"
                  style={{ color: '#F2F5FA', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                >
                  {char.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CharacterProfilesSection;
