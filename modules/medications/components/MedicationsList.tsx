"use client"

import { useEffect } from "react"
import { Medication } from "../types/medication.type"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"


type MedicationsListProps = {
    residentId: string
    medications: Medication[]
    fetchMedications: (residentId: string) => void
    removeMedication: (medicationId: string, residentId: string) => void   
    onEdit: (medication: Medication) => void
}

// Lista del módulo `medications`.
// Muestra medicaciones por residente y permite seleccionar una para edición o eliminarla.
export default function MedicationsList({
  residentId,
  medications,
  fetchMedications,
  removeMedication,
  onEdit
}: MedicationsListProps) {

    // Carga o refresca las medicaciones cuando cambia el residente activo.
    useEffect(() => {
        fetchMedications(residentId)
    }, [residentId])

    return (
  <div className="
    mt-6
    rounded-2xl
    bg-white/5 backdrop-blur-xl
    border border-white/10
    shadow-xl
    p-4
  ">

      <h2 className="text-lg font-semibold text-white/80 mb-4 tracking-tight">
          Medicaciones
      </h2>

    <table className="w-full">

      {/* HEADER */}
      <thead>
        <tr className="border-b border-white/10">
          <th className="text-white/60 font-medium text-sm py-3 text-left">
            Medicamento
          </th>
          <th className="text-white/60 font-medium text-sm py-3 text-left">
            Dosis
          </th>
          <th className="text-white/60 font-medium text-sm py-3 text-left">
            Frecuencia
          </th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {medications.map((med) => (
          <tr
            key={med.id}
            className="border-b border-white/5
              hover:bg-white/5
              transition-colors
              last:border-0"
             >
            <td className="py-3 text-white/80 font-medium">
              {med.name}
            </td>

            <td className="py-3 text-white/70">
              {med.dose}
            </td>

            <td className="py-3 text-white/70">
              {med.schedule}
            </td>

            <td className="py-3">

             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <button className="
                   p-2 rounded-md
                   text-white/60 hover:text-white
                   hover:bg-white/10
                   transition
                ">
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
               className="cursor-pointer
                text-white/70
                hover:text-white
                hover:bg-white/10
                focus:bg-white/10
                data-[highlighted]:bg-white/10"
             >
              Editar
             </DropdownMenuItem>

             <DropdownMenuItem
               onClick={() => {
                 if (confirm("¿Eliminar esta medicación?")) {
                    removeMedication(med.id, residentId)
                }
              }}
              className="cursor-pointer
                text-white/70
                hover:text-white
                hover:bg-white/10
                focus:bg-white/10
                data-[highlighted]:bg-white/10
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
  </div>
 )
}