"use client"

import { usePayments } from "./usePayments"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type PaymentWithResident = {
  id: string
  amount: number
  status: string
  date: string
  residentName: string
}

export function usePaymentsReport(params?: {
  residentId?: string
  status?: string
}) {
  const { payments, loading } = usePayments(params || {})
  const [data, setData] = useState<PaymentWithResident[]>([])

  useEffect(() => {
    async function enrichPayments() {
      if (!payments.length) {
        setData([])
        return
      }

      // obtener residentes
      const { data: residents } = await supabase
        .from("residents")
        .select("id, name")

      const map = new Map<string, string>(
        (residents || []).map((r) => [r.id, r.name])
      )

      const enriched: PaymentWithResident[] = payments.map((p) => ({
        id: p.id,
        amount: Number(p.amount),
        status: String(p.status),
        date: String(p.created_at),
        residentName: map.get(p.resident_id) ?? "N/A",
      }))

      setData(enriched)
    }

    enrichPayments()
  }, [payments])

  return {
    paymentsReport: data,
    loading,
  }
}