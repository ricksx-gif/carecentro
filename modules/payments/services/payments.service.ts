import { supabase } from "@/lib/supabase"
import { Payment } from "../types/payment.type"

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
