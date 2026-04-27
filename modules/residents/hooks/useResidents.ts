"use client";
import { useEffect, useState } from "react";
import { Resident } from "../types/resident.type";
import {
  getResidents,
  deleteResident as deleteResidentService,
} from "../services/residents.service";
import { handleError } from "@/utils/handleError";
import { toast } from "sonner";
import { useSubscription } from "@/modules/subscriptions/hooks/useSubscription";

export function useResidents(userId: string) {
  // 🔥 Ahora también usamos loading de subscription
  const { getLimit, loading: subscriptionLoading } = useSubscription(userId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);

  async function fetchResidents() {
    try {
      setLoading(true);
      setError(null);

      const data = await getResidents();
      setResidents(data);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResidents();
  }, []);

  // 🔥 FIX COMPLETO
  const canCreateResident = (): boolean => {
    // Mientras carga la suscripción, no bloqueamos
    if (subscriptionLoading) return true;

    const maxResidents = getLimit("MAX_RESIDENTS");

    // Si no hay límite definido, no bloqueamos
    if (maxResidents === null) return true;

    return residents.length < maxResidents;
  };

  const deleteResident = async (resident: Resident) => {
    try {
      setError(null);
      await deleteResidentService(resident.id);

      toast.success("Residente eliminado correctamente");

      await fetchResidents();
    } catch (err) {
      const parsedError = handleError(err);
      setError(parsedError.message);
      toast.error(parsedError.message);
    }
  };

  return {
    residents,
    loading,
    error,
    fetchResidents,
    deleteResident,
    canCreateResident,
  };
}