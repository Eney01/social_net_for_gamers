import React, { useState } from 'react';
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import FollowedPage from './FollowedPage';
import Pages from './Pages.jsx';
import MainLayout from './MainLayout.jsx';
import NewsPage from "./NewsPage.jsx";
import CommunityPage from "./CommunityPage.jsx";
import GamePage from "./GamePage.jsx";
import SavedPostsPage from "./SavedPostsPage.jsx";
import GamePlot from "./GamePlot.jsx";
import GameInfo from "./GameInfo.jsx";
import GameHardware from "./GameHardware.jsx";
import GameCommunity from "./GameCommunity.jsx";
import { CommunityProvider } from './contexts/CommunityContext.jsx';
import { SavedPostsProvider } from "./contexts/SavedPostsContext.jsx";
import GameMain from './GameMain.jsx';

const AppContent = () => {
  const location = useLocation();

   const isGamePage = location.pathname.startsWith("/page/");

  return (
    <>
      {!isGamePage && <Header currentPath={location.pathname} />}
      <Routes>
        
          
          

          

      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
  <CommunityProvider>
  <SavedPostsProvider>
      <AppContent />
  </SavedPostsProvider>
  </CommunityProvider>
  </BrowserRouter>
);


export default App;
