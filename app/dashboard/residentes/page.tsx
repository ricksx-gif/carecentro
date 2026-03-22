"use client"

import { useState } from "react"
import ResidentsHeader from "../../../modules/residents/components/ResidentsHeader"
import ResidentsTable from "../../../modules/residents/components/ResidentsTable"
import ResidentForm from "../../../modules/residents/components/ResidentForm"
import { useResidents } from "../../../modules/residents/hooks/useResidents"
import { Resident } from "../../../modules/residents/types/resident.type"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

/**
 * Página principal para la gestión de residentes.
 *
 * Orquesta los componentes del módulo de residentes:
 * - `ResidentsHeader`: Muestra el título y el botón para añadir residentes.
 * - `ResidentsTable`: Muestra la lista de residentes y permite acciones.
 * - `ResidentForm`: Formulario para crear/editar, mostrado en un `Dialog`.
 *
 * Gestiona el estado para:
 * - La lista de residentes (`residents`).
 * - El residente seleccionado para edición (`selectedResident`).
 * - La visibilidad del formulario en el `Dialog` (`isFormOpen`).
 */
export default function ResidentesPage() {
  const { residents, fetchResidents } = useResidents()

  const [selectedResident, setSelectedResident] = useState<Resident | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Abre el formulario para un nuevo residente
  const handleAdd = () => {
    setSelectedResident(null)
    setIsFormOpen(true)
  }

  // Abre el formulario para editar un residente existente
  const handleEdit = (resident: Resident) => {
    setSelectedResident(resident)
    setIsFormOpen(true)
  }

  // Cierra el formulario y refresca los datos
  const handleFormClose = () => {
    setIsFormOpen(false)
    fetchResidents()
  }

  return (
    <div className="space-y-6">
      <ResidentsHeader onAdd={handleAdd} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedResident ? "Editar Residente" : "Añadir Residente"}
            </DialogTitle>
          </DialogHeader>
          <ResidentForm
            resident={selectedResident}
            onFormSubmit={handleFormClose}
          />
        </DialogContent>
      </Dialog>

      <ResidentsTable
        residents={residents}
        fetchResidents={fetchResidents}
        onEdit={handleEdit}
      />
    </div>
  )
}