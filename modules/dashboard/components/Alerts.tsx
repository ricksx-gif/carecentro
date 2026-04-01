type Props = {
  alerts: string[]
}

const Alerts: React.FC<Props> = ({ alerts }) => {
  if (!alerts.length) return null

  return (
    <div className="space-y-2">
      {alerts.map((alert, index) => (
        <div
           key={index}
           className={`text-sm px-4 py-2 rounded-lg flex items-center gap-2 ${
             alert.includes("pendientes")
               ? "bg-red-500/10 border border-red-500/30 text-red-300"
               : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300"
          }`}
        >
          <span>
           {alert.includes("pendientes") ? "⚠️" : "📉"}
          </span>
          <span>{alert}</span>
        </div>
        ))}
    </div>
  )
}

export default Alerts