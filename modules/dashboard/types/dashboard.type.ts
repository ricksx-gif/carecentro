export type MonthlyRevenue = {
  month: string
  revenue: number
}

export type DashboardMetrics = {
  totalResidents: number
  totalPayments: number
  totalRevenue: number
  pendingPayments: number
  monthlyRevenue: MonthlyRevenue[]
  growth: number
  alerts: string[]
}