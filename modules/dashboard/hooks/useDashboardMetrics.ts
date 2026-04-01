import { useEffect, useState } from "react"
import { getDashboardMetrics } from "../services/dashboard.service"
import { DashboardMetrics } from "@/modules/dashboard/types/dashboard.type"

export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getDashboardMetrics()
      setMetrics(data)
    } catch (err: any) {
      setError(err.message || "Error obteniendo métricas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics
  }
}