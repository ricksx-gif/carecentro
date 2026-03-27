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
import { Payment } from "../types/payment.type"

type GetColumnsProps = {
  onEdit: (payment: Payment) => void
  onDelete: (payment: Payment) => void
}

export const getColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<Payment>[] => [
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const payment = row.original
      return `$${payment.amount}`
    },
  },
  {
    accessorKey: "payment_date",
    header: "Fecha",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
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
                <DropdownItem onClick={() => onEdit(payment)}>
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
                <DialogTitle>Eliminar pago</DialogTitle>
                <DialogDescription className="text-white/60">
                  ¿Estás seguro de eliminar este pago? Esta acción no se puede deshacer.
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
                    onDelete(payment)
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