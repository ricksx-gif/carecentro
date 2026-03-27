"use client"

import { TableContainer } from "@/shared/components/TableContainer"
import { getColumns } from "./columns"
import { Medication } from "../types/medication.type"

type Props = {
  medications: Medication[]
  loading: boolean
  error: string | null
  fetchMedications: () => void
  onEdit: (med: Medication) => void
  onDelete: (med: Medication) => void
}

export default function MedicationsTable({
  medications,
  loading,
  error,
  fetchMedications,
  onEdit,
  onDelete,
}: Props) {
  const columns = getColumns({ onEdit, onDelete })

  return (
    <TableContainer
      data={medications}
      columns={columns}
      loading={loading}
      error={error}
      onRetry={fetchMedications}
      emptyMessage="No hay medicaciones registradas"
    />
  )
}