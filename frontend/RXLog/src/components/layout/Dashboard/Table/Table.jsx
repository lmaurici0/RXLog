import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Table.module.css";
import ExcelJS from "exceljs";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR");
}

export default function TabelasMedicamentos() {
  const [expiredData, setExpiredData] = useState([]);
  const [nearExpiryData, setNearExpiryData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/alertas/vencidos")
      .then((res) => setExpiredData(res.data))
      .catch(() => setExpiredData([]));

    axios.get("http://localhost:8080/alertas/vencimento/proximo")
      .then((res) => setNearExpiryData(res.data))
      .catch(() => setNearExpiryData([]));
  }, []);

  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Medicamentos");

    worksheet.columns = [
      { header: "Nome Comercial", key: "nomeComercial", width: 30 },
      { header: "Lote", key: "loteMedicamento", width: 15 },
      { header: "Fornecedor", key: "nomeFornecedor", width: 25 },
      { header: "Data de Validade", key: "validadeMedicamento", width: 20 },
      { header: "Status", key: "status", width: 15 },
    ];

    const allData = [
      ...expiredData.map((med) => ({ ...med, status: "Vencido" })),
      ...nearExpiryData.map((med) => ({ ...med, status: "Próximo do Vencimento" })),
    ];

    allData.forEach((med) => {
      worksheet.addRow({
        nomeComercial: med.nomeComercial,
        loteMedicamento: med.loteMedicamento,
        nomeFornecedor: med.fornecedor?.nomeFornecedor || "—",
        validadeMedicamento: formatDate(med.validadeMedicamento),
        status: med.status,
      });
    });

    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "medicamentos_alertas.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderTable = (medicamentos) => (
    <table className={styles.table}>
      <thead>
        <tr>
          {["Nome Comercial", "Lote", "Fornecedor", "Data de Validade"].map((head) => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {medicamentos.length === 0 ? (
          <tr>
            <td colSpan={4} className={styles.noData}>
              Nenhum medicamento encontrado.
            </td>
          </tr>
        ) : (
          medicamentos.map((med) => (
            <tr key={`${med.id}-${med.loteMedicamento}`}>
              <td>{med.nomeComercial}</td>
              <td>{med.loteMedicamento}</td>
              <td>{med.fornecedor?.nomeFornecedor || "—"}</td>
              <td>{formatDate(med.validadeMedicamento)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      <div className={styles.tablesWrapper}>
        <section className={styles.tableSection}>
          <h2>Medicamentos Vencidos</h2>
          {renderTable(expiredData)}
        </section>

        <section className={styles.tableSection}>
          <h2>Medicamentos A Vencer</h2>
          {renderTable(nearExpiryData)}
        </section>
      </div>

    </div>
  );
}
