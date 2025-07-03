import React from "react";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.code}>
        <p className={styles.four}>4</p>
        <p className={styles.zero}></p>
        <p className={styles.four}>4</p>
      </div>
      <div className={styles.text}>
        <h1 className={styles.errorText}>Página não encontrada</h1>
        <p className={styles.subText}>
          O conteúdo que você está tentando acessar não existe ou foi movido.
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

export default PageNotFound;
