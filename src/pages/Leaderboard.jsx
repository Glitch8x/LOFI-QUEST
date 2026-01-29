import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import GlassCard from '../components/UI/GlassCard';
import { Trophy, Medal, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
    const { leaderboard } = useData();
    const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' (Top Raider) or 'allTime' (Raid Leaderboard)

    // Mock logic: Sort by different metrics for different tabs
    // Weekly: Sort by 'quests' (simulating recent activity)
    // All Time: Sort by 'xp'

    // Sort logic
    const sortedUsers = [...leaderboard].sort((a, b) => {
        if (activeTab === 'weekly') return b.quests - a.quests;
        return b.xp - a.xp;
    });

    // Yeti of the Week (Top user from weekly)
    const yetiOfTheWeek = [...leaderboard].sort((a, b) => b.earnings - a.earnings)[0];

    return (
        <div className="leaderboard-page animate-fade-in">
            <h1 className="page-title">Leaderboard</h1>

            {/* Yeti of the Week Section */}
            <section className="yeti-spotlight">
                <div className="spotlight-badge">
                    <Flame size={20} fill="#F6AD55" color="#F6AD55" /> YETI OF THE WEEK
                </div>
                <GlassCard className="yeti-card">
                    <div className="yeti-content">
                        {/* User/Profile Section */}
                        <div className="yeti-profile-section">
                            <div className="yeti-avatar-wrapper">
                                <img src={yetiOfTheWeek?.avatar} alt={yetiOfTheWeek?.name} className="yeti-avatar" />
                                <div className="crown-icon">👑</div>
                            </div>
                            <div className="yeti-info">
                                <h2>{yetiOfTheWeek?.name} <span className="user-tag">(User)</span></h2>
                                <p className="yeti-title">Legendary Contributor</p>
                                <div className="yeti-stats">
                                    <span><Star size={14} className="icon-star" /> {yetiOfTheWeek?.xp.toLocaleString()} XP</span>
                                    <span><Trophy size={14} className="icon-trophy" /> {yetiOfTheWeek?.quests} Quests</span>
                                </div>
                            </div>
                        </div>

                        {/* Earnings */}
                        <div className="yeti-earnings">
                            <span className="amount">${yetiOfTheWeek?.earnings.toLocaleString()}</span>
                            <span className="label">Earned this week</span>
                        </div>

                        {/* Person/Character Visual */}
                        <div className="yeti-character-visual">
                            <img
                                src={`https://ui-avatars.com/api/?name=${yetiOfTheWeek?.name}&background=random&size=200`}
                                alt="Person"
                                className="character-img"
                            />
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* Leaderboard Lists */}
            <section className="leaderboard-lists">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('weekly')}
                    >
                        Top Raider (Week)
                    </button>
                    <button
                        className={`tab ${activeTab === 'allTime' ? 'active' : ''}`}
                        onClick={() => setActiveTab('allTime')}
                    >
                        Raid Leaderboard (All Time)
                    </button>
                </div>

                <div className="list-container">
                    {sortedUsers.map((user, index) => (
                        <motion.div
                            key={user.id}
                            className="rank-row glow-on-hover"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="rank-number">
                                {index + 1 === 1 ? <Medal size={24} color="#FFD700" /> :
                                    index + 1 === 2 ? <Medal size={24} color="#C0C0C0" /> :
                                        index + 1 === 3 ? <Medal size={24} color="#CD7F32" /> :
                                            <span className="ranking">#{index + 1}</span>}
                            </div>
                            <div className="user-profile">
                                <img src={user.avatar} alt={user.name} className="user-avatar-small" />
                                <div>
                                    <p className="user-name">{user.name}</p>
                                    <p className="user-lvl">Lvl {user.level}</p>
                                </div>
                            </div>
                            <div className="rank-stats">
                                <p className="stat-main">{activeTab === 'weekly' ? user.quests : user.xp.toLocaleString()}</p>
                                <p className="stat-sub">{activeTab === 'weekly' ? 'Quests' : 'XP'}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <style>{`
                .leaderboard-page {
                    padding-top: 24px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .page-title {
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin-bottom: 32px;
                }
                .yeti-spotlight {
                    margin-bottom: 48px;
                    position: relative;
                }
                .spotlight-badge {
                    position: absolute;
                    top: -12px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--color-bg-card);
                    border: 1px solid var(--color-glass-border);
                    padding: 4px 16px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #F6AD55;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    z-index: 2;
                }
                .yeti-card {
                    padding: 32px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid rgba(246, 173, 85, 0.3); /* Orange tint for Yeti */
                }
                .yeti-content {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    flex-wrap: wrap;
                }
                .yeti-avatar-wrapper {
                    position: relative;
                }
                .yeti-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 3px solid #F6AD55;
                }
                .crown-icon {
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 24px;
                }
                .yeti-info {
                    flex: 1;
                }
                .yeti-info h2 {
                    font-size: 1.5rem;
                    margin-bottom: 4px;
                }
                .yeti-title {
                    color: var(--color-text-secondary);
                    margin-bottom: 12px;
                }
                .yeti-stats {
                    display: flex;
                    gap: 16px;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                .yeti-stats span {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .icon-star { color: #F6AD55; }
                .icon-trophy { color: #F6E05E; }
                
                .yeti-earnings {
                    text-align: right;
                    background: rgba(255,255,255,0.05);
                    padding: 12px 20px;
                    border-radius: 12px;
                }
                .yeti-earnings .amount {
                    display: block;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #10b981;
                }
                .yeti-earnings .label {
                    font-size: 0.8rem;
                    color: var(--color-text-secondary);
                }

                /* List Section */
                .tabs {
                    display: flex;
                    gap: 24px;
                    margin-bottom: 24px;
                    border-bottom: 1px solid var(--color-glass-border);
                }
                .tab {
                    background: none;
                    border: none;
                    color: var(--color-text-secondary);
                    font-size: 1rem;
                    padding-bottom: 12px;
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s;
                }
                .tab.active {
                    color: var(--color-primary);
                    border-bottom-color: var(--color-primary);
                }

                .list-container {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .rank-row {
                    display: flex;
                    align-items: center;
                    padding: 16px 24px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--color-glass-border);
                    border-radius: 16px;
                    transition: all 0.2s;
                }
                .rank-row:hover {
                    background: rgba(255,255,255,0.06);
                    transform: translateX(4px);
                }
                .rank-number {
                    width: 40px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: var(--color-text-secondary);
                }
                .ranking {
                    color: var(--color-text-secondary);
                }
                .user-profile {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .user-avatar-small {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .user-name {
                    font-weight: 600;
                }
                .user-lvl {
                    font-size: 0.8rem;
                    color: var(--color-text-secondary);
                }
                .rank-stats {
                    text-align: right;
                }
                .stat-main {
                    font-weight: 700;
                    font-size: 1.1rem;
                }
                .stat-sub {
                    font-size: 0.8rem;
                    color: var(--color-text-secondary);
                }

                @media (max-width: 600px) {
                    .yeti-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    .yeti-earnings {
                        width: 100%;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default Leaderboard;
