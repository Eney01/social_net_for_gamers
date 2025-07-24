import React from 'react';
import { useSavedPosts } from './contexts/SavedPostsContext';
import PostCard from './PostCard';

const SavedPostsPage = () => {
  const { savedPosts } = useSavedPosts();

  return (
    <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        background: '#23272f'
    }}>
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

      <h1 className="text-2xl mb-4">Збережені пости</h1>
      {savedPosts.length === 0 ? (
        <p>Немає збережених постів.</p>
      ) : (
        savedPosts.map(post => (
          <PostCard key={post.id} {...post} />
        ))
      )}
    </div>
  </main>
  </div>
);
};

export default SavedPostsPage;