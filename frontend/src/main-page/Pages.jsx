import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
 
import './index.css';

const PageCard = ({ name, image, followers, official, avatar, logo }) => {
  const slug = name.toLowerCase().replace('@', '').replaceAll(' ', '-');
  return (
    <Link to={`/page/${slug}`} style={{ textDecoration: 'none' }}>
      <div className="flex flex-col items-center gap-4 cursor-pointer hover:opacity-90 transition">
        <div
          className="relative rounded-xl shadow-md mb-5 overflow-hidden"
          style={{
            width: 1140,
            height: 350,
            boxSizing: 'border-box',
          }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover block"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {logo && (
            <img
              src={logo}
              alt="logo"
              style={{
                position: 'absolute',
                left: 40, 
                top: '50%',
                transform: 'translateY(-50%)',
                height: 90,
                width: 'auto',
                zIndex: 2,
                background: 'rgba(255,255,255,0.0)'
              }}
            />
          )}
          <div
            className="absolute bottom-0 left-0 w-full flex items-end justify-between px-8 py-6"
            style={{
              background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.0) 100%)',
            }}
          >
            <span className="text-white text-base raleway-font ">
              {official && '✅ Офіційна сторінка'}
            </span>
            <span className="text-white text-base font-semibold raleway-font ">
              Слідкують: {followers}
            </span>
            <span className="flex items-center gap-3 text-white text-lg font-bold raleway-font ">
              <img
                src={avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                style={{ background: '#e0e0e0' }}
              />
              {name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Pages() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5065/api/games") 
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error("Failed to fetch games:", err));
  }, []);

  return (
    

    <div style={{
      display: 'flex',
      minHeight: 'calc(100vh - 64px)',
      background: '#23272f'
    }}>
      
      <div className="max-w-3xl mx-auto p-4">
        {games.map((game) => (
          <PageCard
            key={game.id}
            image={game.bannerUrl}
            name={`@${game.slug}`}
            followers={game.followers}
            official={game.isOfficial}
            avatar={game.icon}
            logo={game.logoUrl}
          />
        ))}
      </div>
    </div>
  );
}
