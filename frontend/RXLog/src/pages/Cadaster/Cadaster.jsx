import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Importa o hook de navegação
import styles from "../Cadaster/Cadaster.module.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // <-- Instancia o hook

  const toggleMode = () => setIsLogin(!isLogin);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin" && senha === "123") {
      navigate("/home"); // <-- Redireciona para a página inicial
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

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
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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
