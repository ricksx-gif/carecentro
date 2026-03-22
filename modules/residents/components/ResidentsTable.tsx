"use client"

import { DataTable } from "@/components/ui/data-table"
import { Resident } from "../types/resident.type"
import { getColumns } from "./columns"

// Props del componente ResidentsTable
type ResidentsTableProps = {
  residents: Resident[]
  fetchResidents: () => void
  onEdit: (resident: Resident) => void
}

/**
 * Componente "wrapper" que renderiza la tabla de residentes.
 *
 * Su responsabilidad es adaptar el componente genérico `DataTable` para
 * el contexto específico de los residentes. Para ello:
 * 1. Genera la definición de columnas a través de `getColumns`.
 * 2. Pasa los datos (`residents`) y las columnas al `DataTable`.
 *
 * @param residents - Lista de residentes a mostrar.
 * @param fetchResidents - Función para refrescar los datos (se pasa a `getColumns`).
 * @param onEdit - Callback para manejar la edición (se pasa a `getColumns`).
 */
export default function ResidentsTable({
  residents,
  fetchResidents,
  onEdit,
}: ResidentsTableProps) {
  // Genera las columnas pasando las funciones necesarias para las acciones
  const columns = getColumns({ onEdit, fetchResidents })

  return <DataTable columns={columns} data={residents} />
}