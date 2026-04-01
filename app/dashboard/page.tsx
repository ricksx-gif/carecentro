"use client"

import { useDashboardMetrics } from "@/modules/dashboard/hooks/useDashboardMetrics"
import MetricsCards from "@/modules/dashboard/components/MetricsCards"
import RevenueChart from "@/modules/dashboard/components/RevenueChart"
import Alerts from "@/modules/dashboard/components/Alerts"


export default function Dashboard() {
  const { metrics, loading, error } = useDashboardMetrics()

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-white/40 text-sm">
          Resumen general del sistema Velora
        </p>
      </div>
      
      {/* Alerts */}
      <Alerts alerts={metrics?.alerts || []} />


      {/* Metrics */}
      <MetricsCards
        metrics={metrics}
        loading={loading}
        error={error}
      />

      <RevenueChart
         data={metrics?.monthlyRevenue || [] }
      />

    </div>
  )
}