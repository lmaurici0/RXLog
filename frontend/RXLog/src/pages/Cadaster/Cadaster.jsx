import React, { useState } from "react";
import styles from "../Cadaster/Cadaster.module.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className={`${styles.container} ${isLogin ? styles.loginMode : ""}`}>
      <div className={styles.leftSection}>
        <div>
          <h2>Bem-vindo à</h2>
          <h1>RXLog</h1>
          <p>sua gestão inteligente</p>
        </div>
        <div>
          <button onClick={toggleMode} className={styles.signInButton}>
            {isLogin ? "Cadastrar" : "Entrar"}
          </button>
        </div>
      </div>

      <div className={styles.rightSection}>
        {!isLogin ? (
          <>
            <h2>Cadastrar</h2>
            <form>
              <div className={styles.formGroupRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nome</label>
                  <input id="name" className={styles.inputField} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cargo">Cargo</label>
                  <input
                    id="cargo"
                    className={`${styles.inputField} ${styles.cargoInput}`}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className={styles.inputField}
                  type="email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  className={styles.inputField}
                  type="password"
                />
              </div>

              <button type="submit" className={styles.signUpButton}>
                Enviar
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Senha</label>
                <input
                  type="password"   
                  className={styles.inputField}
                />
              </div>
              <button type="submit" className={styles.signUpButton}>
                Enviar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
