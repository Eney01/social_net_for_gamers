import React from 'react';
import PostCard from "./PostCard";

const GameMain = () => {
  const samplePosts = [
    {
      id: 1,
      username: "Rockstar Games",
      dateTime: "2025-06-04 12:00",
      text: "Evade Enemy Fire in the  New Dodge a Bullet Twist  on Head for the Hills...  ",
      tags: ["RDR", "Update"],
      images: ['https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/2a23ea1510b6187735ca80c51998265f4e2925c5.jpg?updatedAt=1752822814749'],
      videos: [],
      stats: { likes: 1321, comments: 45, views: 4315, shares: 89, saves: 151 },
      avatar: "https://ik.imagekit.io/ufzr7vwbk/channels4_profile.jpg?updatedAt=1750251355442"
    },
    {
      id: 2,
      username: "Silent Eye",
      dateTime: "2025-04-06 14:30",
      text: "The Elder Scrolls IV: Oblivion - Remastered | Офіційний анонс",
      tags: ["сюжет", "шок"],
      images: ["https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/faddfc37b95fcb72a098e843e70c5102343fcf71.png?updatedAt=1752823130303",
        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/859edb5211d8105f0a027ece7a42d305faf98f78.png?updatedAt=1752823130581",
        "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/5c528c2db26412a272b8cdd72654d443a43b2c3f.png?updatedAt=1752823131236"
      ],
      videos: [],
      stats: { likes: 12516, comments: 0, views: 91401, shares: 2731, saves: 819 },
      avatar: "https://ik.imagekit.io/ufzr7vwbk/For%20social%20net/image%20(1).png?updatedAt=1752332379325"
    }
  ];


  return (
    <div className="space-y-6">
      {samplePosts.map(post => <PostCard key={post.id} {...post} />)}
    </div>
  );
};

export default GameMain;