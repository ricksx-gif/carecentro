import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import { useResidentReport } from "@/modules/residents/hooks/useResidentReport";
import { useEffect } from "react";

type Props = {
  residentId: string;
};

export function GenerateReportButton({ residentId }: Props) {
  const { generateReport, loading, error } = useResidentReport();

  // 📌 Manejo de error básico (puedes luego usar toast)
  useEffect(() => {
    if (error) {
      console.error(error);
      alert(error); // luego lo cambiamos por toast
    }
  }, [error]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => generateReport(residentId)}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <FileText className="w-4 h-4 mr-2" />
      )}

      {loading ? "Generando..." : "PDF"}
    </Button>
  );
}