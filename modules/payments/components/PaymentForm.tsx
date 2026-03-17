// Formulario del módulo `payments`.
// Permite registrar un nuevo pago asociado a un residente.
"use client"

import { useState, useEffect } from "react"
import { Payment } from "../types/payment.type"

type PaymentFormProps = {
  residentId: string
  createPayment: (payment: { resident_id: string; amount: number; payment_date: string }) => void
  paymentToEdit?: Payment | null
  updatePayment?: (id: string, payment: Partial<Payment>) => void
  onEditCancel?: () => void
}

/**
 * Formulario para registrar o editar pagos.
 *
 * @param residentId ID del residente.
 * @param createPayment Función para crear un pago.
 * @param paymentToEdit Opcional. Objeto de pago para modo edición.
 * @param updatePayment Opcional. Función para actualizar un pago.
 * @param onEditCancel Opcional. Función para cancelar la edición.
 */
export default function PaymentForm({
  residentId,
  createPayment,
  paymentToEdit,
  updatePayment,
  onEditCancel,
}: PaymentFormProps) {
  const [amount, setAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const isEditMode = !!paymentToEdit && !!updatePayment

  useEffect(() => {
    if (isEditMode) {
      setAmount(paymentToEdit.amount.toString())
      setPaymentDate(new Date(paymentToEdit.payment_date).toISOString().split("T")[0])
    } else {
      setAmount("")
      setPaymentDate("")
    }
  }, [paymentToEdit, isEditMode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!amount || !paymentDate) {
      alert("Todos los campos son obligatorios")
      return
    }

    const paymentData = {
      amount: Number(amount),
      payment_date: paymentDate,
    }

    try {
      if (isEditMode) {
        await updatePayment(paymentToEdit.id, paymentData)
        onEditCancel?.()
      } else {
        await createPayment({ ...paymentData, resident_id: residentId })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold text-black mb-2">
        {isEditMode ? "Editar Pago" : "Registrar Nuevo Pago"}
      </h2>
      <div>
        <label className="block text-sm font-medium text-black">
          Monto
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-black bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Fecha de pago
        </label>
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-black bg-white"
        />
      </div>

      <div className="flex justify-end space-x-3">
        {isEditMode && (
          <button
            type="button"
            onClick={onEditCancel}
            className="bg-gray-500 px-4 py-2 text-white rounded"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-green-600 px-4 py-2 text-white rounded"
        >
          {isEditMode ? "Actualizar Pago" : "Registrar Pago"}
        </button>
      </div>
    </form>
  )
}