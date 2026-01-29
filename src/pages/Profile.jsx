import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import GlassCard from '../components/UI/GlassCard';
import { User, Mail, Award, LogOut, Shield, DollarSign } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const { stats } = useData();

  if (!user) return null; // Should be handled by ProtectedRoute, but safe check

  return (
    <div className="profile-page animate-fade-in">
      <div className="profile-header">
        <h1 className="page-title">My Profile</h1>
      </div>

      <div className="profile-grid">
        {/* Main Info Card */}
        <GlassCard className="profile-card main-info">
          <div className="profile-cover"></div>
          <div className="profile-content">
            <div className="avatar-wrapper">
              <img src={user.avatar} alt={user.name} className="profile-avatar" />
            </div>

            <div className="user-details">
              <h2 className="user-name">{user.name}</h2>
              <div className="user-id">
                <Shield size={14} className="icon-small" />
                <span>Level 42 Yeti</span>
              </div>
            </div>

            <div className="contact-info">
              <div className="info-row">
                <Mail size={16} className="text-secondary" />
                <span>{user.email}</span>
              </div>
            </div>

            <button onClick={logout} className="btn-logout">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </GlassCard>

        {/* Stats Column */}
        <div className="stats-column">
          <GlassCard className="stat-card">
            <div className="stat-icon bg-primary">
              <DollarSign size={24} color="white" />
            </div>
            <div>
              <h3>${(user.earnings || 0).toLocaleString()} <span className="text-sm">USD</span></h3>
              <p className="text-secondary">Total Earned</p>
            </div>
          </GlassCard>

          <GlassCard className="stat-card">
            <div className="stat-icon bg-accent">
              <Award size={24} color="white" />
            </div>
            <div>
              <h3>{user.completedQuests || 0}</h3>
              <p className="text-secondary">Quests Completed</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent Activity / "My Bounties" Section */}
      <h2 className="section-title">My Active Quests</h2>
      <GlassCard className="activity-section">
        <div className="empty-state">
          <p>You haven't joined any active quests yet.</p>
          <button className="btn-link">Explore Opportunities &rarr;</button>
        </div>
      </GlassCard>

      <style>{`
        .profile-page {
          padding-top: 20px;
        }

        .page-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .profile-card {
          padding: 0;
          overflow: hidden;
          position: relative;
        }

        .profile-cover {
          height: 120px;
          background: linear-gradient(to right, var(--color-primary), var(--color-accent));
          opacity: 0.8;
        }

        .profile-content {
          padding: 24px;
          padding-top: 0;
          position: relative;
        }

        .avatar-wrapper {
          margin-top: -50px;
          margin-bottom: 16px;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid var(--color-bg);
          background: #2a2a2a;
          object-fit: cover;
        }

        .user-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .user-id {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-primary);
          font-weight: 500;
          font-size: 0.9rem;
          margin-bottom: 16px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-glass-border);
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-text-secondary);
        }

        .btn-logout {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid var(--color-glass-border);
          background: rgba(255, 77, 79, 0.1);
          color: #ff4d4f;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background: rgba(255, 77, 79, 0.2);
        }

        /* Stats Column */
        .stats-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stat-card {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-primary { background: var(--color-primary); }
        .bg-accent { background: var(--color-accent, #7f5af0); }

        .text-sm { font-size: 0.8rem; font-weight: 400; color: var(--color-text-secondary); }

        .section-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .activity-section {
          padding: 40px;
          text-align: center;
        }

        .empty-state {
          color: var(--color-text-secondary);
        }

        .btn-link {
          background: none;
          border: none;
          color: var(--color-primary);
          font-weight: 500;
          margin-top: 8px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
