"use client"

import { useEffect, useState } from "react"
import { Medication } from "../types/medication.type"
import { handleError } from "@/utils/handleError"
import { toast } from "sonner"

import {
  insertMedication,
  getMedicationsByResident,
  deleteMedication,
  updateMedication,
} from "../services/medications.service"

export function useMedications(residentId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [medications, setMedications] = useState<Medication[]>([])

  async function fetchMedications() {
    try {
      setLoading(true)
      setError(null)

      const data = await getMedicationsByResident(residentId)

      setMedications(data || [])
    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!residentId) return
    fetchMedications()
  }, [residentId])

  async function createMedication(
    medication: Omit<Medication, "id" | "created_at">
  ) {
    try {
      await insertMedication(medication)

      toast.success("Medicación agregada")

      await fetchMedications()
    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)

      toast.error(parsedError.message)
    }
  }

  async function editMedication(
    medicationId: string,
    medication: Pick<Medication, "name" | "dose" | "schedule">
  ) {
    try {
      await updateMedication(medicationId, medication)

      toast.success("Medicación actualizada")

      await fetchMedications()
    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)

      toast.error(parsedError.message)
    }
  }

  async function deleteMedicationHandler(med: Medication) {
    try {
      await deleteMedication(med.id)

      toast.success("Medicación eliminada")

      await fetchMedications()
    } catch (err: unknown) {
      const parsedError = handleError(err)
      setError(parsedError.message)

      toast.error(parsedError.message)
    }
  }

  return {
    medications,
    loading,
    error,
    fetchMedications,
    createMedication,
    editMedication,
    deleteMedication: deleteMedicationHandler,
  }
}