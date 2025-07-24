import React, { useState } from 'react';
import styles from './AudioControls.module.css';
import pause from '../../../assets/images/custom-audio-player/pause.png';
import play from '../../../assets/images/custom-audio-player/play.png';
import trash from '../../../assets/images/file-picker-area/trash.png';
import stopImg from '../../../assets/images/file-picker-area/stop.png';
import sentSelected from '../../../assets/images/message-form/arrow-selected.png';
import sendHover from '../../../assets/images/message-form/send-hover.png';
import send from '../../../assets/images/message-form/send.png';
import deleteImg from '../../../assets/images/message-form/delete.png';
import deleteHover from '../../../assets/images/message-form/delete-hover.png';

export default function AudioControls({ isPaused, pauseRecording, resumeRecording, stopRecording, cancelRecording, onSend, children }) {

    const [sendHovered, setSendHovered] = useState(false);
    const [deleteHovered, setDeleteHovered] = useState(false);

    return (
        <div className={styles.controls}>

            {/* <div className={styles.addButtons}>
                <button type='button' className={styles.play} onClick={isPaused ? resumeRecording : pauseRecording}>
                    {isPaused ? (
                        <img src={play} alt='play' />
                    ) : (
                        <img src={pause} alt='pause' className={styles.pause}/>
                    )}
                </button>
                <button type='button' onClick={stopRecording} className={styles.stop}>
                    <img src={stopImg} alt='remove' />
                </button>
            </div> */}
            {children}
            <div className={styles.mainButtons}>
                <button
                    onMouseEnter={() => setDeleteHovered(true)}
                    onMouseLeave={() => setDeleteHovered(false)}
                    type='button'
                    onClick={cancelRecording}
                    className={styles.trash}
                >
                    <img src={deleteHovered ? deleteHover : deleteImg} alt='cancel' />
                </button>

                <button
                    onMouseEnter={() => setSendHovered(true)}
                    onMouseLeave={() => setSendHovered(false)}
                    onClick={onSend}
                    className={styles.sent}
                    type='button'
                >
                    <img src={sendHovered ? sendHover : send} alt='sent' />
                </button>
            </div>
        </div >
    );
}
