import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';
import HeaderItem from './HeaderItem';

const Header = ({ logoSrc, name, additional, chatId, token, setFullCall }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isAttached, setIsAttached] = useState(true);
    const timeoutRef = useRef(null);

    const handleMouseEnter = useCallback(() => {
        clearTimeout(timeoutRef.current);
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 1500);
    }, []);

    const handleAttachClick = useCallback(() => {
        setIsAttached(prev => !prev);
    }, []);

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <header
            className={styles.header}
            onMouseEnter={!isAttached ? handleMouseEnter : undefined}
            onMouseLeave={!isAttached ? handleMouseLeave : undefined}
        >
            <HeaderItem
                handleAttachClick={handleAttachClick}
                logoSrc={logoSrc}
                name={name}
                additional={additional}
                isAttached={isAttached}
                isHovered={isHovered}
                chatId={chatId.toString()}
                token={token}
                setFullCall={setFullCall}
            />
        </header>
    );
};

Header.propTypes = {
    companion: PropTypes.object.isRequired,
};

export default React.memo(Header);
