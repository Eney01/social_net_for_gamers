import React from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost.jsx';
import './index.css';


const MainContent = () => (
    
    <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        background: '#23272f'
    }}>
        {/* Основний контент */}
        <main style={{
            flex: 1,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#fff'
        }}>
            <div style={{
                marginTop: 32,
                background: '#23272f',
                borderRadius: 16,
                padding: 32,
                minWidth: 400,
                textAlign: 'center'
            }}>
                <PostCard
                    avatar = "https://ik.imagekit.io/ufzr7vwbk/photo_2025-06-04_13-09-27.jpg"
                    username="Vladislave"
                    dateTime="1944-06-04 13:52"
                    text="Привіт спільното! Познайомимось? 
                     Крутий майстер по грі StarCraft 2, Spore і Geometry Dash.
                     Вибачте за фото мого лиця, оффтоп признаю :)"
                    tags={['biography', 'about_me', 'hello']}
                    images={[
                        "https://ik.imagekit.io/ufzr7vwbk/photo_2025-06-04_13-09-27.jpg",
                    ]}
                    stats={{ likes: 1200, comments: 300, views: 5000, shares: 150, saves: 80 }} />

                    <PostCard
                    username="Pumpkin"
                    dateTime="2025-06-04 13:00"
                    text="Це мій перший пост на цій платформі! Зацініть які маю досягнення, в майнкрафті"
                    tags={['перший', 'пост', 'привіт']}
                    images={[
                        "https://ik.imagekit.io/ufzr7vwbk/photo_1_2025-07-04_01-58-00.jpg?updatedAt=1751583526752",
                        "https://ik.imagekit.io/ufzr7vwbk/photo_2_2025-07-04_01-58-00.jpg?updatedAt=1751583526834"
                    ]}
                    stats={{ likes: 10, comments: 3, views: 50, shares: 1, saves: 8 }} />

                    <PostCard
                    avatar = "https://ik.imagekit.io/ufzr7vwbk/image_2025-01-19_10-46-47.png?updatedAt=1748859487762"
                    username="Cs2_enjoyer"
                    dateTime="2025-07-02 14:50"
                    text="Сьогодні вночі завезли обнову з наліпками Austin Major 2025, на скриншоті 
                    ви можете побачити одні з найкрасивіших наліпок, які я знайшов. Як вам взагалі?"
                    tags={['апдейт', 'кс2', 'наліпки']}
                    images={[
                        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/photo_3_2025-07-04_02-02-57.jpg?updatedAt=1751583823857",
                        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/photo_2_2025-07-04_02-02-57.jpg?updatedAt=1751583823865",
                        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/photo_2_2025-07-04_02-02-57.jpg?updatedAt=1751583823865"
                    ]}
                    stats={{ likes: 100, comments: 30, views: 50, shares: 1, saves: 8 }} />

                    <PostCard
                    avatar = "https://i.scdn.co/image/ab67616d0000b2737f158d901d17cece6bef2211"
                    username="n0vak"
                    dateTime="2025-07-01 11:10"
                    text="Встиг якось між навчанням купити собі консольку, пограв місяць і ось результати які ігри маю. А ви як розважаєтесь? )"
                    tags={['ps5', 'games']}
                    images={[
                        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/photo_2_2025-07-04_02-20-14.jpg?updatedAt=1751584833753",
                        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/photo_4_2025-07-04_02-20-14.jpg?updatedAt=1751584833764",
                        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/photo_1_2025-07-04_02-20-14.jpg?updatedAt=1751584833801",
                        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/photo_3_2025-07-04_02-20-14.jpg?updatedAt=1751584833828"
                    ]}
                    stats={{ likes: 1593, comments: 301, views: 5000, shares: 293, saves: 87 }} />
            </div>
        </main>
   {/* <div className="p-4">
      <CreatePost />
      {/* посткард 
    </div> */}
</div>
            
);

export default MainContent;