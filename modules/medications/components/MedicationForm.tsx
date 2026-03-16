
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
        <label className="block text-sm font-medium text-black">
          Medicación
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-black bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Dosis
        </label>
        <input
          type="text"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-black bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">
          Frecuencia
        </label>
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-black bg-white"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
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
          className="bg-gray-600 text-white px-4 py-2 rounded ml-3"
        >
          Cancelar
        </button>
      )}

    </form>
  )
}
