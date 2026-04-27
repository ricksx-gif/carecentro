"use client"

import { useEffect, useState } from "react"
import { Medication } from "../types/medication.type"
import { toast } from "sonner"
import { useResidents } from "@/modules/residents/hooks/useResidents"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type MedicationFormProps = {
  residentId?: string
  createMedication: (med: {
    resident_id: string
    name: string
    dose: string
    schedule: string
  }) => Promise<void>
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
  const { residents } = useResidents()

  const [selectedResident, setSelectedResident] = useState(residentId || "")
  const [name, setName] = useState("")
  const [dose, setDose] = useState("")
  const [schedule, setSchedule] = useState("")

  const isEditMode = !!medication && !!updateMedication

  useEffect(() => {
    if (isEditMode && medication) {
      setName(medication.name)
      setDose(medication.dose)
      setSchedule(medication.schedule)
      setSelectedResident(medication.resident_id)
    } else {
      setName("")
      setDose("")
      setSchedule("")
    }
  }, [medication, isEditMode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!selectedResident || !name || !dose || !schedule) {
      toast.error("Todos los campos son obligatorios")
      return
    }

    try {
      if (isEditMode && medication) {
        await updateMedication(medication.id, {
          name,
          dose,
          schedule,
        })
        clearSelectedMedication?.()
      } else {
        await createMedication({
          resident_id: selectedResident,
          name,
          dose,
          schedule,
        })
      }

      setName("")
      setDose("")
      setSchedule("")
      setSelectedResident("")
    } catch (error) {
      console.error(error)
      toast.error("Error al guardar la medicación")
    }
  }

  return (
    <div 
      className="
      mt-6 
      rounded-2xl 
      bg-white/5 backdrop-blur-xl 
      border border-white/10 
      shadow-xl 
      p-4
      "
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 p-4">

        {/* Residente */}
        <div>
          <label className="text-sm text-white/60 mb-1 block">
            Residente
          </label>

          <Select 
            value={selectedResident} 
            onValueChange={setSelectedResident}>
            <SelectTrigger className="
              w-full 
              bg-white/5 
              border border-white/10 
              text-white 
              backdrop-blur-lg
              focus:ring-0
              focus:outline-none
              focus:border-white/30">

              <SelectValue 
                 placeholder={
                  <span className="text-white/60">
                  Selecciona un residente 
                  </span>
                 }
              />
            </SelectTrigger>

            <SelectContent className="bg-black/90 border border-white/10 backdrop-blur-xl">
              {residents.map((r) => (
                <SelectItem 
                key={r.id} 
                value={r.id}
                className="
                text-white
                focus:bg-white/10
                focus:text-white
                data-[state=checked]:bg-white/10
                data-[state=checked
                "> 
                {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Medicamento */}
        <div>
          <label className="text-sm text-white/60 mb-1 block">
            Medicación
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white"
          />
        </div>

        {/* Dosis */}
        <div>
          <label className="text-sm text-white/60 mb-1 block">
            Dosis
          </label>
          <input
            type="text"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white"
          />
        </div>

        {/* Frecuencia */}
        <div>
          <label className="text-sm text-white/60 mb-1 block">
            Frecuencia
          </label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-all"
        >
          {isEditMode ? "Actualizar Medicación" : "Agregar Medicación"}
        </button>

        {isEditMode && (
          <button
            type="button"
            onClick={clearSelectedMedication}
            className="ml-3 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-all"
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  )
}