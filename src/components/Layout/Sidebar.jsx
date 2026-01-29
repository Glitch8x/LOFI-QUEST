import React, { useState } from 'react';
import { Home, Compass, Banknote, PlusCircle, Settings, LogOut, User, Trophy } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import PostBountyModal from '../Modals/PostBountyModal';

const Sidebar = () => {
  const dataContext = useData();
  const { postBounty, notifications } = dataContext || { postBounty: () => { }, notifications: [] };
  const auth = useAuth();
  const user = auth?.user;
  // const user = { name: 'Yeti Believer', level: 1 };
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debug log
  // if (!auth) console.error("Sidebar: AuthContext is missing!");

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Banknote, label: 'Grants', path: '/grants' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handlePostBounty = (newBounty) => {
    postBounty(newBounty);
  };

  // Mobile Toggle state
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking a link on mobile
  const handleNavClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="mobile-menu-toggle mobile-only"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 200,
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-glass-border)',
          borderRadius: '8px',
          padding: '8px',
          color: 'var(--color-text)'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
        </svg>
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay mobile-only"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 90,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <h1 className="logo">Lofi <span className="highlight">Quests</span></h1>
        </div>

        <div className="sidebar-scroll">
          <nav className="nav-menu">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-action">
            <button className="btn-primary full-width" onClick={() => setIsModalOpen(true)}>
              <PlusCircle size={18} style={{ marginRight: '8px' }} />
              Post Bounty
            </button>
          </div>

          <div className="user-section">
            <div className="user-avatar" />
            <div className="user-info">
              <p className="username">{user?.name || user?.walletAddress || 'Yeti Believer'}</p>
              <p className="user-level">Lvl {user?.level || 1}</p>
            </div>
            <NavLink to="/admin" className="user-action" title="Admin Access">
              <Settings size={18} />
            </NavLink>
          </div>
        </div>


        {/* Simple Notification Toast/Badge Area (Mock) */}
        {notifications && notifications.length > 0 && !notifications[0].read && (
          <div className="notification-toast animate-fade-in">
            <p className="notif-text">🎉 1 New Payout!</p>
          </div>
        )}

        <style>{`
            .notification-toast {
                position: absolute;
                bottom: 90px;
                left: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981, #059669);
                padding: 10px;
                border-radius: 8px;
                color: white;
                font-size: 0.85rem;
                font-weight: 600;
                text-align: center;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                animation: slideUp 0.3s ease-out;
            }
            @keyframes slideUp {
                from { transform: translateY(10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `}</style>

        <PostBountyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPost={handlePostBounty}
        />

        <style>{`
        .sidebar {
          width: 260px;
          height: calc(100vh - 32px);
          position: fixed;
          left: 16px;
          top: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          justify-content: flex-start; /* Force content to top */
        }

        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-110%);
                left: 0;
                top: 0;
                height: 100vh;
                width: 280px;
                border-radius: 0;
                border-right: 1px solid var(--color-glass-border);
                background: var(--color-bg-card); /* Less transparent on mobile for legibility */
            }
            .sidebar.open {
                transform: translateX(0);
            }
            .mobile-only {
                display: block;
            }
            .mobile-menu-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        @media (min-width: 769px) {
            .mobile-only {
                display: none;
            }
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }

        .sidebar-scroll {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-right: 4px; /* Space for scrollbar if visible */
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .sidebar-scroll::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .sidebar-scroll {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }

        .highlight {
          color: var(--color-primary);
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 0 0 auto !important; /* Force no growth */
          margin-bottom: 20px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nav-item:hover, .nav-item.active {
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-text);
        }

        .nav-item.active {
          background: rgba(59, 130, 246, 0.1); 
          color: var(--color-primary);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.15); /* Soft glow */
        }

        .sidebar-action {
          margin-bottom: 24px;
        }

        .full-width {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 20px; /* Separate from content above */
          padding: 12px 16px; /* Inner padding for the bar look */
          background: rgba(0, 0, 0, 0.2); /* Darker background for contrast */
          border-radius: 16px;
          border: 1px solid var(--color-glass-border);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
        }

        .user-info {
          flex: 1;
        }

        .username {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .user-level {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }

        .user-action {
          cursor: pointer;
          color: var(--color-text-secondary);
          transition: color 0.2s;
          margin-left: auto; /* Push to the right edge of the bar */
          display: flex;
          align-items: center;
          padding: 4px;
        }

        .user-action:hover {
          color: var(--color-text);
        }

        .wallet-section {
          margin-bottom: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--color-glass-border);
        }

        .btn-wallet {
          width: 100%;
          padding: 10px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-glass-border);
          color: var(--color-text);
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
        }

        .btn-wallet:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-primary);
        }

        .btn-wallet.connected {
          background: rgba(59, 130, 246, 0.1);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .wallet-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981; /* Green */
          box-shadow: 0 0 8px #10b981;
        }
      `}</style>
      </aside >
    </>
  );
};

export default Sidebar;
