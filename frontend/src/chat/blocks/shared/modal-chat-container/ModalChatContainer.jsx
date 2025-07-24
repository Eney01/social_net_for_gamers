import React from "react";
import PropTypes from "prop-types";
import styles from './ModalChatContainer.module.css';

const ModalChatContainer = React.memo(({ children, elementRef, backColor = '#2C2F36', inFileArea = false }) => {
    return (
        <div
            className={styles.wrapper}
            style={{
                '--back-color': backColor
            }}
            ref={elementRef}
            role="dialog"
            aria-modal="true"
        >
            <div className={inFileArea ? styles.containerInFileArea : styles.container}>
                {children}
            </div>
        </div>
    );
});

ModalChatContainer.displayName = 'ModalChatContainer';

ModalChatContainer.propTypes = {
    children: PropTypes.node.isRequired,
    elementRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
};

ModalChatContainer.defaultProps = {
    elementRef: null,
};

export default ModalChatContainer;
