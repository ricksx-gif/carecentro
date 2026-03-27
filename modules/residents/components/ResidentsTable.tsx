"use client"
import { Resident } from "../types/resident.type";
import { getColumns } from "./columns";
import { TableContainer } from "@/shared/components/TableContainer";
import { useResidents } from "../hooks/useResidents";

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
  error,
}: ResidentsTableProps) {

  const { deleteResident } = useResidents()

  const columns = getColumns({
    onEdit,
    onDelete: deleteResident,
  });
  
  return (
    <TableContainer
      data={residents}
      columns={columns}
      loading={loading}
      error={error}
      onRetry={fetchResidents}
      emptyMessage="No hay residentes registrados"
    />
  );
}