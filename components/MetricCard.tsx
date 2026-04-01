import { Card, CardContent } from "@/components/ui/card"

type Props = {
  title: string
  value: number | string
  growth?: number
}

export function MetricCard({ title, value, growth }: Props) {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300 hover:bg-white/10">
      <CardContent className="p-5 flex flex-col gap-1">
        
        {/* Title */}
        <p className="text-sm text-white/50">{title}</p>

        {/* Value */}
        <p className="text-3xl font-bold mt-1">{value}</p>

        {/* 🔥 Growth */}
        {growth !== undefined && !isNaN(growth) && Math.abs(growth) > 0 && (
          <span
            className={`text-xs font-medium flex items-center gap-1 ${
              growth >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {growth >= 0 ? "↑" : "↓"} {Math.abs(growth).toFixed(1)}%
          </span>
        )}

      </CardContent>
    </Card>
  )
}