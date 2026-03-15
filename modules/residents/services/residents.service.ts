import { supabase } from "@/lib/supabase"

export async function insertResidentTest(resident: {
  name: string
  birth_date: string
}) {

  const { data, error } = await supabase
    .from("residents")
    .insert([
      {
        name: resident.name,
        birth_date: resident.birth_date,
        center_id: "5508e12b-2a23-4621-a75b-bd62db2a8b21"
      }
    ])

  if (error) {
    console.error("Error insertando residente:", error)
    throw error
  }

  return data
}

export async function deleteResident(residentId: string) {
  const { error } = await supabase
    .from("residents")
    .delete()
    .eq("id", residentId)

  if (error) {
    console.error("Error eliminar residente:", error)
    throw error
  }
}
  
  export async function updateResident(residentId: string,
    resident:{
      name: string
      birth_date: string
    }
  ) {
    const { data, error } = await supabase
       .from("residents")
       .update({
         name: resident.name,
         birth_date: resident.birth_date
       })
        .eq("id", residentId)
        .select()

    if (error) {
       console.error("Error actualizando residente:", error)
       throw error
    }

    return data
  }
