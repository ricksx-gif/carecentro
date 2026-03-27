import { SectionCard } from "./SectionCard"
import { LoadingSpinner } from "./LoadingSpinner"
import { EmptyState } from "./EmptyState"
import { ErrorState } from "./ErrorState"
import { DataTable } from "@/components/ui/data-table"

type Props<T> = {
  data: T[]
  columns: any
  loading: boolean
  error: string | null
  onRetry?: () => void
  emptyMessage?: string
}

export function TableContainer<T>({
  data,
  columns,
  loading,
  error,
  onRetry,
  emptyMessage,
}: Props<T>) {
  if (loading) {
    return (
      <SectionCard>
        <LoadingSpinner />
      </SectionCard>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState title={emptyMessage || "No hay datos disponibles"} />
    )
  }

  return (
    <SectionCard>
      <DataTable columns={columns} data={data} />
    </SectionCard>
  )
}