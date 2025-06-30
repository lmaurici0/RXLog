import React, { useState, useEffect } from 'react';
import styles from '../carrossel/carrossel.module.css';
import image01 from '../../assets/images/imageCarrossel01.png'
import image02 from '../../assets/images/imageCarrossel02.jpeg'
import image03 from '../../assets/images/imageCarrossel03.jpeg'

const AutoCarousel = () => {
  const images = [
    image01, image02, image03
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
