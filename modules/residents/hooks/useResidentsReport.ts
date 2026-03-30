"use client";

import { useState } from "react";

import { getResidents } from "../services/residents.service";
import { generateResidentsReport } from "../services/residentsReport.service";

export function useResidentsReport() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async () => {
    try {
      setLoading(true);
      setError(null);

      // 📌 Obtener residentes desde service real
      const residents = await getResidents();

      // 📌 Generar PDF (el service ya descarga)
      generateResidentsReport(residents);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err; // 🔥 IMPORTANTE para toast
      } else {
        const error = new Error("Error al generar el reporte");
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
}