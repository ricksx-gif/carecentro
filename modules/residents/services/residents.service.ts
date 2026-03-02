import { supabase } from "@/lib/supabase"

export async function insertResidentTest() {
  const { data, error } = await supabase
    .from("residents")
    .insert([
      {
        name: "Test Día 7",
        birth_date: "1945-05-10",
        center_id:  "2c9ff8a3-d1da-4f1d-b06b-314beed78450"
      }
    ])

  if (error) {
    console.error("Error insertando residente:", error)
    throw error
  }

  return data
}