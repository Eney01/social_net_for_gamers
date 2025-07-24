import React from "react";
import { useCommunity } from './contexts/CommunityContext';
import CommunityCard from './CommunityCard';

const communities = [
  {
    banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?fm=jpg&q=60&w=3000',
    avatar: 'https://ik.imagekit.io/ufzr7vwbk/e0f56def6af460fc74927a67f4ba0dc850938e81.png',
    title: 'TeamUP',
    description: 'Пошук команди. Кооп. Мультиплеєр. CS, Apex, LoL',
    membersCount: 18000,
  }
]

const GameCommunity = () => {
  const { joinCommunity } = useCommunity();
  
    const handleJoin = (community) => {
      joinCommunity(community);
    };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)', background: '#23272f' }}>
      <main style={{
        flex: 1,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff'
      }}>
        <h1 className="raleway-font text-2xl font-bold mb-6">Спільноти</h1>
        <div className="w-full max-w-md">
          {communities.map((community, index) => (
            <CommunityCard
              key={index}
              {...community}
              onJoin={() => handleJoin(community)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default GameCommunity;