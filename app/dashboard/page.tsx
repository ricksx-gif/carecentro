"use client"

import { useState } from "react"
import MetricCard from "@/components/MetricCard"

export default function Dashboard() {
  const [totalResidentes, setTotalResidentes] = useState(24)
  const [pagosPendientes, setPagosPendientes] = useState(3)
  const [medicacionesHoy, setMedicacionesHoy] = useState(12)
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">
        Dashboard - CareCentro
      </h1>
      <div className="mt-6 grid grid-cols-3 gap-6">
      <MetricCard titulo="Residentes" valor={totalResidentes} />
      <MetricCard titulo="Pagos Pendientes" valor={pagosPendientes} />
      <MetricCard titulo="Medicaciones Hoy" valor={medicacionesHoy} />
      </div>
       <button onClick={() => setTotalResidentes(prev => prev + 1)}>
           +1 Residente
        </button>
        <button onClick={() => setTotalResidentes(prev =>prev > 0 ? prev - 1 : prev)}>
           -1 Residente
        </button>
    </div>
  );
}