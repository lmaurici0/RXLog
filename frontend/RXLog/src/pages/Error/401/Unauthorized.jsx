import React from "react";
import styles from "./Unauthorized.module.css";

function Unauthorized() {
  const handleBack = () => {
    window.history.back();
  };

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
        <button className={styles.backButton} onClick={handleBack}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
