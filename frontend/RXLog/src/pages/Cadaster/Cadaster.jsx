import React from "react";
import styles from "../Cadaster/Cadaster.module.css";
import {Link} from "react-router-dom"

function Cadaster() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div>
          <h2>Bem-vindo à</h2>
          <h1>RXLog</h1>
          <p>sua gestão inteligente</p>
        </div>
        <div>
          <Link to="/signin" className={styles.signInButton}>
            Entrar
          </Link>
        </div>
      </div>

      {/* Parte dos inputs */}
      <div className={styles.rightSection}>
        <h2>Cadastrar</h2>
        <form>
          <div className={styles.formGroupRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome</label>
              <input id="name" className={styles.inputField} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cargo">Cargo</label>
              <input id="cargp" className={`${styles.inputField} ${styles.cargoInput}`}/>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" className={styles.inputField} type="email" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha</label>
            <input id="senha" className={styles.inputField} type="password" />
          </div>

          <button type="submit" className={styles.signUpButton}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadaster;
