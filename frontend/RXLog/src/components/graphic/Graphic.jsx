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
  { categoria: "Anti-inflamatório", quantidade: 50 },
  { categoria: "Controlados", quantidade: 90 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        width:"150px",
        textAlign:"center",
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
      }}>
        <p><strong>{label}</strong></p>
        <p>Quantidade: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default function Graphic() {
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
            tick={{ fontFamily: "Poppins", fill: "black", fontSize: "1.1rem"}}
          />
          <YAxis domain={[0, 100]}  tick={{ fill: "black", fontFamily:"Poppins", fontSize: "17px" }}  >
            <Label
              value="Quantidade disponível (em %)"
              angle={-90}
              position="insideLeft"
              className={styles.yAxisLabel}
            />
          </YAxis>

          <Tooltip content={<CustomTooltip />} /> 
          <Bar dataKey="quantidade" fill="#1E342D" barSize={80}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}