import React, { use } from 'react';
import PostCard from './PostCard';
import './index.css'; 
import video1 from './assets/IMG_1067.MP4';
import { useEffect, useState } from 'react';
import api from './api/api.js';


const newsPosts = [
  {
    avatar: "https://ik.imagekit.io/ufzr7vwbk/photo_2025-06-21_00-33-25.jpg?updatedAt=1750455218875",
    username: "MSI",
    dateTime: "2025-06-20 10:33",
    text: "На підході Ryzen 5 9600X3D з технологією 3D V‑Cache AMD офіційно підтвердила роботу над процесором. Точні характеристики новинки поки невідомі, але очікується, що він отримає 6 ядер/12 потоків з архітектурою Zen 5 та сумарно 96 МБ кеш-пам’яті третього рівня.",
    tags: ['MSI', 'Ryzen', 'News'],
    images: [
      "https://ik.imagekit.io/ufzr7vwbk/photo_2025-06-21_00-30-56.jpg?updatedAt=1750455150975",
    ],
    stats: { likes: 52, comments: 3, views: 69, shares: 7, saves: 9 }
  },
  {
    avatar: "https://ik.imagekit.io/ufzr7vwbk/photo_2025-06-21_00-33-25.jpg?updatedAt=1750455218875",
    username: "Папмпкін",
    dateTime: "2025-06-18 13:00",
    text: "За 2 роки продано три мільйони копій Lies of P! До весни 2025 року гра була доступна і за підпискою GamePass.",
    tags: ['News', 'Lies_of_P', 'продажа'],
    images: [
      "https://ik.imagekit.io/ufzr7vwbk/photo_2025-06-21_00-30-49.jpg?updatedAt=1750455151001"
    ],
    stats: { likes: 1200, comments: 300, views: 5000, shares: 150, saves: 80 }
  },
  {
    username: "TELEMART",
    dateTime: "2026-06-04 13:00",
    text: "Клава з бетону... Техноблогер з США зробив клавіатуру з бетону. Батя сказав, що такій клавіатурі зносу не буде і тепер це точно одна і на все життя ",
    tags: ['News', 'пост', 'привіт'],
    videos: [video1],
    stats: { likes: 1200, comments: 300, views: 5000, shares: 150, saves: 80 }
  },
  {
    avatar: "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/b8b2320379b1157e8b7e84cea718dfdc3631d0e7.png?updatedAt=1752796919557",
    username: "crypto_industry",
    dateTime: "2025-06-18 13:00",
    text: "Тим часом біткоін… Є хто купив по 16 000$?",
    tags: ['News', 'Offtop', 'продажа'],
    images: [
      "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/image.png?updatedAt=1752825167955"
    ],
    stats: { likes: 1200, comments: 300, views: 5000, shares: 150, saves: 80 }
  },
];

export default function NewsPage() {
  // Розділяємо пости на дві колонки
  const left = newsPosts.filter((_, i) => i % 2 === 0);
  const right = newsPosts.filter((_, i) => i % 2 !== 0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts').then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    <div style={{
      display: 'flex',
      minHeight: 'calc(100vh - 64px)',
      background: '#23272f',
      justifyContent: 'center',
      padding: '40px 0'
    }}>
      <main style={{
        display: 'flex',
        gap: 40,
        width: 1200,
        justifyContent: 'center',
      }}>
        {/* Ліва колонка */}
        <div className='raleway-font' style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32, color: '#fff' }}>
          {left.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
        {/* Права колонка */}
        <div className='raleway-font' style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32, color: '#fff'  }}>
          {right.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </main>
    </div>
  </div>
  );
}