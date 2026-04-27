"use client";

import { Button } from "@/components/ui/button";
import { Loader2, FileText } from "lucide-react";

type Props = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
};

export function GenerateReportButtonBase({
  onClick,
  loading,
  disabled,
  label = "Exportar PDF",
}: Props) {
  return (
    <Button
      onClick={onClick}
      disabled={loading || disabled}
      variant="outline"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <FileText className="w-4 h-4 mr-2" />
      )}

      {loading ? "Generando..." : label}
    </Button>
  );
}