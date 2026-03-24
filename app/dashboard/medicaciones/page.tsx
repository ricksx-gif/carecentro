"use client";

import { useEffect, useState } from "react";
import MedicationForm from "@/modules/medications/components/MedicationForm";
import MedicationsList from "@/modules/medications/components/MedicationsList";
import { useMedications } from "@/modules/medications/hooks/useMedications";
import { Medication } from "@/modules/medications/types/medication.type";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MedicacionesPage() {
  const residentId = "30402c06-1bdf-4d6c-b97a-a0d5a32cad19";

  const {
    medications,
    fetchMedications,
    createMedication,
    editMedication,
    removeMedication,
  } = useMedications();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);

  useEffect(() => {
    fetchMedications(residentId);
  }, [residentId]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1
            className="
            text-3xl font-semibold
            text-white tracking-tight
            bg-gradient-to-r from-white to-white/60
            bg-clip-text text-transparent
          "
          >
            Módulo de Medicaciones
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Gestionar las medicaciones del residente
          </p>
        </div>

        {/* BOTÓN */}
        <button
          onClick={() => {
            setSelectedMedication(null);
            setIsOpen(true);
          }}
          className="
            px-4 py-2 rounded-lg
            bg-white/10 hover:bg-white/20
            text-white border border-white/10
            backdrop-blur-lg
            transition-all
          "
        >
          Añadir Medicación
        </button>
      </div>

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="
          bg-black/60 backdrop-blur-xl
          border border-white/10
          text-white
        "
        >
          <DialogHeader>
            <DialogTitle>
              {selectedMedication
                ? "Editar Medicación"
                : "Añadir Medicación"}
            </DialogTitle>
          </DialogHeader>

          <MedicationForm
            residentId={residentId}
            createMedication={createMedication}
            updateMedication={editMedication}
            medication={selectedMedication}
            clearSelectedMedication={() => setSelectedMedication(null)}
          />
        </DialogContent>
      </Dialog>

      {/* TABLA */}
      <MedicationsList
        residentId={residentId}
        medications={medications}
        fetchMedications={fetchMedications}
        removeMedication={removeMedication}
        onEdit={(med) => {
          setSelectedMedication(med);
          setIsOpen(true);
        }}
      />
    </div>
  );
}