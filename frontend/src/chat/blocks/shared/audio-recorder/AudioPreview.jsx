import React from 'react';
import styles from './AudioPreview.module.css';
import CustomAudioPlayer from './../custom-audio-player/CustomAudioPlayer';
import arrowSelected from '../../../assets/images/message-form/arrow-selected.png';
import trash from '../../../assets/images/file-picker-area/trash.png';

export default function AudioPreview({ audioSrc, onCancel, onSend }) {
    return (
        <div className={styles.preview}>
            <div className={styles.customAudioPlayer}>
                <CustomAudioPlayer src={audioSrc} />
            </div>
            <div className={styles.buttons}>
                <button type='button' onClick={onCancel}>
                    <img src={trash} alt='remove' />
                </button>
                <button type='button' onClick={onSend}>
                    <img src={arrowSelected} alt='remove' />
                </button>
            </div>
        </div>
    );
}
