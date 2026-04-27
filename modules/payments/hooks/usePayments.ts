"use client"

import { useEffect, useState } from "react"
import { Payment } from "../types/payment.type"
import { handleError } from "@/utils/handleError"
import { toast } from "sonner"
import { isResidentPending } from "@/modules/payments/utils/payment.utils"
import { supabase } from "@/lib/supabase"

import {
  insertPayment,
  getPaymentsByResident,
  getAllPayments,
  deletePayment,
  updatePayment as updatePaymentService,
} from "../services/payments.service"

type UsePaymentsParams = {
  residentId?: string
  status?: string
}
export function usePayments({ residentId, status}: UsePaymentsParams) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])

  async function fetchPayments() {
    try {
      setLoading(true)
      setError(null)
      
      let data: Payment[]= residentId
        ? (await getPaymentsByResident(residentId)) || []
        : (await getAllPayments()) || []


      // Filtro Inteligente
      if (status === "pending") {
        // traer residentes 
      const { data: residents } = await supabase
        .from("residents")
        .select("id")
      
      const pendingResidentIds = (residents || [])
        .filter((r) => isResidentPending(r, data || []))
        .map((r) => r.id)

        // filtrar pagos Solo de residentes pendientes 
      data = (data || []).filter((p) =>
        pendingResidentIds.includes(p.resident_id)
    )
  }


      setPayments(data || [])

    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [residentId ?? null, status ?? null])

  async function createPayment(
    payment: Omit<Payment, "id" | "created_at">
  ) {
    try {
      await insertPayment(payment)

      toast.success("Pago registrado")

      await fetchPayments()
    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)

      toast.error(parsedError.message)
    }
  }

  async function editPayment(
    paymentId: string,
    payment: Partial<Payment>
  ) {
    try {
      await updatePaymentService(paymentId, payment)

      toast.success("Pago actualizado")

      await fetchPayments()
    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)

      toast.error(parsedError.message)
    }
  }

  async function deletePaymentHandler(payment: Payment) {
    try {
      await deletePayment(payment.id)

      toast.success("Pago eliminado")

      await fetchPayments()
    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)

      toast.error(parsedError.message)
    }
  }

  return {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
    editPayment,
    deletePayment: deletePaymentHandler,
  }
}