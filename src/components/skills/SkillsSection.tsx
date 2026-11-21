import React from 'react';
import { Film, Camera, Video, Sparkles, Check, Layers } from 'lucide-react';
import { SkillCategory } from '../../types';
import { CinematicAudio } from '../../utils/audio';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
        return <Film className="w-6 h-6 text-[#FF2020]" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-[#FF5A00]" />;
      case 'Video':
        return <Video className="w-6 h-6 text-[#FF9B24]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#FFA347]" />;
      default:
        return <Layers className="w-6 h-6 text-[#FF2020]" />;
    }
  };

  return (
    <section id="skills" className="relative py-28 bg-[#0b0b0d] overflow-hidden border-t border-[#261a1a]/60">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#B50016]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-t from-[#FF5A00]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#261a1a] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2020]" />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
              03 • TECHNICAL ARSENAL
            </span>
          </div>
          <h2 className="font-cinema font-extrabold tracking-wider text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-4">
            MY PROFESSIONAL SKILLS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto">
            Comprehensive mastery across digital post-production, optical cinematography, studio lighting, and high-end visual effects compositing.
          </p>
        </div>

        {/* 4 Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => CinematicAudio.playClick()}
              className="relative group rounded-2xl bg-[#121216] border border-[#261a1a] p-6 hover:border-[#FF5A00] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(255,90,0,0.25)] flex flex-col justify-between"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#FF2020] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Icon + Category Title */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b0b0d] border border-[#261a1a] flex items-center justify-center group-hover:scale-110 group-hover:border-[#FF5A00]/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {getIcon(cat.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#FF5A00] uppercase font-bold">
                      DOMAIN 0{idx + 1}
                    </span>
                    <h3 className="font-display font-black text-base sm:text-lg tracking-wider text-white uppercase">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 min-h-[38px]">
                  {cat.description}
                </p>

                {/* Progress-Free Animated Skill Items */}
                <div className="space-y-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="px-3.5 py-2.5 rounded-lg bg-[#0b0b0d] border border-[#1f1a1a] hover:border-[#FF2020]/60 hover:bg-[#151214] transition-all flex items-center justify-between group/item"
                    >
                      <span className="text-xs font-medium text-gray-200 group-hover/item:text-white transition-colors">
                        {skill}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] group-hover/item:bg-[#FF2020] group-hover/item:scale-125 transition-all" />
                        <Check className="w-3.5 h-3.5 text-[#FF9B24] opacity-80" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#1f1a1a] flex items-center justify-between text-[10px] font-mono tracking-wider text-gray-500 uppercase">
                <span>INDUSTRY STANDARD</span>
                <span className="text-[#FF5A00] font-bold">VERIFIED WORKFLOW</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filmmaking Stack Showcase */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#121216] via-[#161214] to-[#121216] border border-[#261a1a] text-center">
          <p className="font-cinema tracking-[0.2em] text-xs uppercase text-[#FF9B24] font-bold mb-3">
            POST-PRODUCTION & CINEMA CAMERA PIPELINE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-xs text-gray-300">
            <span className="px-3 py-1.5 rounded-md bg-[#050505] border border-gray-800">Adobe Premiere Pro</span>
            <span className="px-3 py-1.5 rounded-md bg-[#050505] border border-gray-800">DaVinci Resolve Studio</span>
            <span className="px-3 py-1.5 rounded-md bg-[#050505] border border-gray-800">Autodesk Maya 3D</span>
            <span className="px-3 py-1.5 rounded-md bg-[#050505] border border-gray-800">Foundry Nuke</span>
            <span className="px-3 py-1.5 rounded-md bg-[#050505] border border-gray-800">Adobe After Effects</span>
            <span className="px-3 py-1.5 rounded-md bg-[#050505] border border-gray-800">Adobe Lightroom Classic</span>
            <span className="px-3 py-1.5 rounded-md bg-[#050505] border border-gray-800">Adobe Photoshop</span>
          </div>
        </div>

      </div>
    </section>
  );
};
