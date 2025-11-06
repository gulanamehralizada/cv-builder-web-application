export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  linkedin: string;
  github: string;
  profilePhoto?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  certifications: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certificates: Certificate[];
  languages: Language[];
}