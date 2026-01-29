import React from 'react';
import { Banknote, ArrowRight, CheckCircle } from 'lucide-react';
import GlassCard from '../components/UI/GlassCard';
import { useData } from '../context/DataContext';

import { useNavigate } from 'react-router-dom';

const Grants = () => {
  const { grants } = useData();
  const navigate = useNavigate();

  if (!grants) return <div style={{ padding: 40, color: 'white' }}>Loading Grants...</div>;

  const handleApplyClick = (id) => {
    navigate(`/grants/apply/${id}`);
  };

  return (
    <div className="grants-page animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">
          <Banknote className="title-icon" size={32} />
          Community <span className="highlight">Grants</span>
        </h1>
        <p className="page-subtitle">Apply for funding to kickstart your impact projects.</p>
      </header>

      <div className="grants-grid">
        {grants.map(grant => {
          return (
            <GlassCard key={grant.id} hoverEffect className="grant-card">
              <div className="grant-content">
                <div className="grant-header">
                  <span className="grant-amount">{grant.amount}</span>
                  <div className="grant-tags">
                    {grant.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="grant-title">{grant.title}</h3>
                <p className="grant-desc">{grant.description}</p>

                <div className="applicants-count">
                  {grant.applicants} applicants so far
                </div>
              </div>
              <button
                className="btn-apply"
                onClick={() => handleApplyClick(grant.id)}
              >
                Apply Now <ArrowRight size={16} />
              </button>
            </GlassCard>
          )
        })}
      </div>

      <style>{`
        .grants-page {
          padding: 40px 0;
        }
        .page-header {
          margin-bottom: 40px;
        }
        .page-title {
           font-size: 2.5rem;
           font-weight: 700;
           display: flex;
           align-items: center;
           gap: 12px;
           margin-bottom: 8px;
        }
        .title-icon {
          color: var(--color-primary);
        }
        .page-subtitle {
          color: var(--color-text-secondary);
          font-size: 1.1rem;
        }
        .grants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        .grant-card {
           height: 100%;
           justify-content: space-between;
           min-height: 280px;
        }
        .grant-amount {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-accent);
        }
        .grant-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .grant-tags {
          display: flex;
          gap: 8px;
        }
        .tag {
          font-size: 0.75rem;
          padding: 4px 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          color: var(--color-text-secondary);
        }
        .grant-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .grant-desc {
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .applicants-count {
            font-size: 0.85rem;
            color: var(--color-primary);
            margin-bottom: 24px;
        }
        .btn-apply {
          background: rgba(255,255,255,0.05);
          color: var(--color-text);
          padding: 12px;
          border-radius: var(--radius-md);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .btn-apply:hover {
          background: var(--color-bg-secondary);
          border-color: var(--color-text-secondary);
        }
        .btn-apply.applied {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            border-color: #10b981;
            cursor: default;
        }
      `}</style>
    </div>
  );
};

export default Grants;
