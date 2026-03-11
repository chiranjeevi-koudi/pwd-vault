import React from 'react';

interface SideNavProps {
  isExpanded: boolean;
  openModal: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ isExpanded, openModal }) => {
  return (
    <div className={`sidenav ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidenav-header">
        <button className="create-new-btn" onClick={openModal}>
          <span className="icon">+</span>
          {isExpanded && <span className="text">Create New</span>}
        </button>
      </div>
      <nav>
        <ul>
          <li className="active">
            <span className="nav-icon">🔑</span>
            {isExpanded && <span className="text">My Vault</span>}
          </li>
          <li>
            <span className="nav-icon">💳</span>
            {isExpanded && <span className="text">Payments</span>}
          </li>
          <li>
            <span className="nav-icon">🛡️</span>
            {isExpanded && <span className="text">Security Audit</span>}
          </li>
          <li>
            <span className="nav-icon">👁️</span>
            {isExpanded && <span className="text">BreachWatch</span>}
          </li>
          <li>
            <span className="nav-icon">🗑️</span>
            {isExpanded && <span className="text">Deleted Items</span>}
          </li>
          <li>
            <span className="nav-icon">🧩</span>
            {isExpanded && <span className="text">Secure Add Ons</span>}
          </li>
           <li>
            <span className="nav-icon">🎁</span>
            {isExpanded && <span className="text">Get a Gift Card</span>}
          </li>
        </ul>
      </nav>
      <div className="sidenav-footer">
        {isExpanded && <span>Encryption: ON</span>}
      </div>
    </div>
  );
};

export default SideNav;
