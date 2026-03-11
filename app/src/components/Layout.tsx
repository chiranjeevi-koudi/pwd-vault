import React, { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

interface LayoutProps {
  children: React.ReactNode;
  openModal: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, openModal }) => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);

  const toggleSideNav = () => {
    setIsSideNavExpanded(!isSideNavExpanded);
  };

  return (
    <div className="app-container">
      <TopNav toggleSideNav={toggleSideNav} />
      <div className="layout">
        <SideNav isExpanded={isSideNavExpanded} openModal={openModal} />
        <div className="main-content">
          <div className="content-area">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
