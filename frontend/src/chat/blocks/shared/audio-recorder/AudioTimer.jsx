import React from 'react';
import styles from './AudioTimer.module.css';

export default function AudioTimer({ isPaused, time, withDot = true, isLeft = false }) {
    const format = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        const msPart = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return `${h}:${m}:${s},${msPart}`;
    };




    return (
        <div className={styles.timer} style={isLeft ? {
            justifyContent: 'flex-end'
        } : undefined}>
            <span>{format(time)}</span>
            {withDot && <span className={`${styles.dot} ${!isPaused && styles.dotRecord}`}></span>}
        </div>
    );
}
