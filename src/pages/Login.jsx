import React from 'react';
import { ConnectButton } from '@mysten/dapp-kit';
import { Sparkles } from 'lucide-react';
import GlassCard from '../components/UI/GlassCard';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Brand Logo/Header */}
        <div className="brand-header">
          <div className="logo-sparkle">
            <Sparkles size={32} color="var(--color-primary)" />
          </div>
          <h1>Lofi Quests</h1>
          <p>Connect your Sui wallet to start earning.</p>
        </div>

        <GlassCard className="login-card">
          <h2 className="card-title">Connect Wallet</h2>
          <p className="card-subtitle">Connect your Sui wallet to access quests and start earning rewards.</p>

          <div className="connect-button-wrapper">
            <ConnectButton />
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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
          padding: 40px 32px;
          text-align: center;
        }
        
        .card-title {
          font-size: 1.5rem;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .card-subtitle {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .connect-button-wrapper {
          display: flex;
          justify-content: center;
        }

        /* Override Sui ConnectButton styles to match our theme */
        .connect-button-wrapper button {
          font-size: 1rem !important;
          padding: 14px 24px !important;
          border-radius: var(--radius-sm) !important;
          font-weight: 600 !important;
          transition: all 0.2s !important;
        }
      `}</style>
    </div>
  );
};

export default Login;
