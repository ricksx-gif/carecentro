"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { toast } from "sonner" // 🔥 toast moderno

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Resident } from "../types/resident.type"
import { deleteResident } from "../services/residents.service"

type GetColumnsProps = {
  onEdit: (resident: Resident) => void
  fetchResidents: () => void
}

export const getColumns = ({
  onEdit,
  fetchResidents,
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

      const handleDelete = async () => {
        try {
          await deleteResident(resident.id)
          fetchResidents()
          setOpen(false)

          // 🔥 SUCCESS TOAST
          toast.success("Residente eliminado correctamente")

        } catch (error) {
          console.error("Error eliminando residente:", error)

          // 🔥 ERROR TOAST
          toast.error("No se pudo eliminar el residente")
        }
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-all">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end"
            className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 text-white shadow-xl">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>

              <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 text-white cursor-pointer">
                 Editar
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="hover:bg-red-500/20 focus:bg-red-500/20 text-red-400 cursor-pointer"
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
            className="bg-black/60 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
              <DialogHeader>
                <DialogTitle>Eliminar residente</DialogTitle>
                <DialogDescription className="text-white/40">
                  ¿Estás seguro de eliminar a{" "}
                  <strong>{resident.name}</strong>? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-end gap-2">
                <Button 
                className="
                    bg-white/5
                    hover:bg-white/10
                    text-white
                    border border-white/10
                    backdrop-blur-lg
                    transition-all

                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:outline-none

                    data-[state=open]:bg-white/10
                  "
                variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>

                <Button 
                className="bg-red-500/80 hover:bg-red-500 text-white shadow-lg transition-all"
                variant="destructive" onClick={handleDelete}>
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