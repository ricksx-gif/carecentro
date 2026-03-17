// Servicios del módulo `payments`.
// Encapsulan todas las operaciones CRUD contra la tabla `payments` en Supabase.
import { supabase } from "@/lib/supabase"
import { Payment } from "../types/payment.type"

/**
 * Inserta un nuevo pago asociado a un residente.
 *
 * @param payment Datos del pago sin `id` ni `created_at`.
 * @returns filas insertadas o lanza un error en caso de fallo.
 */
export async function insertPayment(payment: Omit<Payment, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("payments")
    .insert([payment])

  if (error) {
    console.error("Error al agregar pago:", error)
    throw error
  }

  return data
}

/**
 * Obtiene todos los pagos de un residente concreto.
 *
 * @param residentId Identificador del residente.
 * @returns lista de pagos o lanza un error.
 */
export async function getPaymentsByResident(residentId: string) {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("resident_id", residentId)

  if (error) {
    console.error("Error al buscar pagos:", error)
    throw error
  }

  return data
}

/**
 * Elimina un pago por su identificador.
 *
 * @param paymentId Identificador del pago a eliminar.
 */
export async function deletePayment(paymentId: string) {
  const { error } = await supabase
    .from("payments")
    .delete()
    .eq("id", paymentId)

  if (error) {
    console.error("Error al eliminar pago:", error)
    throw error
  }
}

/**
 * Actualiza un pago existente.
 *
 * @param paymentId El ID del pago a actualizar.
 * @param payment Los datos a actualizar del pago.
 * @returns Los datos del pago actualizado.
 */
export async function updatePayment(paymentId: string, payment: Partial<Payment>) {
  const { data, error } = await supabase
    .from("payments")
    .update(payment)
    .eq("id", paymentId)
    .select()

  if (error) {
    console.error("Error al actualizar el pago:", error)
    throw error
  }

  return data
}
