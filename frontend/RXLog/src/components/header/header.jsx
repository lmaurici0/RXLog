import React, { useState } from "react";
import styles from "../header/header.module.css";
import { FaBars, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>

        <div
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>RxLog</h1>
        </div>
      </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <a href="#home">Home</a>
          <a href="#dashboard">DashBoards</a>
          <a href="#contato">Contato</a>
          <a href="#gestao">Gestão</a>
        </nav>

        <button className={styles.userButton}>
          <FaUserCircle className={styles.userImage}/>
        </button>
    </header>
  );
};

export default Header;
