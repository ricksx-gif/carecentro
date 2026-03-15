import { useState } from "react"
import { Payment } from "../types/payment.type"
import {
  insertPayment,
  getPaymentsByResident,
  deletePayment
} from "../services/payments.service"

export function usePayments() {

  const [payments, setPayments] = useState<Payment[]>([])

  async function fetchPayments(residentId: string) {
    try {
      const data = await getPaymentsByResident(residentId)
      setPayments(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  async function createPayment(payment: Omit<Payment, "id" | "created_at">) {
    try {
      await insertPayment(payment)
      await fetchPayments(payment.resident_id)
    } catch (error) {
      console.error(error)
    }
  }

  async function removePayment(paymentId: string, residentId: string) {
    try {
      await deletePayment(paymentId)
      await fetchPayments(residentId)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    payments,
    fetchPayments,
    createPayment,
    removePayment
  }
}