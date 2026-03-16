import { supabase } from "@/lib/supabase"
import { Medication } from "../types/medication.type"

// Este archivo contiene la capa de servicios del módulo `medications`.
// Su responsabilidad es comunicarse con Supabase para operaciones CRUD.

export async function insertMedication(medication: Omit<Medication, "id" | "created_at">) {
    const { data, error } = await supabase
      .from("medications")
      .insert([medication])
    
      if (error){
        console.error("Error al agregar medicación:", error.message)
        throw error
      }

      return data
}

export async function getMedicationsByResident(residentId: string) {
    const { data, error } = await supabase
       .from("medications")
       .select("*")
       .eq("resident_id", residentId)

    if (error){
        console.error("Error al buscar la medicación:",error.message)
        throw error 
    }
    
    return data
}

// Actualiza una medicación existente.
// Params:
// - medicationId: id de la medicación a actualizar
// - medication: campos editables
// Returns:
// - La fila actualizada (según `select()`) o lanza error
export async function updateMedication(
  medicationId: string,
  medication: Pick<Medication, "name" | "dose" | "schedule">
) {
  const { data, error } = await supabase
    .from("medications")
    .update({
      name: medication.name,
      dose: medication.dose,
      schedule: medication.schedule,
    })
    .eq("id", medicationId)
    .select()

  if (error) {
    console.error("Error al actualizar medicación:", error.message)
    throw error
  }

  return data
}

export async function deleteMedication(medicationId: string) {
    const { error } = await supabase
      .from("medications")
      .delete()
      .eq("id", medicationId)
    if (error) {
        console.error("Error al eliminar medicación:", error.message)
        throw error
    }
    
}

  
