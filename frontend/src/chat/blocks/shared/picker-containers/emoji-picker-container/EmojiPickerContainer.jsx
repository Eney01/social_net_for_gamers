import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import ModalChatContainer from "../../modal-chat-container/ModalChatContainer";
import EmojiPicker from "../../emoji-picker/EmojiPicker";
import useOutsideClick from "../../modal-chat-container/useOutsideClick";
import smiley from '../../../../assets/images/message-form/smiley.png';
import smileySelected from '../../../../assets/images/message-form/smiley-selected.png';
import useLocalStorage from "./useLocalStorage";



function EmojiPickerContainer({ setMessage, textareaRef, handleInput, backColor, inFileArea = false }) {
    const emojiPickerRef = useRef(null);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    useOutsideClick(emojiPickerRef, () => setIsEmojiPickerOpen(false), isEmojiPickerOpen);

    const handleEmojiClick = useCallback(() => {
        setIsEmojiPickerOpen((prev) => !prev);
    }, []);

    const [mainEmojis, setMainEmojis] = useLocalStorage('mainEmojis', []);

    const handleEmojiSelect = useCallback((emoji) => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        const newValue = value.slice(0, start) + emoji + value.slice(end);
        textarea.value = newValue;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;

        handleInput();
        setMessage(newValue);

        setMainEmojis((prevMainEmojis) => {
            const newList = [emoji, ...prevMainEmojis.filter(e => e !== emoji)];
            return newList.slice(0, 44);
        });
    }, [handleInput, setMainEmojis, setMessage, textareaRef]);

    return (
        <>
            <button
                type="button"
                onClick={handleEmojiClick}
                aria-label={isEmojiPickerOpen ? "Закрыть выбор эмодзи" : "Открыть выбор эмодзи"}
            >
                <img src={isEmojiPickerOpen ? smileySelected : smiley} alt="emoji" />
            </button>
            {isEmojiPickerOpen && (
                <ModalChatContainer backColor={backColor} elementRef={emojiPickerRef} inFileArea={inFileArea}>
                    <EmojiPicker onSelect={handleEmojiSelect} mainEmojis={mainEmojis} />
                </ModalChatContainer>
            )}
        </>
    );
}

EmojiPickerContainer.propTypes = {
    setMessage: PropTypes.func.isRequired,
    textareaRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    handleInput: PropTypes.func.isRequired,
};

export default React.memo(EmojiPickerContainer);
