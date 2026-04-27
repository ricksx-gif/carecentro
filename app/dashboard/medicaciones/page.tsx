"use client"

import { useState } from "react"

import MedicationForm from "@/modules/medications/components/MedicationForm"
import MedicationsTable from "@/modules/medications/components/MedicationsTable"
import { useMedications } from "@/modules/medications/hooks/useMedications"
import { Medication } from "@/modules/medications/types/medication.type"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function MedicacionesPage() {
  const residentId = ""

  const {
    medications,
    loading,
    error,
    fetchMedications,
    createMedication,
    editMedication,
    deleteMedication,
  } = useMedications({})

  const [isOpen, setIsOpen] = useState(false)
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null)

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Módulo de Medicaciones
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Gestionar todas las medicaciones del sistema
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedMedication(null)
            setIsOpen(true)
          }}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-lg transition-all"
        >
          Añadir Medicación
        </button>
      </div>

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black/60 backdrop-blur-xl border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>
              {selectedMedication
                ? "Editar Medicación"
                : "Añadir Medicación"}
            </DialogTitle>
          </DialogHeader>

          <MedicationForm
            createMedication={createMedication}
            updateMedication={editMedication}
            medication={selectedMedication}
            clearSelectedMedication={() => setSelectedMedication(null)}
          />
        </DialogContent>
      </Dialog>

      {/* TABLA NUEVA */}
      <MedicationsTable
        medications={medications}
        loading={loading}
        error={error}
        fetchMedications={fetchMedications}
        onEdit={(med) => {
          setSelectedMedication(med)
          setIsOpen(true)
        }}
        onDelete={deleteMedication}
      />
    </div>
  )
}