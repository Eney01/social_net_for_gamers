import React, { createContext, useContext, useState } from 'react';

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  const joinCommunity = (community) => {
    setJoinedCommunities((prev) =>
      prev.find(c => c.title === community.title) ? prev : [...prev, community]
    );
  };

   const leaveCommunity = (title) => {
    setJoinedCommunities(prev => prev.filter(c => c.title !== title));
  };

  return (
    <CommunityContext.Provider value={{ joinedCommunities, joinCommunity, leaveCommunity }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);