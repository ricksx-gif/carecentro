import { useEffect, useState } from 'react';
import { subscriptionService } from '../services/subscription.service';
import {
  Subscription,
  FeatureType,
} from '../types/subscription.types';

export const useSubscription = (userId: string) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchSubscription = async () => {
      try {
        setLoading(true);

        const data = await subscriptionService.getUserSubscription(userId);

        setSubscription(data);
      } catch (err) {
        setError('Error loading subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [userId]);

  // 🔥 Control de acceso (FEATURE FLAGS)
  const canAccess = (feature: FeatureType): boolean => {
    if (!subscription) return false;

    switch (feature) {
      case 'PDF_REPORTS':
        return subscription.features.pdfReports;

      case 'ADVANCED_METRICS':
        return subscription.features.advancedMetrics;

      case 'MULTI_TENANT':
        return subscription.features.multiTenant;

      case 'MAX_RESIDENTS':
        return subscription.features.maxResidents > 0;

      default:
        return false;
    }
  };

  // 🔥 Obtener límites (IMPORTANTE PARA ESCALABILIDAD)
  const getLimit = (feature: FeatureType): number | null => {
    if (!subscription) return null;

    switch (feature) {
      case 'MAX_RESIDENTS':
        return subscription.features.maxResidents;

      default:
        return null;
    }
  };

  return {
    subscription,
    loading,
    error,
    canAccess,
    getLimit,
  };
};