import { useState } from "react";

import { getResidents } from "../services/residents.service";
import { getMedicationsByResident } from "@/modules/medications/services/medications.service";
import { getPaymentsByResident } from "@/modules/payments/services/payments.service";

import { generateResidentReport } from "../services/residentReport.service";

export const useResidentReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async (residentId: string) => {
    try {
      setLoading(true);
      setError(null);

      // 📌 Obtener residente desde lista (porque no existe getById)
      const residents = await getResidents();
      const resident = residents.find((r) => r.id === residentId);

      if (!resident) {
        throw new Error("Residente no encontrado");
      }

      // 📌 Obtener datos por módulo (correcto)
      const medications = await getMedicationsByResident(residentId);
      const payments = await getPaymentsByResident(residentId);

      // 📌 Generar PDF
      generateResidentReport({
        resident,
        medications,
        payments,
      });

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      } else {
        const error = new Error("Ocurrió un error al generar el reporte");
        setError(error.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateReport,
  };
};