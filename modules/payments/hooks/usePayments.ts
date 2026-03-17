// Hook del módulo `payments`.
// Maneja el estado de pagos y expone operaciones para consultar, crear y eliminar.
import { useState } from "react"
import { Payment } from "../types/payment.type"
import {
  insertPayment,
  getPaymentsByResident,
  deletePayment,
  updatePayment as updatePaymentService,
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null)

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

  async function updatePayment(paymentId: string, payment: Partial<Payment>) {
    try {
      const updatedData = await updatePaymentService(paymentId, payment)
      if (updatedData && updatedData.length > 0) {
        const updatedPayment = updatedData[0]
        setPayments((prevPayments) =>
          prevPayments.map((p) => (p.id === paymentId ? updatedPayment : p)),
        )
      }
      setIsEditModalOpen(false)
      setCurrentPayment(null)
    } catch (error) {
      console.error("Error updating payment in hook:", error)
    }
  }

  const handleOpenEditModal = (payment: Payment) => {
    setCurrentPayment(payment)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setCurrentPayment(null)
    setIsEditModalOpen(false)
  }

  return {
    payments,
    isEditModalOpen,
    currentPayment,
    fetchPayments,
    createPayment,
    removePayment,
    updatePayment,
    handleOpenEditModal,
    handleCloseEditModal,
  }
}