import { useRef, useMemo, memo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import styles from './EmojiPicker.module.css';
import emojiData from 'unicode-emoji-json/data-by-group';
import DataSeparator from '../data-separator/DataSeparator';
import animal from '../../../assets/images/emojis/animal.png';
import ball from '../../../assets/images/emojis/ball.png';
import car from '../../../assets/images/emojis/car.png';
import diff from '../../../assets/images/emojis/diff.png';
import flag from '../../../assets/images/emojis/flag.png';
import food from '../../../assets/images/emojis/food.png';
import person from '../../../assets/images/emojis/person.png';
import smiley from '../../../assets/images/emojis/smiley.png';
import watch from '../../../assets/images/emojis/watch.png';
import bulb from '../../../assets/images/emojis/bulb.png';

const EmojiPicker = (props) => {
    const { onSelect, mainEmojis } = props;
    const virtuosoRef = useRef(null);

    const emojis = useMemo(() => Object.entries(emojiData), []);

    const defaultIcon = bulb;

    const whatImage = (groupName) => {
        switch (groupName) {
            case 'Smileys & Emotion': return smiley;
            case 'People & Body': return person;
            case 'Animals & Nature': return animal;
            case 'Food & Drink': return food;
            case 'Travel & Places': return car;
            case 'Activities': return ball;
            case 'Objects': return bulb;
            case 'Symbols': return diff;
            case 'Flags': return flag;
            default: return defaultIcon;
        }
    };


    const groups = useMemo(() => {
        const result = [];
        if (mainEmojis?.length > 0) {
            result.push({
                key: 'frequent',
                name: 'Часто використовувані',
                emojis: mainEmojis.map((emoji) => ({ emoji, name: emoji })),
                isFrequent: true,
            });
        }
        emojis.forEach(([groupKey, data]) => {
            result.push({
                key: groupKey,
                name: data.name,
                emojis: data.emojis,
                isFrequent: false,
            });
        });
        return result;
    }, [emojis, mainEmojis]);

    const handleScrollToGroup = (groupKey) => {
        const index = groups.findIndex((g) => g.key === groupKey);
        if (index !== -1 && virtuosoRef.current) {
            virtuosoRef.current.scrollToIndex({ index, align: 'start', behavior: 'smooth' });
        }
    };

    const separatorStyles = {
        styleContainer: {
            width: '100%',
            color: '#2C2F36',
            marginTop: '8px',
        },
        styleText: {
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Raleway", sans-serif',
            color: '#ADADBD',
            margin: '0 15px',
            letterSpacing: '0%',
        },
        lineColor: '#ADADBD',
    };

    const renderGroup = (index) => {
        const group = groups[index];
        return (
            <div className={styles.groupContainer}>
                <DataSeparator separatorStyles={separatorStyles} data={group.name} />
                {group.emojis.map((emojiData) => (
                    <button
                        key={emojiData.emoji}
                        onClick={() => onSelect(emojiData.emoji)}
                        className={styles.emoji}
                        type="button"
                        aria-label={emojiData.name}
                        title={emojiData.name}
                    >
                        <div>
                            <span>{emojiData.emoji}</span>
                        </div>
                    </button>
                ))}
            </div>
        );
    };

    const renderNavigation = () => (
        <div className={styles.nav}>
            {mainEmojis?.length > 0 && (
                <button
                    className={styles.emoji}
                    onClick={() => handleScrollToGroup('frequent')}
                    type="button"
                    title="Часто використовувані"
                >
                    <div>
                        <img src={watch} alt="watch" />
                    </div>
                </button>
            )}
            {emojis.map(([groupKey, data]) => (
                <button
                    key={groupKey}
                    className={styles.emoji}
                    onClick={() => handleScrollToGroup(groupKey)}
                    type="button"
                    title={data.name}
                >
                    <div>
                        <img src={whatImage(data.name)} alt={data.name} />
                    </div>
                </button>
            ))}
        </div>
    );

    return (
        <div className={styles.container}>
            {renderNavigation()}
            <div className={styles.emojiSection}>
                <Virtuoso
                    ref={virtuosoRef}
                    data={groups}
                    itemContent={(index) => renderGroup(index)}
                    className={styles.virtuoso}
                    style={{ height: '100%', width: '100%' }}
                />
            </div>
        </div>
    );
};

export default memo(EmojiPicker);
