import React, { useRef, useState } from 'react';
import styles from './FilePicker.module.css';
import image from '../../../assets/images/file-picker/image.png';

function FilePicker({ onFileSelect }) {
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

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

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div
            className={`${styles.container} ${dragActive ? styles.dragActive : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                className={styles.fileInput}
                onChange={handleFileChange}
                multiple
            />
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={image} alt='upload' />
                </div>
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
        </div>
    );
}

export default FilePicker;
