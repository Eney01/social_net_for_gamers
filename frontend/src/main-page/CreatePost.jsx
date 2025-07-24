import React, { useState, useRef } from 'react';
import { createPost } from '../services/PostService.js';
import { FaImage, FaPlusCircle, FaSmile, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFiletypeGif } from 'react-icons/bs';

const CreatePost = ({ onClose }) => {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // місце для попереднього перегляду файлу... Soon
      alert(`Вибрати файл: ${file.name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      content,
      userId: 1, // тимчасово, нема авторизації
      media: []
    };

    try {
      await createPost(postData);
      alert(`Пост від "${nickname}" створено!`);
      setContent('');
      setNickname('');
      onClose?.();
    } catch (err) {
      console.error(err);
      alert('Помилка при створенні поста');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
    style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div className="bg-[#1e1e1e] rounded-lg w-full max-w-xl text-white shadow-lg">
        {/* Заголовок */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-base font-semibold">Створити пост</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Введіть ваш нікнейм"
            className="bg-transparent border-none placeholder-gray-400 text-sm text-gray-300"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Введіть текст..."
            className="bg-transparent resize-none min-h-[150px] border-none placeholder-gray-400 text-sm focus:outline-none"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-3 text-gray-400 text-lg">
              <FaImage className="cursor-pointer hover:text-white" onClick={handleImageClick}/>
              <BsFiletypeGif className="cursor-pointer hover:text-white" />
              <FaPlusCircle className="cursor-pointer hover:text-white" />
              <FaSmile className="cursor-pointer hover:text-white" />
              <FaMapMarkerAlt className="cursor-pointer hover:text-white" />
            </div>

            <button type="submit" className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-1.5 rounded-full text-sm" >
              Опублікувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
