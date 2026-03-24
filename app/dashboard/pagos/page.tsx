"use client"

import { useEffect, useState } from "react"
import PaymentForm from "@/modules/payments/components/PaymentForm"
import PaymentsList from "@/modules/payments/components/PaymentsList"
import { usePayments } from "@/modules/payments/hooks/usePayments"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Payment } from "@/modules/payments/types/payment.type"

export default function PagosPage() {
  const residentId = "30402c06-1bdf-4d6c-b97a-a0d5a32cad19"

  const [isOpen, setIsOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  const {
    payments,
    fetchPayments,
    createPayment,
    removePayment,
    updatePayment,
  } = usePayments()

  useEffect(() => {
    fetchPayments(residentId)
  }, [residentId])

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Pagos
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Gestiona los pagos de los residentes
          </p>
        </div>

        {/* BOTÓN */}
        <button
          onClick={() => {
            setSelectedPayment(null)
            setIsOpen(true)
          }}
          className="
            px-4 py-2 rounded-lg
            bg-white/10 hover:bg-white/20
            text-white border border-white/10
            backdrop-blur-lg
            transition-all
          "
        >
          Registrar Pago
        </button>
      </div>

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="
            bg-black/60 backdrop-blur-xl
            border border-white/10
            text-white
          "
        >
          <DialogHeader>
            <DialogTitle>
              {selectedPayment ? "Editar Pago" : "Registrar Pago"}
            </DialogTitle>
          </DialogHeader>

          <PaymentForm
             residentId={residentId}
             createPayment={createPayment}
             updatePayment={updatePayment}
             paymentToEdit={selectedPayment}
             onEditCancel={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* TABLA */}
      <PaymentsList
        residentId={residentId}
        payments={payments}
        fetchPayments={fetchPayments}
        removePayment={removePayment}
        onEdit={(payment) => {
          setSelectedPayment(payment)
          setIsOpen(true)
        }}
      />

    </div>
  )
}