// Admin types for the CMS system

export type AppRole = 'admin' | 'contributor';

export interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  role: AppRole;
  created_at: string;
  updated_at: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface LinkItem {
  name: string;
  href: string;
}

export interface Model {
  id: string;
  model_id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  diameter: string | null;
  specifications: Specification[];
  photos: string[];
  videos: string[];
  ambiti_ideali: LinkItem[];
  applicazioni_compatibili: LinkItem[];
  settori_utilizzo: LinkItem[];
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Intervention {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  location: string | null;
  client_name: string | null;
  model_used: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ModelInsert {
  model_id: string;
  name: string;
  tagline?: string | null;
  description?: string | null;
  diameter?: string | null;
  specifications?: Specification[];
  photos?: string[];
  videos?: string[];
  ambiti_ideali?: LinkItem[];
  applicazioni_compatibili?: LinkItem[];
  settori_utilizzo?: LinkItem[];
}

export interface ModelUpdate extends Partial<ModelInsert> {
  updated_by?: string;
}

export interface InterventionInsert {
  title: string;
  description?: string | null;
  video_url?: string | null;
  thumbnail_url?: string | null;
  location?: string | null;
  client_name?: string | null;
  model_used?: string | null;
}

export interface InterventionUpdate extends Partial<InterventionInsert> {
  updated_by?: string;
}
