import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import GlassCard from '../components/UI/GlassCard';
import { ExternalLink, Wallet, FileText, CheckCircle, Clock, Trophy, ChevronRight, Gift } from 'lucide-react';

const CreatorDashboard = () => {
    const { bounties, submissions, selectWinner } = useData();
    const [selectedBountyId, setSelectedBountyId] = useState(null);

    if (!bounties) return <div style={{ padding: 40, color: 'white' }}>Loading Bounties...</div>;

    // Group submissions by Bounty ID for easy lookup
    const submissionsByBounty = (submissions || []).reduce((acc, sub) => {
        if (!acc[sub.itemId]) acc[sub.itemId] = [];
        acc[sub.itemId].push(sub);
        return acc;
    }, {});

    const selectedBounty = bounties.find(b => b.id === selectedBountyId);
    const selectedSubmissions = selectedBountyId ? (submissionsByBounty[selectedBountyId] || []) : [];

    const handleSelectWinner = (wallet) => {
        if (!window.confirm("Are you sure you want to select this submission as the winner? This action is irreversible.")) return;
        selectWinner(selectedBountyId, wallet);
        alert(`Winner Selected! ${wallet}`);
    };

    return (
        <div className="creator-dashboard animate-fade-in">
            <header className="dashboard-header">
                <h1>Creator <span className="highlight">Platform</span></h1>
                <p className="subtitle">Manage quests, review work, and distribute tokens.</p>
            </header>

            <div className="dashboard-layout">
                {/* LEFT SIDEBAR: Quest List */}
                <div className="quest-sidebar">
                    <h3 className="section-title">My Quests</h3>
                    <div className="quest-list">
                        {bounties.filter(b => b.type === 'bounty' || b.type === 'project').map(bounty => (
                            <div
                                key={bounty.id}
                                className={`quest-item ${selectedBountyId === bounty.id ? 'active' : ''} ${bounty.status === 'completed' ? 'completed' : ''}`}
                                onClick={() => setSelectedBountyId(bounty.id)}
                            >
                                <div className="quest-info">
                                    <h4>{bounty.title}</h4>
                                    <span className="quest-meta">
                                        {bounty.status === 'completed' ? (
                                            <span className="badge-complete"><CheckCircle size={10} /> Finished</span>
                                        ) : (
                                            <span className="badge-active">Active</span>
                                        )}
                                        • {submissionsByBounty[bounty.id]?.length || 0} Subs
                                    </span>
                                </div>
                                <ChevronRight size={16} className="chevron" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* MAIN CONTENT: Detail View */}
                <div className="dashboard-main">
                    {selectedBounty ? (
                        <div className="bounty-detail-view animate-fade-in">
                            <GlassCard className="bounty-header-card">
                                <div className="bounty-top">
                                    <h2>{selectedBounty.title}</h2>
                                    <span className="reward-tag">{selectedBounty.reward} LOFI</span>
                                </div>
                                <p className="bounty-status-desc">
                                    {selectedBounty.status === 'completed'
                                        ? `Winner selected: ${selectedBounty.winner}`
                                        : "Reviewing submissions. Select a winner to close this quest."
                                    }
                                </p>
                            </GlassCard>

                            <h3 className="section-title">Submissions ({selectedSubmissions.length})</h3>

                            {selectedSubmissions.length === 0 ? (
                                <div className="empty-subs">
                                    <p>No submissions received yet for this quest.</p>
                                </div>
                            ) : (
                                <div className="subs-list">
                                    {selectedSubmissions.map((sub, idx) => {
                                        const isWinner = selectedBounty.winner === sub.walletAddress;
                                        return (
                                            <GlassCard key={idx} className={`sub-card ${isWinner ? 'winner-card' : ''}`}>
                                                <div className="sub-header">
                                                    <div className="sub-user">
                                                        <Wallet size={16} className="icon" />
                                                        <span className="wallet">{sub.walletAddress}</span>
                                                    </div>
                                                    <span className="sub-date">
                                                        {new Date(sub.submittedAt).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className="sub-content">
                                                    <div className="link-row">
                                                        <ExternalLink size={16} />
                                                        <a href={sub.submissionLink} target="_blank" rel="noopener noreferrer">
                                                            {sub.submissionLink}
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="sub-actions">
                                                    {isWinner ? (
                                                        <div className="winner-badge">
                                                            <Trophy size={16} /> WINNER
                                                        </div>
                                                    ) : (
                                                        selectedBounty.status !== 'completed' && (
                                                            <button
                                                                className="btn-select-winner"
                                                                onClick={() => handleSelectWinner(sub.walletAddress)}
                                                            >
                                                                <Gift size={16} /> Select as Winner
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </GlassCard>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="empty-selection">
                            <Trophy size={48} className="empty-icon" />
                            <h3>Select a Quest</h3>
                            <p>Choose a quest from the sidebar to manage submissions.</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .creator-dashboard {
                    padding: 40px 0;
                    height: calc(100vh - 80px); /* Fill screen minus header roughly */
                    display: flex;
                    flex-direction: column;
                }

                .dashboard-header {
                    margin-bottom: 24px;
                    flex-shrink: 0;
                }

                .dashboard-header h1 {
                    font-size: 2rem;
                    font-weight: 700;
                }
                
                .dashboard-layout {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 24px;
                    flex: 1;
                    min-height: 0; /* Enable scrolling within grid items */
                }

                /* Sidebar */
                .quest-sidebar {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--color-glass-border);
                    border-radius: var(--radius-lg);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                
                .section-title {
                    padding: 16px;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--color-text-secondary);
                    background: rgba(255,255,255,0.02);
                    border-bottom: 1px solid var(--color-glass-border);
                    margin: 0;
                }

                .quest-list {
                    flex: 1;
                    overflow-y: auto;
                }

                .quest-item {
                    padding: 16px;
                    border-bottom: 1px solid var(--color-glass-border);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: background 0.2s;
                }

                .quest-item:hover {
                    background: rgba(255,255,255,0.05);
                }

                .quest-item.active {
                    background: rgba(255, 137, 6, 0.1);
                    border-left: 3px solid var(--color-primary);
                }

                .quest-info h4 {
                    font-size: 0.95rem;
                    margin-bottom: 4px;
                    color: var(--color-text);
                }

                .quest-meta {
                    font-size: 0.8rem;
                    color: var(--color-text-secondary);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .badge-active { color: #10b981; }
                .badge-complete { color: var(--color-text-secondary); display: flex; align-items: center; gap: 4px; }
                
                .quest-item.completed {
                    opacity: 0.7;
                }
                
                .chevron {
                    color: var(--color-text-secondary);
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .quest-item.active .chevron { opacity: 1; }

                /* Main Content */
                .dashboard-main {
                    flex: 1;
                    overflow-y: auto;
                    padding-right: 8px; /* Scrollbar space */
                }

                .empty-selection {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-text-secondary);
                    background: rgba(255,255,255,0.02);
                    border-radius: var(--radius-lg);
                    border: 2px dashed var(--color-glass-border);
                }
                
                .empty-icon {
                    margin-bottom: 16px;
                    opacity: 0.5;
                }

                /* Bounty Detail */
                .bounty-header-card {
                    padding: 24px;
                    margin-bottom: 24px;
                }

                .bounty-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }

                .bounty-top h2 {
                    font-size: 1.5rem;
                }

                .reward-tag {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--color-primary);
                }
                
                .bounty-status-desc {
                    color: var(--color-text-secondary);
                }

                .subs-list {
                    display: grid;
                    gap: 16px;
                }

                .sub-card {
                    padding: 20px;
                    border-left: 3px solid transparent;
                }
                
                .sub-card.winner-card {
                    border-color: var(--color-primary);
                    background: rgba(255, 137, 6, 0.05);
                }

                .sub-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                }

                .sub-user {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .wallet {
                    font-family: monospace;
                    color: var(--color-text);
                }

                .link-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.03);
                    padding: 10px;
                    border-radius: var(--radius-sm);
                    margin-bottom: 16px;
                }
                
                .link-row a {
                    color: var(--color-primary);
                    text-decoration: underline;
                }

                .btn-select-winner {
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: var(--radius-sm);
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-left: auto;
                    transition: background 0.2s;
                }
                
                .btn-select-winner:hover {
                    background: var(--color-primary-hover);
                }

                .winner-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--color-primary);
                    font-weight: 700;
                    background: rgba(255, 137, 6, 0.1);
                    padding: 8px 16px;
                    border-radius: var(--radius-sm);
                    width: fit-content;
                    margin-left: auto;
                }
                
                .empty-subs {
                    text-align: center;
                    padding: 40px;
                    color: var(--color-text-secondary);
                    font-style: italic;
                }
            `}</style>
        </div>
    );
};

export default CreatorDashboard;
