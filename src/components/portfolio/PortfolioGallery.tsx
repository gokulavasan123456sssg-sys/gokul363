import React, { useState } from 'react';
import { Play, Eye, Sparkles, Filter, ExternalLink, Film, Image as ImageIcon } from 'lucide-react';
import { Project, ProjectCategory } from '../../types';
import { ProjectModal } from './ProjectModal';
import { CinematicAudio } from '../../utils/audio';

interface PortfolioGalleryProps {
  projects: Project[];
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Works');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: string[] = [
    'All Works',
    'Wedding Films',
    'Video Editing',
    'Cinematography',
    'Photography',
    'VFX & Showreels',
    'Creative Projects'
  ];

  const filteredProjects = activeCategory === 'All Works'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleOpenProject = (project: Project) => {
    CinematicAudio.playClick();
    setSelectedProject(project);
  };

  return (
    <section id="portfolio" className="relative py-28 bg-[#050505] overflow-hidden border-t border-[#261a1a]/60">
      {/* Background Graphic Blocks */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#B50016]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FF5A00]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#261a1a] mb-4">
            <Film className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
              04 • CINEMATIC PORTFOLIO GALLERY
            </span>
          </div>
          <h2 className="font-cinema font-extrabold tracking-wider text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-4">
            SELECTED WORKS & SHOWREELS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto">
            Featuring authentic wedding cuts, Koyaka comedy edits, high-end photography expeditions across Tamil Nadu, and certified 3D VFX simulations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  CinematicAudio.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] text-white shadow-[0_0_20px_rgba(255,32,32,0.4)] scale-105'
                    : 'bg-[#121216] text-gray-400 hover:text-white border border-[#261a1a] hover:border-[#FF5A00]/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleOpenProject(proj)}
              onMouseEnter={() => CinematicAudio.playClick()}
              className="group relative rounded-2xl bg-[#0b0b0d] border border-[#261a1a] hover:border-[#FF5A00] transition-all duration-500 overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(255,90,0,0.25)] flex flex-col"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121216]">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('suchindram_temple_1')) {
                      target.src = '/media/photos/suchindram_temple_1.jpg';
                    }
                  }}
                />

                {/* Dark Cinema Overlay with play trigger */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Center Action Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#B50016]/80 group-hover:bg-[#FF2020] border border-white/20 flex items-center justify-center transform scale-90 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(255,32,32,0.6)] backdrop-blur-sm">
                    {proj.mediaType === 'video' ? (
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    ) : (
                      <Eye className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#050505]/85 border border-[#FF2020]/40 text-[#FF9B24] backdrop-blur-md">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-gray-300">
                    {proj.mediaType === 'video' ? (
                      <>
                        <Film className="w-3 h-3 text-[#FF2020]" />
                        <span>VIDEO</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-[#FF9B24]" />
                        <span>PHOTO</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinema font-bold text-lg sm:text-xl text-white group-hover:text-[#FF9B24] transition-colors uppercase tracking-wide line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-400 font-sans leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1f1a1a] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-500">
                    {proj.date}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#FF5A00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {proj.mediaType === 'video' ? 'PLAY CINEMA' : 'VIEW HIGH-RES'} →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Video / Photo Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
