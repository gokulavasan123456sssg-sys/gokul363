import React from 'react';
import { GraduationCap, Award, School, Sparkles, CheckCircle2, MapPin } from 'lucide-react';
import { EducationItem } from '../../types';

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const getIcon = (type: EducationItem['type']) => {
    switch (type) {
      case 'certification':
        return <Award className="w-6 h-6 text-[#FF2020]" />;
      case 'degree':
        return <GraduationCap className="w-6 h-6 text-[#FF5A00]" />;
      case 'diploma':
        return <GraduationCap className="w-6 h-6 text-[#FF9B24]" />;
      default:
        return <School className="w-6 h-6 text-gray-300" />;
    }
  };

  return (
    <section id="education" className="relative py-28 bg-[#0b0b0d] overflow-hidden border-t border-[#261a1a]/60">
      {/* Background Graphic Blocks */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#B50016]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#261a1a] mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-[#FF2020]" />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
              10 • ACADEMIC & PROFESSIONAL CREDENTIALS
            </span>
          </div>
          <h2 className="font-cinema font-extrabold tracking-wider text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-4">
            EDUCATION & CERTIFICATIONS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto">
            Technical foundation merging engineering precision, cyber security vigilance, and industry-certified VFX compositing.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-2xl bg-[#121216] border p-7 transition-all duration-300 hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.7)] ${
                item.type === 'certification'
                  ? 'border-[#FF2020]/50 hover:border-[#FF2020] shadow-[0_0_25px_rgba(255,32,32,0.15)]'
                  : 'border-[#261a1a] hover:border-[#FF5A00]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b0b0d] border border-[#261a1a] flex items-center justify-center shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#FF5A00]">
                      {item.type.toUpperCase()}
                    </span>
                    <h3 className="font-cinema font-bold text-lg sm:text-xl text-white uppercase tracking-wide mt-0.5">
                      {item.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-display text-gray-300 mt-1">
                      {item.institution}
                    </p>
                    {item.location && (
                      <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-gray-500">
                        <MapPin className="w-3 h-3 text-[#FF2020]" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {item.score && (
                  <div className="px-3 py-1.5 rounded-lg bg-[#050505] border border-[#FF5A00]/40 text-center shrink-0">
                    <span className="text-[10px] font-mono text-gray-400 block">SCORE</span>
                    <span className="font-cinema font-bold text-sm text-[#FF9B24]">{item.score}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
