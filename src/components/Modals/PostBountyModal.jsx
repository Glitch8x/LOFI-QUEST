import React, { useState } from 'react';
import { X, DollarSign, Tag, Type, Layers } from 'lucide-react';
import GlassCard from '../UI/GlassCard';

const PostBountyModal = ({ isOpen, onClose, onPost }) => {
    const [formData, setFormData] = useState({
        title: '',
        reward: '',
        category: 'Community',
        deadline: '7 days',
        tags: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.reward) return;

        onPost({
            ...formData,
            reward: parseInt(formData.reward),
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            community: 'Yeti Believer', // Hardcoded for current user
            communityImg: 'https://ui-avatars.com/api/?name=Yeti+Believer&background=3b82f6&color=fff',
            type: 'bounty',
            featured: false
        });

        onClose();
        // Reset form
        setFormData({
            title: '',
            reward: '',
            category: 'Community',
            deadline: '7 days',
            tags: ''
        });
    };

    return (
        <div className="modal-overlay">
            <GlassCard className="modal-content">
                <div className="modal-header">
                    <h2>Post a New Bounty</h2>
                    <button className="btn-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bounty-form">
                    <div className="form-group">
                        <label><Type size={16} /> Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Design a Logo for..."
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            autoFocus
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label><DollarSign size={16} /> Reward (LOFI)</label>
                            <input
                                type="number"
                                placeholder="500"
                                value={formData.reward}
                                onChange={e => setFormData({ ...formData, reward: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label><Layers size={16} /> Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Community">Community</option>
                                <option value="Design">Design</option>
                                <option value="Development">Development</option>
                                <option value="Content">Content</option>
                                <option value="Green Impact">Green Impact</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label><Tag size={16} /> Tags (comma separated)</label>
                        <input
                            type="text"
                            placeholder="design, figma, art"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-submit">Post Bounty</button>
                    </div>
                </form>
            </GlassCard>

            <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          background: #111827; /* Solidish background for readability */
          border: 1px solid var(--color-primary);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-glass-border);
        }

        .btn-close {
          color: var(--color-text-secondary);
        }
        .btn-close:hover {
          color: var(--color-text);
        }

        .bounty-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        input, select {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--color-glass-border);
          padding: 12px;
          border-radius: var(--radius-sm);
          color: var(--color-text);
          font-family: inherit;
          outline: none;
        }

        input:focus, select:focus {
          border-color: var(--color-primary);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 12px;
        }

        .btn-cancel {
          padding: 10px 20px;
          color: var(--color-text-secondary);
        }
        .btn-cancel:hover {
          color: var(--color-text);
        }

        .btn-submit {
          background: var(--color-primary);
          color: white;
          padding: 10px 24px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        .btn-submit:hover {
          background: var(--color-primary-hover);
        }
      `}</style>
        </div>
    );
};

export default PostBountyModal;
