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
          {/* ACCIONES */}
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" 
                  className="p-2 rounded-md
                        text-white/60 hover:text-white
                        hover:bg-white/10
                        transition
                      ">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end"
            className="  bg-black/60 backdrop-blur-xl
                         border border-white/10
                         text-white
                    ">
            
              <DropdownMenuItem 
              onClick={() => onEdit(resident)}
              className="
                       cursor-pointer
                        text-white/70
                        hover:text-white
                        hover:bg-white/10
                        focus:bg-white/10
                        data-[highlighted]:bg-white/10">
                 Editar
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="
                        cursor-pointer
                        text-red-400
                        hover:text-red-300
                        hover:bg-red-500/10
                        focus:bg-red-500/10
                        data-[highlighted]:bg-red-500/10
                      "
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
          {/* 🔥 MODAL Pro */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
            className="bg-black/60 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
              <DialogHeader>
                <DialogTitle>Eliminar residente</DialogTitle>
                <DialogDescription className="text-white/60">
                  ¿Estás seguro de eliminar a{" "}
                  <strong>{resident.name}</strong>? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-end gap-2 mt-4">
                <Button 
                className="
                    bg-white/5
                    hover:bg-white/10
                    text-white
                    border border-white/10
                    backdrop-blur-lg
                    focus:outline-none focus:ring-0
                  "
                variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>

                <Button 
                className="
                  bg-red-500/80 hover:bg-red-500
                  text-white
                  focus:outline-none focus:ring-0"
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