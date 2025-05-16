import React, { useState } from "react";
import Header from "../../components/header/header";
import styles from "./Cadaster.module.css";

const Cadaster = () => {
  const [formData, setFormData] = useState({
    nome_usuario: "",
    email_usuario: "",
    senha_usuario: "",
    cargo_usuario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/cadastrarUsuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Usuário cadastrado:", data);
      })
      .catch((err) => console.error("Erro ao cadastrar usuário:", err));
  };

  return (
    <>
      <Header />
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.formBox}>
          <div className={styles.inputGrid}>
            <label>
              Nome:
              <input
                type="text"
                name="nome_usuario"
                value={formData.nome_usuario}
                onChange={handleChange}
                required
                className={styles.Userinput}
                placeholder="Digite seu nome...."
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email_usuario"
                value={formData.email_usuario}
                onChange={handleChange}
                required
                className={styles.Userinput}
                placeholder="Digite seu email...."
              />
            </label>

            <label>
              Senha:
              <input
                type="password"
                name="senha_usuario"
                value={formData.senha_usuario}
                onChange={handleChange}
                required
                className={styles.Userinput}
                placeholder="Digite sua senha..."
              />
            </label>

            <label>
              Cargo:
              <select className={styles.Userselect}
                name="cargo_usuario"
                value={formData.cargo_usuario}
                onChange={handleChange}
                required
              >
                <option value="" className={styles.TitleSelect}><span className={styles.OptionSelect}>Selecione um cargo</span></option>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="RECEPCIONISTA">Recepcionista</option>
                <option value="FARMACÊUTICO">Farmacêutico</option>
              </select>
            </label>
          </div>

          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
      </div>
    </>
  );
};

export default Cadaster;
