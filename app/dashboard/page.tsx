"use client"

import { useEffect, useState } from "react"
import MetricCard from "@/components/MetricCard"
import { getPaymentsMetrics } from "@/modules/payments/services/payments.service"

export default function Dashboard() {
  const [totalResidentes, setTotalResidentes] = useState(24)
  const [pagosPendientes, setPagosPendientes] = useState(3)
  const [medicacionesHoy, setMedicacionesHoy] = useState(12)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalPayments, setTotalPayments] = useState(0)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const metrics = await getPaymentsMetrics()
        setTotalRevenue(metrics.totalRevenue)
        setTotalPayments(metrics.totalPayments)
      } catch (error) {
        console.error("Error al cargar las métricas de pagos:", error)
      }
    }

    fetchMetrics()
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">
        Dashboard - CareCentro
      </h1>
      <div className="mt-6 grid grid-cols-3 gap-6">
        <MetricCard titulo="Residentes" valor={totalResidentes} />
        <MetricCard titulo="Ingresos Totales" valor={totalRevenue} />
        <MetricCard titulo="Total de Pagos" valor={totalPayments} />
        <MetricCard titulo="Pagos Pendientes" valor={pagosPendientes} />
        <MetricCard titulo="Medicaciones Hoy" valor={medicacionesHoy} />
      </div>
    </div>
  )
}