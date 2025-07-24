import React, { useRef, useState, useCallback, memo } from "react";
import useOutsideClick from "../../modal-chat-container/useOutsideClick";
import ModalChatContainer from "../../modal-chat-container/ModalChatContainer";
import GifPicker from "../../gif-picker/GifPicker";
import gifImgSelected from '../../../../assets/images/message-form/gif-selected.png';
import gifImg from '../../../../assets/images/message-form/gif.png';

function GifPickerContainer({ setGif }) {
    const gifPanelRef = useRef(null);
    const [isGifPanelOpen, setIsGifPanelOpen] = useState(false);

    useOutsideClick(gifPanelRef, () => setIsGifPanelOpen(false), isGifPanelOpen);

    const handleGifSelect = useCallback((gifUrl) => {
        setIsGifPanelOpen(false);
        setGif(gifUrl);
    }, [setGif]);

    const handleGifClick = useCallback(() => {
        setIsGifPanelOpen(prev => !prev);
    }, []);

    return (
        <>
            <button
                type="button"
                onClick={handleGifClick}
                aria-label={isGifPanelOpen ? "Приховати GIF" : "Відкрити GIF"}
            >
                <img
                    src={isGifPanelOpen ? gifImgSelected : gifImg}
                    alt="GIF picker toggle"
                />
            </button>

            {isGifPanelOpen && ( 
                <ModalChatContainer elementRef={gifPanelRef}>
                    <GifPicker onSelect={handleGifSelect} setIsGifPanelOpen={setIsGifPanelOpen}/>
                </ModalChatContainer>
            )}
        </>
    );
}

export default memo(GifPickerContainer);
