"use client"

import { TableContainer } from "@/shared/components/TableContainer"
import { getColumns } from "./columns"
import { Payment } from "../types/payment.type"

type Props = {
  payments: Payment[]
  loading: boolean
  error: string | null
  fetchPayments: () => void
  onEdit: (payment: Payment) => void
  onDelete: (payment: Payment) => void
  onExport: (payments: Payment) => void
}

export default function PaymentsTable({
  payments,
  loading,
  error,
  fetchPayments,
  onEdit,
  onDelete,
  onExport,
}: Props) {
  const columns = getColumns({ onEdit, onDelete, onExport,})

  return (
    <TableContainer
      data={payments}
      columns={columns}
      loading={loading}
      error={error}
      onRetry={fetchPayments}
      emptyMessage="No hay pagos registrados" 
    />
  )
}