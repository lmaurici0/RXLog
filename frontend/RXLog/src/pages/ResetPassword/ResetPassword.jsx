import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../ResetPassword/ResetPassword.module.css";
import { Helmet } from "react-helmet-async";

const schema = yup.object().shape({
  novaSenha: yup
    .string()
    .min(4, "A senha deve ter pelo menos 4 caracteres")
    .required("Nova senha obrigatória"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("novaSenha")], "As senhas devem coincidir")
    .required("Confirme a senha"),
});

function ResetPasswordPage() {
  const [isExiting, setIsExiting] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8080/auth/usuario/resetar-senha", {
        token,
        novaSenha: data.novaSenha,
      });

      toast.success("Senha redefinida com sucesso!", {
        style: { fontFamily: "Poppins" },
        autoClose: 2500,
        onClose: () => {
          setIsExiting(true);
          setTimeout(() => navigate("/"), 600);
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.erro || "Erro ao redefinir a senha.", {
        style: { fontFamily: "Poppins" },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Resetar Senha | RXLog</title>
      </Helmet>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className={`${styles.container} ${isExiting ? styles.fadeOut : ""}`}>
        <div className={styles.rightSection}>
          <h2 className={styles.passwordText}>Redefinir Senha</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label>Nova Senha</label>
              <input
                type="password"
                className={`${styles.inputField} ${styles.inputPass}`}
                {...register("novaSenha")}
              />
              {errors.novaSenha && (
                <p className={styles.errorMsg}>{errors.novaSenha.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Confirmar Senha</label>
              <input
                type="password"
                className={`${styles.inputField} ${styles.inputPass}`}
                {...register("confirmarSenha")}
              />
              {errors.confirmarSenha && (
                <p className={styles.errorMsg}>
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            <button type="submit" className={styles.signUpButton}>
              Redefinir Senha
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
