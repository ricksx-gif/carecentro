"use client"

import { useEffect, useState } from "react"
import { MetricCard } from "@/components/MetricCard"
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
  <div className="max-w-7xl mx-auto space-y-6">
    
    <div className="space-y-8">
    <h1 className="text-4xl font-bold tracking-tight text-foreground">  
        Dashboard
      </h1>
      <p className="text-sm text-muted-foreground">
        Resumen general del sistema CareCentro
      </p>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard title="Residentes" value={totalResidentes} />
      <MetricCard title="Ingresos Totales" value={`$${totalRevenue}`} />
      <MetricCard title="Total de Pagos" value={totalPayments} />
      <MetricCard title="Pagos Pendientes" value={pagosPendientes} />
      <MetricCard title="Medicaciones Hoy" value={medicacionesHoy} />
    </div>

  </div>
)
}