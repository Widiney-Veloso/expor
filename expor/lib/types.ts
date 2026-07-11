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
  template: TemplateId | null;
  theme: ThemeColors;
  content: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type TemplateId = "photographer" | "developer" | "nutritionist";

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  dark: string;
};

export type Feature3 = { title: string; text: string };
export type PlanItem = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
};
export type TestimonialItem = {
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
};
export type GalleryItem = {
  title: string;
  category: string;
  image: string;
  description: string;
};

export type PhotographerContent = {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroParagraph: string;
  heroImage: string;
  aboutText: string;
  stats: { number: string; label: string }[];
  philosophy: Feature3[];
  specialties: string[];
  gallery: GalleryItem[];
  plans: PlanItem[];
  testimonials: TestimonialItem[];
  phone: string;
  email: string;
  address: string;
  instagram: string;
  whatsapp: string;
};

export type DeveloperContent = {
  brandName: string;
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroParagraph: string;
  heroImage: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutParagraph: string;
  services: { title: string; description: string }[];
  skills: string[];
  gallery: GalleryItem[];
  plans: PlanItem[];
  testimonials: { name: string; role: string; content: string; rating: number }[];
  ctaTitle: string;
  ctaParagraph: string;
  whatsapp: string;
  instagram: string;
};

export type NutritionistContent = {
  brandName: string;
  heroTitle: string;
  heroHighlight: string;
  heroParagraph: string;
  heroImage: string;
  heroBadgeNumber: string;
  heroBadgeLabel: string;
  aboutParagraph: string;
  aboutCards: Feature3[];
  plans: PlanItem[];
  results: { image: string; title: string; text: string; duration: string }[];
  testimonials: { name: string; image: string; text: string; rating: number }[];
  whatsapp: string;
  instagram: string;
  hours: string[];
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
