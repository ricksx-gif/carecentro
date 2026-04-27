type Payment = {
  resident_id: string
  payment_date: string
}

type Resident = {
  id: string
}

export const isResidentPending = (
  resident: Resident,
  payments: Payment[]
): boolean => {
  // obtener pagos del residente
  const residentPayments = payments
    ?.filter((p) => p.resident_id === resident.id)
    .sort(
      (a, b) =>
        new Date(b.payment_date).getTime() -
        new Date(a.payment_date).getTime()
    )

  const lastPayment = residentPayments?.[0]

  // si nunca ha pagado → pendiente
  if (!lastPayment) return true

  const lastDate = new Date(lastPayment.payment_date)

  // calcular próxima fecha de pago
  const nextDueDate = new Date(lastDate)
  nextDueDate.setMonth(nextDueDate.getMonth() + 1)

  // fix meses (31 → 30 / 28)
  if (nextDueDate.getDate() !== lastDate.getDate()) {
    nextDueDate.setDate(0)
  }

  // pendiente si ya pasó la fecha
  return new Date() > nextDueDate
}