"use client"

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
  Label
} from "recharts"

type Props = {
  data: {
    month: string
    revenue: number
  }[]
}

const RevenueChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white/5 border border-white/20 rounded-xl p-6 backdrop-blur-xl">
      
      {/* Header */} 
      <div className="mb-4">
        <h2 className="text-sm  font-bold tracking-tight text-foreground">
          Ingresos Mensuales
        </h2>
        <p className="text-xs text-white/40">
          Últimos movimientos financieros
        </p>
      </div>

      {/* Chart */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.05)" />

            <XAxis 
              dataKey="month" 
              stroke="#888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip 
              formatter={(value) =>
                new Intl.NumberFormat("es-EC", {
                  style: "currency",
                  currency: "USD"
                }).format(Number(value))
              }
              labelFormatter={(label) => `Mes: ${label.toUpperCase()}`}
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid rbga(255,255,255,0.1)",
                borderRadius: "10px"
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="url(#colorRevenue)"
              strokeWidth={2}
              animationDuration={800}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default RevenueChart