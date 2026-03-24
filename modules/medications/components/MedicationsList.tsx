"use client";

import { useEffect, useState } from "react";
import { Medication } from "../types/medication.type";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type MedicationsListProps = {
  residentId: string;
  medications: Medication[];
  fetchMedications: (residentId: string) => void;
  removeMedication: (medicationId: string, residentId: string) => void;
  onEdit: (medication: Medication) => void;
};

export default function MedicationsList({
  residentId,
  medications,
  fetchMedications,
  removeMedication,
  onEdit,
}: MedicationsListProps) {

  // 🔥 ESTADO (CORRECTO)
  const [open, setOpen] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  useEffect(() => {
    fetchMedications(residentId);
  }, [residentId]);

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
      <h2 className="text-lg font-semibold text-white/80 mb-4 tracking-tight">
        Medicaciones
      </h2>

      <table className="w-full">
        {/* HEADER */}
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-white/60 text-sm py-3 text-left">Medicamento</th>
            <th className="text-white/60 text-sm py-3 text-left">Dosis</th>
            <th className="text-white/60 text-sm py-3 text-left">Frecuencia</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {medications.map((med) => (
            <tr
              key={med.id}
              className="
                border-b border-white/5
                hover:bg-white/5
                transition-colors
                last:border-0
              "
            >
              <td className="py-3 text-white/80 font-medium">{med.name}</td>
              <td className="py-3 text-white/70">{med.dose}</td>
              <td className="py-3 text-white/70">{med.schedule}</td>

              {/* ACCIONES */}
              <td className="py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="
                        p-2 rounded-md
                        text-white/60 hover:text-white
                        hover:bg-white/10
                        transition
                      "
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="
                      bg-black/60 backdrop-blur-xl
                      border border-white/10
                      text-white
                    "
                  >
                    <DropdownMenuItem
                      onClick={() => onEdit(med)}
                      className="
                        cursor-pointer
                        text-white/70
                        hover:text-white
                        hover:bg-white/10
                        focus:bg-white/10
                        data-[highlighted]:bg-white/10
                      "
                    >
                      Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedMed(med);
                        setOpen(true);
                      }}
                      className="
                        cursor-pointer
                        text-red-400
                        hover:text-red-300
                        hover:bg-red-500/10
                        focus:bg-red-500/10
                        data-[highlighted]:bg-red-500/10
                      "
                    >
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 MODAL PRO */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black/60 backdrop-blur-xl border border-white/10 text-white shadow-2xl">

          <DialogHeader>
            <DialogTitle>Eliminar medicación</DialogTitle>
            <DialogDescription className="text-white/60">
              ¿Estás seguro de eliminar{" "}
              <strong>{selectedMed?.name}</strong>? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2 mt-4">

            <Button
              onClick={() => setOpen(false)}
              className="
                bg-white/5 hover:bg-white/10
                text-white border border-white/10
                backdrop-blur-lg
                focus:outline-none focus:ring-0
              "
            >
              Cancelar
            </Button>

            <Button
              onClick={() => {
                if (selectedMed) {
                  removeMedication(selectedMed.id, residentId);
                  setOpen(false);
                }
              }}
              className="
                bg-red-500/80 hover:bg-red-500
                text-white
                focus:outline-none focus:ring-0
              "
            >
              Eliminar
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}