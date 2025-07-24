import React, { useState, useRef, useCallback } from 'react';
import FilePicker from '../../file-picker/FilePicker';
import ModalChatContainer from '../../modal-chat-container/ModalChatContainer';
import useOutsideClick from '../../modal-chat-container/useOutsideClick';
import styles from './FilePickerContainer.module.css';
import attachIcon from '../../../../assets/images/message-form/cross.png';
import attachIconSelected from '../../../../assets/images/message-form/cross-selected.png';
import FilePreviewArea from '../../file-preview-area/FilePreviewArea';

export default function FilePickerContainer({ filesControl, messageControl, backColor, onSubmit }) {
    const { files, setFiles } = filesControl;
    const filePanelRef = useRef(null);
    const [isFilePanelOpen, setIsFilePanelOpen] = useState(false);

    const handleOnSubmit = () => {
        setIsFilePanelOpen(false);
        onSubmit();
    }

    useOutsideClick(filePanelRef, () => setIsFilePanelOpen(false), isFilePanelOpen);

    const handleFileClick = useCallback(() => {
        setIsFilePanelOpen(prev => !prev);
    }, []);

    const handleFileSelect = useCallback((filesList) => {
        setFiles(prev => [...prev, ...filesList]);
    }, [setFiles]);


    const handleOnClose = () => {
        setIsFilePanelOpen(false);
    }

    return (
        <>
            <button
                type="button"
                onClick={handleFileClick}
                aria-label={isFilePanelOpen ? "Закрыть выбор файлов" : "Открыть выбор файлов"}
                className={styles.filePickerButton}
            >
                {isFilePanelOpen ? <img src={attachIconSelected} alt="attach media" /> : <img src={attachIcon} alt="attach media" />}
            </button>

            {(isFilePanelOpen && files.length === 0) && (
                <ModalChatContainer elementRef={filePanelRef}>
                    <FilePicker onFileSelect={handleFileSelect} />
                </ModalChatContainer>
            )}

            {(isFilePanelOpen && files.length > 0) && <FilePreviewArea backColor={backColor} filesControl={filesControl} onClose={handleOnClose} onFileSelect={handleFileSelect} messageControl={messageControl} onSubmit={handleOnSubmit}/>}
        </>
    );
}
