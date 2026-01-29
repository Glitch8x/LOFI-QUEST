import React, { useState } from 'react';
import { X, Upload, DollarSign, Calendar, Tag } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import { useData } from '../../context/DataContext';

const CreateBountyModal = ({ isOpen, onClose }) => {
    const { postBounty } = useData();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        reward: '',
        category: 'General',
        tags: '',
        deadline: '',
        type: 'bounty' // Default to bounty
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBounty = {
            title: formData.title,
            community: 'Community User', // Default for now
            communityImg: 'https://ui-avatars.com/api/?name=User&background=random',
            reward: Number(formData.reward),
            deadline: 'Just now',
            participants: 0,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            featured: false,
            category: formData.category,
            type: formData.type
        };

        postBounty(newBounty);
        onClose();
        // Reset form
        setFormData({
            title: '',
            description: '',
            reward: '',
            category: 'General',
            tags: '',
            deadline: '',
            type: 'bounty'
        });
    };

    return (
        <div className="modal-overlay">
            <GlassCard className="modal-content">
                <div className="modal-header">
                    <h2>Post a New Opportunity</h2>
                    <button className="btn-close" onClick={onClose}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Design a Logo for Lofi DAO"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="bounty">Bounty</option>
                                <option value="project">Project</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Content">Content</option>
                                <option value="Design">Design</option>
                                <option value="Development">Development</option>
                                <option value="Green Impact">Green Impact</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Reward (LOFI)</label>
                            <div className="input-icon-wrapper">
                                <DollarSign size={16} className="input-icon" />
                                <input
                                    type="number"
                                    placeholder="500"
                                    value={formData.reward}
                                    onChange={e => setFormData({ ...formData, reward: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Deadline</label>
                            <div className="input-icon-wrapper">
                                <Calendar size={16} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="e.g., 3 days"
                                    value={formData.deadline}
                                    onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Tags (comma separated)</label>
                        <div className="input-icon-wrapper">
                            <Tag size={16} className="input-icon" />
                            <input
                                type="text"
                                placeholder="design, figma, art"
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary">Post Opportunity</button>
                    </div>
                </form>
            </GlassCard>

            <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          padding: 30px;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .btn-close {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          padding: 4px;
        }
        
        .btn-close:hover {
          color: var(--color-text);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        input, select {
          width: 100%;
          padding: 12px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-glass-border);
          color: var(--color-text);
          font-family: inherit;
        }

        input:focus, select:focus {
          outline: none;
          border-color: var(--color-primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .input-icon-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
          pointer-events: none;
        }

        .input-icon-wrapper input {
          padding-left: 38px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 30px;
        }

        .btn-primary, .btn-secondary {
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: var(--color-primary);
          color: white;
          border: none;
        }
        .btn-primary:hover {
          background: var(--color-primary-hover);
        }

        .btn-secondary {
          background: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-glass-border);
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
        </div>
    );
};

export default CreateBountyModal;
