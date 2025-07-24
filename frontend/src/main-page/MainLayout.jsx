import Sidebar from './LeftSidebar.jsx';
import RightSidebar from './RightSidebar.jsx';
import "./Sidebar.css";
import { Outlet } from 'react-router-dom';
import { useCommunity } from './contexts/CommunityContext';

const MainLayout = () => {
  const { joinedCommunities } = useCommunity();

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar joinedCommunities={joinedCommunities} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <RightSidebar />
    </div>
  );
};

export default MainLayout;