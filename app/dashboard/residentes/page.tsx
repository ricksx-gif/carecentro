"use client"

import { useState } from "react"
import ResidentsHeader from "../../../modules/residents/components/ResidentsHeader"
import ResidentsTable from "../../../modules/residents/components/ResidentsTable"
import ResidentForm from "../../../modules/residents/components/ResidentForm"
import { useResidents } from "../../../modules/residents/hooks/useResidents"

export default function ResidentesPage() {

  const { residents, fetchResidents } = useResidents()

  const [selectedResident, setSelectedResident] = useState(null)

  return (
    <div className="space-y-6">

      <ResidentsHeader />

      <ResidentForm
        resident={selectedResident}
        fetchResidents={fetchResidents}
        clearSelectedResident={() => setSelectedResident(null)}
      />

      <ResidentsTable
        residents={residents}
        fetchResidents={fetchResidents}
        onEdit={setSelectedResident}
      />

    </div>
  )
}