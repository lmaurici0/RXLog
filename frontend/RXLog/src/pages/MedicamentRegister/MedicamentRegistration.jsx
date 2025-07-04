import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import styles from "./MedicamentRegistration.module.css";

export default function MedicamentRegistration() {
  const [form, setForm] = useState({
    nomeComercial: "",
    nomeFarmaceutico: "",
    tipoMedicamento: "",
    quantidadeMedicamento: "",
    validadeMedicamento: "",
    loteMedicamento: "",
    tarjaMedicamento: "",
    fornecedorId: "",
  });
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/fornecedores")
      .then(res => setFornecedores(res.data))
      .catch(console.error);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.fornecedorId) {
      alert("Selecione um fornecedor");
      return;
    }

    try {
      await axios.post("http://localhost:8080/medicamentos/cadastrar", {
        nomeComercial: form.nomeComercial,
        nomeFarmaceutico: form.nomeFarmaceutico,
        tipoMedicamento: form.tipoMedicamento,
        quantidadeMedicamento: Number(form.quantidadeMedicamento),
        validadeMedicamento: form.validadeMedicamento,
        loteMedicamento: form.loteMedicamento,
        tarjaMedicamento: form.tarjaMedicamento,
        fornecedor: { id: form.fornecedorId },
      });

      setForm({
        nomeComercial: "",
        nomeFarmaceutico: "",
        tipoMedicamento: "",
        quantidadeMedicamento: "",
        validadeMedicamento: "",
        loteMedicamento: "",
        tarjaMedicamento: "",
        fornecedorId: "",
      });
      alert("Medicamento cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar medicamento.");
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.inputGroup}>
  <label>Fornecedor</label>
  <select
    name="fornecedorId"
    value={form.fornecedorId}
    onChange={handleChange}
    className={styles.select}
    required
  >
    <option value="">Selecione o fornecedor</option>
    {fornecedores.map(fornecedor => (
      <option key={fornecedor.id} value={fornecedor.id}>
        {fornecedor.nomeFornecedor}
      </option>
    ))}
  </select>
</div>


          <div className={styles.inputGroup}>
            <label>Nome Comercial</label>
            <input
              type="text"
              name="nomeComercial"
              value={form.nomeComercial}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Nome Farmacêutico</label>
            <input
              type="text"
              name="nomeFarmaceutico"
              value={form.nomeFarmaceutico}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Quantidade</label>
            <input
              type="number"
              name="quantidadeMedicamento"
              value={form.quantidadeMedicamento}
              onChange={handleChange}
              className={styles.input}
              required
              min="0"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Lote</label>
            <input
              type="text"
              name="loteMedicamento"
              value={form.loteMedicamento}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Validade</label>
            <input
              type="date"
              name="validadeMedicamento"
              value={form.validadeMedicamento}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Categoria</label>
            <input
              type="text"
              name="tipoMedicamento"
              value={form.tipoMedicamento}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tarja</label>
            <select
              name="tarjaMedicamento"
              value={form.tarjaMedicamento}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Selecione</option>
              <option value="INCOLOR">Incolor</option>
              <option value="AMARELA">Amarela</option>
              <option value="VERMELHA">Vermelha</option>
              <option value="PRETA">Preta</option>
            </select>
          </div>

          <button type="submit" className={styles.button}>Salvar</button>
        </form>
      </div>
    </>
  );
}
