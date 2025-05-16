import React, { useState, useEffect } from 'react';
import styles from '../carrossel/carrossel.module.css';
import image01 from '../../assets/images/imageCarrossel01.png'
import desenho from '../../assets/images/desenho.jpg'
import humpiti from '../../assets/images/humpiti.jpg'

const AutoCarousel = () => {
  const images = [
    image01, desenho, humpiti
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className={styles.carouselImage}
      />
    </div>
  );
};

export default AutoCarousel;
