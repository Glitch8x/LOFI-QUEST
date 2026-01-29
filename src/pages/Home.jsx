import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, Briefcase, Zap, DollarSign, CheckCircle } from 'lucide-react';
import BountyCard from '../components/Bounties/BountyCard';
import GlassCard from '../components/UI/GlassCard';
import CreateBountyModal from '../components/Modals/CreateBountyModal';
import { useData } from '../context/DataContext';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Content', 'Design', 'Development'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { bounties, stats } = useData();

  // Filter logic
  const filteredBounties = bounties.filter(bounty => {
    // 1. Tab Filter (Bounties vs Projects)
    if (activeTab === 'design' && (bounty.type && bounty.type !== 'bounty')) return false; // 'design' tab maps to 'Bounties' button
    if (activeTab === 'projects' && (bounty.type !== 'project')) return false;

    // 2. Category Pill Filter
    if (activeFilter === 'All') return true;
    if (activeFilter === 'For You') return bounty.featured;
    return bounty.category === activeFilter;
  });

  return (
    <div className="home-dashboard animate-fade-in">
      {/* Left Column: Main Content */}
      <div className="main-column">

        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="banner-content">
            <div className="user-greeting">
              <img src="/welcome-logo-v4.png" alt="Logo" className="avatar-large" />
              <div>
                <h1 className="welcome-title">Welcome back, Yeti Believer</h1>
                <p className="welcome-subtitle">We're so glad to have you on Lofi Quests.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Browse Section */}
        <div className="browse-section">
          <div className="section-header">
            <h2 className="section-title">Browse Opportunities</h2>
            <div className="tabs">
              <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
              <button className={`tab ${activeTab === 'design' ? 'active' : ''}`} onClick={() => setActiveTab('design')}>Bounties</button>
              <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
            </div>
            <div className="action-buttons" style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-filter-icon"><Filter size={16} /> Filter</button>
              <button
                className="btn-primary-small"
                onClick={() => setIsModalOpen(true)}
              >
                + Post Opportunity
              </button>
            </div>
          </div>

          <div className="filter-pills">
            {['For You', 'All', 'Content', 'Design', 'Development', 'Green Impact'].map(filter => (
              <button
                key={filter}
                className={`pill ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                style={{ position: 'relative' }}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activePill"
                    className="active-pill-bg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  color: activeFilter === filter ? '#ffffff' : 'var(--color-text-secondary)',
                  fontWeight: activeFilter === filter ? 600 : 500,
                  transition: 'color 0.2s'
                }}>{filter}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="bounty-list">
            <AnimatePresence mode="popLayout">
              {filteredBounties.length > 0 ? (
                filteredBounties.map(bounty => (
                  <motion.div
                    key={bounty.id}
                    layout // Animate layout changes when list reorders
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BountyCard {...bounty} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}
                >
                  <p>No active bounties in this category yet.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <CreateBountyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Right Column: Sidebar Widgets */}
      <div className="right-sidebar">
        {/* Stats Widget */}
        <GlassCard className="stats-widget">
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <DollarSign size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="stat-value">${stats.totalValueEarned.toLocaleString()} <span className="currency">USD</span></h3>
              <p className="stat-label">Total Value Earned</p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <Briefcase size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="stat-value">{stats.opportunitiesListed.toLocaleString()}</h3>
              <p className="stat-label">Opportunities Listed</p>
            </div>
          </div>
        </GlassCard>

        {/* How it works */}
        <div className="widget">
          <h3 className="widget-title">HOW IT WORKS</h3>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-check"><CheckCircle size={16} /></div>
              <div>
                <h4 className="step-title">Create your Profile</h4>
                <p className="step-desc">by telling us about yourself</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-icon"><Zap size={16} /></div>
              <div>
                <h4 className="step-title">Participate in Bounties</h4>
                <p className="step-desc">to build proof of work</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-icon"><DollarSign size={16} /></div>
              <div>
                <h4 className="step-title">Get Paid for Your Work</h4>
                <p className="step-desc">in global standards</p>
              </div>
            </div>
          </div>
        </div>


      </div>

      <style>{`
        .home-dashboard {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          padding-top: 24px;
        }

        /* Welcome Banner */
        .welcome-banner {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: var(--radius-lg);
          padding: 32px;
          color: white;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }

        .welcome-banner::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.2), transparent);
          pointer-events: none;
        }
        
        .user-greeting {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .avatar-large {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #fff;
          /* Removed border and padding to make image full */
          object-fit: cover; 
          transform: scale(1.2); /* Enlarge to force fit */
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .welcome-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .welcome-subtitle {
          opacity: 0.9;
          font-size: 1.1rem;
        }

        /* Browse Section */
        .section-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-right: auto;
        }

        .tabs {
          display: flex;
          gap: 16px;
        }

        .tab {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          background: transparent;
          padding-bottom: 8px;
          border-bottom: 2px solid transparent;
        }

        .tab.active {
          color: var(--color-text);
          border-bottom-color: var(--color-primary);
        }

        .btn-filter-icon {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        .filter-pills {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .pill {
          padding: 6px 16px;
          border-radius: var(--radius-full);
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-glass-border);
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .pill.active {
          background: rgba(59, 130, 246, 0.15);
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .bounty-list {
          display: grid;
          gap: 16px;
        }

        /* Sidebar Widgets */
        .right-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .stats-widget {
          padding: 24px;
          /* Inherits glass style from GlassCard */
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 0;
        }

        .divider {
          height: 1px;
          background: var(--color-glass-border);
          margin: 16px 0;
        }

        .stat-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-primary { color: var(--color-primary); }
        .text-secondary { color: var(--color-secondary); }

        .stat-value {
          font-size: 1.2rem;
          font-weight: 700;
          transition: color 0.3s;
        }
        
        .currency {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          font-weight: 400;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        /* Widget Steps */
        .widget-title {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          letter-spacing: 1px;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .steps-list {
          padding-left: 10px;
        }

        .step-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .step-icon, .step-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          flex-shrink: 0;
          z-index: 2;
        }
        
        .step-check {
          background: var(--color-primary);
          color: white;
        }

        .step-line {
          width: 1px;
          height: 30px;
          background: var(--color-glass-border);
          margin-left: 12px;
          margin-top: -4px;
          margin-bottom: -4px;
        }

        .step-title {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .step-desc {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }


        @media (max-width: 1024px) {
          .home-dashboard {
            grid-template-columns: 1fr;
          }
          .right-sidebar {
            display: none; /* Hide sidebar on small screens for now, or move bottom */
          }
        }
          .btn-primary-small {
            background: var(--color-primary);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: var(--radius-sm);
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          .btn-primary-small:hover {
            background: var(--color-primary-hover);
          }
          
          .active-pill-bg {
            position: absolute;
            inset: -4px; /* Make it larger than the container */
            background: var(--color-primary);
            border-radius: var(--radius-full);
            z-index: 0;
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); /* Enhanced glow */
          }

          /* Override active state since we use the motion div now */
          .pill.active {
            background: transparent;
            border-color: transparent;
            /* Text color is handled inline */
          }
      `}</style>
    </div >
  );
};

export default Home;
