import React from "react";
import Header from "../../components/header/header";
import Carrossel from "../../components/carrossel/Carrossel";
import Footer from "../../components/footer/Footer";
import styles from "./homeScreen.module.css";
import image from "../../assets/images/image.png";
import { Helmet } from "react-helmet-async";

function HomeScreen() {
  return (
    <>
      <Helmet>
        <title>Sobre nós | RXLog</title>
      </Helmet>
      <Header />
      
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
    </>
  );
}

export default HomeScreen;
