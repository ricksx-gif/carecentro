import { useState } from "react"
import { Medication } from "../types/medication.type"
import {
  insertMedication,
  getMedicationsByResident,
  deleteMedication,
  updateMedication,
} from "../services/medications.service"

// Hook del módulo `medications`.
// Maneja estado y expone operaciones para la UI (consultar, crear, editar y eliminar).
export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([])

  async function fetchMedications(residentId: string) {
    try {
      const data = await getMedicationsByResident(residentId)
      setMedications(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  async function createMedication(medication: Omit<Medication, "id" | "created_at">) {
    try {
      await insertMedication(medication)
      await fetchMedications(medication.resident_id)
    } catch (error) {
      console.error(error)
    }
  }

  async function editMedication(
    medicationId: string,
    residentId: string,
    medication: Pick<Medication, "name" | "dose" | "schedule">
  ) {
    try {
      await updateMedication(medicationId, medication)
      await fetchMedications(residentId)
    } catch (error) {
      console.error(error)
    }
  }

  async function removeMedication(medicationId: string, residentId: string) {
    try {
      await deleteMedication(medicationId)
      await fetchMedications(residentId)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    medications,
    fetchMedications,
    createMedication,
    editMedication,
    removeMedication
  }
}