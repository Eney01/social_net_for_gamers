import "./Sidebar.css";
import React, { useState } from "react";
import ChatIcon from './icons/ChatIcon';
import ContactsIcon from './icons/ContactsIcon.jsx';
import SavedIcon from './icons/SavedIcon';
import StoreIcon from './icons/StoreIcon';
import NotificationIcon from './icons/NotificationIcon';
import SettingsIcon from "./icons/SettingsIcon.jsx";
import CreatePost from "./CreatePost.jsx"; 
import { Link } from "react-router-dom";


const RightSidebar = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

    return (
    <aside className='sidebar-right'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', alignItems: 'center' }}>
        <Link to="/">
        <button className='button-cmt'>
            <img className='img-rgt-main' src="https://ik.imagekit.io/ufzr7vwbk/photo_2025-05-09_14-02-52.jpg?updatedAt=1748938849868" alt="icon" />
        </button>
        </Link>
        <button className='button-cmt'>
            <img className='img-rgt-main' src="https://ik.imagekit.io/ufzr7vwbk/photo_2025-06-04_13-09-27.jpg" alt="icon" />
        </button>
        <button className='button-cmt'>
            <ChatIcon />
        </button>
        <button className='button-cmt'>
            <ContactsIcon />
        </button>
        <Link to="/saved">
          <button className='button-cmt'>
            <SavedIcon />
          </button>
        </Link>
        <button className='button-cmt'>
            <NotificationIcon />
        </button>
    </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <button
        className='button-cmt'
        style={{ width: 50, height: 50, backgroundColor: '#F6F6F6', color: '#1AAAF5', fontSize: 24, fontWeight: 'bold' }} 
        onClick={() => setShowCreatePost(true)}
      >
        +
      </button>
      <button className='button-cmt'>
        <SettingsIcon />
      </button>
      <button
        className='button-cmt'
        onClick={() => alert('Виникли якісь проблеми? Повідомте про це адміну: @danya_sigma1488')}
      >
        <p className='raleway-font' style={{ color: '#fff', fontSize: 36, margin: 0 }}>?</p>
      </button>
    </div>
    {showCreatePost && (<CreatePost onClose={() => setShowCreatePost(false)} />)}
        </aside>
    );
};

export default RightSidebar;