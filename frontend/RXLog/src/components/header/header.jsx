import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../header/header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "Eric Luis";
    setUserName(storedName);
  }, []);

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

  function getInitials(name) {
    return name
      .split(" ")
      .filter((n) => n)
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  }

  const initials = getInitials(userName);

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
          <Link to="/auth/dashboards">DashBoards</Link>
          <Link to="/contato">Fale Conosco</Link>
          <Link to="/">Cadastrar</Link>
          <Link to="/sobre">Sobre Nós</Link>
        </nav>
      </div>

      <div className={styles.userMenuContainer} ref={userMenuRef}>
        <button
          className={styles.userInitialsButton}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          aria-label="Menu do usuário"
        >
          {initials}
        </button>

        {isUserMenuOpen && (
          <div className={styles.userDropdown}>
            <Link to="/">Perfil</Link>
            <Link to="/">Configurações</Link>
            <Link to="/">Sair</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;