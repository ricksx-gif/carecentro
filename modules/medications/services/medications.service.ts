import { supabase } from "@/lib/supabase"
import { Medication } from "../types/medication.type"

// Este archivo contiene la capa de servicios del módulo `medications`.
// Su responsabilidad es comunicarse con Supabase para operaciones CRUD.

export async function insertMedication(medication: Omit<Medication, "id" | "created_at" | "resident">) {
    const { data, error } = await supabase
      .from("medications")
      .insert([medication])
    
      if (error){
        console.error("Error al agregar medicación:", error.message)
        throw error
      }

      return data
}

export async function getMedicationsByResident(
  residentId: string,
  centerId: string
) {
    const { data, error } = await supabase
       .from("medications")
       .select(`
        *,
        residents!inner(center_id)
        `)
       .eq("resident_id", residentId)
       .eq("residents.center_id", centerId)

    if (error){
        console.error("Error al buscar la medicación:",error.message)
        throw error 
    }
    
    return data
}

export async function updateMedication(
  medicationId: string,
  medication: Pick<Medication, "name" | "dose" | "schedule">,
  centerId: string 
) {
  // 1.Obtener residentes validos 
  const { data: residents, error: residentsError  } = await supabase
    .from("residents")
    .select("id")
    .eq("center_id",centerId)

  if (residentsError) throw residentsError

  const residentIds = residents.map(r => r.id)

  // 2. update
  const { data, error } = await supabase
    .from("medications")
    .update({
      name: medication.name,
      dose: medication.dose,
      schedule: medication.schedule,
    })
    .eq("id", medicationId)
    .in("re.sidents_id", residentIds)
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

export async function getAllMedications(centerId: string): Promise<Medication[]> {
  const { data, error } = await supabase
    .from("medications")
    .select(`
      *,
      resident:residents!inner (
        id,
        name,
        center_id
      )
    `)
    .eq("rresidents.center_id",centerId)

  if (error) {
    console.error("Error al obtener medicaciones:", error.message)
    throw error
  }

  return data as Medication[]
}


  
