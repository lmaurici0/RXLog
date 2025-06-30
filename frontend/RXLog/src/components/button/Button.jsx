import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "../button/button.module.css";

export default function Button() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/medicamentos/quantidade-por-categoria")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Erro ao carregar dados do relatório:", err));
  }, []);

  function gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Relatório de Medicamentos", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Categoria", "Quantidade"]],
      body: data.map((item) => [item.categoria, item.quantidade]),
      headStyles: {
        fillColor: [173, 216, 230],
        textColor: 0,
        lineWidth: 0,
        lineColor: [255, 255, 255], 
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [230, 230, 230] },
      styles: {
        fontSize: 12,
        textColor: 0,
        lineWidth: 0.3,
        lineColor: [200, 200, 200],
      },
    });

    doc.save("relatorio_medicamentos.pdf");
  }

  return (
    <button className={styles.btn} onClick={gerarPDF} disabled={data.length === 0}>
      <p>Gerar relatório PDF</p>
    </button>
  );
}
