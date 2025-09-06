import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";
import styles from "./SaidasChart.module.css";
import axios from "axios";

export default function SaidasChart() {
  const [dadosSaidas, setDadosSaidas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/movimentacoes/saidas-por-categoria")
      .then(res => {
        // Transforma "quantidade" em "saidas"
        const dadosComSaidas = res.data.map(item => ({
          categoria: item.categoria,
          saidas: item.quantidade
        }));
        setDadosSaidas(dadosComSaidas);
      })
      .catch(err => console.error("Erro ao buscar saídas:", err));
  }, []);

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart 
          data={dadosSaidas} 
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="categoria" tick={false} />
          <YAxis tick={{ fontFamily: "Montserrat", fontSize: 14, fill: "#333" }} />
          <Tooltip formatter={(value) => [`${value}`, "Saídas"]} />
          <Legend formatter={(value) => `Saídas`} />
          <Line type="monotone" dataKey="saidas" stroke="#f44336" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
