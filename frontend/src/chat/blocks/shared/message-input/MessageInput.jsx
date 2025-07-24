import React from "react";
import { useRef, useState, useEffect } from "react";
import styles from './MessageInput.module.css';
import arrow from '../../../assets/images/message-form/arrow.png';
import microfon from '../../../assets/images/message-form/microfon.png';
import microfonSelected from '../../../assets/images/message-form/microfon-selected.png';
import cross from '../../../assets/images/message-form/cross.png';
import EmojiPickerContainer from "../picker-containers/emoji-picker-container/EmojiPickerContainer";
import GifPickerContainer from "../picker-containers/gif-picker-container/GifPickerContainer";
import FilePickerContainer from "../picker-containers/file-picker-container/FilePickerContainer";
import AudioRecorder from "../audio-recorder/AudioRecorder";

function MessageInput({ backColor = "#2C2F36", inFileArea = false, messageControl = {}, filesControl = {}, gifControl = {}, audioRecordingControl = {}, content, onSubmit }) {

    const { message, setMessage } = messageControl;
    const { gif, selectGif } = gifControl;
    const textareaRef = useRef(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    const children = (
        <>
            <textarea
                ref={textareaRef}
                name="message"
                className={styles.messageInput}
                autoComplete="off"
                placeholder="Напишіть ваше повідомлення"
                onInput={handleInput}
                rows={1}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <div className={styles.messageImages}>

                {content.some(item => item.includes('emoji')) &&
                    (<EmojiPickerContainer backColor={backColor} setMessage={setMessage} textareaRef={textareaRef} handleInput={handleInput} inFileArea={inFileArea} />)
                }
                {content.some(item => item.includes('gif')) &&
                    (<GifPickerContainer setGif={selectGif} />)
                }
                {content.some(item => item.includes('upload')) &&
                    (<FilePickerContainer filesControl={filesControl} messageControl={messageControl} onSubmit={onSubmit} />)
                }
                {content.some(item => item.includes('audio')) &&
                    (<AudioRecorder audioRecordingControl={audioRecordingControl}/>)
                }


                <button type="submit"><img src={arrow} alt="send" /></button>
            </div>
        </>
    );

    return (
        (!inFileArea ?
        <form name="messageInput" className={styles.messageForm} style={{ '--back-color': backColor }} onSubmit={onSubmit}>
            {children}
        </form>
        :
        <div className={styles.messageForm} style={{ '--back-color': backColor }}>
            {children}
        </div>
        )
        
    )
}

export default MessageInput;