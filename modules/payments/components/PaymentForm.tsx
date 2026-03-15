"use client"

import { useState } from "react"

type PaymentFormProps = {
  residentId: string
  createPayment: any
}

export default function PaymentForm({
  residentId,
  createPayment
}: PaymentFormProps) {

  const [amount, setAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!amount || !paymentDate) {
      alert("Todos los campos son obligatorios")
      return
    }

    try {
      await createPayment({
        resident_id: residentId,
        amount: Number(amount),
        payment_date: paymentDate
      })

      setAmount("")
      setPaymentDate("")

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

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

      <button
        type="submit"
        className="bg-green-600 ml-3 px-4 py-2 text-white rounded"
      >
        Registrar Pago
      </button>

    </form>
  )
}