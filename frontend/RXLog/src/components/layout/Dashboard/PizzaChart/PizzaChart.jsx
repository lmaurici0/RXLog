import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./PizzaChart.module.css";

const CORES = ["#4CAF50", "#F44336"]; // Verde: regular, Vermelho: vencido

const CustomTooltip = ({ active, payload }) => {
  return (
    <div
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s ease",
        backgroundColor: "#ffffff",
        padding: "1rem",
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
  const [dadosEstoque, setDadosEstoque] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/medicamentos/estoque-vencido-vs-regular")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar dados");
        }
        return res.json();
      })
      .then((dados) => {
        setDadosEstoque(dados);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados da API:", err);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <div className={styles.container}>Carregando gráfico...</div>;
  }

  if (!dadosEstoque.length) {
    return <div className={styles.container}>Nenhum dado disponível.</div>;
  }

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={250}>
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
