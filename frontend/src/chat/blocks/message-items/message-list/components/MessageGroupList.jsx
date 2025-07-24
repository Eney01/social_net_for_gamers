import React, { useMemo, useRef, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import MessageGroup from '../../message-group/components/MessageGroup';
import DataSeparator from '../../../shared/data-separator/DataSeparator';
import { formatDateForSeparator, checkNewDay } from '../../../../utils/dateUtils';
import styles from '../styles/MessageGroupList.module.css';

const separatorStyles = {
    styleContainer: {
        width: '100%',
        marginTop: '20px',
        marginBottom: '40px',
        color: '#2C2F36',
        padding: '0 12.37%',
    },
    styleText: {
        margin: '0 12px',
        fontSize: '16px',
        fontFamily: '"Raleway" sans-serif',
        lineHeight: '25px',
        letterSpacing: '0',
        color: '#ADADBD',
        fontWeight: '400',
    },
    lineColor: '#2C2F36',
};

function MessageGroupList({ messages, currentUserId }) {
    const virtuosoRef = useRef(null);

    const renderedItems = useMemo(() => {
        const result = [];
        let group = [];
        let lastUser = null;
        let lastDate = null;

        messages.forEach((msg) => {
            const sentDate = msg.sentAt instanceof Date ? msg.sentAt : new Date(msg.sentAt);
            const isNewUser = msg.user.id !== lastUser;
            const isNewDay = !lastDate || checkNewDay(lastDate, sentDate);

            if (group.length && (isNewUser || isNewDay)) {
                result.push({ type: 'group', messages: group, isLeft: group[0].user.id !== currentUserId });
                group = [];
            }

            if (isNewDay) {
                result.push({ type: 'date', date: sentDate });
            }

            group.push(msg);
            lastUser = msg.user.id;
            lastDate = sentDate;
        });

        if (group.length) {
            result.push({ type: 'group', messages: group, isLeft: group[0].user.id !== currentUserId });
        }

        return result;
    }, [messages, currentUserId]);

    // useEffect(() => {
    //     if (virtuosoRef.current && renderedItems.length > 0) {
    //         virtuosoRef.current.scrollToIndex({
    //             index: renderedItems.length - 1,
    //             behavior: 'smooth',
    //         });
    //     }
    // }, [renderedItems]);

    return (
        <div className={styles.container}>
            <Virtuoso
                ref={virtuosoRef}
                data={renderedItems}
                className={styles.myScrollContainer}
                style={{ height: '100%' }}
                itemContent={(index, item) => {
                    if (item.type === 'group') {
                        return (
                            <MessageGroup
                                messages={item.messages}
                                isLeft={item.isLeft}
                            />
                        );
                    }

                    if (item.type === 'date') {
                        return (
                            <DataSeparator
                                data={item.date ? formatDateForSeparator(item.date) : 'Невідомо'}
                                separatorStyles={separatorStyles}
                            />
                        );
                    }

                    return null;
                }}
                followOutput="always"
            />
        </div>
    );
}

export default React.memo(MessageGroupList);
