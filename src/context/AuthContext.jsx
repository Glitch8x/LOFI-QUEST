import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const currentAccount = useCurrentAccount();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentAccount) {
            // User is connected with wallet
            const walletAddress = currentAccount.address;
            const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

            setUser({
                id: walletAddress,
                name: shortAddress,
                email: `${shortAddress}@sui.wallet`,
                avatar: `https://ui-avatars.com/api/?name=${shortAddress}&background=random`,
                walletAddress: walletAddress,
                earnings: 0,
                completedQuests: 0
            });
        } else {
            // No wallet connected
            setUser(null);
        }
    }, [currentAccount]);

    const value = {
        user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
