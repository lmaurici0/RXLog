import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";
import styles from "./EntradasChart.module.css";
import axios from "axios";

export default function EntradasChart() {
  const [dadosEntradas, setDadosEntradas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/movimentacoes/entradas-por-categoria")
      .then(res => {
        const dadosComEntradas = res.data.map(item => ({
          categoria: item.categoria,
          entradas: item.quantidade
        }));
        setDadosEntradas(dadosComEntradas);
      })
      .catch(err => console.error("Erro ao buscar entradas:", err));
  }, []);

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart 
          data={dadosEntradas} 
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="categoria" tick={false} />
          <YAxis tick={{ fontFamily: "Montserrat", fontSize: 14, fill: "#333" }} />
          <Tooltip formatter={(value) => [`${value}`, "Entradas"]} />
          <Legend formatter={(value) => `Entradas`} />
          <Line type="monotone" dataKey="entradas" stroke="#00968a" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
