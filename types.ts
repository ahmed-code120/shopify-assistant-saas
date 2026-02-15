
export enum SubscriptionPlan {
  FREE = 'Free',
  STARTER = 'Starter',
  GROWTH = 'Growth',
  PRO = 'Pro'
}

export interface User {
  id: string;
  email: string;
  plan: SubscriptionPlan;
  creditsRemaining: number;
  totalCredits: number;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface GenerationResult {
  headline: string;
  description: string;
  bullet_points: string[];
  seo_title: string;
  meta_description: string;
  cta_line: string;
}

export interface GenerationRecord {
  id: string;
  product_url: string;
  content: GenerationResult;
  language: string;
  tone: string;
  created_at: string;
  status: 'completed' | 'pending' | 'failed' | 'archived';
}

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}
