import React, { createContext, useContext, useState } from "react";

const SavedPostsContext = createContext();

export const useSavedPosts = () => useContext(SavedPostsContext);

export const SavedPostsProvider = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);

  const savePost = (post) => {
    setSavedPosts((posts) =>
      posts.some((p) => p.id === post.id) ? posts : [...posts, post]
    );
  };

  const unsavePost = (id) => {
    setSavedPosts((posts) => posts.filter((p) => p.id !== id));
  };

  const isSaved = (id) => savedPosts.some((p) => p.id === id);

  return (
    <SavedPostsContext.Provider
      value={{ savedPosts, savePost, unsavePost, isSaved }}
    >
      {children}
    </SavedPostsContext.Provider>
  );
};