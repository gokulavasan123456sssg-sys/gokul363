import React, { useState } from 'react';
import { 
  X, Plus, Trash2, Edit3, Save, Upload, Film, Image as ImageIcon, 
  User, Check, AlertCircle, RefreshCw, Layers, Phone, FileText, 
  Settings as SettingsIcon, LogOut, ExternalLink, Play, Eye
} from 'lucide-react';
import { Project, SiteProfile, SkillCategory, ProjectCategory } from '../../types';
import { StorageService } from '../../services/storage';
import { isSupabaseConfigured } from '../../lib/supabase';
import { CinematicAudio } from '../../utils/audio';

interface AdminDashboardProps {
  profile: SiteProfile;
  projects: Project[];
  skills: SkillCategory[];
  onUpdateProfile: (p: SiteProfile) => void;
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateSkills: (skills: SkillCategory[]) => void;
  onClose: () => void;
  onLogout: () => void;
}

type TabType = 
  | 'Overview' 
  | 'Projects' 
  | 'Images' 
  | 'Videos' 
  | 'Categories' 
  | 'Profile' 
  | 'Skills' 
  | 'Resume' 
  | 'Contact' 
  | 'Settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  profile,
  projects,
  skills,
  onUpdateProfile,
  onUpdateProjects,
  onUpdateSkills,
  onClose,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [alertMsg, setAlertMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<SiteProfile>({ ...profile });

  // Project Editor State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // New Project Template
  const [newProjectForm, setNewProjectForm] = useState<Partial<Project>>({
    title: '',
    category: 'Video Editing',
    description: '',
    thumbnail: '/media/photos/suchindram_temple_1.jpg',
    videoUrl: '',
    driveViewUrl: '',
    mediaType: 'video',
    date: '2026',
    featured: false,
    credits: 'Gokulavasan'
  });

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setAlertMsg({ text, type });
    CinematicAudio.playClick();
    setTimeout(() => setAlertMsg(null), 3500);
  };

  // Save Profile Changes
  const handleSaveProfile = async () => {
    await StorageService.saveProfile(profileForm);
    onUpdateProfile(profileForm);
    notify('Profile details successfully updated and saved!');
  };

  // Add Project
  const handleAddProject = async () => {
    if (!newProjectForm.title) {
      notify('Project title is required!', 'error');
      return;
    }
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      title: newProjectForm.title || 'Untitled Project',
      category: (newProjectForm.category as ProjectCategory) || 'Video Editing',
      description: newProjectForm.description || '',
      thumbnail: newProjectForm.thumbnail || '/media/photos/suchindram_temple_1.jpg',
      videoUrl: newProjectForm.videoUrl,
      driveViewUrl: newProjectForm.driveViewUrl,
      mediaType: newProjectForm.mediaType || 'video',
      date: newProjectForm.date || '2026',
      featured: Boolean(newProjectForm.featured),
      credits: newProjectForm.credits
    };

    const updated = await StorageService.saveProject(newProj);
    onUpdateProjects(updated);
    setIsAddingProject(false);
    setNewProjectForm({
      title: '',
      category: 'Video Editing',
      description: '',
      thumbnail: '/media/photos/suchindram_temple_1.jpg',
      videoUrl: '',
      driveViewUrl: '',
      mediaType: 'video',
      date: '2026',
      featured: false,
      credits: 'Gokulavasan'
    });
    notify(`Project "${newProj.title}" created successfully!`);
  };

  // Edit / Update Project
  const handleUpdateProject = async () => {
    if (!editingProject) return;
    const updated = await StorageService.saveProject(editingProject);
    onUpdateProjects(updated);
    setEditingProject(null);
    notify(`Project "${editingProject.title}" saved!`);
  };

  // Delete Project
  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    const updated = await StorageService.deleteProject(id);
    onUpdateProjects(updated);
    notify(`Project deleted.`);
  };

  // Upload/Replace Media Helper (file input -> data URL)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: 'portrait' | 'appPhoto' | 'projectThumb') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (targetField === 'portrait') {
        setProfileForm(prev => ({ ...prev, portraitImage: result }));
        notify('New portrait photo loaded. Click "Save Profile" to apply!');
      } else if (targetField === 'appPhoto') {
        setProfileForm(prev => ({ ...prev, applicationPhoto: result }));
        notify('Application photo loaded. Click "Save Profile" to apply!');
      } else if (targetField === 'projectThumb') {
        if (editingProject) {
          setEditingProject(prev => prev ? ({ ...prev, thumbnail: result }) : null);
        } else {
          setNewProjectForm(prev => ({ ...prev, thumbnail: result }));
        }
        notify('Thumbnail image loaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset to Factory defaults
  const handleResetToDriveDefaults = async () => {
    if (!window.confirm('Reset all projects, profile, and media to the original Google Drive configuration?')) return;
    await StorageService.resetToOriginal();
    window.location.reload();
  };

  const navTabs: { id: TabType; icon: React.ReactNode }[] = [
    { id: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { id: 'Projects', icon: <Film className="w-4 h-4" /> },
    { id: 'Images', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'Videos', icon: <Play className="w-4 h-4" /> },
    { id: 'Categories', icon: <Layers className="w-4 h-4" /> },
    { id: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'Skills', icon: <Check className="w-4 h-4" /> },
    { id: 'Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', icon: <Phone className="w-4 h-4" /> },
    { id: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex bg-[#050505] text-white overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0b0b0d] border-r border-[#261a1a] flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-[#261a1a]">
            <span className="font-cinema font-extrabold text-lg tracking-widest text-white uppercase block">
              GOKULAVASAN
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#FF5A00] uppercase font-bold block">
              CMS ADMIN PANEL
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    CinematicAudio.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#B50016] to-[#FF5A00] text-white shadow-[0_0_15px_rgba(255,32,32,0.4)]'
                      : 'text-gray-400 hover:text-white hover:bg-[#121216]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.id}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: View Live Site & Logout */}
        <div className="p-4 border-t border-[#261a1a] space-y-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#121216] border border-[#261a1a] text-xs font-mono text-gray-300 hover:text-white hover:border-[#FF5A00] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span>VIEW LIVE SITE</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-950/40 border border-red-900/60 text-xs font-mono text-red-300 hover:bg-red-900/60 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#050505]">
        
        {/* Top Header Bar */}
        <header className="h-16 px-8 border-b border-[#261a1a] flex items-center justify-between bg-[#0b0b0d]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="font-cinema font-bold text-xl uppercase tracking-wider text-white">
              {activeTab}
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#121216] border border-gray-800 text-gray-400">
              {projects.length} Total Projects
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#121216] border border-gray-800 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Alert Notification Toast */}
        {alertMsg && (
          <div className={`px-6 py-2.5 text-xs font-mono font-bold flex items-center justify-between animate-fade-in ${
            alertMsg.type === 'success' ? 'bg-[#FF5A00] text-black' : 'bg-red-600 text-white'
          }`}>
            <span>{alertMsg.text}</span>
            <button onClick={() => setAlertMsg(null)}>✕</button>
          </div>
        )}

        {/* Scrollable Tab Views */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === 'Overview' && (
            <div className="space-y-8 max-w-6xl">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a]">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF5A00] uppercase font-bold block mb-1">
                    TOTAL PROJECTS
                  </span>
                  <p className="font-cinema font-extrabold text-4xl text-white">{projects.length}</p>
                  <p className="text-xs text-gray-400 mt-2">Active in portfolio</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a]">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF2020] uppercase font-bold block mb-1">
                    VIDEOS / REELS
                  </span>
                  <p className="font-cinema font-extrabold text-4xl text-white">
                    {projects.filter(p => p.mediaType === 'video').length}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Wedding, Edit & VFX</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a]">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF9B24] uppercase font-bold block mb-1">
                    PHOTOGRAPHS
                  </span>
                  <p className="font-cinema font-extrabold text-4xl text-white">
                    {projects.filter(p => p.mediaType === 'image').length}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Heritage & Landscape</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a]">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold block mb-1">
                    DATABASE STATUS
                  </span>
                  <p className="font-cinema font-bold text-lg text-white">
                    {isSupabaseConfigured() ? 'Supabase Connected' : 'Local + Offline Sync'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Safe zero-code persistence</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-8 rounded-2xl bg-[#0b0b0d] border border-[#261a1a]">
                <h3 className="font-cinema font-bold text-lg text-white uppercase tracking-wider mb-4">
                  QUICK ACTIONS
                </h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setActiveTab('Projects');
                      setIsAddingProject(true);
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#B50016] to-[#FF5A00] text-white text-xs font-mono font-bold tracking-wider hover:brightness-110"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD NEW PROJECT</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('Profile')}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#121216] border border-[#261a1a] text-gray-300 hover:text-white hover:border-[#FF5A00] text-xs font-mono font-bold"
                  >
                    <Edit3 className="w-4 h-4 text-[#FF5A00]" />
                    <span>EDIT PROFILE BIO & PHOTO</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('Videos')}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#121216] border border-[#261a1a] text-gray-300 hover:text-white hover:border-[#FF2020] text-xs font-mono font-bold"
                  >
                    <Film className="w-4 h-4 text-[#FF2020]" />
                    <span>MANAGE SHOWREELS</span>
                  </button>
                </div>
              </div>

              {/* Media Folder Overview */}
              <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a]">
                <h4 className="font-cinema font-bold text-sm text-[#FF9B24] uppercase tracking-wider mb-2">
                  GOOGLE DRIVE SOURCE INTEGRATION
                </h4>
                <p className="text-xs text-gray-400 font-mono">
                  Connected Source: <code>https://drive.google.com/drive/folders/1ryjI4XRj1CSMRETBAB1zZkC4FvsoGCWm</code>
                </p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-gray-300">
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-gray-800">
                    📁 Profile Image (Fiery Red-Orange Portrait)
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-gray-800">
                    📁 Resume (Original PDF)
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-gray-800">
                    📁 Cinematography (video.mp4)
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-gray-800">
                    📁 Video Editing (Wedding, Koyaka Shorts)
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-gray-800">
                    📁 VFX & 3D (Showreel.mp4, 3D.mp4)
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-gray-800">
                    📁 Photography (Pamban, Kanyakumari, Suchindram)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: PROJECTS ================= */}
          {activeTab === 'Projects' && (
            <div className="space-y-6 max-w-6xl">
              
              {/* Header Action */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-gray-400">
                  Manage, add, reorder, and update project metadata.
                </p>
                <button
                  onClick={() => setIsAddingProject(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#B50016] to-[#FF5A00] text-white text-xs font-mono font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD PROJECT</span>
                </button>
              </div>

              {/* Add Project Modal / Form */}
              {isAddingProject && (
                <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#FF5A00] space-y-4 animate-fade-in shadow-[0_0_30px_rgba(255,90,0,0.2)]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#261a1a]">
                    <h3 className="font-cinema font-bold text-lg text-white uppercase">ADD NEW PROJECT</h3>
                    <button onClick={() => setIsAddingProject(false)} className="text-gray-400 hover:text-white">✕</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">PROJECT TITLE</label>
                      <input
                        type="text"
                        value={newProjectForm.title}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                        placeholder="e.g. Traditional Temple Wedding Cut"
                        className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">CATEGORY</label>
                      <select
                        value={newProjectForm.category}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, category: e.target.value as ProjectCategory })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                      >
                        <option value="Wedding Films">Wedding Films</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Cinematography">Cinematography</option>
                        <option value="Photography">Photography</option>
                        <option value="VFX & Showreels">VFX & Showreels</option>
                        <option value="Creative Projects">Creative Projects</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">DESCRIPTION</label>
                    <textarea
                      rows={2}
                      value={newProjectForm.description}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                      placeholder="Project narrative summary..."
                      className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">
                        THUMBNAIL IMAGE (URL or Upload)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newProjectForm.thumbnail}
                          onChange={(e) => setNewProjectForm({ ...newProjectForm, thumbnail: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                        />
                        <label className="px-3 py-2 rounded-lg bg-[#1a1a24] border border-gray-700 hover:border-[#FF5A00] cursor-pointer text-xs font-mono flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5 text-[#FF5A00]" />
                          <span>Upload</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'projectThumb')} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">
                        VIDEO FILE OR STREAM URL
                      </label>
                      <input
                        type="text"
                        value={newProjectForm.videoUrl}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, videoUrl: e.target.value })}
                        placeholder="/media/videos/... or https://..."
                        className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setIsAddingProject(false)}
                      className="px-4 py-2 rounded-lg bg-[#121216] text-xs font-mono text-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddProject}
                      className="px-5 py-2 rounded-lg bg-[#FF2020] text-white text-xs font-mono font-bold"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              )}

              {/* Projects Table */}
              <div className="rounded-2xl bg-[#0b0b0d] border border-[#261a1a] overflow-hidden">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#121216] text-gray-400 font-mono uppercase text-[10px] tracking-wider border-b border-[#261a1a]">
                    <tr>
                      <th className="py-3 px-4">Thumbnail</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f1a1a]">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-[#121216]/50 transition-colors">
                        <td className="py-2.5 px-4">
                          <img
                            src={proj.thumbnail}
                            alt={proj.title}
                            className="w-12 h-8 rounded object-cover border border-[#261a1a]"
                          />
                        </td>
                        <td className="py-2.5 px-4 font-medium text-white max-w-xs truncate">
                          {proj.title}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-gray-300">
                          <span className="px-2 py-0.5 rounded bg-[#161214] border border-[#261a1a] text-[10px]">
                            {proj.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-gray-400 uppercase text-[10px]">
                          {proj.mediaType}
                        </td>
                        <td className="py-2.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-1.5 rounded bg-[#121216] hover:bg-[#FF5A00] hover:text-black text-gray-300 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="p-1.5 rounded bg-[#121216] hover:bg-red-600 hover:text-white text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Project Modal */}
              {editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                  <div className="relative w-full max-w-2xl rounded-2xl bg-[#0b0b0d] border border-[#FF5A00] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#261a1a]">
                      <h3 className="font-cinema font-bold text-lg text-white uppercase">
                        EDIT: {editingProject.title}
                      </h3>
                      <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-white">✕</button>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">TITLE</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">CATEGORY</label>
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })}
                          className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs"
                        >
                          <option value="Wedding Films">Wedding Films</option>
                          <option value="Video Editing">Video Editing</option>
                          <option value="Cinematography">Cinematography</option>
                          <option value="Photography">Photography</option>
                          <option value="VFX & Showreels">VFX & Showreels</option>
                          <option value="Creative Projects">Creative Projects</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">DATE</label>
                        <input
                          type="text"
                          value={editingProject.date}
                          onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">DESCRIPTION</label>
                      <textarea
                        rows={3}
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">VIDEO URL / FILE</label>
                      <input
                        type="text"
                        value={editingProject.videoUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-lg bg-[#121216] text-xs font-mono text-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateProject}
                        className="px-5 py-2 rounded-lg bg-[#FF5A00] text-black font-bold text-xs font-mono"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 3: IMAGES ================= */}
          {activeTab === 'Images' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-gray-400">
                  All photography items sourced from Google Drive and local cache.
                </p>
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#121216] border border-[#FF5A00] text-white text-xs font-mono font-bold cursor-pointer hover:bg-[#1a1a22]">
                  <Upload className="w-4 h-4 text-[#FF5A00]" />
                  <span>UPLOAD NEW PHOTO</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'projectThumb')} />
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {projects.filter(p => p.mediaType === 'image' || p.category === 'Photography').map((item) => (
                  <div key={item.id} className="rounded-xl bg-[#0b0b0d] border border-[#261a1a] overflow-hidden p-3 group">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black mb-2">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="font-cinema font-bold text-xs text-white truncate">{item.title}</p>
                    <p className="text-[10px] font-mono text-gray-500 mt-1">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: VIDEOS ================= */}
          {activeTab === 'Videos' && (
            <div className="space-y-6 max-w-6xl">
              <p className="text-xs font-mono text-gray-400">
                Manage showreels, wedding videos, and comedy short cuts.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.filter(p => p.mediaType === 'video').map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-[#0b0b0d] border border-[#261a1a] space-y-3">
                    <div className="aspect-video rounded-lg overflow-hidden bg-black relative">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-70" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-8 h-8 text-[#FF5A00]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-cinema font-bold text-sm text-white">{item.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                      <p className="text-[10px] font-mono text-[#FF9B24] mt-1">Source: {item.videoUrl || item.driveViewUrl}</p>
                    </div>
                    <button
                      onClick={() => setEditingProject(item)}
                      className="w-full py-1.5 rounded bg-[#121216] border border-gray-800 hover:border-[#FF5A00] text-xs font-mono text-gray-300"
                    >
                      Configure Video Source
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: CATEGORIES ================= */}
          {activeTab === 'Categories' && (
            <div className="space-y-6 max-w-5xl">
              <p className="text-xs font-mono text-gray-400">
                Portfolio Category Distribution
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  'Wedding Films',
                  'Video Editing',
                  'Cinematography',
                  'Photography',
                  'VFX & Showreels',
                  'Creative Projects'
                ].map((cat) => {
                  const count = projects.filter(p => p.category === cat).length;
                  return (
                    <div key={cat} className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a]">
                      <h4 className="font-cinema font-bold text-base text-white uppercase">{cat}</h4>
                      <p className="font-cinema font-extrabold text-3xl text-[#FF5A00] mt-2">{count}</p>
                      <p className="text-xs text-gray-400 mt-1 font-mono">Assigned Projects</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= TAB 6: PROFILE ================= */}
          {activeTab === 'Profile' && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a] space-y-5">
                <h3 className="font-cinema font-bold text-lg text-white uppercase tracking-wider pb-3 border-b border-[#261a1a]">
                  FILMMAKER PROFILE SETTINGS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">FULL NAME</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">TAGLINE</label>
                    <input
                      type="text"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">HERO PITCH SUMMARY</label>
                  <textarea
                    rows={2}
                    value={profileForm.heroBio}
                    onChange={(e) => setProfileForm({ ...profileForm, heroBio: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">ABOUT HEADING</label>
                  <input
                    type="text"
                    value={profileForm.aboutHeading}
                    onChange={(e) => setProfileForm({ ...profileForm, aboutHeading: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-sans"
                  />
                </div>

                {/* Profile Portrait Uploader */}
                <div className="pt-2">
                  <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-2">
                    PORTRAIT IMAGE (Used in Hero Entrance Walk & About section)
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={profileForm.portraitImage}
                      alt="Portrait"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#FF5A00]"
                    />
                    <label className="px-4 py-2 rounded-lg bg-[#121216] border border-gray-700 hover:border-[#FF5A00] cursor-pointer text-xs font-mono flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#FF5A00]" />
                      <span>Upload New Portrait Photo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'portrait')} />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1f1a1a] flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#B50016] to-[#FF5A00] text-white text-xs font-mono font-bold tracking-wider hover:brightness-110"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE PROFILE CHANGES</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 7: SKILLS ================= */}
          {activeTab === 'Skills' && (
            <div className="space-y-6 max-w-5xl">
              <p className="text-xs font-mono text-gray-400">
                Skills list across Video Editing, Photography, Cinematography, and 3D & VFX.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((cat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#0b0b0d] border border-[#261a1a]">
                    <h4 className="font-cinema font-bold text-sm text-[#FF5A00] uppercase mb-3">
                      {cat.title}
                    </h4>
                    <div className="space-y-2">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="px-3 py-1.5 rounded bg-[#121216] text-xs text-gray-300 font-mono">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 8: RESUME ================= */}
          {activeTab === 'Resume' && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a] space-y-4">
                <h3 className="font-cinema font-bold text-lg text-white uppercase tracking-wider pb-3 border-b border-[#261a1a]">
                  RESUME FILE CONFIGURATION
                </h3>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">
                    LOCAL RESUME PATH / URL
                  </label>
                  <input
                    type="text"
                    value={profileForm.resumePdfUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, resumePdfUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">
                    GOOGLE DRIVE RESUME VIEW URL
                  </label>
                  <input
                    type="text"
                    value={profileForm.resumeDriveUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, resumeDriveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF2020] text-white text-xs font-mono font-bold"
                  >
                    <Save className="w-4 h-4" />
                    <span>UPDATE RESUME LINKS</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 9: CONTACT ================= */}
          {activeTab === 'Contact' && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a] space-y-4">
                <h3 className="font-cinema font-bold text-lg text-white uppercase tracking-wider pb-3 border-b border-[#261a1a]">
                  CONTACT & SOCIAL LINKS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">PHONE NUMBER</label>
                    <input
                      type="text"
                      value={profileForm.contact.phone}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, phone: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={profileForm.contact.email}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">LOCATION</label>
                    <input
                      type="text"
                      value={profileForm.contact.location}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, location: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">WHATSAPP NUMBER</label>
                    <input
                      type="text"
                      value={profileForm.contact.whatsapp}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, whatsapp: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">INSTAGRAM URL</label>
                    <input
                      type="text"
                      value={profileForm.contact.instagram}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, instagram: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-400 font-bold mb-1">YOUTUBE URL</label>
                    <input
                      type="text"
                      value={profileForm.contact.youtube}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        contact: { ...profileForm.contact, youtube: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121216] border border-[#261a1a] text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B50016] to-[#FF5A00] text-white text-xs font-mono font-bold"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE CONTACT DETAILS</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 10: SETTINGS ================= */}
          {activeTab === 'Settings' && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-6 rounded-2xl bg-[#0b0b0d] border border-[#261a1a] space-y-4">
                <h3 className="font-cinema font-bold text-lg text-white uppercase tracking-wider pb-3 border-b border-[#261a1a]">
                  SYSTEM & DATABASE SETTINGS
                </h3>

                <div className="p-4 rounded-xl bg-[#121216] border border-gray-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#FF5A00] font-bold block">
                    SUPABASE DATABASE CONNECTION
                  </span>
                  <p className="text-xs text-gray-300">
                    Status: <span className="font-mono text-white font-bold">{isSupabaseConfigured() ? 'Connected' : 'Offline / LocalStorage Mode (No setup required!)'}</span>
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono">
                    To connect to a live Supabase project, supply <code className="text-[#FF9B24]">VITE_SUPABASE_URL</code> and <code className="text-[#FF9B24]">VITE_SUPABASE_ANON_KEY</code> in your environment or <code className="text-[#FF9B24]">.env</code> file.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1f1a1a]">
                  <span className="text-[10px] font-mono uppercase text-red-400 font-bold block mb-2">
                    FACTORY RESET TO GOOGLE DRIVE MEDIA
                  </span>
                  <p className="text-xs text-gray-400 mb-3">
                    Revert all customizations back to the original Google Drive inventory downloaded at build time.
                  </p>
                  <button
                    onClick={handleResetToDriveDefaults}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs font-mono hover:bg-red-900/60 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>RESET TO ORIGINAL DRIVE INVENTORY</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
