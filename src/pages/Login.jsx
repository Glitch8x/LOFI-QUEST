import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/UI/GlassCard';
import { Mail, Lock, Sparkles, ArrowRight, User } from 'lucide-react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (isSignUp) {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      // Handle common Firebase errors
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email is already registered.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Failed to authenticate. ' + (err.message || ''));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await googleLogin();
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Google sign in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Brand Logo/Header */}
        <div className="brand-header">
          <div className="logo-sparkle">
            <Sparkles size={32} color="var(--color-primary)" />
          </div>
          <h1>Lofi Quests</h1>
          <p>Your gateway to micro-impact earning.</p>
        </div>

        <GlassCard className="login-card">
          <h2 className="card-title">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="e.g. Yeti Believer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  placeholder="yeti@lofiquests.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button className="btn-google" onClick={handleGoogleLogin} disabled={isLoading}>
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 4.66c1.61 0 3.06.55 4.21 1.64l3.16-3.16C17.45 1.14 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

          <div className="switch-mode">
            <p>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</p>
            <button
              className="btn-text"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
            >
              {isSignUp ? 'Sign In' : 'Create one'}
            </button>
          </div>
        </GlassCard>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg);
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          top: -20%; left: -10%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255, 137, 6, 0.15) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
        }

        .login-container {
          width: 100%;
          max-width: 420px;
          padding: 20px;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .brand-header {
          text-align: center;
        }

        .logo-sparkle {
          margin-bottom: 16px;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }

        .brand-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #fff, var(--color-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-header p {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
        }

        .login-card {
          padding: 32px;
        }
        
        .card-title {
            font-size: 1.5rem;
            margin-bottom: 24px;
            text-align: center;
            font-weight: 600;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        .input-wrapper {
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

        .input-wrapper input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--color-glass-border);
          border-radius: var(--radius-sm);
          color: var(--color-text);
          font-size: 1rem;
          transition: all 0.2s;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: var(--color-primary);
          background: rgba(255,255,255,0.08);
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          background: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
          margin-top: 8px;
        }

        .btn-login:hover:not(:disabled) {
          background: var(--color-primary-hover);
        }
        
        .btn-login:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 24px 0;
          color: var(--color-text-secondary);
          font-size: 0.85rem;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--color-glass-border);
        }

        .divider span {
          padding: 0 12px;
        }

        .btn-google {
          width: 100%;
          padding: 12px;
          background: white;
          color: #1a1a1a;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: transform 0.1s;
        }

        .btn-google:hover:not(:disabled) {
          background: #f0f0f0;
        }

        .switch-mode {
          margin-top: 24px;
          text-align: center;
          display: flex;
          justify-content: center;
          gap: 8px;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        .btn-text {
            background: none;
            border: none;
            color: var(--color-primary);
            font-weight: 600;
            cursor: pointer;
            padding: 0;
            font-size: inherit;
        }
        .btn-text:hover {
            text-decoration: underline;
        }
        
        .error-message {
          color: #ff4d4f;
          background: rgba(255, 77, 79, 0.1);
          padding: 10px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Login;
