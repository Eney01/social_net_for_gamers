import React, { useState, useMemo, useRef } from 'react';
import styles from './FilePreviewArea.module.css';
import MediaForPreview from '../media/MediaForPreview';
import cross from '../../../assets/images/file-picker-area/cross.png';
import bloor from '../../../assets/images/file-picker-area/bloor.png';
import bloorSelected from '../../../assets/images/file-picker-area/bloor-selected.png';
import trash from '../../../assets/images/file-picker-area/trash.png';
import upload from '../../../assets/images/file-picker-area/upload.png';
import MessageInput from '../message-input/MessageInput';

function FilePreviewArea({ filesControl, onClose, onFileSelect, messageControl, onSubmit }) {
    const { files, setFiles } = filesControl;
    const [blurAll, setBlurAll] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length && onFileSelect) {
            const fileItems = files.map((file, index) => ({
                id: Date.now() + index,
                isBloored: false,
                src: URL.createObjectURL(file),
                type: file.type,
                name: file.name,
                file: file,
                size: file.size
            }));
            onFileSelect(fileItems);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files || []);
        if (files.length && onFileSelect) {
            const fileItems = files.map((file, index) => ({
                id: Date.now() + index,
                isBloored: false,
                src: URL.createObjectURL(file),
                type: file.type,
                name: file.name,
                file: file,
                size: file.size
            }));
            onFileSelect(fileItems);
        }
    };



    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    const imageMedia = useMemo(
        () => files.filter(item => item.type.startsWith('image/') || item.type.startsWith('video/')),
        [files]
    );

    const otherFiles = useMemo(
        () => files.filter(item => !item.type.startsWith('image/') && !item.type.startsWith('video/')),
        [files]
    );


    const handleRemove = (idToRemove) => {
        setFiles(prev => prev.filter(f => f.id !== idToRemove));
    };

    const handleToggleBlur = (idToToggle) => {
        setFiles(prev =>
            prev.map(f =>
                f.id === idToToggle
                    ? { ...f, isBloored: !f.isBloored }
                    : f
            )
        );
    };

    const toggleBlurAll = () => {
        setBlurAll(prev => !prev);
        setFiles(prev =>
            prev.map(f =>
                (f.type.startsWith('image/') || f.type.startsWith('video/'))
                    ? { ...f, isBloored: !blurAll }
                    : f
            )
        );

    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.descr}>Надішліть фото/файл</div>
                    <div className={styles.buttons}>
                        <button type='button' className={styles.button} onClick={toggleBlurAll}>
                            {blurAll ? (<img src={bloorSelected} alt='bloor' />) : <img src={bloor} alt='bloor' />}
                        </button>
                        <button type='button' className={styles.closeButton} onClick={onClose}><img src={cross} alt='close' /></button>

                    </div>
                </div>

                <div className={styles.content}>
                    {imageMedia.length > 0 && (

                        Array.from({ length: Math.ceil(imageMedia.length / 5) }).map((_, index) => {
                            const start = index * 5;
                            const end = start + 5;
                            const group = imageMedia.slice(start, end);

                            return (
                                <div className={styles.mediaBlock}>
                                    <MediaForPreview
                                        key={index}
                                        media={group}
                                        onRemove={handleRemove}
                                        onBlurToggle={handleToggleBlur}
                                    />
                                </div>
                            );
                        })

                    )}

                    {otherFiles.length > 0 && (
                        <div className={`${styles.filesBlock} ${dragActive ? styles.dragActive : ''}`}>
                            {otherFiles.map(f => (
                                <div key={f.id} className={styles.fileBlock}>
                                    {f.name}<br />
                                    <span>{Math.round(f.file.size / 1000)} KB</span>
                                    <button className={styles.removeButton} onClick={() => handleRemove(f.id)}>
                                        <img className={styles.removeButtonImg} src={trash} alt='remove' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className={styles.fileInput}
                    onChange={handleFileChange}
                />

                <div className={styles.fileUploader}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                    <img src={upload} alt='upload' />
                    <div className={styles.text}>
                        Перетягніть зображення сюди або <br />
                        <span
                            className={styles.link}
                            role="button"
                            tabIndex={0}
                            onClick={handleClick}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleClick();
                                }
                            }}
                        >
                            завантажте файл
                        </span>
                    </div>
                </div>


                <div className={styles.messageForm}>
                    <MessageInput backColor={'#33373F'} content={['emoji']} messageControl={messageControl} inFileArea={true} onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    );
}

export default FilePreviewArea;
