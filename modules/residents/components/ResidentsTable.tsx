"use client"

import { DataTable } from "@/components/ui/data-table";
import { Resident } from "../types/resident.type";
import { getColumns } from "./columns";
import { LoadingTable } from '@/shared/components/LoadingTable';
import { Alert, AlertDescription } from "@/components/ui/alert"

type ResidentsTableProps = {
  residents: Resident[];
  fetchResidents: () => void;
  onEdit: (resident: Resident) => void;
  loading: boolean;
  error: string | null;
};

export default function ResidentsTable({
  residents,
  fetchResidents,
  onEdit,
  loading,
  error, // 🔥 IMPORTANTE: ahora sí lo usamos
}: ResidentsTableProps) {

  const columns = getColumns({ onEdit, fetchResidents });

  // 🔄 LOADING
  if (loading) {
    return <LoadingTable />;
  }

  // ❌ ERROR UI
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  // ✅ DATA 
  return (
    <div className="bg-white/5 transition-colors backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
  <DataTable columns={columns} data={residents} />
    </div>
  );
}