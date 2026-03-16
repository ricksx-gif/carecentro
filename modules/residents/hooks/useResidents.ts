// Hook del módulo `residents`.
// Se encarga de obtener y mantener en estado la lista de residentes desde Supabase.
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/**
 * Hook que gestiona la colección de residentes.
 *
 * @returns objeto con:
 *  - residents: lista de residentes obtenidos de Supabase
 *  - fetchResidents: función para refrescar los datos manualmente
 */
export function useResidents() {
  const [residents, setResidents] = useState<any[]>([])

  /**
   * Obtiene todos los residentes desde la tabla `residents`
   * y actualiza el estado local.
   */
  async function fetchResidents() {
    const { data, error } = await supabase
      .from("residents")
      .select("*")

    if (error){
      console.error(error)
      return
    }

    setResidents(data || [])
  }

  // Carga inicial de residentes al montar el componente que use este hook.
  useEffect(() => {
    fetchResidents()
  }, [])

  return { residents, fetchResidents }
}