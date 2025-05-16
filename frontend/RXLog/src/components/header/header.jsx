import React, { useState, useRef, useEffect } from "react";
import styles from "../header/header.module.css";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  // Fecha o menu lateral ou o user menu se clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.menuButton}`)
      ) {
        setIsMenuOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>RxLog</h1>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`${styles.sideMenu} ${
          isMenuOpen ? styles.sideMenuOpen : ""
        }`}
      >
        <nav className={styles.nav}>
          <a href="#home">Home</a>
          <a href="#contato">Contato</a>
          <a href="#gestao">Gestão</a>
          <a href="#dashboard">DashBoards</a>
        <h6 className={styles.logoMenu}>RxLog</h6>

        </nav>

      </div>

      <div className={styles.userMenuContainer} ref={userMenuRef}>
        <button
          className={styles.userButton}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <FaUserCircle className={styles.userImage} />
        </button>

        {isUserMenuOpen && (
          <div className={styles.userDropdown}>
            <a href="#perfil">Perfil</a>
            <a href="#configuracoes">Configurações</a>
            <a href="#sair">Sair</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
