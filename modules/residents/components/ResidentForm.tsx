"use client"

import { useState } from "react"
import { insertResidentTest } from "../services/residents.service"

export default function ResidentForm() {

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !birthDate) {
      alert("Todos los campos son obligatorios")
      return
    }

    try {
      await insertResidentTest({
        name,
        birth_date: birthDate
      })

      setName("")
      setBirthDate("")

      window.location.reload()

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
        Crear residente
      </button>

    </form>
  )
}