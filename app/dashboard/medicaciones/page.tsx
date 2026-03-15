"use client"

import { useEffect } from "react"
import MedicationForm from "@/modules/medications/components/MedicationForm"
import MedicationsList from "@/modules/medications/components/MedicationsList"
import { useMedications } from "@/modules/medications/hooks/useMedications"

export default function MedicacionesPage() {

  const residentId = "30402c06-1bdf-4d6c-b97a-a0d5a32cad19"

  const {
    medications,
    fetchMedications,
    createMedication,
    removeMedication
  } = useMedications()

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
      />

      <MedicationsList
        residentId={residentId}
        medications={medications}
        fetchMedications={fetchMedications}
        removeMedication={removeMedication}
      />

    </div>
  )
}