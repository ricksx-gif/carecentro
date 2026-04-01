import { supabase } from "@/lib/supabase"
import { DashboardMetrics } from "@/modules/dashboard/types/dashboard.type"

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  // Residentes activos
  const { data: residents, count: totalResidents, error: residentsError } = await supabase
    .from("residents")
    .select("id", { count: "exact" })
    .eq("status", "active")

  if (residentsError) throw residentsError

  // Pagos
  const { data: paymentsData, count: totalPayments, error: paymentsError } = await supabase
    .from("payments")
    .select("resident_id, amount, payment_date", { count: "exact" })

  if (paymentsError) throw paymentsError

  // 💰 Revenue total
  const totalRevenue =
    paymentsData?.reduce((acc, p) => acc + (p.amount || 0), 0) || 0

  // 🔥 PENDIENTES REALES (por residente)
  const pendingResidents = residents?.filter((resident) => {
    const hasPaymentThisMonth = paymentsData?.some((p) => {
      const date = new Date(p.payment_date)
      return (
        p.resident_id === resident.id &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      )
    })

    return !hasPaymentThisMonth
  })

  const pendingPayments = pendingResidents?.length || 0

  // 📊 Agrupar por mes + año
  const monthlyMap: Record<string, { label: string; revenue: number }> = {}

  paymentsData?.forEach((p) => {
    const date = new Date(p.payment_date)

    const key = `${date.getFullYear()}-${date.getMonth()}`

    const label = date.toLocaleString("es-EC", {
      month: "short",
      year: "2-digit"
    })

    if (!monthlyMap[key]) {
      monthlyMap[key] = {
        label,
        revenue: 0
      }
    }

    monthlyMap[key].revenue += p.amount || 0
  })

  const monthlyRevenue = Object.entries(monthlyMap)
    .map(([key, value]) => ({
      month: value.label,
      revenue: value.revenue,
      sortKey: key
    }))
    .sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1))
    .map(({ month, revenue }) => ({ month, revenue }))

  // 📈 Growth
  const last = monthlyRevenue[monthlyRevenue.length - 1]
  const prev = monthlyRevenue[monthlyRevenue.length - 2]

  let growth = 0

  if (last && prev && prev.revenue > 0) {
    growth = ((last.revenue - prev.revenue) / prev.revenue) * 100
  }

  // 🔔 ALERTAS
  const alerts: string[] = []

  if (pendingPayments > 0) {
    alerts.push(`Tienes ${pendingPayments} residentes con pagos pendientes`)
  }

  if (totalRevenue < 500) {
    alerts.push("Ingresos bajos este período")
  }

  return {
    totalResidents: totalResidents || 0,
    totalPayments: totalPayments || 0,
    totalRevenue,
    pendingPayments,
    monthlyRevenue,
    growth,
    alerts
  }
}