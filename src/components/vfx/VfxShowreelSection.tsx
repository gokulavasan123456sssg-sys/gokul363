import React, { useState } from 'react';
import { Play, Sparkles, Layers, Box, Cpu, Video, CheckCircle2 } from 'lucide-react';
import { CinematicAudio } from '../../utils/audio';

export const VfxShowreelSection: React.FC<VfxShowreelSectionProps> = () => {
  const [activeVideo, setActiveVideo] = useState<'showreel' | 'sim3d'>('showreel');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const vfxPillars = [
    { title: 'Autodesk Maya 3D', desc: 'Hard-surface modeling, environment set dressing, procedural shaders, and dynamic lighting rigs.' },
    { title: 'Foundry Nuke Compositing', desc: 'Multi-pass EXR compositing, depth-based atmospheric haze, rotoscopy, and clean plate painting.' },
    { title: 'After Effects Motion', desc: 'Title sequences, glitch aesthetics, graphic overlays, and cinematic trailer kinetic typography.' },
    { title: 'Certified Expertise', desc: 'VFX & Compositing Certification from VFX Image Institution, Vadapalani, Chennai.' }
  ];

  return (
    <section id="vfx" className="relative py-28 bg-[#0b0b0d] overflow-hidden border-t border-[#261a1a]/60">
      {/* Background Graphic Blocks & Fiery Laser Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#B50016]/15 via-[#FF2020]/10 to-[#FF5A00]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#261a1a] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2020]" />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
              08 • VISUAL EFFECTS & 3D CGI
            </span>
          </div>
          <h2 className="font-cinema font-extrabold tracking-wider text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-4">
            VFX SHOWREEL & 3D SIMULATION
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto">
            Certified in high-end VFX & Compositing. Integrating 3D photorealism, node-based compositing, and cinematic storytelling.
          </p>
        </div>

        {/* Video Selector Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => {
              CinematicAudio.playClick();
              setActiveVideo('showreel');
              setIsPlaying(true);
            }}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
              activeVideo === 'showreel'
                ? 'bg-[#FF2020] text-white shadow-[0_0_20px_#FF2020]'
                : 'bg-[#121216] text-gray-400 border border-[#261a1a] hover:text-white'
            }`}
          >
            MASTER VFX SHOWREEL
          </button>
          <button
            onClick={() => {
              CinematicAudio.playClick();
              setActiveVideo('sim3d');
              setIsPlaying(true);
            }}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
              activeVideo === 'sim3d'
                ? 'bg-[#FF5A00] text-white shadow-[0_0_20px_#FF5A00]'
                : 'bg-[#121216] text-gray-400 border border-[#261a1a] hover:text-white'
            }`}
          >
            3D CGI SIMULATION
          </button>
        </div>

        {/* Main Video Cinema Showcase Player */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden bg-black border border-[#261a1a] shadow-[0_0_60px_rgba(255,32,32,0.35)] aspect-video">
          <video
            key={activeVideo}
            src={activeVideo === 'showreel' ? '/media/videos/show_reel.mp4' : '/media/videos/3D_vfx.mp4'}
            poster={activeVideo === 'showreel' ? '/media/thumbnails/thumb_show_reel.jpg' : '/media/thumbnails/thumb_3d_vfx.jpg'}
            controls
            autoPlay={isPlaying}
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* VFX Capability Pillars */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vfxPillars.map((p, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-[#121216] border border-[#261a1a] hover:border-[#FF2020]/60 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0b0b0d] border border-[#261a1a] flex items-center justify-center mb-3 text-[#FF5A00] group-hover:text-[#FF2020] transition-colors">
                <Box className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-1">
                {p.title}
              </h4>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

interface VfxShowreelSectionProps {}
