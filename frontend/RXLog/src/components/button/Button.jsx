import React, { useEffect, useState } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import styles from "../button/button.module.css";

export default function Button() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/medicamentos/disponibilidade")
      .then((res) => setData(res.data))
      .catch((err) =>
        console.error("Erro ao carregar dados do relatório:", err)
      );
  }, []);

  async function gerarExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Relatório Estoque");

    worksheet.columns = [
      { header: "Categoria de Medicamento", key: "categoria", width: 30 },
      { header: "Quantidade em Estoque", key: "quantidade", width: 30 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.height = 20;
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, size: 13 };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
    });

    data.forEach((item, index) => {
      const rowIndex = index + 2;
      const row = worksheet.addRow({
        categoria: item.categoria,
        quantidade: item.quantidade,
      });

      row.height = 15;

      row.eachCell((cell) => {
        cell.font = { size: 12 };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };

        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: index % 2 === 0 ? "FFFFFF" : "D9D9D9",
          },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "disponibilidade_medicamentos.xlsx");
  }

  return (
    <button className={styles.btn} onClick={gerarExcel} disabled={data.length === 0}>
      <p>Gerar Planilha</p>
    </button>
  );
}
