import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Compass, TrendingUp, Clock, Award } from 'lucide-react';
import BountyCard from '../components/Bounties/BountyCard';
import { useData } from '../context/DataContext';

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const { bounties } = useData();

  if (!bounties) return <div style={{ padding: 40, color: 'white' }}>Loading Quests...</div>;

  const categories = ['All', 'Design', 'Development', 'Content', 'Community', 'Green Impact'];

  const filteredBounties = bounties.filter(bounty => {
    const matchesCategory = activeCategory === 'All' || bounty.category === activeCategory;
    const matchesSearch = bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'Highest Reward') {
      return b.reward - a.reward;
    } else if (sortBy === 'Most Active') {
      return (b.activeParticipants || 0) - (a.activeParticipants || 0);
    } else {
      // Default: Newest (assuming larger ID or data structure implies newer, or explicit date if available)
      // Since we lack a date field in mock data, we'll assume ID descending or index order
      return b.id - a.id;
    }
  });

  return (
    <div className="explore-page animate-fade-in">
      <header className="explore-header">
        <h1 className="page-title">
          <Compass className="title-icon" size={32} />
          Explore <span className="highlight">Quests</span>
        </h1>
        <p className="page-subtitle">Discover opportunities to earn and contribute.</p>
      </header>

      <section className="controls-section glass-panel">
        <div className="search-row">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by title or tag..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-filter">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="categories-row">
          {categories.map(category => (
            <button
              key={category}
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              style={{ position: 'relative' }}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="exploreActivePill"
                  className="active-pill-bg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span style={{
                position: 'relative',
                zIndex: 1,
                color: activeCategory === category ? '#ffffff' : 'var(--color-text-secondary)',
                fontWeight: activeCategory === category ? 600 : 500,
                transition: 'color 0.2s'
              }}>{category}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="results-section">
        <div className="results-header">
          <h2 className="results-count">{filteredBounties.length} results found</h2>
          <div className="sort-wrapper">
            <span>Sort by:</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Highest Reward">Highest Reward</option>
              <option value="Most Active">Most Active</option>
            </select>
          </div>
        </div>

        <motion.div layout className="bounty-grid">
          <AnimatePresence mode="popLayout">
            {filteredBounties.length > 0 ? (
              filteredBounties.map(bounty => (
                <motion.div
                  key={bounty.id}
                  layout
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
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="empty-state"
              >
                <p>No quests found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      <style>{`
        .explore-page {
          padding: 40px 0 80px 0;
        }

        .explore-header {
          margin-bottom: 32px;
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

        .controls-section {
          padding: 24px;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .search-row {
          display: flex;
          gap: 16px;
        }

        .search-input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.03);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          transition: border-color 0.2s;
        }

        .search-input-wrapper:focus-within {
          border-color: var(--color-primary);
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--color-text);
          font-size: 1rem;
          outline: none;
        }

        .btn-filter {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 24px;
          background: rgba(255,255,255,0.05);
          color: var(--color-text);
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: background 0.2s;
        }

        .btn-filter:hover {
          background: rgba(255,255,255,0.1);
        }

        .categories-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .category-pill {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.03);
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .category-pill:hover {
          background: rgba(255,255,255,0.08);
          color: var(--color-text);
        }

        .category-pill.active {
          background: rgba(255, 137, 6, 0.15);
          color: var(--color-primary);
          border-color: rgba(255, 137, 6, 0.3);
          font-weight: 500;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .results-count {
          font-size: 1rem;
          color: var(--color-text-secondary);
          font-weight: 400;
        }

        .sort-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        .sort-select {
          background: transparent;
          border: none;
          color: var(--color-text);
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
          outline: none;
        }

        .sort-select option {
          background: var(--color-bg-secondary);
        }

        .bounty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px;
          color: var(--color-text-secondary);
          background: rgba(255,255,255,0.02);
          border-radius: var(--radius-lg);
          border: 1px dashed var(--color-glass-border);
        }

        .active-pill-bg {
          position: absolute;
          inset: -4px;
          background: var(--color-primary);
          border-radius: var(--radius-full);
          z-index: 0;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }

        .category-pill.active {
          background: transparent;
          border-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Explore;
