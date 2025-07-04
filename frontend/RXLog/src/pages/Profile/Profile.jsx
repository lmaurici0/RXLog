import React, { useState, useEffect, useRef } from 'react';
import styles from "./Profile.module.css";
import Header from "../../components/header/Header";
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';

const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    role: '',
    institution: '',
    avatar: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/profile');
        setUserData(response.data);
        
        if (response.data.avatar) {
          setAvatarPreview(response.data.avatar);
        }
      } catch (error) {
        toast.error('Erro ao carregar perfil');
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.patch('/api/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Foto atualizada com sucesso!');
      setUserData(prev => ({ ...prev, avatar: response.data.avatarUrl }));
    } catch (error) {
      toast.error('Erro ao atualizar foto');
      console.error('Erro ao atualizar avatar:', error);
    }
  };

  const getInitials = () => {
    if (!userData.name) return '';
    const names = userData.name.split(' ');
    return names.map(name => name[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <div className={styles.profilePage}>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
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
            <div 
              className={styles.avatarContainer} 
              onClick={handleAvatarClick}
            >
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Avatar" 
                  className={styles.profileAvatar}
                />
              ) : (
                <div className={styles.profileAvatar}>{getInitials()}</div>
              )}
              
              <div className={styles.avatarOverlay}>
                <FiPlus className={styles.plusIcon} />
              </div>
              
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange}
                className={styles.avatarUploadInput}
                ref={fileInputRef}
              />
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