import React, { useState } from 'react';
import './index.css';
import { useCommunity } from './contexts/CommunityContext';

const CommunityCard = ({ banner, avatar, title, description, membersCount }) => {
  const { joinedCommunities, joinCommunity, leaveCommunity } = useCommunity();

  const isJoined = joinedCommunities.some(c => c.title === title);
  const [members, setMembers] = useState(membersCount);

  const handleToggle = () => {
    if (isJoined) {
      leaveCommunity(title);
      setMembers(m => m - 1);
    } else {
      joinCommunity({ title, avatar });
      setMembers(m => m + 1);
    }
  };

  return (
    <div className="raleway-font flex flex-col items-center">
      <div
        className="relative rounded-xl p-4 shadow-sm mb-18 overflow-hidden hover:shadow-lg transition flex items-center"
        style={{ width: 1140, height: 250 }}
      >
        {banner && (
          <img
            src={banner}
            alt="Community Banner"
            className="absolute inset-0 w-full h-full object-cover rounded-xl pointer-events-none"
          />
        )}
        <div className="relative ml-10 z-10 flex items-center gap-4 w-full">
          <img
            src={avatar}
            alt="Group Avatar"
            className="w-40 h-40 rounded-lg object-cover"
          />
          <div className="raleway-font flex-1 space-y-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-base">{description}</p>
            <p className="text-sm mt-1">Учасників: {members}</p>
          </div>
          <button
            onClick={handleToggle}
            className={`raleway-font px-6 py-3 rounded-md transition text-base ${
              isJoined ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            style={{ marginRight: '52px' }}
          >
            {isJoined ? 'Покинути' : 'Приєднатися'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;