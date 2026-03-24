// Definición del tipo de propiedades que recibe el componente.
// Esto garantiza que siempre se pase un título (string)
// y un valor numérico a la tarjeta.
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  title: string
  value: number | string
}

export function MetricCard({ title, value }: Props) {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300 hover:bg-white/10">
      <CardContent className="p-5">
        <p className="text-sm text-white/50">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </CardContent>
    </Card>
  )
}