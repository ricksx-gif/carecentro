import jsPDF from "jspdf";
import { Resident } from "@/modules/residents/types/resident.type";

export function generateResidentsReport(residents: Resident[]) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;

  let y = 20;

  // 🧠 HEADER
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 110, 203);
  doc.text("VELORA", margin, y);

  doc.setDrawColor(26, 110, 203);
  doc.setLineWidth(0.5);
  doc.line(margin, y + 2, margin + 40, y + 2);

  doc.setDrawColor(103, 179, 157);
  doc.line(margin, y + 4, margin + 60, y + 4);

  y += 8;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(69, 148, 147);
  doc.text("Sistema de Gestión de Residentes", margin, y);

  y += 6;

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, margin, y);

  y += 10;

  // 🔹 separación
  doc.setDrawColor(200);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);

  y += 8;

  // 🧠 HEADER TABLA
  doc.setFillColor(225, 238, 255);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 9, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 110, 203);

  doc.text("Nombre", margin, y);
  doc.text("Fecha de nacimiento", pageWidth - margin, y, { align: "right" });

  y += 5;

  doc.setDrawColor(180);
  doc.line(margin, y, pageWidth - margin, y);

  y += 5;

  // 🧠 CONTENIDO
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);

  if (residents.length === 0) {
    doc.text("No hay residentes registrados", margin, y);
  } else {
    residents.forEach((resident, index) => {
      if (y > 255) {
        doc.addPage();
        y = 20;
      }

      // 🎨 filas alternadas suaves
      if (index % 2 === 0) {
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, y - 3, pageWidth - margin * 2, 7, "F");
      }

      const birthDate = new Date(resident.birth_date).toLocaleDateString();

      doc.text(resident.name, margin, y);
      doc.text(birthDate, pageWidth - margin, y, { align: "right" });

      y += 6;
    });
  }

  // 🔹 FOOTER DINÁMICO
  y += 6;

  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);

  y += 5;

  doc.setFontSize(10);
  doc.setTextColor(100);

  doc.text(`Total de residentes: ${residents.length}`, margin, y);

  doc.text("Velora © 2026", pageWidth - margin, y, {
    align: "right",
  });

  // 📥 DESCARGA
  doc.save("reporte-residentes.pdf");
}