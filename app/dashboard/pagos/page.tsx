"use client"

import { useState } from "react"

import PaymentForm from "@/modules/payments/components/PaymentForm"
import PaymentsTable from "@/modules/payments/components/PaymentsTable"
import { usePayments } from "@/modules/payments/hooks/usePayments"
import { Payment } from "@/modules/payments/types/payment.type"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PagosPage() {
  const residentId = "30402c06-1bdf-4d6c-b97a-a0d5a32cad19"

  const {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
    editPayment,
    deletePayment,
  } = usePayments(residentId)

  const [isOpen, setIsOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null)

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
        <DialogContent className="bg-black/60 backdrop-blur-xl border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>
              {selectedPayment ? "Editar Pago" : "Registrar Pago"}
            </DialogTitle>
          </DialogHeader>

          <PaymentForm
            residentId={residentId}
            createPayment={createPayment}
            updatePayment={editPayment}
            paymentToEdit={selectedPayment}
            onEditCancel={() => setSelectedPayment(null)}
          />
        </DialogContent>
      </Dialog>

      {/* TABLA NUEVA */}
      <PaymentsTable
        payments={payments}
        loading={loading}
        error={error}
        fetchPayments={fetchPayments}
        onEdit={(payment) => {
          setSelectedPayment(payment)
          setIsOpen(true)
        }}
        onDelete={deletePayment}
      />

    </div>
  )
}