import React from "react";
import PropTypes from "prop-types";
import MessageInput from "../../../shared/message-input/MessageInput";
import MessageInputWrapper from "../components/MessageInputWrapper";
import styles from '../styles/MessageInputContainer.module.css'

const content = ['emoji', 'gif', 'upload', 'audio'];

const MessageInputContainer = React.memo(function MessageInputContainer({
    messageControl,
    filesControl,
    gifControl,
    audioRecordingControl,
    onSubmit
}) {
    return (
        <MessageInputWrapper>
            <div className={styles.container}>
                <MessageInput
                    messageControl={messageControl}
                    filesControl={filesControl}
                    gifControl={gifControl}
                    audioRecordingControl={audioRecordingControl}
                    content={content}
                    onSubmit={onSubmit}
                />
            </div>
        </MessageInputWrapper>
    );
});

MessageInputContainer.propTypes = {
    messageControl: PropTypes.object.isRequired,
    mediaControl: PropTypes.object,
    gifControl: PropTypes.object,
    audioRecordingControl: PropTypes.object
};

export default MessageInputContainer;
