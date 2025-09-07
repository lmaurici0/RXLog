import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 
import styles from "./Contact.module.css";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.contactContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> 
      </button>

      <div className={styles.leftPanel}>
        <div className={styles.overlayTop}>
          <h2>Quer falar<br />conosco?</h2>
          <p>Estamos prontos para te ouvir.</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <h2 className={styles.title}>FALE CONOSCO</h2>

        <form className={styles.form}>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" />

          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" />

          <label htmlFor="message">Mensagem</label>
          <textarea id="message" rows="5" />

          <button type="submit">Enviar Mensagem</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
