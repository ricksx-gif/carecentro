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
  export async function getPaymentsByResident(
    residentId: string,
    centerId: string
) {
  if (!residentId) {
    return []
  }

  const { data, error } = await supabase
    .from("payments")
    .select(`
      *,
      residents!payments_resident_id_fkey (
        id,
        name,
        center_id
      )
    `)
    .eq("resident_id", residentId)
    .eq("center_id", centerId)

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
export async function deletePayment(
  paymentId: string,
  centerId: string
) {
  // 1. Obtener residents del centro
  const { data: resdidents, error: residentsError } = await supabase
   .from("residents")
   .select("id")
   .eq("center_id", centerId)

  if (residentsError) {
    console.error("Error al obtener residentes:", residentsError)
    throw residentsError
  }

  const residentIds = resdidents.map( r => r.id)

  // 2. Eliminar solo si pertenece al centro 
  const { error } = await supabase
    .from("payments")
    .delete()
    .eq("id", paymentId)
    .in("resident_id", residentIds)

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
export async function updatePayment(
  paymentId: string, 
  payment: Partial<Payment>,
  centerId: string
) {
  //1. Obtener residents validos
  const { data: residents, error: residentsError } = await supabase
    .from("residents")
    .select("id")
    .eq("center_id", centerId)
  if (residentsError){
    console.error("Error al obtener residentes:", residentsError)
    throw residentsError
  }

  const residentIds = residents.map(r => r.id)

  //2. Actualizar solo si pertenece al centro
  const { data, error } = await supabase
    .from("payments")
    .update(payment)
    .eq("id", paymentId)
    .in("residents_id", residentIds)
    .select()

  if (error) {
    console.error("Error al actualizar el pago:", error)
    throw error
  }

  return data
}

/**
 * Obtiene métricas agregadas de los pagos.
 * 
 * @returns un objeto con `totalRevenue` y `totalPayments`.
 */
export async function getPaymentsMetrics(centerId: string) {
  const { data, error } = await supabase
    .from("payments")
    .select(`
      amount,
      residents!inner(center_id)
    `)
    .eq("residents.center_id", centerId)

  if (error) {
    console.error("Error al obtener las métricas de pagos:", error)
    throw error
  }

  const totalRevenue = data.reduce((sum, p) => sum + p.amount, 0)
  const totalPayments = data.length

  return {
    totalRevenue,
    totalPayments,
  }
}

export async function getPendingPaymentsCount(centerId: string) {
  const { count, error } = await supabase
    .from("payments")
    .select(`
      *,
      residents!inner(center_id)
      `, { count: "exact", head: true })
    .eq("status", "pending")
    .eq("residents.center_id", centerId)

  if (error) {
    console.error("Error al obtener pagos pendientes:", error)
    throw error
  }

  return count || 0
  }
  
  export async function getAllPayments(centerId: string) {
  const { data, error } = await supabase
    .from("payments")
    .select(`
      *,
      residents!payments_resident_id_fkey (
        id,
        name,
        center_id
      )
    `)
    .eq("residents.center_id", centerId)

  if (error) {
    console.error("Error al obtener pagos:", error)
    throw error
  }

  return data
}
