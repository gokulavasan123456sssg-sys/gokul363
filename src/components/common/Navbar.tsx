import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Download, ShieldCheck, Clapperboard, Sparkles } from 'lucide-react';
import { CinematicAudio } from '../../utils/audio';

interface NavbarProps {
  onOpenAdmin: () => void;
  resumeUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, resumeUrl }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(CinematicAudio.getIsEnabled());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(totalScroll > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = CinematicAudio.toggleMute();
    setIsAudioActive(newState);
    if (newState) {
      CinematicAudio.playMassHit();
    }
  };

  const navLinks = [
    { label: 'WORK', href: '#portfolio' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'VFX REEL', href: '#vfx' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#B50016] via-[#FF2020] via-[#FF5A00] to-[#FF9B24] z-50 transition-all duration-75 shadow-[0_0_10px_#FF2020]"
        style={{ width: `${scrollProgress}%` }}
      />

      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#261a1a]/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Title */}
          <a 
            href="#hero" 
            onClick={() => CinematicAudio.playClick()}
            className="group flex items-center gap-3"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#B50016] to-[#FF5A00] p-[1px] shadow-[0_0_15px_rgba(255,32,32,0.4)] group-hover:shadow-[0_0_25px_rgba(255,90,0,0.7)] transition-all">
              <div className="w-full h-full bg-[#0b0b0d] rounded-lg flex items-center justify-center">
                <Clapperboard className="w-5 h-5 text-[#FF5A00] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-cinema font-extrabold tracking-[0.25em] text-lg sm:text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#FF9B24] group-hover:to-[#FF5A00] transition-all">
                GOKULAVASAN
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-[#FF5A00] font-bold uppercase -mt-0.5 opacity-90">
                Cinematic Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => CinematicAudio.playClick()}
                className="relative text-xs tracking-[0.2em] font-semibold text-gray-300 hover:text-white transition-colors py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF2020] to-[#FF5A00] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Actions: Sound Toggle + Resume + Admin Button */}
          <div className="flex items-center gap-3">
            {/* Cinematic Audio FX Toggle */}
            <button
              onClick={handleToggleSound}
              title={isAudioActive ? 'Cinematic Audio: ON (Click to Mute)' : 'Cinematic Audio: MUTED (Click to Enable)'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                isAudioActive
                  ? 'bg-[#FF2020]/15 border-[#FF2020] text-[#FF9B24] shadow-[0_0_12px_rgba(255,32,32,0.3)]'
                  : 'bg-black/50 border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-[#FF5A00] animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline font-mono text-[10px]">
                {isAudioActive ? 'FX ON' : 'FX OFF'}
              </span>
            </button>

            {/* Resume Button */}
            <a
              href={resumeUrl}
              download="Gokulavasan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => CinematicAudio.playClick()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] text-white hover:brightness-110 shadow-[0_0_15px_rgba(255,32,32,0.4)] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Admin Shield Button */}
            <button
              onClick={() => {
                CinematicAudio.playClick();
                onOpenAdmin();
              }}
              title="Admin CMS Portal"
              className="p-2 rounded-md bg-[#121216] border border-[#261a1a] text-gray-400 hover:text-[#FF9B24] hover:border-[#FF5A00]/50 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-md bg-[#121216] border border-[#261a1a] text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b0b0d]/95 backdrop-blur-xl border-b border-[#261a1a] px-6 py-6 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    CinematicAudio.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm tracking-[0.25em] font-bold text-gray-300 hover:text-[#FF5A00] py-2 border-b border-gray-800/60"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-3">
                <a
                  href={resumeUrl}
                  download="Gokulavasan_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-md text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#B50016] to-[#FF5A00] text-white text-center"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-bold tracking-wider bg-[#121216] border border-[#261a1a] text-gray-300 text-center"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FF9B24]" />
                  Admin CMS Portal
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
