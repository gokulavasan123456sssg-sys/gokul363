import React from 'react';
import { Camera, Film, Sparkles, CheckCircle2, Award, Clapperboard, MapPin, Calendar } from 'lucide-react';
import { SiteProfile } from '../../types';
import { CinematicAudio } from '../../utils/audio';

interface AboutSectionProps {
  profile: SiteProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const highlights = [
    { title: 'Video Editing', desc: 'Premiere Pro & DaVinci Resolve frame pacing, comedic timing, and multi-cam sync.' },
    { title: 'Cinematography', desc: 'Rig operation, dynamic gimbal tracking, indoor 3-point & natural bounce setups.' },
    { title: 'Photography', desc: 'Raw portraiture, live event coverage, BTS visual documentation, and Lightroom color.' },
    { title: 'VFX & Compositing', desc: 'Nuke multipass integration, Autodesk Maya 3D simulations, and After Effects motion.' },
    { title: 'Colour Grading', desc: 'Rich cinematic skin tones, moody low-key contrast, and Tamil cinema visual saturation.' },
    { title: 'Visual Storytelling', desc: 'Crafting dramatic storyboards and transforming director visions into memorable films.' }
  ];

  const stats = [
    { label: 'PRO EXPERIENCE', value: '1 YEAR', sub: 'Koyaka YouTube Channel' },
    { label: 'PROJECT DELIVERABLES', value: '100+', sub: 'Videos, Photos & Reels' },
    { label: 'CORE SOFTWARE', value: '7+', sub: 'Premiere, Resolve, Nuke, Maya' },
    { label: 'CREATIVE ENERGY', value: '100%', sub: 'Pure Cinematic Commitment' }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#050505] overflow-hidden border-t border-[#261a1a]/60">
      {/* Background Graphic Blocks & Cinematic Glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#B50016]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#FF5A00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#261a1a] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
              02 • THE FILMMAKER IDENTITY
            </span>
          </div>
          <h2 className="font-cinema font-extrabold tracking-wider text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-4">
            {profile.aboutHeading}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] mx-auto rounded-full" />
        </div>

        {/* Main Content Grid: Portrait on Left, Bio on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait Card with Cinematic Badge */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#B50016] via-[#FF2020] to-[#FF5A00] opacity-40 blur-xl transition-all duration-500 group-hover:opacity-75" />
              
              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#261a1a] bg-[#0b0b0d] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#121216]">
                  <img
                    src={profile.portraitImage}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('application_photo')) {
                        target.src = profile.applicationPhoto;
                      }
                    }}
                  />
                  {/* Subtle cinema gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  
                  {/* Bottom Portrait Caption */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#050505]/85 border border-[#261a1a] backdrop-blur-md">
                    <p className="font-cinema font-bold text-lg text-white tracking-wider">
                      {profile.name}
                    </p>
                    <p className="text-xs text-[#FF9B24] font-medium tracking-wide">
                      Lead Video Editor & Cinematographer
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-[11px] text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF2020]" />
                        Chennai, India
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#FF5A00]" />
                        Active Creative
                      </span>
                    </div>
                  </div>
                </div>

                {/* Experience Banner at Bottom */}
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#B50016]/20 via-[#FF2020]/20 to-[#FF5A00]/20 border border-[#FF2020]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clapperboard className="w-5 h-5 text-[#FF5A00]" />
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">Koyaka YouTube Channel</p>
                      <p className="text-[10px] text-gray-400">Video Editor, Cinematographer & Photographer</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#FF2020] text-white font-mono text-[10px] font-bold">
                    1 YEAR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Resume Bio & Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="space-y-4 text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
              {profile.aboutBio.map((paragraph, index) => (
                <p key={index} className="text-justify sm:text-left text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Capability Badges Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {highlights.map((item, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => CinematicAudio.playClick()}
                  className="p-3.5 rounded-xl bg-[#121216]/80 border border-[#261a1a] hover:border-[#FF5A00]/50 hover:bg-[#16161d] transition-all group"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF2020] mt-0.5 shrink-0 group-hover:text-[#FF5A00] transition-colors" />
                    <div>
                      <h4 className="text-xs font-bold font-display uppercase tracking-wider text-white group-hover:text-[#FF9B24] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-normal mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a] text-center hover:border-[#FF2020]/40 hover:shadow-[0_0_30px_rgba(255,32,32,0.15)] transition-all"
            >
              <p className="font-cinema font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF9B24] to-[#FF5A00]">
                {s.value}
              </p>
              <p className="mt-2 text-xs font-bold tracking-widest uppercase text-white font-display">
                {s.label}
              </p>
              <p className="mt-1 text-[11px] text-gray-400 font-mono">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
