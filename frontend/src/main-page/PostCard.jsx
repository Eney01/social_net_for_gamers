import React, { useEffect, useState } from 'react';
import './index.css';
import { useSavedPosts } from "./contexts/SavedPostsContext.jsx";


const PostCard = ({
  id,
  username,
  dateTime,
  text,
  tags,
  images = [],
  videos = [],
  stats: { likes, comments, views, shares, saves },
  avatar
}) => {
    const { isSaved, savePost, unsavePost } = useSavedPosts();
    const [modalImg, setModalImg] = useState(null);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [likesCount, setLikesCount] = useState(likes);
    const [savesCount, setSavesCount] = useState(saves);

    const handleSave = () => {
  if (isSaved(id)) {
    unsavePost(id);
  } else {
    savePost({
      id,
      username,
      dateTime,
      text,
      tags,
      images,
      videos,
      stats: {
        likes,
        comments,
        views,
        shares,
        saves,
      },
      avatar
    });
  }
};

    return (
    <div
      className="p-4 rounded-xl shadow-md mb-6 w-full max-w-300 mx-auto"
      style={{ minHeight: 0, maxWidth: 1000 }}
    >
      {/* Header: avatar -> user -> date */}
      <div className="flex items-center mb-4">
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover mr-3"
            style={{ background: '#e0e0e0' }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
        )}
        <div>
          <p className="raleway-font text-left">{username}</p>
          <p className="raleway-font text-[12px] text-gray-500">{dateTime}</p>
        </div>
      </div>

      {/* Text */}
      <p className="raleway-font text-regal-text text-left">{text}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="bg-regal-bg raleway-font text-xs px-2 py-1 rounded-full">#{tag}</span>
        ))}
      </div>

      {/* Images */}
      {images.length > 0 && (
  images.length === 3 ? (
    <div
      className="mb-0"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '10px',
        height: '600px',
        marginBottom: 0
      }}
    >
      <img
        src={images[0]}
        alt="Post image 1"
        style={{
          width: '100%',
          height: '600px',
          objectFit: 'cover',
          borderRadius: '12px',
          cursor: 'pointer',
          gridRow: '1 / span 2'
        }}
        onClick={() => setModalImg(images[0])}
      />
      <img
        src={images[1]}
        alt="Post image 2"
        style={{
          width: '100%',
          height: '290px',
          objectFit: 'cover',
          borderRadius: '12px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
        onClick={() => setModalImg(images[1])}
      />
      <img
        src={images[2]}
        alt="Post image 3"
        style={{
          width: '100%',
          height: '290px',
          objectFit: 'cover',
          borderRadius: '12px',
          cursor: 'pointer'
        }}
        onClick={() => setModalImg(images[2])}
      />
    </div>
  ) : (
    <div
      className="mb-0"
      style={{
        display: 'grid',
        gap: '8px',
        gridTemplateColumns:
          images.length === 1
            ? '1fr'
            : images.length === 2
            ? '1fr 1fr'
            : images.length === 4
            ? '1fr 1fr'
            : undefined,
        gridTemplateRows:
          images.length === 4
            ? '1fr 1fr'
            : undefined,
      }}
    >
      {images.length === 4
        ? images.slice(0, 4).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Post image ${i + 1}`}
              style={{
                width: '100%',
                height: '290px',
                objectFit: 'cover',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
              onClick={() => setModalImg(src)}
            />
          ))
        : images.slice(0, 2).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Post image ${i + 1}`}
              style={{
                width: '100%',
                height: (images.length === 1 || images.length === 2) ? '600px' : '200px',
                objectFit: 'cover',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
              onClick={() => setModalImg(src)}
            />
          ))}
    </div>
  )
)}
      
      {videos.length > 0 && (
  <div className="mb-4 flex flex-col gap-4">
    {videos.map((src, i) => (
      <video
        key={i}
        src={src}
        controls
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '12px',
          backgroundColor: '#000'
        }}
      />
    ))}
  </div>
)}

      {/* Stats */}
            <div className="flex items-center justify-between text-gray-500 text-sm"
            style={{ marginTop: '16px' }}>
        <div className="flex items-center space-x-4">
          {/* Like */}
          <button
            className="flex items-center gap-1 raleway-font text-[14px]"
            style={{ color:'#BBBBBE', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={() => {setLiked(l => !l);
              setLikesCount(c => liked ? c - 1 : c + 1);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.775 1.5C3.58562 1.5 1 4.08259 1 7.26822C1 13.0364 7.825 18.2803 11.5 19.5C15.175 18.2803 22 13.0364 22 7.26822C22 4.08259 19.4144 1.5 16.225 1.5C14.272 1.5 12.5447 2.46854 11.5 3.95097C10.9674 3.19344 10.2599 2.5752 9.43746 2.14857C8.615 1.72194 7.70176 1.49948 6.775 1.5Z"
                fill={liked ? '#1AAAF5' : '#BBBBBE'}
                stroke={liked ? '#1AAAF5' : '#BBBBBE'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {likesCount.toLocaleString()}
          </button>
          {/* Comment */}
          <button
            className="flex items-center gap-1 raleway-font text-[14px]"
            style={{ color: '#BBBBBE', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.5 0.00105004C4.70085 0.00105004 1.73852e-06 4.70184 1.73852e-06 10.5009C-0.000888451 12.0479 0.34009 13.5761 0.998552 14.976L0.0220516 19.7397C-0.0127149 19.9098 -0.00476307 20.0859 0.0451953 20.2522C0.0951536 20.4184 0.18556 20.5697 0.30832 20.6925C0.431081 20.8152 0.582366 20.9056 0.748632 20.9556C0.914899 21.0055 1.09096 21.0135 1.26105 20.9787L6.0249 20.0022C7.3836 20.6427 8.9019 20.9997 10.5 20.9997C16.2992 20.9997 21 16.3 21 10.4999C21 4.70184 16.2992 0 10.5 0" fill="#BBBBBE"/>
            </svg>
            {comments.toLocaleString()}
          </button>
          {/* Views */}
          <span className="flex items-center gap-1 raleway-font text-[14px]">
            <svg width="18" height="15" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.5 0C7.57365 0 4.97385 1.32023 3.1227 2.9545C2.1945 3.77478 1.428 4.69485 0.8883 5.61281C0.357 6.51292 0 7.48865 0 8.40241C0 9.31617 0.357 10.2919 0.8883 11.192C1.428 12.1089 2.19345 13.03 3.1227 13.8503C4.97385 15.4846 7.5747 16.8048 10.5 16.8048C13.4263 16.8048 16.0261 15.4846 17.8773 13.8503C18.8065 13.03 19.572 12.1089 20.1117 11.192C20.643 10.2919 21 9.31617 21 8.40241C21 7.48865 20.643 6.51292 20.1117 5.61281C19.572 4.6959 18.8065 3.77478 17.8773 2.9545C16.0261 1.32023 13.4253 0 10.5 0ZM12.6 8.40241C12.978 8.40241 13.3319 8.30263 13.6384 8.12828C13.6944 8.77233 13.551 9.418 13.2276 9.97772C12.9042 10.5374 12.4165 10.9841 11.8307 11.2572C11.2449 11.5302 10.5893 11.6164 9.95284 11.504C9.31639 11.3917 8.72988 11.0862 8.27289 10.6291C7.8159 10.172 7.51053 9.58531 7.39821 8.94868C7.28589 8.31205 7.37206 7.65626 7.64502 7.07028C7.91799 6.4843 8.36453 5.99648 8.92409 5.673C9.48365 5.34952 10.1291 5.20604 10.773 5.26201C10.5909 5.58168 10.496 5.94357 10.4977 6.31147C10.4994 6.67937 10.5976 7.04037 10.7826 7.35835C10.9676 7.67633 11.2329 7.94014 11.5518 8.12337C11.8707 8.30659 12.2322 8.40282 12.6 8.40241Z" fill="#BBBBBE"/>
            </svg>
            {views.toLocaleString()} 
          </span>
          {/* Share */}
          <span className="flex items-center gap-1 raleway-font text-[14px]">
            <svg width="18" height="14" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.6876 16.7217C1.35889 16.8547 1 16.6128 1 16.2582V11.0191C1 10.7879 1.15843 10.5869 1.38316 10.5329L7.81921 8.98616C8.33009 8.86338 8.33009 8.13662 7.81921 8.01384L1.38316 6.46708C1.15843 6.41307 1 6.21206 1 5.98093V0.741786C1 0.387178 1.35889 0.145266 1.6876 0.278313L20.8549 8.03653C21.2715 8.20513 21.2715 8.79487 20.8549 8.96347L1.6876 16.7217Z" fill="#BBBBBE" stroke="#BBBBBE" strokeWidth="0.5"/>
            </svg>
            {shares.toLocaleString()} 
          </span>
        </div>
        <div>
          {/* Save */}
          <button
            className="flex items-center gap-1 raleway-font text-[14px]"
            style={{ color: '#BBBBBE', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={() => {setSaved(s => !s);
              setSavesCount(c => saved ? c - 1 : c + 1);
              handleSave();
            }}
          >
            <svg width="15" height="20" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 4.82568C1 3.48669 1 2.8172 1.2725 2.30551C1.51218 1.85563 1.89462 1.48986 2.365 1.26062C2.9 1 3.6 1 5 1H12C13.4 1 14.1 1 14.635 1.26062C15.1054 1.48986 15.4878 1.85563 15.7275 2.30551C16 2.8172 16 3.48669 16 4.82568V20.7321C16 21.3131 16 21.6037 15.8738 21.7627C15.8192 21.8318 15.7496 21.8888 15.6697 21.9297C15.5899 21.9706 15.5017 21.9943 15.4112 21.9994C15.2025 22.0113 14.95 21.8499 14.445 21.5283L8.5 17.7373L2.555 21.5271C2.05 21.8499 1.7975 22.0113 1.5875 21.9994C1.49729 21.9942 1.40935 21.9703 1.32972 21.9294C1.25009 21.8886 1.18067 21.8317 1.12625 21.7627C1 21.6037 1 21.3131 1 20.7321V4.82568Z"
                fill={isSaved(id) ? '#1AAAF5' : '#BBBBBE'}
                stroke={isSaved(id) ? '#5a7ad1' : '#BBBBBE'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {savesCount.toLocaleString()}
          </button>
        </div>
      </div>
      {/* Modal for images */}
      {modalImg && (
        <div
          className="modal-img-backdrop"
          onClick={() => setModalImg(null)}
          style={{
            position: 'fixed',
            zIndex: 1000,
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(30,32,40,0.85)', // напівпрозоре затемнення
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={modalImg}
            alt="modal"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 16,
              boxShadow: '0 4px 32px #000a'
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
