import React, { useEffect, useState } from 'react';
import { X, Play, Maximize2, ExternalLink, Calendar, Tag, UserCheck, Sparkles, AlertCircle } from 'lucide-react';
import { Project } from '../../types';
import { CinematicAudio } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [videoMode, setVideoMode] = useState<'local' | 'drive'>('local');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Decide source
  const hasLocalVideo = Boolean(project.videoUrl);
  const hasDriveVideo = Boolean(project.driveId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/95 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0b0b0d] border border-[#261a1a] shadow-[0_0_80px_rgba(255,32,32,0.3)] flex flex-col">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0b0b0d]/95 backdrop-blur-md border-b border-[#261a1a]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF2020]/20 border border-[#FF2020]/40 text-[#FF9B24]">
              {project.category}
            </span>
            <span className="text-xs text-gray-400 font-mono hidden sm:inline">
              {project.date}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.driveViewUrl && (
              <a
                href={project.driveViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in Google Drive"
                className="p-2 rounded-lg bg-[#121216] border border-gray-800 text-gray-300 hover:text-white hover:border-[#FF5A00] transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#FF5A00]" />
              </a>
            )}
            <button
              onClick={() => {
                CinematicAudio.playClick();
                onClose();
              }}
              className="p-2 rounded-lg bg-[#121216] border border-gray-800 text-gray-300 hover:text-white hover:bg-[#FF2020] hover:border-[#FF2020] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Player Area */}
        <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden border-b border-[#261a1a]">
          {project.mediaType === 'video' ? (
            <>
              {videoMode === 'local' && hasLocalVideo ? (
                <video
                  src={project.videoUrl}
                  poster={project.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  onError={() => {
                    // Fall back to Drive preview if local video load fails
                    if (hasDriveVideo) setVideoMode('drive');
                  }}
                />
              ) : hasDriveVideo ? (
                <iframe
                  src={`https://drive.google.com/file/d/${project.driveId}/preview`}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen"
                  title={project.title}
                />
              ) : (
                <div className="text-center p-8">
                  <AlertCircle className="w-10 h-10 text-[#FF5A00] mx-auto mb-2" />
                  <p className="text-gray-300 text-sm">Video file is linked via Google Drive.</p>
                  {project.driveViewUrl && (
                    <a
                      href={project.driveViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block px-4 py-2 rounded bg-[#FF2020] text-white text-xs font-bold"
                    >
                      Open Google Drive Preview
                    </a>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-[#050505]">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Info & Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 className="font-cinema font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-wide">
                {project.title}
              </h2>
              {project.clientOrChannel && (
                <p className="text-sm font-display text-[#FF9B24] mt-1 font-semibold">
                  Channel / Client: {project.clientOrChannel}
                </p>
              )}
            </div>

            {/* Video switch button if both local and drive exist */}
            {project.mediaType === 'video' && hasLocalVideo && hasDriveVideo && (
              <div className="flex items-center gap-2 bg-[#121216] p-1 rounded-lg border border-[#261a1a] text-xs font-mono">
                <button
                  onClick={() => setVideoMode('local')}
                  className={`px-3 py-1 rounded ${videoMode === 'local' ? 'bg-[#FF2020] text-white' : 'text-gray-400'}`}
                >
                  Local High-Res
                </button>
                <button
                  onClick={() => setVideoMode('drive')}
                  className={`px-3 py-1 rounded ${videoMode === 'drive' ? 'bg-[#FF2020] text-white' : 'text-gray-400'}`}
                >
                  Drive Stream
                </button>
              </div>
            )}
          </div>

          <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
            {project.description}
          </p>

          {/* Credits Box */}
          {project.credits && (
            <div className="p-4 rounded-xl bg-[#121216] border border-[#261a1a] flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-[#FF5A00] shrink-0" />
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold block">
                  PRODUCTION CREDITS
                </span>
                <span className="text-xs text-white font-medium">
                  {project.credits}
                </span>
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Tag className="w-4 h-4 text-gray-500 mr-1" />
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#161214] border border-[#261a1a] text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
