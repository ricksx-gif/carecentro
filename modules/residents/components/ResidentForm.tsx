"use client"

import { useState, useEffect } from "react"
import {
  insertResidentTest,
  updateResident,
} from "../services/residents.service"
import { Resident } from "../types/resident.type"
import { LoadingSpinner } from "@/shared/components/LoadingSpinner" // 🔥 NUEVO
import { toast } from "sonner" 


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
      toast.error("Todos los campos son obligatorios", {
        style: { 
           background: "rgba(0,0,0,0.8)",
           color: "#fff",
           border: "1px solid rgba(255,255,255,0.1)",
           backdropFilter: "blur(10px)",
        },
      }) 
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
  <form onSubmit={handleSubmit} className="space-y-6">

    {/* NOMBRE */}
    <div>
      <label className="block text-sm font-medium text-white/60 mb-1">
        Nombre
      </label>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        className="
          w-full rounded-lg px-3 py-2
          bg-white/5 border border-white/10
          text-white placeholder:text-white/40
          backdrop-blur-lg
          focus:outline-none focus:ring-0
          focus:border-white/20 focus:bg-white/10
          transition-all
        "
      />
    </div>

    {/* FECHA */}
    <div>
      <label className="block text-sm font-medium text-white/60 mb-1">
        Fecha de nacimiento
      </label>

      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        disabled={loading}
        className="
          w-full rounded-lg px-3 py-2
          bg-white/5 border border-white/10
          text-white
          backdrop-blur-lg
          focus:outline-none focus:ring-0
          focus:border-white/20 focus:bg-white/10
          transition-all
        "
      />
    </div>

    {/* BOTONES */}
    <div className="flex justify-end gap-3 pt-4">

      {/* CANCELAR */}
      <button
        type="button"
        onClick={onFormSubmit}
        disabled={loading}
        className="
          px-4 py-2 rounded-lg
          bg-white/5 hover:bg-white/10
          text-white border border-white/10
          backdrop-blur-lg
          transition-all
          focus:outline-none focus:ring-0
        "
      >
        Cancelar
      </button>

      {/* CREAR / ACTUALIZAR */}
      <button
        type="submit"
        disabled={loading}
        className="
          flex items-center gap-2
          px-4 py-2 rounded-lg
          bg-white/10 hover:bg-white/20
          text-white border border-white/10
          backdrop-blur-lg shadow-lg
          transition-all
          focus:outline-none focus:ring-0
          disabled:opacity-50
        "
      >
        {loading && <LoadingSpinner size="sm" />}

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