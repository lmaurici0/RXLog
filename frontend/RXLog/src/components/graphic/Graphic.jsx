import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { FaFilter } from "react-icons/fa";
import styles from "../graphic/graphic.module.css";
import Button from "../button/button";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          width: "180px",
          backgroundColor: "#E0F7FA",
          color: "#000",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #D9D9D9",
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: "500",
            fontSize: "15px",
            color: "#000",
          }}
        >
          {label}
        </p>
        <p
          style={{
            marginTop: 5,
            marginBottom: 0,
            color: "#000",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Quantidade: <strong>{payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR");
}

export default function Graphic() {
  const [data, setData] = useState([]);
  const [expiredData, setExpiredData] = useState([]);
  const [nearExpiryData, setNearExpiryData] = useState([]);
  const [filter, setFilter] = useState("estoque"); // 'estoque', 'vencidos', 'proximos'

  useEffect(() => {
    axios
      .get("http://localhost:8080/medicamentos/disponibilidade")
      .then((response) => setData(response.data))
      .catch((error) =>
        console.error("Erro ao carregar dados do gráfico:", error)
      );

    axios
      .get("http://localhost:8080/alertas/vencidos")
      .then((response) => setExpiredData(response.data))
      .catch((error) =>
        console.error(
          "Erro ao carregar dados dos medicamentos vencidos:",
          error
        )
      );

    axios
      .get("http://localhost:8080/alertas/vencimento/proximo")
      .then((response) => setNearExpiryData(response.data))
      .catch((error) =>
        console.error(
          "Erro ao carregar dados dos medicamentos próximos do vencimento:",
          error
        )
      );
  }, []);

  const getDateColor = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    if (date < today) return "#f44336"; // vermelho - vencido
    const diffDays = (date - today) / (1000 * 60 * 60 * 24);
    if (diffDays <= 30) return "#ffeb3b"; // amarelo - próximo
    return "inherit";
  };

  const renderTable = (medicamentos) => (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Poppins",
      }}
    >
      <thead>
        <tr>
          {["Nome Comercial", "Lote", "Fornecedor", "Data de Validade"].map(
            (head) => (
              <th
                key={head}
                style={{
                  borderBottom: "2px solid #1E342D",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {head}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {medicamentos.length === 0 && (
          <tr>
            <td colSpan={4} style={{ padding: "8px", textAlign: "center" }}>
              Nenhum medicamento encontrado.
            </td>
          </tr>
        )}
        {medicamentos.map((med) => (
          <tr key={`${med.id}-${med.loteMedicamento}`}>
            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              {med.nomeComercial}
            </td>
            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              {med.loteMedicamento}
            </td>
            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              {med.fornecedor?.nomeFornecedor || "—"}
            </td>
            <td
              style={{
                padding: "8px",
                borderBottom: "1px solid #ddd",
                color: getDateColor(med.validadeMedicamento),
                fontWeight: "600",
              }}
            >
              {formatDate(med.validadeMedicamento)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={styles.graficoContainer} style={{ padding: "1rem" }}>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: "16px",
          color: "#1E342D",
        }}
      >
        <FaFilter />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "6px 12px",
            fontFamily: "Poppins",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          aria-label="Filtrar visualização"
        >
          <option value="estoque">Gráfico de Estoque</option>
          <option value="vencidos">Medicamentos Vencidos</option>
          <option value="proximos">Medicamentos Próximos do Vencimento</option>
        </select>
      </div>

      {filter === "estoque" && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis
              dataKey="categoria"
              tick={{ fontFamily: "Poppins", fontSize: "14px", fill: "#000" }}
            />
            <YAxis
              domain={[0, "dataMax + 10"]}
              tick={{ fontFamily: "Poppins", fontSize: "14px", fill: "#000" }}
            >
              <Label
                value="Quantidade disponível"
                angle={-90}
                position="insideLeft"
                offset={10}
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  fill: "#555",
                }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="quantidade"
              fill="#1E342D"
              barSize={60}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {filter === "vencidos" && renderTable(expiredData)}

      {filter === "proximos" && renderTable(nearExpiryData)}

      <Button
        filter={filter}
        estoqueData={data}
        vencidosData={expiredData}
        proximosData={nearExpiryData}
      />
    </div>
  );
}
