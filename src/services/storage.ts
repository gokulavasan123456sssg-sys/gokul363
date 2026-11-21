import { Project, SiteProfile, SkillCategory, ExperienceItem, EducationItem } from '../types';
import { initialProfile, initialProjects, skillCategories, experiences, educationList } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_VERSION = 'v2_thumbnails';
const STORAGE_KEYS = {
  VERSION: 'gokul_portfolio_storage_version',
  PROFILE: 'gokul_portfolio_profile',
  PROJECTS: 'gokul_portfolio_projects',
  SKILLS: 'gokul_portfolio_skills',
  EXPERIENCES: 'gokul_portfolio_experiences',
  EDUCATION: 'gokul_portfolio_education',
  ADMIN_AUTH: 'gokul_portfolio_admin_auth'
};

export const StorageService = {
  // Check and upgrade version to ensure fresh video thumbnails
  checkUpgrade() {
    const cur = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (cur !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      localStorage.setItem(STORAGE_KEYS.VERSION, STORAGE_VERSION);
    }
  },
  // PROFILE
  async getProfile(): Promise<SiteProfile> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('site_profile').select('*').single();
        if (data && !error) return data.content as SiteProfile;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }
    const cached = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
    return initialProfile;
  },

  async saveProfile(profile: SiteProfile): Promise<boolean> {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('site_profile').upsert({ id: 'main', content: profile });
      } catch (err) {
        console.error('Failed to sync profile to Supabase:', err);
      }
    }
    return true;
  },

  // PROJECTS
  async getProjects(): Promise<Project[]> {
    this.checkUpgrade();
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (data && !error && data.length > 0) return data as Project[];
      } catch (err) {
        console.warn('Supabase projects fetch error, falling back to local storage:', err);
      }
    }
    const cached = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return initialProjects;
  },

  async saveProject(project: Project): Promise<Project[]> {
    const current = await this.getProjects();
    const index = current.findIndex(p => p.id === project.id);
    let updated: Project[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = project;
    } else {
      updated = [project, ...current];
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('projects').upsert(project);
      } catch (err) {
        console.error('Failed to sync project to Supabase:', err);
      }
    }
    return updated;
  },

  async deleteProject(id: string): Promise<Project[]> {
    const current = await this.getProjects();
    const updated = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete project from Supabase:', err);
      }
    }
    return updated;
  },

  async reorderProjects(projects: Project[]): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  // SKILLS
  async getSkills(): Promise<SkillCategory[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.SKILLS);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
    return skillCategories;
  },

  async saveSkills(skills: SkillCategory[]): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  },

  // EXPERIENCES
  async getExperiences(): Promise<ExperienceItem[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
    return experiences;
  },

  async saveExperiences(exps: ExperienceItem[]): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(exps));
  },

  // EDUCATION
  async getEducation(): Promise<EducationItem[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.EDUCATION);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
    return educationList;
  },

  async saveEducation(edu: EducationItem[]): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(edu));
  },

  // Reset to Factory/Original Drive Data
  async resetToOriginal(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
  },

  // AUTH STATE
  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  setAdminAuthenticated(val: boolean): void {
    if (val) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  }
};
