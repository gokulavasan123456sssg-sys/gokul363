import React, { useState, useEffect } from 'react';
import { Play, Download, Mail, ArrowDown, Sparkles, Film, RotateCcw } from 'lucide-react';
import { SiteProfile } from '../../types';
import { CinematicAudio } from '../../utils/audio';

interface HeroIntroProps {
  profile: SiteProfile;
  onResumeClick: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({ profile, onResumeClick }) => {
  // Intro stages:
  // 0: Initial black screen
  // 1: Name letter reveal
  // 2: Hero Mass Swagger Walk
  // 3: Full Homepage Hero settled
  const [stage, setStage] = useState<number>(0);
  const [revealedLetters, setRevealedLetters] = useState<number>(0);
  const nameLetters = profile.name.split('');

  useEffect(() => {
    // Stage 0 -> 1: Black screen holds, then starts letter reveal
    const startTimer = setTimeout(() => {
      setStage(1);
      CinematicAudio.playMassHit();
    }, 600);

    return () => clearTimeout(startTimer);
  }, []);

  // Letter by letter animation
  useEffect(() => {
    if (stage === 1) {
      if (revealedLetters < nameLetters.length) {
        const letterTimer = setTimeout(() => {
          setRevealedLetters(prev => prev + 1);
          CinematicAudio.playRiser(1 + (revealedLetters * 0.08));
        }, 110);
        return () => clearTimeout(letterTimer);
      } else {
        // Once letters are all revealed, hold for dramatic impact and transition to Hero Walk
        const walkTimer = setTimeout(() => {
          setStage(2);
          CinematicAudio.playFootstep();
        }, 900);
        return () => clearTimeout(walkTimer);
      }
    }
  }, [stage, revealedLetters, nameLetters.length]);

  // Hero Walk sequence -> Settle into Homepage Hero
  useEffect(() => {
    if (stage === 2) {
      // Simulate footstep audio timing
      const stepTimer1 = setTimeout(() => CinematicAudio.playFootstep(), 600);
      const stepTimer2 = setTimeout(() => CinematicAudio.playFootstep(), 1400);
      const settleTimer = setTimeout(() => {
        setStage(3);
        CinematicAudio.playMassHit();
      }, 2600);

      return () => {
        clearTimeout(stepTimer1);
        clearTimeout(stepTimer2);
        clearTimeout(settleTimer);
      };
    }
  }, [stage]);

  const handleSkipOrReplay = () => {
    if (stage === 3) {
      // Replay intro
      setStage(0);
      setRevealedLetters(0);
      setTimeout(() => {
        setStage(1);
        CinematicAudio.playMassHit();
      }, 300);
    } else {
      // Skip directly to settled hero
      setRevealedLetters(nameLetters.length);
      setStage(3);
      CinematicAudio.playMassHit();
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] pt-20 pb-16"
    >
      {/* Background Cinematic Gradients & Spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top dramatic red backlight */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-b from-[#B50016]/25 via-[#FF2020]/15 to-transparent rounded-full blur-[110px]" />
        {/* Bottom fiery glow */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-t from-[#FF5A00]/20 via-[#FF9B24]/10 to-transparent rounded-full blur-[120px]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/60 to-[#050505]" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        
        {/* Tamil Cinema Mass Banner Pre-title */}
        <div className={`transition-all duration-700 transform ${
          stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        } mb-4`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B50016]/20 border border-[#FF2020]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,32,32,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#FF2020] animate-ping" />
            <span className="font-tamil text-xs sm:text-sm tracking-wider text-[#FF9B24] font-bold">
              பிறப்பொக்கும் எல்லா உயிர்க்கும்
            </span>
            <span className="text-gray-400 text-xs">.</span>
            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-gray-200 font-semibold">
              All living beings are equal by birth.
            </span>
          </div>
        </div>

        {/* ================= STAGE 1 & 2: CENTER NAME REVEAL ================= */}
        <div className="relative my-2 select-none">
          <h1 className="font-cinema font-black tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.32em] text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            {nameLetters.map((char, index) => {
              const isRevealed = index < revealedLetters || stage >= 2;
              return (
                <span
                  key={index}
                  className={`inline-block transition-all duration-300 transform ${
                    isRevealed
                      ? 'opacity-100 scale-100 text-transparent bg-clip-text bg-gradient-to-b from-white via-[#FF9B24] to-[#FF5A00] drop-shadow-[0_0_25px_rgba(255,32,32,0.8)]'
                      : 'opacity-0 scale-150 blur-sm text-[#FF2020]'
                  }`}
                  style={{
                    textShadow: isRevealed 
                      ? '0 0 35px rgba(255,32,32,0.8), 0 0 65px rgba(255,90,0,0.5)' 
                      : 'none'
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h1>
          {/* Searing Orange-Red Laser Glow line underneath */}
          <div className={`h-[3px] mx-auto mt-4 rounded-full bg-gradient-to-r from-transparent via-[#FF2020] via-[#FF5A00] to-transparent transition-all duration-1000 ${
            stage >= 1 ? 'w-full max-w-2xl opacity-100 shadow-[0_0_25px_#FF2020]' : 'w-0 opacity-0'
          }`} />
        </div>

        {/* ================= STAGE 2 & 3: TAMIL MASS HERO ENTRANCE WALK ================= */}
        <div className={`relative my-6 transition-all duration-1000 ease-out flex flex-col items-center justify-center ${
          stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}>
          {/* Hero Portrait Frame with Cinematic Lighting */}
          <div className="relative group">
            {/* Dramatic back halo */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-[#B50016] via-[#FF5A00] to-[#FF9B24] opacity-75 blur-2xl group-hover:opacity-100 animate-flame-glow transition-all" />
            
            {/* Rim Lighting Border Container */}
            <div className={`relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full p-[3px] bg-gradient-to-tr from-[#B50016] via-[#FF2020] via-[#FF5A00] to-[#FF9B24] shadow-[0_0_60px_rgba(255,32,32,0.6)] ${
              stage === 2 ? 'animate-pulse scale-105 transition-transform duration-1000' : ''
            }`}>
              {/* Inner cutout for Gokulavasan's authentic portrait */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0b0b0d]">
                <img
                  src={profile.portraitImage}
                  alt={profile.name}
                  className={`w-full h-full object-cover object-top filter brightness-105 contrast-110 transition-all duration-1000 ${
                    stage === 2 
                      ? 'scale-110 translate-y-[-2%]' 
                      : 'scale-100 group-hover:scale-105'
                  }`}
                  onError={(e) => {
                    // Fallback to application photo if needed
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('application_photo')) {
                      target.src = profile.applicationPhoto;
                    }
                  }}
                />
                {/* Cinematic film vignette overlay over the portrait */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-transparent to-[#B50016]/20 mix-blend-color pointer-events-none" />
              </div>
            </div>

            {/* Mass swagger motion badges */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-[#050505]/90 border border-[#FF5A00] shadow-[0_0_20px_rgba(255,90,0,0.6)] backdrop-blur-md">
              <span className="font-cinema text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#FF9B24] uppercase">
                THE FILMMAKER
              </span>
            </div>
          </div>
        </div>

        {/* ================= STAGE 3: TITLES, TAGLINE & CTA BUTTONS ================= */}
        <div className={`transition-all duration-1000 transform ${
          stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } max-w-4xl`}>
          
          {/* Profession Subtitle */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-4 font-display text-xs sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.35em] font-bold text-gray-200 uppercase">
            <span>VIDEO EDITOR</span>
            <span className="text-[#FF2020]">•</span>
            <span>CINEMATOGRAPHER</span>
            <span className="text-[#FF5A00]">•</span>
            <span>PHOTOGRAPHER</span>
            <span className="text-[#FF9B24]">•</span>
            <span className="text-[#FF9B24]">VFX ARTIST</span>
          </div>

          {/* Tagline */}
          <p className="font-cinema italic font-medium text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-300 tracking-wide my-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            "{profile.tagline}"
          </p>

          {/* Brief Cinematic Pitch */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-400 font-sans font-normal leading-relaxed mb-8">
            {profile.heroBio}
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Explore My Work */}
            <a
              href="#portfolio"
              onClick={() => CinematicAudio.playClick()}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-md text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] shadow-[0_0_25px_rgba(255,32,32,0.5)] hover:shadow-[0_0_40px_rgba(255,90,0,0.8)] hover:scale-105 transition-all duration-300"
            >
              <Film className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>EXPLORE MY WORK</span>
            </a>

            {/* Download Resume */}
            <button
              onClick={() => {
                CinematicAudio.playClick();
                onResumeClick();
              }}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-md text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-gray-200 bg-[#121216] border border-[#261a1a] hover:border-[#FF5A00] hover:text-white hover:bg-[#1a1a22] shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(255,90,0,0.3)] transition-all duration-300"
            >
              <Download className="w-4 h-4 text-[#FF5A00]" />
              <span>DOWNLOAD RESUME</span>
            </button>

            {/* Contact Me */}
            <a
              href="#contact"
              onClick={() => CinematicAudio.playClick()}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-md text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-gray-300 hover:text-[#FF9B24] border border-transparent hover:border-[#FF2020]/40 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-[#FF2020]" />
              <span>CONTACT ME</span>
            </a>
          </div>

          {/* Quick Experience Stamp */}
          <div className="mt-12 flex items-center justify-center gap-8 text-gray-500 text-[11px] font-mono tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2020]" />
              <span>1 YR @ KOYAKA YOUTUBE CHANNEL</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00]" />
              <span>VFX IMAGE INSTITUTION CERTIFIED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9B24]" />
              <span>CHENNAI, INDIA</span>
            </div>
          </div>

          {/* Scroll Down Hint */}
          <div className="mt-10 animate-bounce">
            <a 
              href="#about" 
              onClick={() => CinematicAudio.playClick()}
              className="inline-flex flex-col items-center text-gray-500 hover:text-[#FF5A00] transition-colors"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase mb-1">SCROLL TO EXPERIENCE</span>
              <ArrowDown className="w-4 h-4 text-[#FF5A00]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
