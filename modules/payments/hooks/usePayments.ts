"use client"

import { useEffect, useState } from "react"
import { Payment } from "../types/payment.type"
import { handleError } from "@/utils/handleError"
import { toast } from "sonner"

import {
  insertPayment,
  getPaymentsByResident,
  deletePayment,
  updatePayment as updatePaymentService,
} from "../services/payments.service"

export function usePayments(residentId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])

  async function fetchPayments() {
    try {
      setLoading(true)
      setError(null)

      const data = await getPaymentsByResident(residentId)

      setPayments(data || [])
    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!residentId) return
    fetchPayments()
  }, [residentId])

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