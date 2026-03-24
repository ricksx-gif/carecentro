
// Formulario del módulo `medications`.
// Permite crear o actualizar una medicación asociada a un residente.
import { useEffect, useState } from "react"
import { Medication } from "../types/medication.type"

type MedicationFormProps = {
    residentId: string
    createMedication: any
    medication?: Medication | null
    updateMedication?: (medicationId: string, residentId: string, medication: Pick<Medication, "name" | "dose" | "schedule">) => Promise<void> | void
    clearSelectedMedication?: () => void
}

export default function MedicationForm({
  residentId,
  createMedication,
  medication,
  updateMedication,
  clearSelectedMedication
}: MedicationFormProps) {

  const [name, setName] = useState("")
  const [dose, setDose] = useState("")
  const [schedule, setSchedule] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !dose || !schedule) {
      alert("Todos los campos son obligatorios")
      return
    }

    try {
      if (medication) {
        await updateMedication?.(medication.id, residentId, {
          name,
          dose,
          schedule,
        })
      } else {
        await createMedication({
          resident_id: residentId,
          name,
          dose,
          schedule
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

  // Sincroniza el formulario cuando el usuario selecciona una medicación para editar.
  // Params:
  // - medication: medicación seleccionada (o null)
  // Returns:
  // - void
  useEffect(() => {
    if (!medication) return
    setName(medication.name)
    setDose(medication.dose)
    setSchedule(medication.schedule)
  }, [medication])

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

      <div>
        <label className="text-sm text-white/60 mb-1 block">
          Medicación
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
          w-full rounded-lg px-3 py-2
          bg-white/5 border border-white/10
          text-white placeholder:text-white/40
          backdrop-blur-lg
          focus:outline-none focus:ring-0
          focus:border-white/20 focus:bg-white/10
          transition-all"
        />
      </div>

      <div>
        <label className=" text-sm text-white/60 mb-1 block" >
          Dosis
        </label>
        <input
          type="text"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          className=" 
          w-full rounded-lg px-3 py-2
          bg-white/5 border border-white/10
          text-white placeholder:text-white/40
          backdrop-blur-lg
          focus:outline-none focus:ring-0
          focus:border-white/20 focus:bg-white/10
          transition-all"
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
          className="
          w-full rounded-lg px-3 py-2
          bg-white/5 border border-white/10
          text-white placeholder:text-white/40
          backdrop-blur-lg
          focus:outline-none focus:ring-0
          focus:border-white/20 focus:bg-white/10
          transition-all"
        />
      </div>

      <button
        type="submit"
        className="
        mt-2
         px-4 py-2 rounded-lg
         bg-white/10 hover:bg-white/20
         text-white border border-white/10
         backdrop-blur-lg shadow-lg
         transition-all
         focus:outline-none focus:ring-0
         "
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
          className="mt-2
         px-4 py-2 rounded-lg
         bg-white/10 hover:bg-white/20
         text-white border border-white/10
         backdrop-blur-lg shadow-lg
         transition-all
         focus:outline-none focus:ring-0
          ml-3"
        >
          Cancelar
        </button>
      )}

    </form>
  )
}
