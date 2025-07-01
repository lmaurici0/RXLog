import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import styles from "../button/button.module.css";

export default function Button({
  filter,
  estoqueData,
  vencidosData,
  proximosData,
}) {
  async function gerarExcel() {
    const workbook = new ExcelJS.Workbook();

    let worksheet;
    if (filter === "estoque") {
      worksheet = workbook.addWorksheet("Relatório Estoque");
      worksheet.columns = [
        { header: "Categoria de Medicamento", key: "categoria", width: 30 },
        { header: "Quantidade em Estoque", key: "quantidade", width: 30 },
      ];

      estoqueData.forEach((item, index) => {
        const row = worksheet.addRow({
          categoria: item.categoria,
          quantidade: item.quantidade,
        });
        formatRow(row, index);
      });
    } else if (filter === "vencidos" || filter === "proximos") {
      const dados = filter === "vencidos" ? vencidosData : proximosData;
      worksheet = workbook.addWorksheet(
        filter === "vencidos"
          ? "Medicamentos Vencidos"
          : "Medicamentos Próximos"
      );
      worksheet.columns = [
        { header: "Nome Comercial", key: "nomeComercial", width: 30 },
        { header: "Lote", key: "loteMedicamento", width: 20 },
        { header: "Fornecedor", key: "nomeFornecedor", width: 30 },
        { header: "Data de Validade", key: "validadeMedicamento", width: 20 },
      ];

      dados.forEach((item, index) => {
        const fornecedorNome = item.fornecedor?.nomeFornecedor || "—";
        const dataFormatada = formatDateExcel(item.validadeMedicamento);
        const row = worksheet.addRow({
          nomeComercial: item.nomeComercial,
          loteMedicamento: item.loteMedicamento,
          nomeFornecedor: fornecedorNome,
          validadeMedicamento: dataFormatada,
        });
        formatRow(row, index);
      });
    }

    // Formata header
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

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const year = today.getFullYear();

    const fileName = `relatorio_${filter}_${day}${month}${year}.xlsx`;

    saveAs(blob, fileName);
  }

  function formatRow(row, index) {
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
        fgColor: { argb: index % 2 === 0 ? "FFFFFF" : "D9D9D9" },
      };
    });
  }

  function formatDateExcel(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const hasData =
    (filter === "estoque" && estoqueData.length > 0) ||
    (filter === "vencidos" && vencidosData.length > 0) ||
    (filter === "proximos" && proximosData.length > 0);

  return (
    <button
      className={styles.btn}
      onClick={gerarExcel}
      disabled={!hasData}
      title="Gerar planilha Excel do relatório atual"
    >
      <p>Gerar Planilha</p>
    </button>
  );
}
