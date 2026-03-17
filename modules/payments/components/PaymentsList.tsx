// Lista del módulo `payments`.
// Muestra los pagos de un residente y permite eliminarlos.
"use client"

import { useEffect } from "react"
import { Payment } from "../types/payment.type"

type PaymentsListProps = {
  residentId: string
  payments: Payment[]
  fetchPayments: (residentId: string) => void
  removePayment: (paymentId: string, residentId: string) => void
  handleOpenEditModal: (payment: Payment) => void
}

/**
 * Tabla de pagos por residente.
 *
 * @param residentId Identificador del residente activo.
 * @param payments Lista de pagos a mostrar.
 * @param fetchPayments Función para refrescar los pagos.
 * @param removePayment Elimina un pago concreto.
 * @param handleOpenEditModal Abre el formulario en modo edición.
 */
export default function PaymentsList({
  residentId,
  payments,
  fetchPayments,
  removePayment,
  handleOpenEditModal,
}: PaymentsListProps) {
  // Carga los pagos del residente cuando cambia el id.
  useEffect(() => {
    fetchPayments(residentId)
  }, [residentId, fetchPayments])

  return (
    <div className="mt-6">

      <h2 className="text-lg font-semibold text-black mb-2">
        Historial de Pagos
      </h2>

      <table className="w-full border border-gray-600">
        <thead>
          <tr className="bg-gray-100 text-black text-left">
            <th className="p-2 border border-gray-600">Monto</th>
            <th className="p-2 border border-gray-600">Fecha</th>
            <th className="p-2 border border-gray-600">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                No hay pagos registrados
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td className="p-2 border border-gray-600 text-black">
                  ${payment.amount}
                </td>

                <td className="p-2 border border-gray-600 text-black">
                  {payment.payment_date}
                </td>

                <td className="p-2 border border-gray-600 space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(payment)}
                    className="px-2 py-1 text-blue-600 border border-blue-600 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("¿Eliminar este pago?")) {
                        removePayment(payment.id, residentId)
                      }
                    }}
                    className="px-2 py-1 text-red-600 border border-red-600 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  )
}