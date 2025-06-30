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
import styles from "../graphic/graphic.module.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          width: "150px",
          textAlign: "center",
          backgroundColor: "#45BF86",
          color: "#fff",
          textTransform: "capitalize",
          fontWeight: "400",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #278C67",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "14px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <p>
          <strong>{label}</strong>
        </p>
        <p>Quantidade: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default function Graphic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/medicamentos/quantidade-por-categoria")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados do gráfico:", error);
      });
  }, []);

  return (
    <div className={styles.graficoContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="categoria"
            angle={0}
            interval={0}
            tick={{ fontFamily: "Poppins", fill: "black", fontSize: "1.1rem" }}
          />
          <YAxis
            domain={[0, "dataMax + 10"]}
            tick={{ fill: "black", fontFamily: "Poppins", fontSize: "17px" }}
          >
            <Label
              value="Quantidade disponível"
              angle={-90}
              position="insideLeft"
              className={styles.yAxisLabel}
            />
          </YAxis>

          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="quantidade" fill="#1E342D" barSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
