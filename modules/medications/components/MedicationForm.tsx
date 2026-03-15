

import { useState } from "react"

type MedicationFormProps = {
    residentId: string
    createMedication: any
}

export default function MedicationForm({
  residentId,
  createMedication
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
      await createMedication({
        resident_id: residentId,
        name,
        dose,
        schedule
      })

      setName("")
      setDose("")
      setSchedule("")
    } catch (error) {
      console.error(error)
    }
  }

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
        Agregar Medicación
      </button>

    </form>
  )
}
