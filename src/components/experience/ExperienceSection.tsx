import React from 'react';
import { Briefcase, CheckCircle2, Calendar, MapPin, Youtube, Clapperboard, Sparkles } from 'lucide-react';
import { ExperienceItem } from '../../types';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section id="experience" className="relative py-28 bg-[#050505] overflow-hidden border-t border-[#261a1a]/60">
      {/* Background Graphic Blocks */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#FF5A00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#261a1a] mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
              09 • PRODUCTION EXPERIENCE
            </span>
          </div>
          <h2 className="font-cinema font-extrabold tracking-wider text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-4">
            WORK EXPERIENCE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto">
            1 Year full-time tenure driving high-cadence digital video production, camera rigs, and color science.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative rounded-2xl bg-[#0b0b0d] border border-[#261a1a] hover:border-[#FF5A00] p-6 sm:p-8 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f1a1a]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B50016]/20 to-[#FF5A00]/20 border border-[#FF2020]/40 flex items-center justify-center shrink-0">
                    <Youtube className="w-7 h-7 text-[#FF2020]" />
                  </div>
                  <div>
                    <h3 className="font-cinema font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wide">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-display font-bold text-[#FF9B24] tracking-wider mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF2020]/20 border border-[#FF2020]/50 text-white">
                    {exp.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#121216] border border-gray-800 text-gray-400">
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities list from resume */}
              <div className="mt-6 space-y-3">
                {exp.description.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5A00] mt-1 shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Tags */}
              <div className="mt-8 pt-4 border-t border-[#1f1a1a] flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase mr-2 font-bold">CORE SKILLS DEPLOYED:</span>
                {['Premiere Pro', 'DaVinci Resolve', 'Camera Operation', '3-Point Lighting', 'Audio Sync', 'Thumbnail Visuals'].map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#121216] border border-gray-800 text-gray-300">
                    {t}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
