import React, { createContext, useContext, useEffect, useState } from 'react';
import { dataService } from '../services/mockApi';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(dataService.getData());

    useEffect(() => {
        // Start simulation
        dataService.startSimulation();

        // Subscribe to updates
        const unsubscribe = dataService.subscribe(() => {
            setData({ ...dataService.getData() });
        });

        return () => {
            unsubscribe();
            dataService.stopSimulation();
        };
    }, []);

    const value = {
        ...data,
        joinBounty: (id, data) => dataService.joinBounty(id, data),
        applyGrant: (id, data) => dataService.applyGrant(id, data),
        postBounty: (bounty) => dataService.postBounty(bounty),
        postGrant: (grant) => dataService.postGrant(grant),
        submissions: dataService.getSubmissions(),
        selectWinner: (bountyId, wallet) => dataService.selectWinnerByWallet(bountyId, wallet),
        selectRankedWinner: (bountyId, wallet, rank) => dataService.selectRankedWinner(bountyId, wallet, rank),
        syncTelegram: () => dataService.syncTelegramData(),
        leaderboard: data.leaderboard || [],
        recentEarners: data.recentEarners || [],
        notifications: data.notifications || []
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
