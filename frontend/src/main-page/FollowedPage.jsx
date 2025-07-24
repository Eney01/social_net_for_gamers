import React from 'react';   
import PostCard from './PostCard';


const FollowedPage = () => (
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
                    username="Vladislave"
                    dateTime="2025-06-12 17:12"
                    text="Сьогодні пограв в чудову гру - Spore. Зацініть яку я ракету створив!"
                    tags={['spore', 'потужно']}
                    images={[
                        "https://ik.imagekit.io/ufzr7vwbk/photo_2025-06-16_19-48-49.jpg?updatedAt=1750092643949",
                    ]}
                    avatar={['https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/photo_2023-05-30_17-56-12.jpg?updatedAt=1752765590040']}
                    stats={{ likes: 13, comments: 3, views: 500, shares: 10, saves: 8 }} />
                <PostCard
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
                    avatar={['https://i.scdn.co/image/ab67616d0000b2737f158d901d17cece6bef2211']}
                    stats={{ likes: 13, comments: 3, views: 500, shares: 10, saves: 8 }} />

                    
            </div>
        </main>

    </div>
            
);

export default FollowedPage;