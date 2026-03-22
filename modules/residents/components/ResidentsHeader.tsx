"use client"

import { Button } from "@/components/ui/button"
import { useResidents } from "../hooks/useResidents"

// Props del componente
type ResidentsHeaderProps = {
  onAdd: () => void
}

/**
 * Encabezado de la página del módulo de residentes.
 *
 * Muestra un título, el número total de residentes (obtenido a través de `useResidents`),
 * y un botón para iniciar el proceso de creación de un nuevo residente.
 *
 * @param onAdd - Callback que se ejecuta al hacer clic en el botón "Añadir Residente".
 */
export default function ResidentsHeader({ onAdd }: ResidentsHeaderProps) {
  const { residents } = useResidents()

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-black">
          Módulo de Residentes
        </h1>
        <p className="mt-2 text-gray-600">
          Total de residentes registrados: {residents.length}
        </p>
      </div>
      <Button onClick={onAdd}>Añadir Residente</Button>
    </div>
  )
}