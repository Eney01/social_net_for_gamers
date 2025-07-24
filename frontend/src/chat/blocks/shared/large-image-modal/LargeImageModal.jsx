import React, { useState, useEffect, useCallback } from 'react';
import styles from './LargeImageModel.module.css';
import arrowRight from '../../../assets/images/chat-big-image/arrow-right.png';
import arrowLeft from '../../../assets/images/chat-big-image/arrow-left.png';
import { createPortal } from 'react-dom';

const LargeImageModal = ({ src, onClose, images, currentIndex, setCurrentIndex }) => {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    setIsVisible(true);
  }, []);

  const goPrev = useCallback((e) => {
    e.stopPropagation();
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }, [currentIndex, setCurrentIndex]);

  const goNext = useCallback((e) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  }, [currentIndex, images.length, setCurrentIndex]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) goPrev(e);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) goNext(e);
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, goPrev, goNext, handleClose]);

  return createPortal(
    <div
      role="dialog"               
      aria-modal="true"          
      className={`${styles.modalOverlay} ${isVisible ? styles.modalVisible : styles.modalHidden}`}
      onClick={handleClose}
    >
      {currentIndex > 0 && (
        <button
          className={styles.arrowLeft}
          onClick={goPrev}
          aria-label="Предыдущее изображение"
          type="button"
        >
          <img src={arrowLeft} alt="Предыдущее" />
        </button>
      )}

      <img
        src={src}
        alt="selected"
        onClick={e => e.stopPropagation()}
        className={styles.largeImage}
      />

      {currentIndex < images.length - 1 && (
        <button
          className={styles.arrowRight}
          onClick={goNext}
          aria-label="Следующее изображение"      
          type="button"
        >
          <img src={arrowRight} alt="Следующее" />
        </button>
      )}
    </div>,
    document.body
  );
};

export default LargeImageModal;
