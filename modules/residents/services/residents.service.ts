import { supabase } from "@/lib/supabase"
import { Resident } from "../types/resident.type"

type InsertResident = Omit<Resident, "id">

/**
 * Inserta un nuevo residente en la base de datos.
 *
 * **NOTA IMPORTANTE:** Actualmente utiliza un `center_id` hardcodeado.
 * Esto deberá ser reemplazado por el ID del centro del usuario autenticado
 * cuando se implemente la arquitectura multi-tenant.
 *
 * @param resident - Objeto con los datos del residente a crear.
 * @returns Los datos del residente insertado.
 * @throws Si ocurre un error durante la inserción.
 */
export async function insertResident(resident: {
  name: string
  birth_date: string
  registration_date: string
},
  centerId: string
) {
  
  const { data, error } = await supabase
    .from("residents")
    .insert([
      {
        name: resident.name,
        birth_date: resident.birth_date,
        registration_date: resident.registration_date,
        center_id: centerId,
      },
    ])
    .select()

  if (error) {
    console.error("Error insertando residente:", error)
    throw error
  }

  return data
}

/**
 * Elimina un residente de la base de datos.
 *
 * @param residentId - El ID del residente a eliminar.
 * @throws Si ocurre un error durante la eliminación.
 */
export async function deleteResident(
  residentId: string,
  centerId: string
) {
  const { error } = await supabase
    .from("residents")
    .delete()
    .eq("id", residentId)
    .eq("ceneter_id", centerId)

  if (error) {
    console.error("Error eliminar residente:", error)
    throw error
  }
}

/**
 * Actualiza un residente existente en la base de datos.
 *
 * @param residentId - El ID del residente a actualizar.
 * @param resident - Objeto con los nuevos datos del residente.
 * @returns Los datos del residente actualizado.
 * @throws Si ocurre un error durante la actualización.
 */
export async function updateResident(
  residentId: string,
  resident: Partial<InsertResident>,
  centerId: string

) {
  const { data, error } = await supabase
    .from("residents")
    .update({
      name: resident.name,
      birth_date: resident.birth_date,
      registration_date: resident.registration_date,
    })
    .eq("id", residentId)
    .eq("center_id", centerId)
    .select()

  if (error) {
    console.error("Error actualizando residente:", error)
    throw error
  }

  return data
}

export async function getResidents(centerId: string) {
  const { data, error } = await supabase
    .from("residents")
    .select("id, name, birth_date, registration_date")
    .eq("center_id", centerId)

  if (error) {
    console.error("Error obteniendo residentes:", error)
    throw new Error(error.message)
  }

  return data || []
}
