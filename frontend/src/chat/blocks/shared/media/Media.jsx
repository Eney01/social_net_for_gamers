import React, { memo, useEffect, useCallback, useState } from "react";
import styles from './Media.module.css';
import LargeImageModal from '../large-image-modal/LargeImageModal';
import { sortImageUrlsByAspectRatio } from '../../../utils/imageUtils';
import isEqual from 'lodash.isequal';

function Media({ media }) {
    const [sortedImageUrls, setSortedImageUrls] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSelectImage = useCallback((src) => {
        const index = sortedImageUrls.findIndex(img => img.src === src);
        if (index >= 0) {
            setCurrentIndex(index);
            setSelectedImage(src);
        }
    }, [sortedImageUrls]);

    useEffect(() => {
        let isMounted = true;

        async function sortImages() {
            if (!Array.isArray(media) || media.length === 0) {
                if (isMounted) setSortedImageUrls([]);
                return;
            }

            const sorted = await sortImageUrlsByAspectRatio(media);

            if (!isMounted) return;

            setSortedImageUrls(prevImages => {
                const prevUrls = prevImages.map(img => img.src);
                const newUrls = sorted.map(img => img.src);

                if (isEqual(newUrls, prevUrls)) {
                    return prevImages;
                }

                return sorted;
            });
        }

        sortImages();

        return () => {
            isMounted = false;
        };
    }, [media]);

    const imgOrVideo = useCallback((src, onClick) => {

        return /\.(mp4|webm|ogg)$/i.test(src) ? (
            <video controls className={styles.medium} src={src} onClick={onClick} />
        ) : (
            <img src={src} alt="media" className={styles.medium} onClick={onClick} style={{ cursor: 'pointer' }} />
        )
    }, []);

    const renderImages = useCallback((media) => {
        const handleClick = (src) => handleSelectImage(src);

        const addContainerClass = (className) =>
            `${className} ${styles.mediumContainer}`.trim();

        const imgOrVideo = (src, onClick, isBloored) => {
            const className = `${styles.medium}${isBloored ? ` ${styles.bloored}` : ''}`;
            return /\.(mp4|webm|ogg)$/i.test(src) ? (
                <video controls src={src} onClick={onClick} className={className} />
            ) : (
                <img src={src} alt="media" onClick={onClick} className={className} style={{ cursor: 'pointer' }} />
            );
        };

        let mediaElement;
        switch (media.length) {
            case 1: {
                const item = media[0];
                const baseClass = item.ratio > 1 ? styles.medium1hor : styles.medium1ver;
                mediaElement = (
                    <div className={addContainerClass(baseClass)}>
                        {imgOrVideo(item.src, () => handleClick(item.src), item.isBloored)}
                    </div>
                );
                break;
            }
            case 2: {
                mediaElement = (
                    <div className={styles.media2}>
                        {media.map((item, i) => (
                            <div key={i} className={addContainerClass('')}>
                                {imgOrVideo(item.src, () => handleClick(item.src), item.isBloored)}
                            </div>
                        ))}
                    </div>
                );
                break;
            }
            case 3: {
                mediaElement = (
                    <div className={styles.media3}>
                        <div className={addContainerClass(styles.media3Item)}>
                            {imgOrVideo(media[0].src, () => handleClick(media[0].src), media[0].isBloored)}
                        </div>
                        <div className={`${styles.media3Column} ${styles.media3Item}`}>
                            {[media[1], media[2]].map((item, i) => (
                                <div key={i} className={addContainerClass(styles.media3ColumnItem)}>
                                    {imgOrVideo(item.src, () => handleClick(item.src), item.isBloored)}
                                </div>
                            ))}
                        </div>
                    </div>
                );
                break;
            }
            case 4: {
                mediaElement = (
                    <div className={styles.media4}>
                        {[0, 2].map((start, colIdx) => (
                            <div key={colIdx} className={styles.media4Column}>
                                {[media[start], media[start + 1]].map((item, i) => (
                                    <div key={i} className={addContainerClass(styles.media4ColumnItem)}>
                                        {imgOrVideo(item.src, () => handleClick(item.src), item.isBloored)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                );
                break;
            }
            case 5: {
                mediaElement = (
                    <div className={styles.media5}>
                        <div className={addContainerClass(styles.media5Item)}>
                            {imgOrVideo(media[0].src, () => handleClick(media[0].src), media[0].isBloored)}
                        </div>
                        {[1, 3].map((start, colIdx) => (
                            <div key={colIdx} className={styles.media5Column}>
                                {[media[start], media[start + 1]].map((item, i) => (
                                    <div key={i} className={addContainerClass(styles.media5ColumnItem)}>
                                        {imgOrVideo(item.src, () => handleClick(item.src), item.isBloored)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                );
                break;
            }
            default: {
                mediaElement = null;
            }
        }

        return mediaElement;
    }, [handleSelectImage]);



    return (
        <>
            <div className={styles.media}>
                {renderImages(sortedImageUrls)}
            </div>
            {selectedImage && (
                <LargeImageModal
                    src={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    images={sortedImageUrls}
                    currentIndex={currentIndex}
                    setCurrentIndex={(index) => {
                        setCurrentIndex(index);
                        if (sortedImageUrls[index]) {
                            setSelectedImage(sortedImageUrls[index].src);
                        } else {
                            setSelectedImage(null);
                        }
                    }}
                />
            )}
        </>
    );
}

export default memo(Media);
