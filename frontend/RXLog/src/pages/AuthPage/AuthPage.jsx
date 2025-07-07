import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../AuthPage/AuthPage.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schemaLogin = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  senha: yup.string().required("Senha obrigatória"),
});
const schemaCadastro = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
  cargo: yup.string().required("Cargo obrigatório"),
  instituicao: yup.string().required("Instituição obrigatória"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  senha: yup
    .string()
    .min(4, "Senha mínima de 4 caracteres")
    .required("Senha obrigatória"),
});


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isLogin ? schemaLogin : schemaCadastro),
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  const onSubmit = async (data) => {
    if (isLogin) {
      try {
        await axios.post("http://localhost:8080/auth/usuario/login", {
          email: data.email,
          senha: data.senha,
        });
        toast.success("Login realizado com sucesso!", {
          style: {
            fontFamily: "Poppins",
            fontSize: "1rem",
            backgroundColor: "#45BF86",
          },
          autoClose: 3000,
          onClose: () => {
            setIsExiting(true);
            setTimeout(() => navigate("/dashboards"), 600);
          },
        });
      } catch (err) {
        toast.error("Email ou senha incorretos.", {
          style: {
            backgroundColor: "#E74C3C",
            color: "#fff",
            fontFamily: "Poppins",
            fontSize: "1rem",
          },
          autoClose: 3000,
        });
      }
    } else {
      try {
        await axios.post("http://localhost:8080/auth/usuario/signup", {
          nomeUsuario: data.nome,
          emailUsuario: data.email,
          senhaUsuario: data.senha,
          cargoUsuario: data.cargo,
        });
        toast.success("Cadastro realizado com sucesso!", {
          style: {
            fontFamily: "Poppins",
            fontSize: "1rem",
            backgroundColor: "#45BF86",
          },
          autoClose: 3000,
        });
        setIsLogin(true);
        reset();
      } catch (err) {
        toast.error(
          "Erro ao cadastrar. Verifique todos os campos e tente novamente.",
          {
            style: {
              backgroundColor: "#E74C3C",
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: "1rem",
            },
            autoClose: 3000,
          }
        );
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div
        className={`${styles.container} ${isLogin ? styles.loginMode : ""} ${
          isExiting ? styles.fadeOut : ""
        }`}
      >
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
          <h2>{isLogin ? "Login" : "Cadastro"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <div className={styles.formGroupRow}>
                <div className={styles.formGroup}>
                  <label>Nome</label>
                  <input className={styles.inputField} {...register("nome")} />
                  {errors.nome && (
                    <p className={styles.errorMsg}>{errors.nome.message}</p>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Cargo</label>
                  <select className={styles.inputField} {...register("cargo")}>
                    <option value="">Selecione</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                    <option value="RECEPCIONISTA">Recepcionista</option>
                    <option value="FARMACÊUTICO">Farmacêutico</option>
                  </select>
                  {errors.cargo && (
                    <p className={styles.errorMsg}>{errors.cargo.message}</p>
                  )}
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Email</label>
              <input className={styles.inputField} {...register("email")} />
              {errors.email && (
                <p className={styles.errorMsg}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Senha</label>
              <input
                type="password"
                className={styles.inputField}
                {...register("senha")}
              />
              {errors.senha && (
                <p className={styles.errorMsg}>{errors.senha.message}</p>
              )}
            </div>

            <button type="submit" className={styles.signUpButton}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
