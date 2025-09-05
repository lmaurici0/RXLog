import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../header/header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "Funcionario Responsavel";
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

// Pega iniciais do usuário
function getInitials(name) {
  const parts = name.trim().split(" ").filter(n => n);
  
  if (parts.length === 0) return ""; 
  if (parts.length === 1) {
    const single = parts[0];
    return single[0].toUpperCase() + single[single.length - 1].toUpperCase();
  }
  
  const firstInitial = parts[0][0].toUpperCase();
  const lastInitial = parts[parts.length - 1][0].toUpperCase();
  return firstInitial + lastInitial;
}


  const initials = getInitials(userName);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("cargo");
    localStorage.removeItem("userName");
    navigate("/"); 
  };

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
          <Link to="/dashboards">DashBoards</Link>
          <Link to="/medicamentos/cadastro">Cadastrar</Link>
          <Link to="/medicamentos/saida">Baixa de Estoque</Link>
          <Link to="/contato">Fale Conosco</Link>
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
            <Link to="/perfil">Perfil</Link>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
