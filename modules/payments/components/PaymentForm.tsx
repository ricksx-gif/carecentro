// Formulario del módulo `payments`.
// Permite registrar un nuevo pago asociado a un residente.
"use client";

import { useState, useEffect } from "react";
import { Payment } from "../types/payment.type";
import { toast } from "sonner";


type PaymentFormProps = {
  residentId: string;
  createPayment: (payment: {
    resident_id: string;
    amount: number;
    payment_date: string;
  }) => void;
  paymentToEdit?: Payment | null;
  updatePayment?: (id: string, payment: Partial<Payment>) => void;
  onEditCancel?: () => void;
};

/**
 * Formulario para registrar o editar pagos.
 *
 * @param residentId ID del residente.
 * @param createPayment Función para crear un pago.
 * @param paymentToEdit Opcional. Objeto de pago para modo edición.
 * @param updatePayment Opcional. Función para actualizar un pago.
 * @param onEditCancel Opcional. Función para cancelar la edición.
 */
export default function PaymentForm({
  residentId,
  createPayment,
  paymentToEdit,
  updatePayment,
  onEditCancel,
}: PaymentFormProps) {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const isEditMode = !!paymentToEdit && !!updatePayment;

  useEffect(() => {
    if (isEditMode) {
      setAmount(paymentToEdit.amount.toString());
      setPaymentDate(
        new Date(paymentToEdit.payment_date).toISOString().split("T")[0],
      );
    } else {
      setAmount("");
      setPaymentDate("");
    }
  }, [paymentToEdit, isEditMode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!amount || !paymentDate) {
      toast.error("Todos los campos son obligatorios", {
        style: { 
           background: "rgba(0,0,0,0.8)",
           color: "#fff",
           border: "1px solid rgba(255,255,255,0.1)",
           backdropFilter: "blur(10px)",
        },
      }) 
      return
    }

    const paymentData = {
      amount: Number(amount),
      payment_date: paymentDate,
    };

    try {
      if (isEditMode) {
        await updatePayment(paymentToEdit.id, paymentData);
        onEditCancel?.();
      } else {
        await createPayment({ ...paymentData, resident_id: residentId });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="
        mt-6
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-xl
        p-4
      "
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 p-4">
        <h2 className="text-lg font-semibold text-white/80 mb-2">
          {isEditMode ? "Editar Pago" : "Registrar Nuevo Pago"}
        </h2>
        <div>
          <label className="text-sm text-white/60 mb-1 block">Monto</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg px-3 py-2
          bg-white/5 border border-white/10
          text-white placeholder:text-white/40
          backdrop-blur-lg
          focus:outline-none focus:ring-0
          focus:border-white/20 focus:bg-white/10
          transition-all
          "
          />
        </div>

        <div>
          <label className="text-sm text-white/60 mb-1 block">
            Fecha de pago
          </label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="w-full rounded-lg px-3 py-2
          bg-white/5 border border-white/10
          text-white placeholder:text-white/40
          backdrop-blur-lg
          focus:outline-none focus:ring-0
          focus:border-white/20 focus:bg-white/10
          transition-all"
          />
        </div>

        <button
          type="submit"
          className="
            px-4 py-2 rounded-lg
           bg-white/10
           text-white
           border border-white/10
           hover:bg-white/20
           hover:scale-[1.02]
           active:scale-[0.98]
           transition-all
         "
        >
          {isEditMode ? "Actualizar Pago" : "Registrar Pago"}
        </button>

        {isEditMode && (
          <button
            type="button"
            onClick={onEditCancel}
            className="
              px-4 py-2 rounded-lg
              bg-white/10
              text-white
              border border-white/10
              hover:bg-white/20
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all
              ml-3
            "
             >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}
