import React, { useEffect } from "react";
import Header from "../../components/header/header";
import Carrossel from "../../components/carrossel/carrossel";
import Footer from "../../components/footer/footer";
import styles from "./homeScreen.module.css";
import image from "../../assets/images/image.png";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function HomeScreen() {
  useEffect(() => {
    axios.get("http://localhost:8080/alertas/vencidos")
      .then((res) => {
        res.data.forEach((med) => {
          toast.warn(`Medicamento vencido: ${med.nomeComercial} (Lote: ${med.loteMedicamento})`, {
            autoClose: 5000,
            hideProgressBar: false,
            position: "top-right",
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true
          });
        });
      })
      .catch((err) => {
        console.error("Erro ao buscar medicamentos vencidos", err);
      });
  }, []);

  return (
    <>
      <Header />
      <Carrossel />
      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <img src={image} alt="Ilustração RxLog" />
          </div>
          <div className={styles.aboutText}>
            <h2>QUEM SOMOS</h2>
            <p>
              A RxLog é uma empresa de soluções de armazenamento e estoque que
              visa a tecnologia e a facilidade dentro da área da saúde. Fundada
              em 2025, a RxLog trouxe uma nova abordagem ao ecossistema de
              armazenamento de medicamentos nos hospitais públicos, que muitas
              das vezes não possuíam sistemas de armazenamento. Nosso
              compromisso é acelerar mudanças e promover a inovação, sempre
              focados nas transformações do mundo e na construção de soluções
              que facilitem a vida cotidiana.
            </p>
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default HomeScreen;
