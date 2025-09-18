import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import styles from "./MedicamentExit.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

export default function MedicamentExit() {
  const [form, setForm] = useState({
    medicamentoId: "",
    quantidadeBaixa: "",
    dataBaixa: "",
  });

  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar medicamentos
  useEffect(() => {
    const token = localStorage.getItem("token"); // pegar JWT

    axios
      .get("http://localhost:8080/medicamentos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMedicamentos(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao carregar medicamentos.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Atualizar valores do formulário
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Submeter baixa
  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Usuário não autenticado.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/medicamentos/baixa",
        {
          medicamentoId: form.medicamentoId,
          quantidade: Number(form.quantidadeBaixa),
          data: form.dataBaixa,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setForm({ medicamentoId: "", quantidadeBaixa: "", dataBaixa: "" });
      toast.success("Baixa realizada com sucesso!", {
        style: { fontFamily: "Poppins", fontSize: "1rem", color: "#1c1c1c" },
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        toast.error("Você não tem permissão para realizar esta ação.", {
          style: { fontFamily: "Poppins", fontSize: "1rem", color: "#1c1c1c" },
        });
      } else {
        toast.error("Erro ao realizar baixa. Verifique os dados.", {
          style: { fontFamily: "Poppins", fontSize: "1rem", color: "#1c1c1c" },
        });
      }
    }
  }

  const isFormValid =
    form.medicamentoId && form.quantidadeBaixa && form.dataBaixa;

  return (
    <>
      <Helmet>
        <title>Baixa de Estoque | RXLog</title>
      </Helmet>
      <Header />
      <div className={styles.container}>
        {loading ? (
          <p>Carregando medicamentos...</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.rowTop}>
              <div className={styles.inputGroupSmall}>
                <label>Medicamento</label>
                <select
                  name="medicamentoId"
                  value={form.medicamentoId}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Selecione</option>
                  {medicamentos.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nomeComercial} - Lote: {m.loteMedicamento}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroupSmall}>
                <label>Quantidade</label>
                <input
                  type="number"
                  name="quantidadeBaixa"
                  value={form.quantidadeBaixa}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  min="1"
                />
              </div>
            </div>

            <div className={styles.rowBottom}>
              <label className={styles.dateLabel}>Data da baixa</label>
              <input
                type="date"
                name="dataBaixa"
                value={form.dataBaixa}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={!isFormValid}
            >
              Registrar Baixa
            </button>
          </form>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}
