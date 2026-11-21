import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { FilmGrain } from './components/common/FilmGrain';
import { ParticleCanvas } from './components/common/ParticleCanvas';
import { CustomCursor } from './components/common/CustomCursor';
import { HeroIntro } from './components/hero/HeroIntro';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { PortfolioGallery } from './components/portfolio/PortfolioGallery';
import { VfxShowreelSection } from './components/vfx/VfxShowreelSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { EducationSection } from './components/education/EducationSection';
import { ResumeSection } from './components/resume/ResumeSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { SiteProfile, Project, SkillCategory, ExperienceItem, EducationItem } from './types';
import { StorageService } from './services/storage';

export function App() {
  const [profile, setProfile] = useState<SiteProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  
  // Admin CMS Modal / Route state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(
    StorageService.isAdminAuthenticated()
  );

  useEffect(() => {
    // Check if URL is /admin or #admin
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    // Load dynamic data from StorageService (Supabase or local sync)
    async function loadData() {
      const p = await StorageService.getProfile();
      const proj = await StorageService.getProjects();
      const sk = await StorageService.getSkills();
      const exp = await StorageService.getExperiences();
      const edu = await StorageService.getEducation();

      setProfile(p);
      setProjects(proj);
      setSkills(sk);
      setExperiences(exp);
      setEducation(edu);
    }
    loadData();
  }, []);

  const handleAdminSuccess = () => {
    StorageService.setAdminAuthenticated(true);
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    StorageService.setAdminAuthenticated(false);
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
  };

  if (!profile) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center text-white font-cinema tracking-widest text-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#FF2020] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#FF5A00] animate-pulse">INITIALIZING CINEMATIC EXPERIENCE...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#FF2020] selection:text-white">
      {/* Visual Ambiance Overlays */}
      <FilmGrain />
      <ParticleCanvas />
      <CustomCursor />

      {/* Sticky Cinematic Navbar */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)}
        resumeUrl={profile.resumePdfUrl}
      />

      {/* 01 – Cinematic Hero Opening / Walking Hero */}
      <HeroIntro 
        profile={profile} 
        onResumeClick={() => {
          const el = document.getElementById('resume');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 02 – About Me */}
      <AboutSection profile={profile} />

      {/* 03 – My Skills */}
      <SkillsSection categories={skills} />

      {/* 04 & 05 – Selected Works & Project Portfolio Gallery */}
      <PortfolioGallery projects={projects} />

      {/* 08 – VFX & 3D Showreel */}
      <VfxShowreelSection />

      {/* 09 – Experience */}
      <ExperienceSection experiences={experiences} />

      {/* 10 – Education */}
      <EducationSection education={education} />

      {/* 11 – Resume Download */}
      <ResumeSection profile={profile} />

      {/* 12 – Contact */}
      <ContactSection profile={profile} />

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin Interface (Protected by passkey) */}
      {isAdminOpen && (
        <>
          {isAdminAuthenticated ? (
            <AdminDashboard
              profile={profile}
              projects={projects}
              skills={skills}
              onUpdateProfile={setProfile}
              onUpdateProjects={setProjects}
              onUpdateSkills={setSkills}
              onClose={() => setIsAdminOpen(false)}
              onLogout={handleAdminLogout}
            />
          ) : (
            <AdminLogin
              onSuccess={handleAdminSuccess}
              onClose={() => setIsAdminOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
