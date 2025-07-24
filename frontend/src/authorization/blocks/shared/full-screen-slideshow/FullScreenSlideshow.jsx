import React, { useState, useEffect } from 'react';
import styles from './FullScreenSlideshow.module.css';

const FullScreenSlideshow = ({slides, interval = 3000 }) => {
    

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isForward, setIsForward] = useState(true);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (isForward) {
                    if (prevIndex < slides.length - 1) {
                        return prevIndex + 1;
                    } else {
                        setIsForward(false);
                        return prevIndex - 1;
                    }
                } else {
                    if (prevIndex > 0) {
                        return prevIndex - 1;
                    } else {
                        setIsForward(true);
                        return prevIndex + 1;
                    }
                }
            });
        }, interval);
        return () => clearInterval(slideInterval);
    }, [interval, isForward, slides.length]);

    return (
        <div className={styles.container}>
            <div
                className={styles.wrapper}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((src, idx) => (
                    <div key={idx} className={styles.slide}>
                        <img src={src} alt={`slide-${idx}`} className={styles.image} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FullScreenSlideshow;
