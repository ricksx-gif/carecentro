import { deleteResident } from "../services/residents.service"


type Resident = {
  id: string
  name: string
  birth_date: string
}

export default function ResidentsTable({
  residents,
  fetchResidents,
}: any) {

  async function handleDelete(residentId: string) {
  const confirmDelete = confirm("Eliminar residente")

  if (!confirmDelete) return

  try {
    await deleteResident(residentId)
    await fetchResidents()
  } catch (error) {
    console.error(error)
  }
}


  return (
  <table className="mt-6 w-full border border-gray-600">
    <thead>
      <tr className="bg-gray-100 text-left text-black">
        <th className="p-2 border border-gray-600">Nombre</th>
        <th className="p-2 border border-gray-600">Fecha de nacimiento</th>
        <th className="p-2 border border-gray-600">Acción</th>
      </tr>
    </thead>

    <tbody>
      {residents.map((resident: Resident) => (
        <tr key={resident.id}>
          <td className="p-2 border border-gray-600 text-black">{resident.name}</td>

          <td className="p-2 border border-gray-600 text-black">
            {resident.birth_date}
          </td>

          <td className="p-2 border border-gray-600">
            <button
              onClick={() => handleDelete(resident.id)}
              className="text-red-600 font-semibold"
            >
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
}