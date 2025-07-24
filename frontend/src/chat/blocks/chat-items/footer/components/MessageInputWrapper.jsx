import React, { memo } from "react";
import PropTypes from "prop-types";
import styles from "../styles/MessageInputWrapper.module.css";

const MessageInputWrapper = memo(function MessageInputWrapper({ children }) {
    return (
        <div className={styles.messageInputContainer}>
            {children}
        </div>
    );
});

MessageInputWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MessageInputWrapper;
