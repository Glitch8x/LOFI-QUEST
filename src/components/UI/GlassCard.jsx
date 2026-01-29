import React from 'react';

const GlassCard = ({ children, className = '', hoverEffect = false, ...props }) => {
    return (
        <div
            className={`glass-panel ${hoverEffect ? 'hover-effect' : ''} ${className}`}
            {...props}
        >
            {children}
            <style>{`
        .glass-panel {
          padding: 24px;
          display: flex;
          flex-direction: column;
        }
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3), var(--shadow-glow);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    );
};

export default GlassCard;
