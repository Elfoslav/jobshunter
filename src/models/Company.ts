// models/Company.ts
export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  github?: string;
}

const enum SubscriptionPlan {
  Free = 'Free',
  Pro = 'Pro',
  Enterprise = 'Enterprise',
}

interface CompanyBase {
  name: string;
  email: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  location?: string;
  industry?: string;
  size?: number;
  socialLinks?: SocialLinks;
  isVerified: boolean;
  techStack?: string[];
  subscriptionPlan?: SubscriptionPlan;
  billingCustomerId?: string; // for Stripe or other service
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

// No id before creation
export interface NewCompany extends CompanyBase {
  // No ID yet
}

// Always has id after creation or when editing
export interface ExistingCompany extends CompanyBase {
  id: string;
}

export type Company = NewCompany | ExistingCompany;