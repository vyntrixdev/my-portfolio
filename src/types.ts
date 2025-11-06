// src/types.ts
export interface Project {
  trending: any;
  id: string;
  title: string;
  description?: string;
  image_url?: string | null;
  tags?: string | string[];
  demo_url?: string | null;
  github_url?: string | null;
  gradient?: string | null;
  stats?: Record<string, unknown> | null;
  featured?: boolean;
  created_at?: string;
}
export interface User {
  id: string;
  name: string;
  nickname: string;
  github_url?: string | null;
  linkedin_url?: string | null;
  facebook_url?: string | null;
  email?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Hero {
  id: string;
  name: string;
  job_role: string;
  description: string;
  avatar_url: string;
  experience: number;
  projects: number;
  clients: number;
}

export interface UploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
}