import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import GlassCard from '../../components/UI/GlassCard';
import { PlusCircle, Trophy, Banknote, RefreshCw } from 'lucide-react';
import PostBountyModal from '../../components/Modals/PostBountyModal';
import PostGrantModal from '../../components/Modals/PostGrantModal';

const AdminDashboard = () => {
    const { bounties, grants, submissions, selectWinner: oldSelectWinner, selectRankedWinner, postBounty, postGrant, syncTelegram } = useData();
    const [activeTab, setActiveTab] = useState('bounties');
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSelectWinner = (bountyId, wallet) => {
        if (window.confirm(`Are you sure you want to select ${wallet} as the winner?`)) {
            oldSelectWinner(bountyId, wallet);
            alert('Winner selected successfully!');
        }
    };

    const selectWinner = (bountyId, name, rank) => {
        if (window.confirm(`Select ${name} as ${rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'} Place?`)) {
            selectRankedWinner(bountyId, name, rank);
            // alert(`Rank ${rank} selected!`);
        }
    }

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            syncTelegram();
            setIsSyncing(false);
            alert("Raid data synced from Telegram Channel!");
        }, 1500); // Fake loading time
    };

    return (
        <div className="admin-dashboard animate-fade-in">
            <header className="admin-header">
                <div>
                    <h1 className="page-title">Admin Dashboard</h1>
                    <p className="page-subtitle">Manage quests, submissions, and payouts.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-secondary" onClick={handleSync} disabled={isSyncing}>
                        <RefreshCw size={18} className={isSyncing ? 'spin' : ''} style={{ marginRight: 8 }} />
                        {isSyncing ? 'Syncing...' : 'Sync TG Raids'}
                    </button>
                    <button className="btn-primary" onClick={() => setIsGrantModalOpen(true)}>
                        <PlusCircle size={18} style={{ marginRight: 8 }} /> Post New Grant
                    </button>
                    <button className="btn-primary" onClick={() => setIsPostModalOpen(true)}>
                        <PlusCircle size={18} style={{ marginRight: 8 }} /> Post New Bounty
                    </button>
                </div>
            </header>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'bounties' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bounties')}
                >
                    Manage Bounties
                </button>
                <button
                    className={`tab-btn ${activeTab === 'grants' ? 'active' : ''}`}
                    onClick={() => setActiveTab('grants')}
                >
                    Manage Grants
                </button>
                <button
                    className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('submissions')}
                >
                    Recent Submissions
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab === 'bounties' && (
                    <div className="bounties-list">
                        {bounties.map(bounty => (
                            <GlassCard key={bounty.id} className="admin-bounty-card">
                                <div className="bounty-info">
                                    <h3>{bounty.title}</h3>
                                    <div className="bounty-meta">
                                        <span className="reward">{bounty.reward} LOFI</span>
                                        <span className={`status ${bounty.status === 'completed' ? 'completed' : 'active'}`}>
                                            {bounty.status === 'completed' ? 'Completed' : 'Active'}
                                        </span>
                                        <span className="category-tag">{bounty.category || 'General'}</span>
                                        <span>{bounty.participants} Participants</span>
                                    </div>
                                    {bounty.status === 'completed' && (
                                        <div className="winner-info">
                                            <Trophy size={14} color="#F6AD55" /> Winner: {bounty.winner || "Unknown"}
                                        </div>
                                    )}
                                </div>
                                {bounty.status !== 'completed' && (
                                    <div className="bounty-actions">
                                        <div className="participants-management">
                                            <h4>Manage Participants</h4>
                                            {bounty.participantsList ? (
                                                <div className="participants-list">
                                                    {bounty.participantsList.map((p, idx) => (
                                                        <div key={idx} className="participant-row">
                                                            <div className="p-info">
                                                                <img src={p.avatar} alt="avatar" className="p-avatar" />
                                                                <span>{p.name}</span>
                                                            </div>
                                                            <div className="rank-actions">
                                                                <button className="btn-rank gold" onClick={() => selectWinner(bounty.id, p.name, 1)}>1st</button>
                                                                <button className="btn-rank silver" onClick={() => selectWinner(bounty.id, p.name, 2)}>2nd</button>
                                                                <button className="btn-rank bronze" onClick={() => selectWinner(bounty.id, p.name, 3)}>3rd</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn-text small"
                                                    onClick={() => {
                                                        const wallet = prompt("Enter Winner Wallet Address:");
                                                        if (wallet) handleSelectWinner(bounty.id, wallet);
                                                    }}
                                                >
                                                    Select Winner Manual
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                )}

                {activeTab === 'submissions' && (
                    <div className="submissions-list">
                        {submissions.length === 0 ? (
                            <p className="empty-text">No submissions yet.</p>
                        ) : (
                            submissions.map((sub, index) => (
                                <GlassCard key={index} className="submission-card">
                                    <div className="sub-header">
                                        <span className="sub-type">{sub.type.toUpperCase()}</span>
                                        <span className="sub-date">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                    <h4>{sub.itemTitle}</h4>
                                    <div className="sub-details">
                                        {sub.projectLink && <a href={sub.projectLink} target="_blank" rel="noreferrer" className="link">View Project</a>}
                                        {sub.cvFile && <span className="file-tag">CV Attached</span>}
                                    </div>
                                </GlassCard>
                            ))
                        )}
                    </div>
                )}
            </div>

            <PostBountyModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
                onPost={postBounty}
            />

            <PostGrantModal
                isOpen={isGrantModalOpen}
                onClose={() => setIsGrantModalOpen(false)}
                onPost={postGrant}
            />

            <style>{`
                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }
                .admin-tabs {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 24px;
                    border-bottom: 1px solid var(--color-glass-border);
                    padding-bottom: 1px;
                }
                .tab-btn {
                    background: none;
                    border: none;
                    color: var(--color-text-secondary);
                    padding: 8px 16px;
                    cursor: pointer;
                    font-weight: 500;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s;
                }
                .tab-btn.active {
                    color: var(--color-primary);
                    border-bottom-color: var(--color-primary);
                }
                .admin-bounty-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                    padding: 20px;
                }
                .bounty-info h3 {
                    margin-bottom: 8px;
                    font-size: 1.1rem;
                }
                .bounty-meta {
                    display: flex;
                    gap: 12px;
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                    align-items: center;
                }
                .status.active { color: #10b981; }
                .status.completed { color: #888; }
                .winner-info {
                    display: flex; 
                    align-items: center; 
                    gap: 6px; 
                    margin-top: 8px; 
                    font-size: 0.9rem; 
                    color: #F6AD55;
                }
                
                .btn-text.small {
                    font-size: 0.85rem;
                }

                .submission-card {
                    margin-bottom: 16px;
                    padding: 20px;
                }
                .sub-header {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 8px;
                }
                .sub-type {
                    background: rgba(255,255,255,0.1);
                    padding: 2px 6px;
                    border-radius: 4px;
                }
                .category-tag {
                    font-size: 0.75rem;
                    background: rgba(255,255,255,0.1);
                    padding: 2px 8px;
                    border-radius: 4px;
                    color: var(--color-text-secondary);
                }
                .link {
                    color: var(--color-primary);
                    text-decoration: underline;
                }

                .participants-management {
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 1px solid var(--color-glass-border);
                }
                .participants-management h4 {
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 12px;
                }
                .participant-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px;
                    background: rgba(255,255,255,0.03);
                    border-radius: 8px;
                    margin-bottom: 8px;
                }
                .p-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                }
                .p-avatar {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                }
                .rank-actions {
                    display: flex;
                    gap: 6px;
                }
                .btn-rank {
                    border: none;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    color: #1a1a1a;
                }
                .btn-rank.gold { background: #FFD700; }
                .btn-rank.silver { background: #C0C0C0; }
                .btn-rank.bronze { background: #CD7F32; }
                .btn-rank:hover { opacity: 0.9; }

                .btn-secondary {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--color-text);
                    border: 1px solid var(--color-glass-border);
                    padding: 0 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }
                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.15);
                }
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
