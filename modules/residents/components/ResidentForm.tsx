// Formulario del módulo `residents`.
// Permite crear un nuevo residente o actualizar uno existente.
"use client"

import { useState, useEffect} from "react"
import { insertResidentTest, updateResident } from "../services/residents.service"

type ResidentFormProps = {
  resident: {
    id: string
    name: string
    birth_date: string
  } | null
  fetchResidents: () => Promise<void> | void
  clearSelectedResident: () => void
}

/**
 * Formulario de alta/edición de residentes.
 *
 * @param resident Residente seleccionado para edición o `null` si es alta.
 * @param fetchResidents Función para refrescar la lista tras guardar.
 * @param clearSelectedResident Limpia el residente seleccionado y resetea el modo edición.
 */
export default function ResidentForm({
  resident,
  fetchResidents,
  clearSelectedResident
}: ResidentFormProps) {
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")

  // Sincroniza el formulario cuando cambia el residente seleccionado.
  useEffect(() => {
    if (resident){
      setName(resident.name)
      setBirthDate(resident.birth_date)
    } else {
      setName("")
      setBirthDate("")
    }
  }, [resident])

  /**
   * Maneja el envío del formulario, realizando inserción o actualización
   * según exista o no un residente seleccionado.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !birthDate) {
      alert("Todos los campos son obligatorios")
      return
    }

    try {
      if (resident){
        await updateResident(resident.id, {
          name,
          birth_date: birthDate
        })
      } else {
        await insertResidentTest({
          name,
          birth_date: birthDate
        })
      }

      await fetchResidents()

      setName("")
      setBirthDate("")
      clearSelectedResident()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

      <div>
        <label className="block text-sm font-medium text-black">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className= "border border-gray-300 p-2 rounded w-full text-black bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Fecha de nacimiento</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className= "border border-gray-300 p-2 rounded w-full text-black bg-white"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {resident ? "Actualizar residente" : "Crear residente"}
      </button>

      {resident && (
        <button
        type="button"
        onClick={() => {
          setName("")
          setBirthDate("")
          clearSelectedResident()
        }}
        className="bg-gray-600 text-white px-4 py-2 rounded ml-3"
        >
          Cancelar
        </button>
      )}

    </form>
  )
}