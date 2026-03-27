"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { DropdownItem } from "@/shared/components/DropdownItem"
import { Medication } from "../types/medication.type"

type GetColumnsProps = {
  onEdit: (med: Medication) => void
  onDelete: (med: Medication) => void
}

export const getColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<Medication>[] => [
  {
    accessorKey: "name",
    header: "Medicamento",
  },
  {
    accessorKey: "dose",
    header: "Dosis",
  },
  {
    accessorKey: "schedule",
    header: "Frecuencia",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const med = row.original
      const [open, setOpen] = useState(false)

      return (
        <>
          <div className="text-right">
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
                <DropdownItem onClick={() => onEdit(med)}>
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
                <DialogTitle>Eliminar medicación</DialogTitle>
                <DialogDescription className="text-white/60">
                  ¿Estás seguro de eliminar{" "}
                  <strong>{med.name}</strong>? Esta acción no se puede deshacer.
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
                    onDelete(med)
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