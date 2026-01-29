import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../UI/GlassCard';
import { Clock, Users } from 'lucide-react';

const BountyCard = ({
  id,
  title,
  community,
  communityImg,
  reward,
  deadline,
  tags = [],
  participants = 0
}) => {
  const navigate = useNavigate();

  return (
    <GlassCard hoverEffect className="bounty-card" onClick={() => navigate(`/quest/${id}`)}>
      <div className="card-header">
        <div className="community-info">
          <img src={communityImg || 'https://via.placeholder.com/32'} alt={community} className="community-img" />
          <span className="community-name">{community}</span>
        </div>
        <div className="reward-badge">
          {reward} LOFI
        </div>
      </div>

      <h3 className="bounty-title">{title}</h3>

      <div className="tags">
        {tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="card-footer">
        <div className="meta-info">
          <Clock size={14} className="icon" />
          <span>{deadline}</span>
        </div>
        <div className="meta-info">
          <Users size={14} className="icon" />
          <span>{participants} active</span>
        </div>
      </div>

      <style>{`
        .bounty-card {
          min-height: 220px;
          justify-content: space-between;
          cursor: pointer;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .community-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .community-img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
        }

        .community-name {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .reward-badge {
          background: rgba(255, 137, 6, 0.15);
          color: var(--color-primary);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid rgba(255, 137, 6, 0.2);
        }

        .bounty-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 16px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .tag {
          font-size: 0.75rem;
          padding: 4px 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          color: var(--color-text-secondary);
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--color-glass-border);
          color: var(--color-text-secondary);
          font-size: 0.8rem;
        }

        .meta-info {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .icon {
          opacity: 0.7;
        }
      `}</style>
    </GlassCard>
  );
};

export default BountyCard;
