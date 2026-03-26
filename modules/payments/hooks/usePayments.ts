import { useState } from "react";
import { Payment } from "../types/payment.type";
import { handleError } from "@/utils/handleError";
import {
  insertPayment,
  getPaymentsByResident,
  deletePayment,
  updatePayment as updatePaymentService,
} from "../services/payments.service";

export function usePayments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  async function fetchPayments(residentId: string) {
    try {
      setLoading(true);
      setError(null);

      const data = await getPaymentsByResident(residentId);


      setPayments(data || []);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  async function createPayment(payment: Omit<Payment, "id" | "created_at">) {
    try {
      setLoading(true);
      setError(null);

      await insertPayment(payment);

      await fetchPayments(payment.resident_id);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  async function removePayment(paymentId: string, residentId: string) {
    try {
      setLoading(true);
      setError(null);

       await deletePayment(paymentId);

      await fetchPayments(residentId);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  async function updatePayment(
    paymentId: string,
    residentId: string,
    payment: Partial<Payment>
  ) {
    try {
      setLoading(true);
      setError(null);

      await updatePaymentService(paymentId, payment);

      await fetchPayments(residentId);
    } catch (err: unknown) {
      const parsedError = handleError(err);
      setError(parsedError.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
    removePayment,
    updatePayment,
  };
}