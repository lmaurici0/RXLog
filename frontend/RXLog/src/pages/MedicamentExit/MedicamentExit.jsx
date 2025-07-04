import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
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

    if (!form.medicamentoId || !form.quantidadeBaixa || !form.dataBaixa) {
      toast.error("Preencha todos os campos.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/medicamentos/baixa", {
        medicamentoId: form.medicamentoId,
        quantidade: Number(form.quantidadeBaixa),
        data: form.dataBaixa, // se quiser usar no backend
      });

      setForm({
        medicamentoId: "",
        quantidadeBaixa: "",
        dataBaixa: "",
      });

      toast.success("Baixa realizada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao realizar baixa. Verifique a quantidade disponível.");
    }
  }

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
                <option value="">Selecione o medicamento</option>
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
            <div className={styles.inputGroupFull}>
              <label>Data da baixa</label>
              <input
                type="date"
                name="dataBaixa"
                value={form.dataBaixa}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Confirmar Baixa
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}
