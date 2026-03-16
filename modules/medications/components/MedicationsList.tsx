"use client"

import { useEffect } from "react"
import { Medication } from "../types/medication.type"


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

    console.log("medications:", medications)

    useEffect(() => {
        console.log("medications:", medications)
        fetchMedications(residentId)
    }, [residentId])

    return(
        <div className="mt-6">

            <h2 className="text-lg font-semibold text-black mb-2">
                Medicaciones 
            </h2>

            <table className="w-full border border-gray-600">
                <thead>
                    <tr className="bg-gray-100 text-black text-left">
                        <th className="p-2 border border-gray-600">Medicamento</th>
                        <th className="p-2 border border-gray-600">Dosis</th>
                        <th className="p-2 border border-gray-600">Frecuencia</th>
                        <th className="p-2 border border-gray-600">Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {medications.map((med)=> (
                       <tr key={med.id}>
                          <td className="p-2 border border-gray-600 text-black">
                             {med.name}
                          </td>

                          <td className="p-2 border border-gray-600 text-black">
                             {med.dose}
                          </td>

                          <td className="p-2 border border-gray-600 text-black">
                             {med.schedule}
                          </td>

                          <td className="p-2 border border-gray-600">
                            <button
                              onClick={() => onEdit(med)}
                              className="px-2 py-1 text-blue-600 border border-blue-600 rounded mr-2"
                            >
                              Editar
                            </button>
                            <button
                            onClick={() => {
                                if (confirm("¿Eliminar esta medicación?")){
                                    removeMedication(med.id, residentId)
                                }
                            }}
                            className="px-2 py-1 text-red-600 border border-red-600 rounded"
                            >
                                Eliminar
                            </button>
                          </td>
                       </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}