import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import GlassCard from '../components/UI/GlassCard';
import { ArrowLeft, Clock, Users, Share2, Award, CheckCircle, Trophy } from 'lucide-react';
import PostBountyModal from '../components/Modals/PostBountyModal'; // Reusing for now or create a SubmitWorkModal

const QuestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { bounties, joinBounty } = useData();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const quest = bounties.find(b => b.id.toString() === id);

    if (!quest) {
        return (
            <div className="quest-detail-container">
                <div className="not-found">
                    <h2>Quest not found</h2>
                    <button className="btn-back" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        );
    }

    const handleJoin = () => {
        navigate(`/quest/submit/${quest.id}`);
    };

    return (
        <div className="quest-detail-page animate-fade-in">
            <button className="btn-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} /> Back to Explore
            </button>

            <div className="quest-header">
                <div className="header-content">
                    <div className="community-badge">
                        <img src={quest.communityImg} alt={quest.community} />
                        <span>{quest.community}</span>
                    </div>
                    <h1 className="quest-title">{quest.title}</h1>
                    <div className="quest-meta">
                        <span className="meta-item"><Clock size={16} /> {quest.deadline}</span>
                        <span className="meta-item"><Users size={16} /> {quest.participants} participants</span>
                        <span className="meta-item badge">{quest.category}</span>
                    </div>
                </div>
                <div className="header-action">
                    <div className="reward-display">
                        <span className="label">Reward</span>
                        <span className="amount">{quest.reward} LOFI</span>
                    </div>

                    {quest.winner ? (
                        <div className="winner-banner">
                            <Trophy size={20} />
                            <div>
                                <span className="winner-label">Winner Announced</span>
                                <span className="winner-address">{quest.winner}</span>
                            </div>
                        </div>
                    ) : (
                        <button className="btn-primary large" onClick={handleJoin}>
                            Submit Work
                        </button>
                    )}
                </div>
            </div>

            <div className="quest-grid">
                <div className="main-content">
                    <GlassCard className="content-card">
                        <h2>Description</h2>
                        <p>
                            This is a placeholder description for the quest. In a real application,
                            this would be fetched from a database and contain detailed instructions
                            on what the user needs to do to complete the bounty.
                        </p>
                        <p>
                            Task requirements:
                        </p>
                        <ul>
                            <li>Complete the core objective specified in the title.</li>
                            <li>Ensure high quality and attention to detail.</li>
                            <li>Submit your proof of work (link or file) before the deadline.</li>
                        </ul>
                    </GlassCard>

                    <GlassCard className="content-card">
                        <h2>Submission Guidelines</h2>
                        <p>To complete this quest, you will need to submit proof of work.</p>
                        <ul>
                            <li>Click "Submit Work" above.</li>
                            <li>Ensure your wallet is connected.</li>
                            <li>Provide a public link to your work.</li>
                        </ul>
                    </GlassCard>
                </div>

                <div className="sidebar-content">
                    <GlassCard className="sidebar-card">
                        <h3>About {quest.community}</h3>
                        <p className="text-sm text-secondary">A decentralized community focused on {quest.category.toLowerCase()} and impact.</p>
                        <button className="btn-outline full-width">View Profile</button>
                    </GlassCard>

                    <GlassCard className="sidebar-card">
                        <h3>Share</h3>
                        <button className="btn-share full-width">
                            <Share2 size={16} /> Copy Link
                        </button>
                    </GlassCard>
                </div>
            </div>

            <style>{`
        .quest-detail-page {
            max-width: 1000px;
            margin: 0 auto;
            padding-bottom: 40px;
        }

        .btn-back {
            display: flex;
            align-items: center;
            gap: 8px;
            background: none;
            border: none;
            color: var(--color-text-secondary);
            cursor: pointer;
            margin-bottom: 24px;
            font-size: 0.9rem;
            transition: color 0.2s;
        }
        .btn-back:hover { color: var(--color-text); }

        .quest-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 32px;
            gap: 24px;
        }
        
        .header-content { flex: 1; }

        .community-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            background: rgba(255, 255, 255, 0.05);
            width: fit-content;
            padding: 6px 12px 6px 6px;
            border-radius: var(--radius-full);
            font-size: 0.9rem;
        }
        
        .community-badge img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }

        .quest-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 16px;
            line-height: 1.2;
            background: linear-gradient(135deg, #fff, #a5a5a5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .quest-meta {
            display: flex;
            gap: 16px;
            color: var(--color-text-secondary);
            font-size: 0.9rem;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .meta-item.badge {
            background: rgba(255, 255, 255, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            color: var(--color-text);
        }

        .header-action {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 16px;
            min-width: 200px;
        }

        .reward-display {
            text-align: right;
        }
        
        .reward-display .label {
            display: block;
            font-size: 0.8rem;
            color: var(--color-text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .reward-display .amount {
            font-size: 2rem;
            font-weight: 700;
            color: var(--color-primary);
            text-shadow: 0 0 20px rgba(255, 137, 6, 0.3);
        }

        .btn-primary.large {
            padding: 14px 28px;
            font-size: 1.1rem;
            width: 100%;
        }

        .winner-banner {
            background: rgba(255, 137, 6, 0.15);
            border: 1px solid var(--color-primary);
            padding: 12px 20px;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--color-primary);
            width: 100%;
        }

        .winner-label {
            display: block;
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 1px;
        }

        .winner-address {
            font-family: monospace;
            font-weight: 600;
        }

        .quest-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 24px;
        }

        .content-card h2 {
            font-size: 1.4rem;
            margin-bottom: 16px;
            border-bottom: 1px solid var(--color-glass-border);
            padding-bottom: 8px;
        }
        
        .content-card p {
            margin-bottom: 16px;
            line-height: 1.6;
            color: var(--color-text-secondary);
        }
        
        .content-card ul {
            margin-left: 20px;
            margin-bottom: 16px;
            color: var(--color-text-secondary);
        }
        
        .content-card li { margin-bottom: 8px; }

        .sidebar-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .sidebar-card h3 {
            font-size: 1.1rem;
            margin-bottom: 12px;
        }

        .text-sm { font-size: 0.9rem; }
        .full-width { width: 100%; margin-top: 12px; }

        .btn-outline, .btn-share {
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--color-glass-border);
            color: var(--color-text);
            padding: 10px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .btn-outline:hover, .btn-share:hover {
             background: rgba(255,255,255,0.1);
        }

        .submission-success {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            padding: 16px;
            border-radius: var(--radius-sm);
            display: flex;
            align-items: center;
            gap: 12px;
            color: #10b981;
        }

        @media (max-width: 800px) {
            .quest-header { flex-direction: column; }
            .header-action { align-items: flex-start; width: 100%; }
            .quest-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default QuestDetail;
