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
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Módulo de Residentes
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Total de residentes registrados: {residents.length}
        </p>
      </div>
      <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-lg shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]" onClick={onAdd}>
        Añadir Residente
      </Button>
    </div>
  )
}