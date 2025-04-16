import React, { useState, useEffect } from 'react';
import styles from '../carrossel/carrossel.module.css';
import dog from '../../assets/images/dog.jpg'
import desenho from '../../assets/images/desenho.jpg'
import humpiti from '../../assets/images/humpiti.jpg'
import oi from '../../assets/images/oi.jpg'

const AutoCarousel = () => {
  const images = [
    dog, desenho, humpiti, oi
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
