export type ProjectCategory = 
  | 'Wedding Films'
  | 'Video Editing'
  | 'Cinematography'
  | 'Photography'
  | 'VFX & Showreels'
  | 'Creative Projects';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  thumbnail: string;
  videoUrl?: string; // Direct video path or stream url
  driveId?: string; // Google Drive ID for embed or view
  driveViewUrl?: string;
  mediaType: 'video' | 'image';
  date: string;
  featured?: boolean;
  credits?: string;
  tags?: string[];
  clientOrChannel?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  badge?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  score?: string;
  year?: string;
  location?: string;
  type: 'degree' | 'diploma' | 'school' | 'certification';
}

export interface SiteProfile {
  name: string;
  titles: string[];
  tagline: string;
  heroBio: string;
  aboutHeading: string;
  aboutBio: string[];
  portraitImage: string;
  applicationPhoto: string;
  resumePdfUrl: string;
  resumeDriveUrl: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    whatsapp: string;
    instagram: string;
    youtube: string;
  };
}
