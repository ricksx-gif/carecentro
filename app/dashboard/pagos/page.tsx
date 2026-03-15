"use client"

import { useEffect } from "react"
import PaymentForm from "@/modules/payments/components/PaymentForm"
import PaymentsList from "@/modules/payments/components/PaymentsList"
import { usePayments } from "@/modules/payments/hooks/usePayments"

export default function PagosPage() {

  const residentId = "30402c06-1bdf-4d6c-b97a-a0d5a32cad19"

  const {
    payments,
    fetchPayments,
    createPayment,
    removePayment
  } = usePayments()

  useEffect(() => {
    fetchPayments(residentId)
  }, [residentId])

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-black">
        Pagos
      </h1>

      <PaymentForm
        residentId={residentId}
        createPayment={createPayment}
      />

      <PaymentsList
        residentId={residentId}
        payments={payments}
        fetchPayments={fetchPayments}
        removePayment={removePayment}
      />

    </div>
  )
}