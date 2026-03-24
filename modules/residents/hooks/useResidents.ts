"use client"

import { useEffect, useState } from "react"
import { Resident } from "../types/resident.type"
import { getResidents } from "../services/residents.service" // ✅ Importamos desde service (NO Supabase)

/**
 * Hook para manejar residentes
 * RESPONSABILIDAD:
 * - Manejar estado (UI)
 * - Llamar al service
 */
export function useResidents() {

  // ✅ Estado principal de datos
  const [residents, setResidents] = useState<Resident[]>([])

  // ✅ Estado de carga (para UI-01)
  const [loading, setLoading] = useState(false)

  // ✅ Estado de error (para UI-02)
  const [error, setError] = useState<string | null>(null)

  /**
   * Función que obtiene los residentes
   * FLUJO:
   * Hook → Service → Supabase
   */
  async function fetchResidents() {

    // 🔄 Inicia loading
    setLoading(true)

    // 🧹 Limpia errores anteriores
    setError(null)

    try {
      // 📡 Llamada al service (NO DB directa)
      const data = await getResidents()

      // 💾 Guardar en estado
      setResidents(data)

    } catch (err: any) {

      // ❌ Manejo de error para UI
      setError(err.message || "Error inesperado")

    } finally {

      // 🔚 Finaliza loading SIEMPRE
      setLoading(false)
    }
  }

  /**
   * Se ejecuta automáticamente al montar el componente
   */
  useEffect(() => {
    fetchResidents()
  }, [])

  // 📦 Exponemos todo lo que la UI necesita
  return {
    residents,
    loading,
    error,
    fetchResidents,
  }
}