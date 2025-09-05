import React, { useState, useEffect } from 'react';
import styles from "./Profile.module.css";
import Header from "../../components/header/Header";
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    role: '',
    institution: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Pega o token do localStorage se estiver usando JWT
        const token = localStorage.getItem('token');

        const response = await axios.get('/usuarios/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data;

        setUserData({
          email: data.emailUsuario,
          name: data.nomeUsuario,
          role: data.cargoUsuario,
          institution: data.instituicaoUsuario
        });
      } catch (error) {
        toast.error('Erro ao carregar perfil');
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Função para pegar as iniciais do primeiro e último nome
  const getInitials = () => {
    if (!userData.name) return '';
    const names = userData.name.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className={styles.profilePage}>
        <Header />
        <div className={styles.loadingContainer}>
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <Header />

      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              <div className={styles.profileAvatar}>
                {getInitials()}
              </div>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Login</span>
                <div className={styles.infoValue}>{userData.email}</div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Cargo</span>
                <div className={styles.infoValue}>{userData.role}</div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nome</span>
                <div className={styles.infoValue}>{userData.name}</div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Instituição</span>
                <div className={styles.infoValue}>{userData.institution}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
