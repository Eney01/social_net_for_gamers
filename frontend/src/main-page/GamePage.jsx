import React, { useEffect, useState } from 'react';
import { useParams, NavLink, Outlet} from 'react-router-dom';
import PostCard from "./PostCard";
import './index.css';

const navLinks = [
  { label: 'Головна', key: '' },
  { label: 'Сюжет', key: 'plot' },
  { label: 'Інфо', key: 'info' },
  { label: 'Залізо', key: 'hardware' },
  { label: 'Спільнота', key: 'community' },
];

const GamePage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [search, setSearch] = useState('');
   const handleClick = () => {
    setIsFollowing(!isFollowing);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:5065/api/games/${slug}`);
        const data = await res.json();
        setGame(data);
      } catch (err) {
        console.error('Помилка при завантаженні гри:', err);
      }
    };
    fetchGame();
  }, [slug]);

  if (!game) return <div>Завантаження...</div>;

  return (
    <div className="raleway-font">
      <div
        className="relative w-full flex items-start"
        style={{
          minHeight: 500,
          backgroundImage: `url(${game.bannerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          paddingTop: 64,
          paddingBottom: 64
        }}
      >
        <div className="flex flex-col items-start w-full pt-16 pl-24 z-10">
         
          <img
            src={game.logoUrl}
            alt="logo"
            width={350}
            height={135}
            style={{
              width: 350,
              height: 135,
              objectFit: 'contain',
              marginTop: -52,
              marginBottom: 24,
              background: 'none',
              boxShadow: 'none'
            }}
          />

          <div className="flex flex-col items-start gap-2 text-white max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-white text-lg font-semibold">
                Слідкують: {game.followers}
              </span>
              {game.isOfficial && (
                <span className="text-white text-xs px-3 py-1 rounded-full font-bold">☑ Офіційна</span>
              )}
            </div>
            
            <span className="text-base opacity-80 mb-1">
              <b>Release:</b> {game.releaseDate?.split('T')[0]}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b>Updated:</b> {game.updatedAt?.split('T')[0]}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b> Developer:</b> {game.developer}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b>Publisher:</b> {game.publisher}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b>Genre: Відкритий світ, пригодницький, RPG</b> {Array.isArray(game.genre) ? game.genre.join(', ') : game.genre}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b>Category: AAA Game</b> {Array.isArray(game.category) ? game.category.join(', ') : game.category}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b>Age:</b> {game.ageRating}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b>Metacritic:</b> {game.metacritic}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b>Steam:</b> {game.steamReview}
            </span>
            <span className="text-base opacity-80 mb-1">
              <b>IGN:</b> {game.ignRating}
            </span>
             <button
                onClick={handleClick}
                className={`mt-6 px-20 py-4 rounded-lg font-semibold text-lg transition
                ${isFollowing ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-blue-700'}`}>
        {isFollowing ? 'Відписатись' : 'Слідкувати'}
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black text-center">
            Ви {isFollowing ? 'успішно підписались!' : 'відписались.'}
          </div>
        </div>
      )}
          </div>
        </div>
      </div>

      <div
        className="text-white px-16 py-3 flex items-center justify-between raleway-font"
        style={{
          height: 64,
          background: '#23272f',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <nav style={{ display: 'flex', gap: 24 }}>
          {navLinks.map(link => (
            <NavLink
              key={link.key}
              to={`/page/${slug}/${link.key}`}
              end={link.key === ''}
              style={({ isActive }) => ({
                background: 'none',
                border: 'none',
                color: isActive ? '#1AAAF5' : '#fff',
                fontWeight: isActive ? 'bold' : 'normal',
                fontSize: 16,
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: 6,
                transition: 'background 0.2s',
                textDecoration: 'none',
                display: 'inline-block'
              })}
              onMouseOver={e => (e.currentTarget.style.color = '#1AAAF5')}
              onMouseOut={e => (e.currentTarget.style.color = '')}
              
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ marginLeft: 32, position: 'relative', width: 220 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Пошук"
            style={{
              padding: '8px 36px 8px 12px',
              borderRadius: 24,
              border: '1px solid #353a45',
              font: 'italic 15px Arial, sans-serif',
              background: '#262629',
              color: '#fff',
              fontSize: 15,
              outline: 'none',
              width: 250,
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ADADBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: 'absolute',
              right: -10,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      <div className="p-16 text-white bg-[#1c1e22] min-h-[40vh]">
        <Outlet context={game} />
      </div>
      
    </div>
  );
};

export default GamePage;
