"use client";

import { Button } from "@/components/ui/button";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";

import { useResidentsReport } from "@/modules/residents/hooks/useResidentsReport";

export function GenerateAllResidentsReportButton() {
  const { loading, generateReport } = useResidentsReport();

  const handleClick = async () => {
    try {
      await generateReport();

      toast.success("Reporte generado correctamente");
    } catch (error) {
      toast.error("Error al generar el reporte");
    }
  };

  return (
    <Button onClick={handleClick} disabled={loading} variant="outline">
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <FileText className="w-4 h-4 mr-2" />
      )}

      {loading ? "Generando..." : "Exportar PDF"}
    </Button>
  );
}