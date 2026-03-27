"use client"

import { useEffect, useState } from "react"
import { Medication } from "../types/medication.type"
import { toast } from "sonner"

type MedicationFormProps = {
  residentId: string
  createMedication: (med: Omit<Medication, "id" | "created_at">) => Promise<void>
  medication?: Medication | null
  updateMedication?: (
    medicationId: string,
    medication: Pick<Medication, "name" | "dose" | "schedule">
  ) => Promise<void>
  clearSelectedMedication?: () => void
}

export default function MedicationForm({
  residentId,
  createMedication,
  medication,
  updateMedication,
  clearSelectedMedication,
}: MedicationFormProps) {
  const [name, setName] = useState("")
  const [dose, setDose] = useState("")
  const [schedule, setSchedule] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !dose || !schedule) {
      toast.error("Todos los campos son obligatorios")
      return
    }

    try {
      if (medication) {
        await updateMedication?.(medication.id, {
          name,
          dose,
          schedule,
        })
      } else {
        await createMedication({
          resident_id: residentId,
          name,
          dose,
          schedule,
        })
      }

      setName("")
      setDose("")
      setSchedule("")
      clearSelectedMedication?.()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!medication) return
    setName(medication.name)
    setDose(medication.dose)
    setSchedule(medication.schedule)
  }, [medication])

  return (
    <div className="mt-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-4">
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-white/60 mb-1 block">
            Medicación
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white placeholder:text-white/40 backdrop-blur-lg focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
          />
        </div>

        <div>
          <label className="text-sm text-white/60 mb-1 block">
            Dosis
          </label>
          <input
            type="text"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white placeholder:text-white/40 backdrop-blur-lg focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
          />
        </div>

        <div>
          <label className="text-sm text-white/60 mb-1 block">
            Frecuencia
          </label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white placeholder:text-white/40 backdrop-blur-lg focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
          />
        </div>

        <button
          type="submit"
          className="mt-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-lg shadow-lg transition-all"
        >
          {medication ? "Actualizar Medicación" : "Agregar Medicación"}
        </button>

        {medication && (
          <button
            type="button"
            onClick={() => {
              setName("")
              setDose("")
              setSchedule("")
              clearSelectedMedication?.()
            }}
            className="mt-2 ml-3 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-lg shadow-lg transition-all"
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  )
}