import React, { useState, useCallback, useEffect, memo } from 'react';
import styles from './GifPicker.module.css';
import cross from '../../../assets/images/gif-picker/cross.png';
import magnifier from '../../../assets/images/gif-picker/magnifier.png';
import watch from '../../../assets/images/gif-picker/watch.png';
import savedIcon from '../../../assets/images/gif-picker/selected.svg';
import savedIconSelected from '../../../assets/images/gif-picker/selected-selected.svg';

const REACT_APP_TENOR_API_KEY = 'AIzaSyBHdF6XBz7mujjoH1Sj25AiE7sdvZrJonY';
const TENOR_API_KEY =  REACT_APP_TENOR_API_KEY;
const TENOR_ENDPOINT = 'https://tenor.googleapis.com/v2/search';
const LOCAL_STORAGE_KEY_RECENT = 'recent_gifs';
const LOCAL_STORAGE_KEY_SAVED = 'saved_gifs';

function GifPicker({ onSelect, setIsGifPanelOpen }) {
    const [queryInput, setQueryInput] = useState('');
    const [query, setQuery] = useState('smile');
    const [gifs, setGifs] = useState([]);
    const [tab, setTab] = useState('search');
    const [recentGifs, setRecentGifs] = useState([]);
    const [savedGifs, setSavedGifs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setRecentGifs(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_RECENT)) || []);
        setSavedGifs(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SAVED)) || []);
    }, []);

    const fetchGifs = useCallback(async (searchQuery) => {
        setLoading(true);
        setError(null);
        try {
            const trimmedQuery = searchQuery.trim() || 'smile';
            const url = `${TENOR_ENDPOINT}?q=${encodeURIComponent(trimmedQuery)}&key=${TENOR_API_KEY}&limit=48`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            const data = await response.json();
            setGifs(data.results || []);
            setTab('search');
        } catch (err) {
            console.error('Ошибка при загрузке GIF:', err);
            setError('Не удалось загрузить GIF. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGifs(query);
    }, [fetchGifs, query]);

    const handleCloseGifPanel = () => {
        setIsGifPanelOpen(false);
    };

    const handleGifClick = (url) => {
        saveToRecent(url);
        onSelect(url);
    };

    const saveToRecent = (url) => {
        const updated = [url, ...recentGifs.filter(item => item !== url)].slice(0, 20);
        setRecentGifs(updated);
        localStorage.setItem(LOCAL_STORAGE_KEY_RECENT, JSON.stringify(updated));
    };

    const toggleSaved = (url) => {
        let updated;
        if (savedGifs.includes(url)) {
            updated = savedGifs.filter(item => item !== url);
        } else {
            updated = [url, ...savedGifs];
        }
        setSavedGifs(updated);
        localStorage.setItem(LOCAL_STORAGE_KEY_SAVED, JSON.stringify(updated));
    };

    const renderGifButton = (url, key) => (
        <div key={key} className={styles.gifWrapper}>
            <button
                onClick={() => handleGifClick(url)}
                className={styles.gifButton}
                aria-label="Выбрать GIF"
                type="button"
            >
                <img src={url} alt="gif" className={styles.gifImage} />
            </button>

            <button
                aria-label={savedGifs.includes(url) ? "Удалить из сохраненных" : "Сохранить GIF"}
                type="button"
                className={styles.saveButton}
                onClick={() => toggleSaved(url)}
            >
                <img
                    src={savedGifs.includes(url) ? savedIconSelected : savedIcon}
                    alt={savedGifs.includes(url) ? "сохранено" : "сохранить"}
                    className={styles.saveIcon}
                />
            </button>
        </div>
    );

    const onSearchClick = () => {
        if (queryInput.trim() === '') {
            setQuery('smile');
        } else {
            setQuery(queryInput.trim());
        }
    };

    const onInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearchClick();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerImages}>
                    <button
                        type="button"
                        aria-label="Показать сохраненные GIF"
                        onClick={() => setTab('saved')}
                        className={tab === 'saved' ? styles.activeTab : ''}
                    >
                        <img src={savedIcon} alt='saved' />
                    </button>

                    <button
                        type="button"
                        aria-label="Показать последние GIF"
                        onClick={() => setTab('recent')}
                        className={tab === 'recent' ? styles.activeTab : ''}
                    >
                        <img src={watch} alt='recent' />
                    </button>
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Пошук"
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
                        onKeyDown={onInputKeyDown}
                        className={styles.searchInput}
                        aria-label="Поиск GIF"
                    />
                    <div className={styles.inputImages}>
                        <button
                            type="button"
                            aria-label="Поиск GIF"
                            className={styles.clickable}
                            onClick={onSearchClick}
                        >
                            <img src={magnifier} alt="search" />
                        </button>

                        <button
                            type="button"
                            aria-label="Закрыть панель GIF"
                            onClick={handleCloseGifPanel}
                            className={styles.clickable}
                        >
                            <img src={cross} alt="close" />
                        </button>
                    </div>
                </div>
            </div>

            {loading && <div className={styles.loading}>Загрузка...</div>}
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.gifGrid}>
                {tab === 'search' && gifs.map(gif =>
                    renderGifButton(gif.media_formats.tinygif.url, gif.id)
                )}
                {tab === 'recent' && recentGifs.map((url, idx) =>
                    renderGifButton(url, `recent-${url}-${idx}`)
                )}
                {tab === 'saved' && savedGifs.map((url, idx) =>
                    renderGifButton(url, `saved-${url}-${idx}`)
                )}
            </div>
        </div>
    );
}

export default memo(GifPicker);
