import React from "react";
import PostCard from "./PostCard.jsx";

const GameInfo = () => {
  const infoPosts = [
    {
      id: 3,
      username: "DevTalks",
      dateTime: "2025-07-10",
      text: "Останній патч додав RTX підтримку та нову локацію в пустелі.",
      tags: ["оновлення", "графіка"],
      images: [],
      videos: [],
      stats: { likes: 40, comments: 10, views: 300, shares: 0, saves: 4 },
      avatar: "https://i.imgur.com/devtalk.jpg"
    }
  ];

  return (
    <div className="space-y-6">
      {infoPosts.map(post => <PostCard key={post.id} {...post} />)}
    </div>
  );
};

export default GameInfo;