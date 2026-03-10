// Definición del tipo de propiedades que recibe el componente.
// Esto garantiza que siempre se pase un título (string)
// y un valor numérico a la tarjeta.
type MetricCardProps = {
  titulo: string
  valor: number
}

// Componente reutilizable que representa una tarjeta de métrica.
// Se utiliza en el dashboard para mostrar datos resumidos.
export default function MetricCard({ titulo, valor }: MetricCardProps) {
  return (
    // Contenedor visual de la tarjeta con estilo base
    <div className="bg-white p-6 shadow rounded-lg">
      
      {/* Título descriptivo de la métrica */}
      <h2 className="text-lg font-semibold text-black">
        {titulo}
      </h2>

      {/* Valor principal de la métrica */}
      <p className="text-2xl font-bold mt-2 text-black">
        {valor}
      </p>

    </div>
  )
}