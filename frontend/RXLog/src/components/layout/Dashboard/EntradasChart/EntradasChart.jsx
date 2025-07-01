import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";
import styles from "./EntradasChart.module.css";

const dadosEntradas = [
  { Categoria: "Analgésico", Quantidade: 180 },
  { Categoria: "Antibiótico", Quantidade: 150 },
  { Categoria: "Anti-inflamatório", Quantidade: 120 },
  { Categoria: "Psicotrópico", Quantidade: 100 },
  { Categoria: "Anti-hipertensivo", Quantidade: 85 },
];

export default function EntradasChart() {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={dadosEntradas}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="Categoria" tick={false}
          />
          <YAxis tick={{ fontFamily: "Montserrat", fontSize: 14, fill: "#333" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Quantidade" stroke="#4caf50" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
