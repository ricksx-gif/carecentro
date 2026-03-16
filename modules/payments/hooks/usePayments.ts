// Hook del módulo `payments`.
// Maneja el estado de pagos y expone operaciones para consultar, crear y eliminar.
import { useState } from "react"
import { Payment } from "../types/payment.type"
import {
  insertPayment,
  getPaymentsByResident,
  deletePayment
} from "../services/payments.service"

/**
 * Hook que gestiona la colección de pagos asociados a un residente.
 *
 * @returns objeto con:
 *  - payments: lista de pagos cargados
 *  - fetchPayments: función para obtener pagos de un residente
 *  - createPayment: registra un nuevo pago
 *  - removePayment: elimina un pago y refresca la lista
 */
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