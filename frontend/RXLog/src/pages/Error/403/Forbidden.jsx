import React from "react";
import styles from "./Forbidden.module.css";

function Forbidden() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.code}>
        <p className={styles.four}>4</p>
        <p className={styles.zero}></p>
        <p className={styles.three}>3</p>
      </div>
      <div className={styles.text}>
        <h1 className={styles.errorText}>Acesso não autorizado</h1>
        <p className={styles.subText}>
          Você não tem permissão para visualizar esta página ou realizar essa ação.
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

export default Forbidden;
