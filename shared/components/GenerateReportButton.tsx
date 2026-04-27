import { useResidentReport } from "@/modules/residents/hooks/useResidentReport";
import { GenerateReportButtonBase } from "./GenerateReportButtonBase";

type Props = {
  residentId: string;
};

export function GenerateReportButton({ residentId }: Props) {
  const { generateReport, loading } = useResidentReport();

  return (
    <GenerateReportButtonBase
      onClick={() => generateReport(residentId)}
      loading={loading}
      label="PDF"
    />
  );
}