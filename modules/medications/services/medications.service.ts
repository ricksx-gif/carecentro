import { supabase } from "@/lib/supabase"
import { Medication } from "../types/medication.type"

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

  
