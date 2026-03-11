type Resident = {
  id: string
  name: string
  birth_date: string
}

export default function ResidentsTable({
  residents,
}: {
  residents: Resident[]
}) {
  return (
    <table className="mt-6 w-full border border-gray-600">

      <thead>
        <tr className="bg-gray-100  text-left text-black">
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Fecha de nacimiento</th>
        </tr>
      </thead>

      <tbody>
        {residents.map((resident) => (
          <tr key={resident.id}>
            <td className="p-2 border text-black">{resident.name}</td>
            <td className="p-2 border text-black">{resident.birth_date}</td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}