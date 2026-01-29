import React, { useState } from 'react';
import GlassCard from '../UI/GlassCard';
import { X, Send } from 'lucide-react';

const PostGrantModal = ({ isOpen, onClose, onPost }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        description: '',
        tags: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGrant = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };
        onPost(newGrant);
        onClose();
        setFormData({ title: '', amount: '', description: '', tags: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <GlassCard className="modal-content">
                    <div className="modal-header">
                        <h3>Post New Grant</h3>
                        <button className="btn-close" onClick={onClose}><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Grant Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Community Art Fund"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Amount (Display Text)</label>
                            <input
                                type="text"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="e.g. $5,000"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Briefly describe the grant..."
                                required
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label>Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Art, Community, Dev"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary full-width">
                            Publish Grant <Send size={16} />
                        </button>
                    </form>
                </GlassCard>
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-wrapper {
          width: 90%;
          max-width: 500px;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .btn-close {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--color-glass-border);
          border-radius: var(--radius-md);
          color: white;
          outline: none;
          font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--color-primary);
        }
      `}</style>
        </div>
    );
};

export default PostGrantModal;
