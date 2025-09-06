import React from "react";
import { Link } from "react-router-dom";
import styles from "./Unauthorized.module.css";

function Unauthorized() {
  

  return (
    <div className={styles.container}>
      <div className={styles.code}>
        <p className={styles.four}>4</p>
        <p className={styles.zero}></p>
        <p className={styles.one}>1</p>
      </div>
      <div className={styles.text}>
        <h1 className={styles.errorText}>Você não está autenticado</h1>
        <p className={styles.subText}>
          É necessário estar logado para acessar essa página.
        </p>
      </div>
      <div className={styles.btn}>
        <Link to="/" className={styles.backButton}>
          Voltar
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
