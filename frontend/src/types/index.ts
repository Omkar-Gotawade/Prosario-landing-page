export interface WaitlistFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
  product_description: string;
  biggest_outbound_challenge: string;
  monthly_outreach: string;
  beta_feedback: boolean;
  source?: string;
}

export interface WaitlistUser extends WaitlistFormData {
  id: number;
  created_at: string;
}

export interface WaitlistStats {
  total: number;
  today: number;
  this_week: number;
  beta_willing: number;
}

export interface AnalyticsEvent {
  event_type: string;
  session_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
}

export interface AdminToken {
  access_token: string;
  token_type: string;
}

export type NavItem = {
  label: string;
  href: string;
};

export type RoadmapStatus = 'completed' | 'in-progress' | 'planned';

export interface RoadmapItem {
  title: string;
  status: RoadmapStatus;
}

export interface FAQItem {
  question: string;
  answer: string;
}
