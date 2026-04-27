import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

type PaymentReport = {
  residentName: string
  amount: number
  status: string
  date: string
}

export function generatePaymentsPDF(
  data: PaymentReport[],
  fileName?: string
  ) {
  if (!data.length) {
    throw new Error("No hay datos para exportar")
  }

  const doc = new jsPDF()

  // Header
  doc.setFontSize(16)
  doc.text("Velora - Reporte de Pagos", 14, 20)

  doc.setFontSize(10)
  doc.text(
    `Fecha: ${new Date().toLocaleDateString()}`,
    14,
    28
  )

  // Tabla
  autoTable(doc, {
    startY: 35,
    head: [["Residente", "Monto", "Estado", "Fecha"]],
    body: data.map((p) => [
      p.residentName,
      `$${p.amount}`,
      p.status === "paid" ? "Pagado" : "Pendiente",
      new Date(p.date).toLocaleDateString(),
    ]),
  })

  doc.save(fileName || "pagos_general.pdf")
}