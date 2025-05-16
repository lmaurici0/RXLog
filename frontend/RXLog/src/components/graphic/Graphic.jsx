import React from "react";
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

const data = [
  { categoria: "Analgésico", quantidade: 100 },
  { categoria: "Antibiótico", quantidade: 75 },
  { categoria: "anti-inflamatório", quantidade: 50 },
  { categoria: "Controlados", quantidade: 90 },
];

export default function BarChartComponent() {
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
            tick={{ fontFamily: "Montserrat Alternates", fill: "black", fontSize: "1rem"}}
          />
          <YAxis domain={[0, 100]}  tick={{ fill: "black", fontFamily:"Montserrat", fontSize: "14px" }}  >
            <Label
              value="Quantidade disponível (em %)"
              angle={-90}
              position="insideLeft"
              className={styles.yAxisLabel}
            />
          </YAxis>

          <Tooltip /> 
          <Bar dataKey="quantidade" fill="#1E342D" barSize={80}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
