import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./PizzaChart.module.css";

const dadosEstoque = [
  { nome: "Estoque Regular", valor: 420 },
  { nome: "Estoque Expirado", valor: 80 },
];

const CORES = ["#4CAF50", "#F44336"];

// Tooltip personalizada com transição
const CustomTooltip = ({ active, payload }) => {
  return (
    <div
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s ease",
        backgroundColor: "#ffffff",
        padding: "1rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontSize: "0.9rem",
      }}
    >
      {active && payload && payload.length && (
        <div>
          <strong>{payload[0].name}</strong>: {payload[0].value}
        </div>
      )}
    </div>
  );
};

export default function PizzaChart() {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={dadosEstoque}
            dataKey="valor"
            nameKey="nome"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            isAnimationActive={true}
          >
            {dadosEstoque.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
