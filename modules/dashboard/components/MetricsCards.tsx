import { MetricCard } from "@/components/MetricCard"
import { DashboardMetrics } from "@/modules/dashboard/types/dashboard.type"

type Props = {
  metrics: DashboardMetrics | null
  loading: boolean
  error: string | null

}

const MetricsCards: React.FC<Props> = ({ metrics, loading, error }) => {
  
  if (loading) return <div>Cargando métricas...</div>
  if (error) return <div>Error: {error}</div>
  if (!metrics) return <div>No hay datos</div>

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      
      <MetricCard 
        title="Residentes" 
        value={metrics.totalResidents} 
      />
      
      <MetricCard 
        title="Ingresos Totales" 
        value={`$${metrics.totalRevenue}`} 
        growth={metrics.growth}
      />
      
      <MetricCard 
        title="Total de Pagos" 
        value={metrics.totalPayments} 
      />

      <MetricCard 
         title="Pagos Pendientes" 
         value={metrics.pendingPayments} 
      />


    </div>
  )
}

export default MetricsCards