import React, { memo, useState, useCallback } from "react";
import styles from './MediaForPreview.module.css';
import trash from '../../../assets/images/file-picker-area/trash.png';
import bloor from '../../../assets/images/file-picker-area/bloor.png';
import bloorSelected from '../../../assets/images/file-picker-area/bloor-selected.png';

function MediaForPreview({ media, onRemove, onBlurToggle }) {
    console.log(media);

    const imgOrVideo = useCallback((item) => {
        console.log(item);
        const isVideo = item.type.startsWith('video');
        const mediaClass = `${styles.medium} ${item.isBloored ? styles.blurred : ''}`;

        return (
            <div className={styles.mediaWrapper} key={item.id}>
                {isVideo ? (
                    <video controls className={mediaClass} src={item.src} />
                ) : (
                    <img src={item.src} alt="media" className={mediaClass} />
                )}
                <div className={styles.mediaButtons}>
                    <button type='button' onClick={() => onBlurToggle(item.id)}>
                        {item.isBloored ?
                            (<img src={bloorSelected} alt="blur" />)
                            : (<img src={bloor} alt="blur" />)
                        }
                    </button>
                    <button type='button' onClick={() => onRemove(item.id)}>
                        <img src={trash} alt="delete" />
                    </button>
                </div>
            </div>
        );
    }, [onRemove, onBlurToggle]);

    const renderImages = useCallback((media) => {
        const wrap = (m) => imgOrVideo(m);

        switch (media.length) {
            case 1:
                return <div className={styles.medium1}>{wrap(media[0])}</div>;
            case 2:
                return (
                    <div className={styles.media2}>
                        {wrap(media[0])}
                        {wrap(media[1])}
                    </div>
                );
            case 3:
                return (
                    <div className={styles.media3}>
                        <div className={styles.media3Item}>{wrap(media[0])}</div>
                        <div className={`${styles.media3Column} ${styles.media3Item}`}>
                            <div className={styles.media3ColumnItem}>{wrap(media[1])}</div>
                            <div className={styles.media3ColumnItem}>{wrap(media[2])}</div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className={styles.media4}>
                        {[0, 2].map(col => (
                            <div key={col} className={styles.media4Column}>
                                {[0, 1].map(row => (
                                    <div key={row} className={styles.media4ColumnItem}>
                                        {wrap(media[col + row])}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                );
            case 5:
                return (
                    <div className={styles.media5}>
                        <div className={styles.media5Item}>{wrap(media[0])}</div>
                        <div className={styles.media5Column}>
                            <div className={styles.media5ColumnItem}>{wrap(media[1])}</div>
                            <div className={styles.media5ColumnItem}>{wrap(media[2])}</div>
                        </div>
                        <div className={styles.media5Column}>
                            <div className={styles.media5ColumnItem}>{wrap(media[3])}</div>
                            <div className={styles.media5ColumnItem}>{wrap(media[4])}</div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }, [imgOrVideo]);

    return (
        <>
            <div className={styles.media}>
                {renderImages(media)}
            </div>
        </>
    );
}

export default memo(MediaForPreview);
