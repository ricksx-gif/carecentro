import { PlanType, PlanFeatures, Subscription } from '../types/subscription.types';

// 🔥 Configuración central de planes (SOURCE OF TRUTH)
const PLAN_CONFIG: Record<PlanType, PlanFeatures> = {
  FREE: {
    maxResidents: 5,
    pdfReports: false,
    advancedMetrics: false,
    multiTenant: false,
  },
  BASIC: {
    maxResidents: 20,
    pdfReports: true,
    advancedMetrics: false,
    multiTenant: false,
  },
  PRO: {
    maxResidents: Infinity,
    pdfReports: true,
    advancedMetrics: true,
    multiTenant: true,
  },
};

export const subscriptionService = {
  // 🔥 En el futuro esto vendrá de Supabase
  async getUserSubscription(userId: string): Promise<Subscription> {
    // ⚠️ MOCK TEMPORAL
    const mockPlan: PlanType = 'FREE';

    const features = PLAN_CONFIG[mockPlan];

    return {
      userId,
      plan: mockPlan,
      features,
    };
  },
};