import { toast } from "sonner";
import { useResidentsReport } from "@/modules/residents/hooks/useResidentsReport";
import { GenerateReportButtonBase } from "./GenerateReportButtonBase";

export function GenerateAllResidentsReportButton() {
  const { loading, generateReport } = useResidentsReport();

  const handleClick = async () => {
    try {
      await generateReport();
      toast.success("Reporte generado correctamente");
    } catch {
      toast.error("Error al generar el reporte");
    }
  };

  return (
    <GenerateReportButtonBase
      onClick={handleClick}
      loading={loading}
    />
  );
}