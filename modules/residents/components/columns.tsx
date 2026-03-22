"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Resident } from "../types/resident.type"
import { deleteResident } from "../services/residents.service"

/**
 * Props para la función getColumns.
 * Permite pasar manejadores de eventos a las celdas de la tabla.
 */
type GetColumnsProps = {
  onEdit: (resident: Resident) => void
  fetchResidents: () => void
}

/**
 * Genera y devuelve la definición de columnas para la tabla de residentes.
 *
 * Se usa una función en lugar de un array estático para poder inyectar
 * manejadores de eventos (onEdit, fetchResidents) en las acciones de las celdas.
 *
 * @param onEdit - Función a llamar cuando se selecciona la opción "Editar".
 * @param fetchResidents - Función para refrescar la lista de residentes después de una eliminación.
 * @returns Un array de `ColumnDef<Resident>`.
 */
export const getColumns = ({
  onEdit,
  fetchResidents,
}: GetColumnsProps): ColumnDef<Resident>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      // Permite ordenar la tabla por nombre
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "birth_date",
    header: "Fecha de nacimiento",
    cell: ({ row }) => {
      // Formatea la fecha para mejor legibilidad
      const date = new Date(row.original.birth_date)
      return date.toLocaleDateString()
    },
  },
  {
    id: "actions",
    // Renderiza un menú desplegable con acciones para cada fila
    cell: ({ row }) => {
      const resident = row.original

      const handleDelete = async () => {
        const confirmDelete = confirm(
          `¿Estás seguro de que quieres eliminar a ${resident.name}?`
        )
        if (confirmDelete) {
          await deleteResident(resident.id)
          fetchResidents() // Refrescar la lista
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(resident)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]