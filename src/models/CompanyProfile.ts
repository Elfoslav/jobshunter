export type SocialLinks = {
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  github?: string;
};

export type CompanyProfile = {
  id: string;
  name: string;
  email: string;
  description?: string;
  logoUrl?: string;
  location?: string;
  industry?: string;
  teamSize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  socialLinks?: SocialLinks;
  isVerified: boolean;
  isApproved: boolean;
  jobsPosted: string[]; // array of job IDs
  subscriptionPlan?: 'free' | 'pro' | 'enterprise';
  billingCustomerId?: string; // from Stripe or other system
  createdAt: string; // ISO date
  updatedAt: string;
  lastLogin?: string;
};
