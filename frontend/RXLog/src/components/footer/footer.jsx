import React from 'react';
import styles from './Footer.module.css';
import { AiTwotoneMail } from "react-icons/ai";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactContent}>
        <h2>Contato</h2>
        <div className={styles.social}>
          <div className={styles.contactItem}>
            <AiTwotoneMail />
            <a href="mailto:somosrx@gmail.com">somosrx@gmail.com</a>
          </div>
          
          <div className={styles.contactItem}>
            <CiInstagram />
            <a href="#instagram">@somosrx</a>
          </div>

          <div className={styles.contactItem}>
            <CiLinkedin />
            <a href="#linkedin">/somosrx</a>
          </div>

          <div className={styles.contactItem}>
          <IoLocationOutline />
            <span>Rua Alcantara, 113. Vila Maria Baixa – São Paulo</span>
          </div>
        </div>


        <div className={styles.logoContainer}>
          <h3 className={styles.logo}>RxLog</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;