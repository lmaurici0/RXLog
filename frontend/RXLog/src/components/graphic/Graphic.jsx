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
          width: "180px",
          backgroundColor: "#E0F7FA",
          color: "#fff",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #D9D9D9",
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p style={{ margin:0, fontWeight: "500", fontSize: "15px", color: "#000" }}>
          {label}
        </p>
        <p style={{ marginTop:5, marginBottom:0, color:"#000", fontWeight:"500", fontSize: "14px" }}>
          Quantidade: <strong>{payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default function Graphic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/medicamentos/disponibilidade")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados do gráfico:", error);
      });
  }, []);

  return (
    <div className={styles.graficoContainer}>
      <ResponsiveContainer >
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
    </div>
  );
}
