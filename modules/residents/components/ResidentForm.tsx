"use client"

import { useState, useEffect } from "react"
import {
  insertResidentTest,
  updateResident,
} from "../services/residents.service"
import { Resident } from "../types/resident.type"
import { LoadingSpinner } from "@/shared/components/LoadingSpinner" // 🔥 NUEVO

type ResidentFormProps = {
  resident: Resident | null
  onFormSubmit: () => void
}

export default function ResidentForm({
  resident,
  onFormSubmit,
}: ResidentFormProps) {
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")

  // 🔥 NUEVO: estado de loading
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (resident) {
      setName(resident.name)
      setBirthDate(resident.birth_date)
    } else {
      setName("")
      setBirthDate("")
    }
  }, [resident])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !birthDate) {
      alert("Todos los campos son obligatorios")
      return
    }

    // 🔥 inicia loading
    setLoading(true)

    try {
      if (resident) {
        await updateResident(resident.id, {
          name,
          birth_date: birthDate,
        })
      } else {
        await insertResidentTest({
          name,
          birth_date: birthDate,
        })
      }

      onFormSubmit()
    } catch (error) {
      console.error(error)
    } finally {
      // 🔥 siempre termina loading
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading} // 🔥 deshabilitar
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          disabled={loading} // 🔥 deshabilitar
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black bg-white"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onFormSubmit}
          disabled={loading} // 🔥 bloquear cancel también
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading} // 🔥 clave
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading && <LoadingSpinner size="sm" />} {/* 🔥 spinner */}
          {loading
            ? resident
              ? "Actualizando..."
              : "Guardando..."
            : resident
            ? "Actualizar"
            : "Crear"}
        </button>
      </div>
    </form>
  )
}