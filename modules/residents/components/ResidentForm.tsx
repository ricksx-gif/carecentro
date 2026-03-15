"use client"

import { useState, useEffect} from "react"
import { insertResidentTest, updateResident } from "../services/residents.service"


export default function ResidentForm({ resident, fetchResidents, clearSelectedResident}: any) {

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")

  useEffect(() => {
    if (resident){
      setName(resident.name)
      setBirthDate(resident.birth_date)
    }
  }, [resident])


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
        className=" bg-green-600 ml-3 px-4 py-2 text-white rounded"
        >
          Cancelar
        </button>
      )}

    </form>
  )
}