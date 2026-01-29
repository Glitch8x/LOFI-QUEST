import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/UI/GlassCard';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Daniel@2007') {
            // In a real app, use a secure token. For mock, localStorage is fine.
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="admin-login-page animate-fade-in">
            <GlassCard className="login-card">
                <div className="header">
                    <Shield size={48} className="icon-shield" />
                    <h1>Admin Access</h1>
                    <p>Restricted Area</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <Lock size={18} className="input-icon" />
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    {error && <div className="error-msg">{error}</div>}

                    <button type="submit" className="btn-access">
                        Access Dashboard <ArrowRight size={16} />
                    </button>
                </form>
            </GlassCard>

            <style>{`
                .admin-login-page {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .login-card {
                    width: 100%;
                    max-width: 400px;
                    padding: 40px;
                    text-align: center;
                }
                .icon-shield {
                    color: var(--color-primary);
                    margin-bottom: 16px;
                }
                .header h1 {
                    font-size: 1.8rem;
                    margin-bottom: 8px;
                }
                .header p {
                    color: var(--color-text-secondary);
                    margin-bottom: 32px;
                }
                .input-group {
                    position: relative;
                    margin-bottom: 16px;
                }
                .input-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--color-text-secondary);
                }
                .input-field {
                    width: 100%;
                    padding: 12px 12px 12px 40px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid var(--color-glass-border);
                    border-radius: var(--radius-md);
                    color: white;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .input-field:focus {
                    border-color: var(--color-primary);
                }
                .error-msg {
                    color: #ff4d4f;
                    font-size: 0.9rem;
                    margin-bottom: 16px;
                }
                .btn-access {
                    width: 100%;
                    padding: 12px;
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: background 0.2s;
                }
                .btn-access:hover {
                    background: var(--color-primary-hover);
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
