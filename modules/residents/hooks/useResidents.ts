// Hook del módulo `residents`.
// Se encarga de obtener y mantener en estado la lista de residentes desde Supabase.
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Resident } from "../types/resident.type"

/**
 * Hook personalizado para gestionar la lógica de los residentes.
 *
 * Se encarga de:
 * 1. Obtener la lista de residentes desde Supabase.
 * 2. Mantener la lista en un estado de React.
 * 3. Proveer una función para refrescar los datos manualmente.
 *
 * @returns Un objeto que contiene:
 *  - `residents`: Un array con la lista de residentes.
 *  - `fetchResidents`: Una función para volver a cargar los residentes.
 */
export function useResidents() {
  const [residents, setResidents] = useState<Resident[]>([])

  /**
   * Obtiene todos los residentes desde la tabla `residents`
   * y actualiza el estado local.
   */
  async function fetchResidents() {
    const { data, error } = await supabase.from("residents").select("*")

    if (error) {
      console.error("Error fetching residents:", error)
      return
    }

    setResidents(data || [])
  }

  // Efecto para cargar los residentes inicialmente cuando el hook se usa por primera vez.
  useEffect(() => {
    fetchResidents()
  }, [])

  return { residents, fetchResidents }
}