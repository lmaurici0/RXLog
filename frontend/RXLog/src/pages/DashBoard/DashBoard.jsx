import {React, useEffect} from "react";

import Header from "../../components/header/header";
import styles from "../DashBoard/DashBoard.module.css";

import EstoqueChart from "../../components/layout/Dashboard/EstoqueChart/EstoqueChart";
import EntradasChart from "../../components/layout/Dashboard/EntradasChart/EntradasChart";
import SaidasChart from "../../components/layout/Dashboard/SaidasChart/SaidasChar";
import Footer from "../../components/footer/footer";
import TabelasMedicamentos from "../../components/layout/Dashboard/Table/Table";
import PizzaChart from "../../components/layout/Dashboard/PizzaChart/PizzaChart";


function DashBoard() {
  const usuario = {
    nome: "Eric Luis",
    email: "ericluismauricio@gmail.com",
    cargo: "Farmacêutico Responsável",
  };

  const movimentacoes = {
    entradas: 535,
    saidas: 290,
  };

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
