import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './LeftPanel.module.css';
import contactsIcon from '../../assets/images/left-panel/contacts-icon.png';
import communitiesIcon from '../../assets/images/left-panel/communities-icon.png';

const LeftPanel = React.memo(function LeftPanel({ setChat, chats, communities }) {
  const handleSelect = useCallback(
    id => () => setChat(id),
    [setChat]
  );

  return (
    <aside className={styles.container}>
      <div className={styles.iconContainer}>
        <img
          className={styles.icon}
          src={contactsIcon}
          alt="Contacts overview"
        />
      </div>

      {chats.map(chat => (
        <button
          key={chat.id}
          type="button"
          className={styles.iconContainer}
          onClick={handleSelect(chat.id)}
        >
          <img
            className={styles.icon}
            src={chat.iconSrc}
            alt={`Chat with ${chat.name}`}
          />
        </button>
      ))}

      <div className={styles.iconContainer}>
        <img
          className={styles.icon}
          src={communitiesIcon}
          alt="Communities overview"
        />
      </div>

      {communities.map(community => (
        <button
          key={community.id}
          type="button"
          className={styles.iconContainer}
          onClick={handleSelect(community.id)}
        >
          <img
            className={styles.icon}
            src={community.iconSrc}
            alt={`Community: ${community.name}`}
          />
        </button>
      ))}
    </aside>
  );
});

LeftPanel.propTypes = {
  setChat: PropTypes.func.isRequired,
  chats: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string, iconSrc: PropTypes.string })
  ).isRequired,
  communities: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string, iconSrc: PropTypes.string })
  ).isRequired,
};

export default LeftPanel;
