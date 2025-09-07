import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../header/header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  // Pega o usuário logado via API
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get("http://localhost:8080/usuarios/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserName(data.nomeUsuario);
        localStorage.setItem("userName", data.nomeUsuario); // opcional: manter no localStorage
      } catch (error) {
        console.error("Erro ao buscar nome do usuário:", error);
      }
    };

    fetchUserName();
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

  // Gera iniciais do usuário
  function getInitials(name) {
    const parts = name.trim().split(" ").filter((n) => n);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  }

  const initials = getInitials(userName || "Funcionario Responsavel");

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
          <Link to="/contato">Fale Conosco</Link>
          <Link to="/sobre">Sobre Nós</Link>
          <Link to="/medicamentos/cadastro">Cadastrar Med.</Link>
          <Link to="/medicamentos/saida">Baixa de Estoque</Link>
          <Link to="/fornecedores/cadastro">Cadastrar Forn.</Link>
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
