"use client"

import { insertResidentTest } from "../services/residents.service"
import { useResidents } from "../hooks/useResidents"

export default function ResidentsHeader() {
    const { residents } = useResidents ()

    async function handleInsert() {
    try {
      await insertResidentTest()
      console.log("Insertado correctamente")
    } catch (error) {
      console.error(error)
    }
  }


    return (
    <div>
      <h1 className="text-2xl font-bold text-black">
        Módulo de Residentes
      </h1>
      
      <p className="mt-4 text-gray-600">
       Total residentes: {residents.length}
      </p>

      <button
      onClick={handleInsert}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Insertar Test
      </button>
    </div>
  )
}