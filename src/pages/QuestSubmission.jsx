import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCurrentAccount } from '@mysten/dapp-kit';
import GlassCard from '../components/UI/GlassCard';
import { ArrowLeft, Link as LinkIcon, Send, Wallet, AlertCircle } from 'lucide-react';

const QuestSubmission = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { bounties, joinBounty } = useData();
    const currentAccount = useCurrentAccount();
    const walletAddress = currentAccount?.address;
    const isConnected = !!currentAccount;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionLink, setSubmissionLink] = useState('');

    const quest = bounties.find(b => b.id.toString() === id);

    useEffect(() => {
        if (!quest) {
            // detailed handling could go here
        }
    }, [quest]);

    if (!quest) {
        return (
            <div className="app-container" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Quest not found</h2>
                <button className="btn-back" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isConnected) {
            alert("Please connect your wallet first!");
            return;
        }

        setIsSubmitting(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Call context action (joinBounty simulates "submission" in our mock)
        joinBounty(quest.id, {
            submissionLink,
            walletAddress: walletAddress || 'Not Connected',
            submittedAt: new Date().toISOString()
        });

        // Navigate back to quest detail (it will show as "submitted" if we tracked state properly, 
        // but for now we just redirect to home or show success)
        navigate('/quest/' + id);
    };

    return (
        <div className="quest-submission-page animate-fade-in">
            <button className="btn-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} /> Back to Quest
            </button>

            <div className="submission-container">
                <header className="submission-header">
                    <h1>Submit Work for <span className="highlight">{quest.title}</span></h1>
                    <p className="subtitle">{quest.reward} LOFI • {quest.deadline}</p>
                </header>

                <GlassCard className="submission-form-card">
                    <form onSubmit={handleSubmit}>

                        {/* 1. Wallet Connection Check */}
                        <div className="form-group">
                            <label className="form-label">Connected Wallet</label>
                            {isConnected ? (
                                <div className="wallet-display connected">
                                    <Wallet size={18} className="text-primary" />
                                    <span className="wallet-address">{walletAddress}</span>
                                    <span className="status-badge">Connected</span>
                                </div>
                            ) : (
                                <div className="wallet-display disconnected">
                                    <AlertCircle size={18} className="text-error" />
                                    <span>Wallet not connected. Please log out and connect your wallet.</span>
                                </div>
                            )}
                            <p className="helper-text">Rewards will be sent to this address upon approval.</p>
                        </div>

                        {/* 2. Submission Link */}
                        <div className="form-group">
                            <label className="form-label">Proof of Work (Link)</label>
                            <div className="input-wrapper">
                                <LinkIcon size={18} className="input-icon" />
                                <input
                                    type="url"
                                    placeholder="https://github.com/..."
                                    className="form-input"
                                    required
                                    value={submissionLink}
                                    onChange={(e) => setSubmissionLink(e.target.value)}
                                />
                            </div>
                            <p className="helper-text">Link to your Github PR, Google Doc, or Design File.</p>
                        </div>

                        {/* 3. Submit Button */}
                        <button
                            type="submit"
                            className="btn-submit-quest"
                            disabled={isSubmitting || !isConnected}
                        >
                            {isSubmitting ? 'Submitting...' : (
                                <>Submit Work <Send size={16} /></>
                            )}
                        </button>
                    </form>
                </GlassCard>
            </div>

            <style>{`
                .quest-submission-page {
                    max-width: 700px;
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

                .submission-header {
                    margin-bottom: 32px;
                    text-align: center;
                }

                .submission-header h1 {
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                    line-height: 1.3;
                }

                .subtitle {
                    color: var(--color-text-secondary);
                    font-size: 1.1rem;
                }

                .submission-form-card {
                    padding: 32px;
                }

                .form-group {
                    margin-bottom: 24px;
                }

                .form-label {
                    display: block;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 12px;
                    color: var(--color-text);
                }

                /* Wallet Display Styles */
                .wallet-display {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-glass-border);
                    background: rgba(255,255,255,0.03);
                }

                .wallet-display.connected {
                    border-color: rgba(16, 185, 129, 0.3);
                    background: rgba(16, 185, 129, 0.05);
                }

                .wallet-address {
                    font-family: monospace;
                    font-size: 0.95rem;
                    color: var(--color-text);
                    flex: 1;
                }

                .status-badge {
                    font-size: 0.75rem;
                    background: rgba(16, 185, 129, 0.2);
                    color: #10b981;
                    padding: 2px 8px;
                    border-radius: 4px;
                }
                
                .btn-connect-small {
                    margin-left: auto;
                    background: var(--color-primary);
                    border: none;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.8rem;
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
                    padding: 14px 0;
                    color: var(--color-text);
                    outline: none;
                    font-size: 1rem;
                }

                .helper-text {
                    font-size: 0.8rem;
                    color: var(--color-text-secondary);
                    margin-top: 8px;
                }

                .btn-submit-quest {
                    width: 100%;
                    padding: 16px;
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
                    margin-top: 8px;
                    transition: all 0.2s;
                }

                .btn-submit-quest:hover:not(:disabled) {
                    background: var(--color-primary-hover);
                    transform: translateY(-2px);
                }
                
                .btn-submit-quest:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default QuestSubmission;
