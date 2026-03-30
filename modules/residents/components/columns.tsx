"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GenerateReportButton } from "@/shared/components/GenerateReportButton"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DropdownItem } from "@/shared/components/DropdownItem"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Resident } from "../types/resident.type"

type GetColumnsProps = {
  onEdit: (resident: Resident) => void
  onDelete: (resident: Resident) => void
}

export const getColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<Resident>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
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
      const date = new Date(row.original.birth_date)
      return date.toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const resident = row.original
      const [open, setOpen] = useState(false)

      return (
        <>
          <div className="text-right">
            <GenerateReportButton residentId={resident.id} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-black/60 backdrop-blur-xl border border-white/10 text-white"
              >
                <DropdownItem onClick={() => onEdit(resident)}>
                  Editar
                </DropdownItem>

                <DropdownItem
                  variant="danger"
                  onClick={() => setOpen(true)}
                >
                  Eliminar
                </DropdownItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-black/60 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
              <DialogHeader>
                <DialogTitle>Eliminar residente</DialogTitle>
                <DialogDescription className="text-white/60">
                  ¿Estás seguro de eliminar a{" "}
                  <strong>{resident.name}</strong>? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-lg"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>

                <Button
                  variant="destructive"
                  className="bg-red-500/80 hover:bg-red-500 text-white"
                  onClick={() => {
                    onDelete(resident)
                    setOpen(false)
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]