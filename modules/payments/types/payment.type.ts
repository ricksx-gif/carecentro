export type PaymentStatus = "pending" | "paid"

export type Payment = {
  id: string
  resident_id: string
  amount: number
  payment_date: string
  status?: PaymentStatus
  created_at?: string

  residents?: {
    id: string
    name: string
  }

}