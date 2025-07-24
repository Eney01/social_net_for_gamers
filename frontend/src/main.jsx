import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CommunityProvider } from './main-page/contexts/CommunityContext';
import { SavedPostsProvider } from './main-page/contexts/SavedPostsContext'; // 🔁

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SavedPostsProvider> {/* 🔥 додано */}
      <CommunityProvider>
        <App />
      </CommunityProvider>
    </SavedPostsProvider>
  </React.StrictMode>
);
