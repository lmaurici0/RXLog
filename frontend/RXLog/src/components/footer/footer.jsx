import React from "react";
import styles from "./Footer.module.css";
import { AiTwotoneMail } from "react-icons/ai";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactContent}>
        <h2>Fale Conosco</h2>

        <div className={styles.social}>
          <div className={styles.contactItem}>
            <AiTwotoneMail />
            <a href="mailto:somosrx@gmail.com">somosrx@gmail.com</a>
          </div>

          <div className={styles.contactItem}>
            <CiInstagram />
            <a
              href="https://instagram.com/somosrx"
              target="_blank"
              rel="noopener noreferrer"
            >
              @somosrx
            </a>
          </div>

          <div className={styles.contactItem}>
            <CiLinkedin />
            <a
              href="https://linkedin.com/company/somosrx"
              target="_blank"
              rel="noopener noreferrer"
            >
              /somosrx
            </a>
          </div>

          <div className={styles.contactItem}>
            <MdLocationOn style={{ fontSize: "50px" }} />
            <a
              href="https://linkedin.com/company/somosrx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.locationIcon}
            >
              Rua Alcantara, 113. Vila Maria Baixa. São Paulo
            </a>
          </div>
        </div>

        {/* Barra com degradê */}
        <hr
          style={{
            height: "4px",
            width: "60%",
            border: "none",
            borderRadius:"5px",
            background: "linear-gradient(to right, #00968a, #f2a384)",
            margin: "2rem 0"
          }}
        />

        <div className={styles.logoContainer}>
          <small>
            © {new Date().getFullYear()} - Todos os direitos reservados
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
