import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MessageGroup.module.css';
import Message from '../../message/components/Message';
import splitMessageMedia from './splitMessageMedia';  

const MessageGroup = React.memo(function MessageGroup({ messages, isLeft }) {
    const splitMessages = useMemo(() => {
        const result = [];
        messages.forEach(msg => {
            const split = splitMessageMedia(msg, 5);
            result.push(...split);
        });
        return result;
    }, [messages]);

    const renderedMessages = useMemo(() =>
        splitMessages.map(msg => (
            <Message key={msg.id} msg={msg} isLeft={isLeft} />
        )),
        [splitMessages, isLeft]
    );

    return (
        <div className={`${styles.main} ${isLeft ? styles.mainLeft : styles.mainRight}`}>
            {renderedMessages}
        </div>
    );
});

MessageGroup.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,
    isLeft: PropTypes.bool.isRequired,
};

export default MessageGroup;
