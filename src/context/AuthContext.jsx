import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const currentAccount = useCurrentAccount();
    const [manualAccount, setManualAccount] = useState(() => {
        const stored = localStorage.getItem('lofi_manual_wallet');
        return stored ? JSON.parse(stored) : null;
    });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const manualLogin = (address) => {
        const acc = { address };
        setManualAccount(acc);
        localStorage.setItem('lofi_manual_wallet', JSON.stringify(acc));
    };

    const manualLogout = () => {
        setManualAccount(null);
        localStorage.removeItem('lofi_manual_wallet');
    };

    useEffect(() => {
        const account = currentAccount || manualAccount;

        if (account) {
            // User is connected with wallet (either dApp kit or manual)
            const walletAddress = account.address;
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
    }, [currentAccount, manualAccount]);

    const value = {
        user,
        loading,
        manualLogin,
        manualLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
