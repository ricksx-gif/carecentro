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