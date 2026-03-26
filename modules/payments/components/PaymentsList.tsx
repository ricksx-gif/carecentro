// Lista del módulo `payments`.
// Muestra los pagos de un residente y permite eliminarlos.
"use client";

import { useEffect, useState } from "react";
import { Payment } from "../types/payment.type";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type PaymentsListProps = {
  residentId: string
  payments: Payment[]
  fetchPayments: (residentId: string) => void
  removePayment: (paymentId: string, residentId: string) => void
  onEdit: (payment: Payment) => void;
  error: string | null; 
}

/**
 * Tabla de pagos por residente.
 *
 * @param residentId Identificador del residente activo.
 * @param payments Lista de pagos a mostrar.
 * @param fetchPayments Función para refrescar los pagos.
 * @param removePayment Elimina un pago concreto.
 * @param handleOpenEditModal Abre el formulario en modo edición.
 */
export default function PaymentsList({
  residentId,
  payments,
  fetchPayments,
  removePayment,
  onEdit,
  error, 
}: PaymentsListProps) {

  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
   


  // Carga los pagos del residente cuando cambia el id.
  useEffect(() => {
    fetchPayments(residentId)
  }, [residentId, fetchPayments]);

  return (
    <div
      className="
       mt-6
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-xl
        p-4
      "
    >
      <h2 className="text-lg font-semibold text-white/80 mb-4 tracking-tight">
        Historial de Pagos
      </h2>

          {error && (    // condicional para mostrar el error
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <table className="w-full">
        {/* HEADER */}
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-white/60 text-sm py-3 text-left">Monto</th>
            <th className="text-white/60 text-sm py-3 text-left">Fecha</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                No hay pagos registrados
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr
                key={payment.id}
                className="
                 border-b border-white/5
                 hover:bg-white/5
                 transition-colors
                 last:border-0"
              >
                <td className="py-3 text-white font-medium ">
                  ${payment.amount}
                </td>

                <td className="py-3 text-white/60">{payment.payment_date}</td>

                {/* ACCIONES */}
                <td className="py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="
                        p-2 rounded-md
                        text-white/60 hover:text-white
                        hover:bg-white/10
                        transition"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="
                        bg-black/60 backdrop-blur-xl
                        border border-white/10
                        text-white"
                    >
                      <DropdownMenuItem
                        onClick={() => onEdit(payment)}
                        className="
                        cursor-pointer
                        text-white/70
                        hover:text-white
                        hover:bg-white/10
                        focus:bg-white/10
                        data-[highlighted]:bg-white/10"
                      >
                        Editar
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedPayment(payment);
                          setOpen(true);
                        }}
                        className="
                        cursor-pointer
                        text-red-400
                        hover:text-red-300
                        hover:bg-red-500/10
                        focus:bg-red-500/10
                        data-[highlighted]:bg-red-500/10"
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 🔥 MODAL PRO */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black/60 backdrop-blur-xl border border-white/10 text-white shadow-2xl">

          <DialogHeader>
            <DialogTitle>Eliminar pago</DialogTitle>
            <DialogDescription className="text-white/60 space-y-1">
              <p>¿Estás seguro de eliminar el pago?</p>
              <p className="text-white/40 text-sm">
               Esta acción no se puede deshacer.
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => setOpen(false)}
              className="
                bg-white/5 hover:bg-white/10
                text-white border border-white/10
                backdrop-blur-lg
                focus:outline-none focus:ring-0
              "
            >
              Cancelar
            </Button>

            <Button
              onClick={() => {
                if (selectedPayment) {
                  removePayment(selectedPayment.id, residentId);
                  setOpen(false);
                }
              }}
              className="
                bg-red-500/80 hover:bg-red-500
                text-white
                focus:outline-none focus:ring-0
              "
            >
              Eliminar
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
