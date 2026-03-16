// Encabezado del módulo `residents`.
// Muestra el título del módulo y el total de residentes registrados.
"use client"

import { useResidents } from "../hooks/useResidents"

/**
 * Encabezado del módulo de residentes.
 *
 * Obtiene los residentes mediante `useResidents` solo para mostrar
 * el conteo total en el dashboard de residentes.
 */
export default function ResidentsHeader() {
  const { residents } = useResidents()

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">
        Módulo de Residentes
      </h1>

      <p className="mt-4 text-gray-600">
        Total residentes: {residents.length}
      </p>
    </div>
  )
}