import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import styles from "./MedicamentExit.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MedicamentExit() {
  const [form, setForm] = useState({
    medicamentoId: "",
    quantidadeBaixa: "",
    dataBaixa: "",
  });

  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/medicamentos")
      .then((res) => setMedicamentos(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao carregar medicamentos.");
      });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/medicamentos/baixa", {
        medicamentoId: form.medicamentoId,
        quantidade: Number(form.quantidadeBaixa),
        data: form.dataBaixa,
      });

      setForm({
        medicamentoId: "",
        quantidadeBaixa: "",
        dataBaixa: "",
      });

      toast.success("Baixa realizada com sucesso!", {
         style: {
            fontFamily: "Poppins",
            fontSize: "1rem",
            color: "#1c1c1c"
          },
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao realizar baixa. Verifique a quantidade disponível.");
    }
  }

  const isFormValid =
    form.medicamentoId && form.quantidadeBaixa && form.dataBaixa;

  return (
    <>
      <Header />
      <div className={styles.container}>
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
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}
