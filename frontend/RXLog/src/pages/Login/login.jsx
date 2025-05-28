import React, { useState, useEffect } from 'react';
import styles from '../Login/login.module.css'; // CSS Module
import Header from '../../components/header/header';

const Login = () => {
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
  });

  const [showNotification, setShowNotification] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowNotification(true);
    setIsExiting(false);
  };

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setShowNotification(false), 300);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  return (
    <>
      <Header />
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>Login</h2>
          <form onSubmit={handleSubmit} className={styles.form}>

            <input
              type="email"
              name="email"
              placeholder="Digite seu email..."
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha..."
              value={formData.senha}
              onChange={handleChange}
              required
              className={styles.input}
            />
  
            <button type="submit" className={styles.button}>Cadastrar</button>
          </form>
        </div>

        {showNotification && (
          <div className={`${styles.alertBox} ${isExiting ? styles.exit : ''}`}>
            <span>Bem-Vindo ao RxLog 🚀!!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
