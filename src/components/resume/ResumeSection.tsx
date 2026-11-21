import React, { useState } from 'react';
import { Download, ExternalLink, FileText, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { SiteProfile } from '../../types';
import { CinematicAudio } from '../../utils/audio';

interface ResumeSectionProps {
  profile: SiteProfile;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ profile }) => {
  const [showEmbeddedPdf, setShowEmbeddedPdf] = useState<boolean>(false);

  return (
    <section id="resume" className="relative py-28 bg-[#050505] overflow-hidden border-t border-[#261a1a]/60">
      {/* Background Graphic Blocks */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#B50016]/15 via-[#FF2020]/10 to-[#FF5A00]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#261a1a] mb-4">
            <FileText className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
              11 • CURRICULUM VITAE
            </span>
          </div>
          <h2 className="font-cinema font-extrabold tracking-wider text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-4">
            OFFICIAL RESUME
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto">
            Direct access to the complete verified professional credentials, production tenure, and educational history.
          </p>
        </div>

        {/* Main Resume Showcase Box */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0b0b0d] border border-[#261a1a] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-[#1f1a1a]">
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B50016] to-[#FF5A00] p-[1px] shadow-[0_0_25px_rgba(255,32,32,0.4)]">
                <div className="w-full h-full bg-[#0b0b0d] rounded-2xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-[#FF5A00]" />
                </div>
              </div>
              <div>
                <h3 className="font-cinema font-bold text-2xl text-white uppercase tracking-wide">
                  GOKULAVASAN - RESUME
                </h3>
                <p className="text-xs sm:text-sm text-[#FF9B24] font-medium tracking-wide mt-1">
                  Video Editor • Photographer • Cinematographer • VFX Artist
                </p>
                <p className="text-[11px] text-gray-500 font-mono mt-1">
                  Format: Official PDF Document • Size: ~115 KB
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={profile.resumePdfUrl}
                download="Gokulavasan_Resume.pdf"
                onClick={() => CinematicAudio.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-xs font-bold font-mono tracking-wider uppercase text-white bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] shadow-[0_0_20px_rgba(255,32,32,0.4)] hover:brightness-110 hover:scale-105 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <a
                href={profile.resumeDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => CinematicAudio.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-lg text-xs font-bold font-mono tracking-wider uppercase text-gray-200 bg-[#121216] border border-[#261a1a] hover:border-[#FF5A00] hover:text-white transition-all"
              >
                <ExternalLink className="w-4 h-4 text-[#FF5A00]" />
                <span>VIEW IN DRIVE</span>
              </a>

              <button
                onClick={() => {
                  CinematicAudio.playClick();
                  setShowEmbeddedPdf(!showEmbeddedPdf);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg text-xs font-bold font-mono tracking-wider uppercase text-gray-300 bg-[#121216] border border-[#261a1a] hover:border-gray-600 transition-all"
              >
                <Eye className="w-4 h-4 text-[#FF9B24]" />
                <span>{showEmbeddedPdf ? 'HIDE PREVIEW' : 'QUICK PREVIEW'}</span>
              </button>
            </div>
          </div>

          {/* Quick Credential Highlights */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#121216] border border-[#1f1a1a]">
              <span className="text-[10px] font-mono text-[#FF5A00] uppercase font-bold block mb-1">
                PRODUCTION TENURE
              </span>
              <p className="text-xs text-white font-semibold">1 Year @ Koyaka Channel</p>
              <p className="text-[11px] text-gray-400 mt-1">Full-time Video Editor & Cameraman</p>
            </div>

            <div className="p-4 rounded-xl bg-[#121216] border border-[#1f1a1a]">
              <span className="text-[10px] font-mono text-[#FF2020] uppercase font-bold block mb-1">
                PROFESSIONAL TRAINING
              </span>
              <p className="text-xs text-white font-semibold">VFX & Compositing Certified</p>
              <p className="text-[11px] text-gray-400 mt-1">VFX Image Institution, Vadapalani</p>
            </div>

            <div className="p-4 rounded-xl bg-[#121216] border border-[#1f1a1a]">
              <span className="text-[10px] font-mono text-[#FF9B24] uppercase font-bold block mb-1">
                ENGINEERING DEGREE
              </span>
              <p className="text-xs text-white font-semibold">B.E. Cyber Security (74%)</p>
              <p className="text-[11px] text-gray-400 mt-1">SRM Valliammai Engg College</p>
            </div>
          </div>

          {/* Embedded PDF Viewer if requested */}
          {showEmbeddedPdf && (
            <div className="mt-8 pt-6 border-t border-[#1f1a1a] animate-fade-in">
              <div className="w-full h-[650px] rounded-xl overflow-hidden border border-[#261a1a] bg-black">
                <iframe
                  src={`${profile.resumePdfUrl}#view=FitH`}
                  className="w-full h-full border-0"
                  title="Gokulavasan Resume PDF"
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
