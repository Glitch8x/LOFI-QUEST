import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import GlassCard from '../components/UI/GlassCard';
import { ArrowLeft, UploadCloud, Link as LinkIcon, Send } from 'lucide-react';

const GrantApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { grants, applyGrant } = useData();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        projectLink: '',
        details: '',
        cvFile: null
    });

    const grant = grants.find(g => g.id.toString() === id);

    if (!grant) {
        return (
            <div className="app-container" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Grant not found</h2>
                <button className="btn-back" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, cvFile: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Call context action
        applyGrant(grant.id, {
            ...formData,
            submittedAt: new Date().toISOString()
        });

        // Show success and redirect
        // For now, we utilize the previous logic but maybe we want a success screen?
        // Let's just go back to Grants page which will now show "Applied" (based on previous logic if we kept state there? 
        // Actually the previous state was local to Grants.jsx. 
        // Ideally DataContext should track applied grants if we want persistence across pages.
        // For this task, I'll navigate back and rely on the user seeing the flow completed.

        navigate('/grants');
    };

    return (
        <div className="grant-application-page animate-fade-in">
            <button className="btn-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} /> Back to Grants
            </button>

            <div className="application-container">
                <header className="app-header">
                    <h1>Apply for <span className="highlight">{grant.title}</span></h1>
                    <p className="subtitle">{grant.amount} • {grant.tags.join(', ')}</p>
                </header>

                <GlassCard className="application-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Project / Portfolio Link</label>
                            <div className="input-wrapper">
                                <LinkIcon size={18} className="input-icon" />
                                <input
                                    type="url"
                                    name="projectLink"
                                    placeholder="https://"
                                    className="form-input"
                                    required
                                    value={formData.projectLink}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Upload CV / Pitch Deck (PDF)</label>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    id="cv-upload"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    hidden
                                />
                                <label htmlFor="cv-upload" className="file-upload-label">
                                    <UploadCloud size={24} />
                                    <span>{formData.cvFile ? formData.cvFile.name : "Click to upload file"}</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Additional Details</label>
                            <textarea
                                name="details"
                                className="form-textarea"
                                placeholder="Tell us why you are the best fit for this grant..."
                                rows={5}
                                value={formData.details}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn-submit-app"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : (
                                <>Submit Application <Send size={16} /></>
                            )}
                        </button>
                    </form>
                </GlassCard>
            </div>

            <style>{`
                .grant-application-page {
                    max-width: 800px;
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

                .app-header {
                    margin-bottom: 32px;
                    text-align: center;
                }

                .app-header h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                }

                .subtitle {
                    color: var(--color-text-secondary);
                    font-size: 1.1rem;
                }

                .application-form-card {
                    padding: 32px;
                }

                .form-group {
                    margin-bottom: 24px;
                }

                .form-label {
                    display: block;
                    font-size: 0.9rem;
                    font-weight: 500;
                    margin-bottom: 8px;
                    color: var(--color-text-secondary);
                }

                .input-wrapper {
                    display: flex;
                    align-items: center;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--color-glass-border);
                    border-radius: var(--radius-md);
                    padding: 0 12px;
                    transition: border-color 0.2s;
                }

                .input-wrapper:focus-within {
                    border-color: var(--color-primary);
                }

                .input-icon {
                    color: var(--color-text-secondary);
                    margin-right: 8px;
                }

                .form-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    padding: 12px 0;
                    color: var(--color-text);
                    outline: none;
                    font-size: 1rem;
                }

                .file-upload-label {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    padding: 32px;
                    border: 2px dashed var(--color-glass-border);
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    transition: all 0.2s;
                    color: var(--color-text-secondary);
                    background: rgba(255,255,255,0.01);
                }

                .file-upload-label:hover {
                    border-color: var(--color-primary);
                    background: rgba(255,255,255,0.03);
                    color: var(--color-text);
                }

                .form-textarea {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--color-glass-border);
                    border-radius: var(--radius-md);
                    padding: 12px;
                    color: var(--color-text);
                    outline: none;
                    font-family: inherit;
                    font-size: 1rem;
                    resize: vertical;
                    transition: border-color 0.2s;
                }

                .form-textarea:focus {
                    border-color: var(--color-primary);
                }

                .btn-submit-app {
                    width: 100%;
                    padding: 14px;
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: background 0.2s;
                }

                .btn-submit-app:hover {
                    background: var(--color-primary-hover);
                }
                
                .btn-submit-app:disabled {
                    opacity: 0.7;
                    cursor: wait;
                }
            `}</style>
        </div>
    );
};

export default GrantApplication;
