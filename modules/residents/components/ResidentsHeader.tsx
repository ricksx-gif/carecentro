"use client"

import { useResidents } from "../hooks/useResidents"

export default function ResidentsHeader() {
    const { residents } = useResidents ()

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