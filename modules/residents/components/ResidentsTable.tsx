// Tabla del módulo `residents`.
// Muestra la lista de residentes y permite disparar acciones de edición y eliminación.
import { deleteResident } from "../services/residents.service"

type Resident = {
  id: string
  name: string
  birth_date: string
}

type ResidentsTableProps = {
  residents: Resident[]
  fetchResidents: () => Promise<void> | void
  onEdit: (resident: Resident) => void
}

/**
 * Tabla de residentes que lista los registros y ofrece acciones de editar y eliminar.
 *
 * @param residents Lista de residentes a mostrar.
 * @param fetchResidents Función para refrescar los datos luego de eliminar.
 * @param onEdit Callback que recibe el residente seleccionado para edición.
 */
export default function ResidentsTable({
  residents,
  fetchResidents,
  onEdit,
}: ResidentsTableProps) {
  /**
   * Maneja la eliminación de un residente tras confirmar con el usuario.
   *
   * @param residentId Identificador del residente a eliminar.
   */
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
            <td className="p-2 border border-gray-600 text-black">
              {resident.name}
            </td>

            <td className="p-2 border border-gray-600 text-black">
              {resident.birth_date}
            </td>

            <td className="p-2 border border-gray-600 flex gap-2">
              <button
                onClick={() => onEdit(resident)}
                className="px-2 py-1 text-blue-600 border border-blue-600 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(resident.id)}
                className="px-2 py-1 text-red-600 border borde-red-600 rounded"
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