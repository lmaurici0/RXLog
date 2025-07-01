import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./SaidasChart.module.css";

const dadosSaidas = [
  { Categoria: "Analgésico", Quantidade: 90 },
  { Categoria: "Antibiótico", Quantidade: 70 },
  { Categoria: "Anti-inflamatório", Quantidade: 55 },
  { Categoria: "Psicotrópico", Quantidade: 45 },
  { Categoria: "Anti-hipertensivo", Quantidade: 30 },
];

export default function SaidasChart() {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={dadosSaidas}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="Categoria" tick={false} />
          <YAxis
            tick={{ fontFamily: "Montserrat", fontSize: 14, fill: "#333" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Quantidade"
            stroke="#f44336"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
