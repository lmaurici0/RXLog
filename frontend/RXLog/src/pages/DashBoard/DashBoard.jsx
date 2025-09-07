import React, { useEffect, useState } from "react";
import axios from "axios"; 

import Header from "../../components/header/Header";
import styles from "../DashBoard/DashBoard.module.css";

import EstoqueChart from "../../components/layout/Dashboard/EstoqueChart/EstoqueChart";
import EntradasChart from "../../components/layout/Dashboard/EntradasChart/EntradasChart";
import SaidasChart from "../../components/layout/Dashboard/SaidasChart/SaidasChart"; 
import Footer from "../../components/footer/Footer";
import TabelasMedicamentos from "../../components/layout/Dashboard/Table/Table";
import PizzaChart from "../../components/layout/Dashboard/PizzaChart/PizzaChart";

function DashBoard() {
  const [movimentacoes, setMovimentacoes] = useState({ entradas: 0, saidas: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    axios.get("http://localhost:8080/movimentacoes/total", {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    })
    .then(res => setMovimentacoes(res.data))
    .catch(err => console.error("Erro ao buscar movimentações:", err));
  }, []);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.barChart}>
          <EstoqueChart />
          <PizzaChart />
        </div>

        <div className={styles.lineChart}>
          <EntradasChart />
          <SaidasChart />
        </div>

        <div className={styles.tables}>
          <TabelasMedicamentos />
        </div>

        <div className={styles.cards}>
          <div className={styles.movCard}>
            <h2>Minhas Movimentações</h2>
            <p><strong>Entradas:</strong> {movimentacoes.entradas}</p>
            <p><strong>Saídas:</strong> {movimentacoes.saidas}</p>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default DashBoard;
