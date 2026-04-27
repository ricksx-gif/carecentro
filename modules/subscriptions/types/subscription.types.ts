export type PlanType = 'FREE' | 'BASIC' | 'PRO';

export type FeatureType =
  | 'MAX_RESIDENTS'
  | 'PDF_REPORTS'
  | 'ADVANCED_METRICS'
  | 'MULTI_TENANT';

export interface PlanFeatures {
  maxResidents: number;
  pdfReports: boolean;
  advancedMetrics: boolean;
  multiTenant: boolean;
}

export interface Subscription {
  userId: string;
  plan: PlanType;
  features: PlanFeatures;
}