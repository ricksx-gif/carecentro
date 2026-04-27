"use client"

import { useState } from "react"

import PaymentForm from "@/modules/payments/components/PaymentForm"
import PaymentsTable from "@/modules/payments/components/PaymentsTable"
import { usePayments } from "@/modules/payments/hooks/usePayments"
import { Payment } from "@/modules/payments/types/payment.type"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { GenerateReportButtonBase } from "@/shared/components/GenerateReportButtonBase"
import { usePaymentsReport } from "@/modules/payments/hooks/usePaymentsReport"
import { generatePaymentsPDF } from "@/modules/payments/services/paymentsReport.service"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PagosPage() {
  const residentId = ""

  const router = useRouter()

  const searchParams = useSearchParams()
  const status = searchParams.get("status") ?? undefined

  const {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
    editPayment,
    deletePayment,
  } = usePayments({
    residentId,
    status,
  })

  const { paymentsReport, loading: reportLoading } = usePaymentsReport({
  status,
  })

  const handleExportPDF = () => {
  if (!paymentsReport.length) {
    toast.error("No hay datos para exportar")
    return
  }

  try {
    generatePaymentsPDF(paymentsReport)
    toast.success("PDF generado correctamente")
  } catch (error) {
    console.error(error)
    toast.error("Error al generar el PDF")
  }
  }

  const handleExportSingle = (payment: Payment) => {
  const reportItem = paymentsReport.find(p => p.id === payment.id)

  if (!reportItem) {
    toast.error("No se encontró información para exportar")
    return
  }

  const safeName = reportItem.residentName.replace(/\s+/g, "_")

  const fileName = `pago_${safeName}.pdf`

  try {
    generatePaymentsPDF([reportItem], fileName)
    toast.success("PDF generado")
  } catch (error) {
    console.error(error)
    toast.error("Error al generar PDF")
  }
}


  const [isOpen, setIsOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null)

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Pagos
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Gestiona los pagos de los residentes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GenerateReportButtonBase
            onClick={handleExportPDF}
            loading={reportLoading}
            disabled={!paymentsReport.length}
          />
        

        <button
          onClick={() => {
            setSelectedPayment(null)
            setIsOpen(true)
          }}
          className="
            px-4 py-2 rounded-lg
            bg-white/10 hover:bg-white/20
            text-white border border-white/10
            backdrop-blur-lg
            transition-all
          "
        >
          Registrar Pago
        </button>
        </div>     
      </div>

      {/* MODAL */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black/60 backdrop-blur-xl border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>
              {selectedPayment ? "Editar Pago" : "Registrar Pago"}
            </DialogTitle>
          </DialogHeader>

          <PaymentForm
            residentId={residentId}
            createPayment={createPayment}
            updatePayment={editPayment}
            paymentToEdit={selectedPayment}
            onEditCancel={() => setSelectedPayment(null)}
          />
        </DialogContent>
      </Dialog>
      
      {/* STATUS */}
      {status === "pending" && (
        <div className="flex items-center justify-between">

          <div className="text-yellow-400 text-sm">
          Mostrando pagos pendientes
          </div>

          <button
          onClick={() => router.push("/dashboard/pagos")}
          className="
            px-4 py-2 rounded-lg
            bg-white/10 hover:bg-white/20
            text-white border border-white/10
            backdrop-blur-lg
            transition-all
            ">  
            Ver todos
          </button>
        </div>
      )}

      {/* TABLA NUEVA */}
      <PaymentsTable
        payments={payments}
        loading={loading}
        error={error}
        fetchPayments={fetchPayments}
        onEdit={(payment) => {
          setSelectedPayment(payment)
          setIsOpen(true)
        }}
        onDelete={deletePayment}
        onExport={handleExportSingle}
      />

    </div>
  )
}