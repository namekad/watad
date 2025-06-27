import { api } from './api';

export interface ContentSection {
  title: string;
  subtitle?: string;
  description?: string;
  content?: string;
  mission?: string;
  items?: Array<{
    title: string;
    description: string;
  }>;
  email?: string;
  phone?: string;
  address?: string;
}

export interface SiteContent {
  hero: ContentSection;
  about: ContentSection;
  services: ContentSection;
  contact: ContentSection;
}

export const contentService = {
  // Get content by language
  getContent: async (lang: string): Promise<SiteContent> => {
    const { data } = await api.get<SiteContent>(`/content/${lang}`);
    return data;
  },

  // Update content (admin only)
  updateContent: async (lang: string, content: SiteContent): Promise<void> => {
    await api.post(`/content/${lang}`, content);
  },
}; 