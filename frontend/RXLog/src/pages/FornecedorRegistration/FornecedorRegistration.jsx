import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import styles from "./FornecedorRegistration.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FornecedorRegistration() {
  const [form, setForm] = useState({
    nomeFornecedor: "",
    cnpjFornecedor: "",
    emailFornecedor: "",
    telefoneFornecedor: "",
    celularFornecedor: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8080/fornecedores/cadastrar", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({
        nomeFornecedor: "",
        cnpjFornecedor: "",
        emailFornecedor: "",
        telefoneFornecedor: "",
        celularFornecedor: "",
      });

      toast.success("Fornecedor cadastrado com sucesso!", {
        style: { color: "#2ecc71" },
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar fornecedor. Verifique os dados.", {
        style: { color: "#E74C3C" },
      });
    }
  }

  const isFormValid =
    form.nomeFornecedor &&
    form.cnpjFornecedor &&
    form.emailFornecedor &&
    form.telefoneFornecedor &&
    form.celularFornecedor;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nome do Fornecedor</label>
            <input
              type="text"
              name="nomeFornecedor"
              value={form.nomeFornecedor}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>CNPJ</label>
            <input
              type="text"
              name="cnpjFornecedor"
              value={form.cnpjFornecedor}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="emailFornecedor"
              value={form.emailFornecedor}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Telefone</label>
            <input
              type="text"
              name="telefoneFornecedor"
              value={form.telefoneFornecedor}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="(00) 0000-0000"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Celular</label>
            <input
              type="text"
              name="celularFornecedor"
              value={form.celularFornecedor}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="(00) 90000-0000"
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!isFormValid}
          >
            Salvar Fornecedor
          </button>
        </form>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          toastStyle={{
            backgroundColor: "#fff",
            fontFamily: "Poppins",
            fontSize: "1rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </>
  );
}
