export type Profile = {
  id: string;
  username: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  area: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  website: string | null;
  instagram: string | null;
  linkedin: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  profile_id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  category: string | null;
  tags: string[];
  external_url: string | null;
  is_published: boolean;
  position: number;
  created_at: string;
  updated_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  position: number;
};
