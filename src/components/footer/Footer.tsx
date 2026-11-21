import React from 'react';
import { Clapperboard, Heart, ArrowUp, ShieldCheck } from 'lucide-react';
import { CinematicAudio } from '../../utils/audio';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    CinematicAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-[#261a1a] py-12 text-gray-500 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Attribution */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B50016] to-[#FF5A00] p-[1px]">
            <div className="w-full h-full bg-[#050505] rounded-lg flex items-center justify-center">
              <Clapperboard className="w-4 h-4 text-[#FF5A00]" />
            </div>
          </div>
          <div>
            <p className="font-cinema font-bold text-white text-sm tracking-widest uppercase">
              GOKULAVASAN
            </p>
            <p className="text-[10px] font-mono tracking-wider text-gray-500">
              © {new Date().getFullYear()} Cinematic Portfolio. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Tamil Cinema homage tag */}
        <div className="flex items-center gap-2 text-center text-gray-400 font-mono text-[11px]">
          <span>Crafted for Tamil Cinema Grandeur & High-Impact Visual Storytelling</span>
        </div>

        {/* Right actions: Scroll to top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="p-2 rounded-md bg-[#121216] border border-[#261a1a] text-gray-400 hover:text-white hover:border-[#FF2020] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
