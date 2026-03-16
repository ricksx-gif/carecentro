"use client"

import { useEffect, useState } from "react"
import MedicationForm from "@/modules/medications/components/MedicationForm"
import MedicationsList from "@/modules/medications/components/MedicationsList"
import { useMedications } from "@/modules/medications/hooks/useMedications"
import { Medication } from "@/modules/medications/types/medication.type"

export default function MedicacionesPage() {

  const residentId = "30402c06-1bdf-4d6c-b97a-a0d5a32cad19"

  const {
    medications,
    fetchMedications,
    createMedication,
    editMedication,
    removeMedication
  } = useMedications()

  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)

  useEffect(() => {
    fetchMedications(residentId)
  }, [residentId])

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-black">
        Medicaciones
      </h1>

      <MedicationForm
        residentId={residentId}
        createMedication={createMedication}
        medication={selectedMedication}
        updateMedication={editMedication}
        clearSelectedMedication={() => setSelectedMedication(null)}
      />

      <MedicationsList
        residentId={residentId}
        medications={medications}
        fetchMedications={fetchMedications}
        removeMedication={removeMedication}
        onEdit={setSelectedMedication}
      />

    </div>
  )
}