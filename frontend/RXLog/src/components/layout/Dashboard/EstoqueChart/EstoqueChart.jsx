import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Cell
} from "recharts";
import styles from "./EstoqueChart.module.css";

export default function EstoqueChart() {
  const [dadosEstoquePorCategoria, setDadosEstoquePorCategoria] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/medicamentos/disponibilidade")
      .then(response => {
        setDadosEstoquePorCategoria(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados do estoque:", error);
      });
  }, []);

  const totalMedicamentos = dadosEstoquePorCategoria.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  const cores = [
    "#111417", 
    "#1f1f48", 
    "#57636c", 
    "#8b97a2"  
  ];

  return (
    <div className={styles.container}>
      <p className={styles.total}>
        Total em estoque: <strong>{totalMedicamentos}</strong>
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          layout="vertical"
          data={dadosEstoquePorCategoria}
          margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
          <XAxis
            type="number"
            tick={{ fontFamily: "Montserrat", fontSize: 14, fill: "#333" }}
            domain={[0, "dataMax + 10"]}
          />
          <YAxis
            dataKey="categoria"
            type="category"
            tick={{ fontFamily: "Montserrat", fontSize: 14, fill: "#333" }}
          />
          <Tooltip />
          <Bar dataKey="quantidade" barSize={35} radius={[6, 6, 6, 6]}>
            {dadosEstoquePorCategoria.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={cores[index % cores.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
