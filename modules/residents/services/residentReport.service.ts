import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Resident } from "@/modules/residents/types/resident.type";
import { Medication } from "@/modules/medications/types/medication.type";
import { Payment } from "@/modules/payments/types/payment.type";

type Props = {
  resident: Resident;
  medications: Medication[];
  payments: Payment[];
};

const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export function generateResidentReport({
  resident,
  medications,
  payments,
}: Props) {
  const doc = new jsPDF();

  const margin = 10;
  let y = 20;

  // 🧠 HEADER
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 110, 203);
  doc.text("VELORA", margin, y);

  doc.setDrawColor(26, 110, 203);
  doc.line(margin, y + 2, margin + 40, y + 2);

  doc.setDrawColor(103, 179, 157);
  doc.line(margin, y + 4, margin + 60, y + 4);

  y += 8;

  doc.setFontSize(12);
  doc.setTextColor(69, 148, 147);
  doc.text("Reporte de Residente", margin, y);

  y += 6;

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, margin, y);

  y += 10;

  // ========================
  // 🧾 TABLA INFO
  // ========================
  const age = calculateAge(resident.birth_date);

  autoTable(doc, {
    startY: y,
    head: [["Campo", "Valor"]],
    body: [
      ["Nombre", resident.name],
      ["Edad", String(age)],
    ],
    theme: "grid",
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [225, 238, 255],
      textColor: [26, 110, 203],
    },
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // ========================
  // 💊 MEDICACIONES
  // ========================
  autoTable(doc, {
    startY: y,
    head: [["Medicaciones"]],
    body:
      medications.length > 0
        ? medications.map((m) => [m.name])
        : [["No hay medicaciones registradas"]],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [225, 238, 255],
      textColor: [26, 110, 203],
    },
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // ========================
  // 💵 PAGOS
  // ========================
  autoTable(doc, {
    startY: y,
    head: [["Monto", "Fecha"]],
    body:
      payments.length > 0
        ? payments.map((p) => [
            `$${p.amount}`,
            new Date(p.payment_date).toLocaleDateString(),
          ])
        : [["No hay pagos registrados", ""]],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [225, 238, 255],
      textColor: [26, 110, 203],
    },
  });

  // ========================
  // FOOTER
  // ========================
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(10);
  doc.setTextColor(100);

  doc.text("Reporte generado por Velora", margin, pageHeight - 10);

  doc.text("Velora © 2026", doc.internal.pageSize.getWidth() - margin, pageHeight - 10, {
    align: "right",
  });

  doc.save(`residente-${resident.name}.pdf`);
}