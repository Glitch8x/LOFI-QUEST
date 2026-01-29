import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import '@mysten/dapp-kit/dist/index.css';

import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Grants from './pages/Grants';
import Login from './pages/Login';
import Profile from './pages/Profile';
import QuestDetail from './pages/QuestDetail';
import GrantApplication from './pages/GrantApplication';
import QuestSubmission from './pages/QuestSubmission';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Leaderboard from './pages/Leaderboard';

import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Create a query client for React Query
const queryClient = new QueryClient();

// Sui network configuration
const networks = {
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  devnet: { url: getFullnodeUrl('devnet') },
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>Loading Quests...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Simple Admin Guard
const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin');
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

// Layout Component (Sidebar + Main Content)
const AppLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider autoConnect>
          <Router>
            <AuthProvider>
              <DataProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />

                  <Route path="/" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Home />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/explore" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Explore />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/grants" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Grants />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/leaderboard" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Leaderboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/grants/apply/:id" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <GrantApplication />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Profile />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/quest/submit/:id" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <QuestSubmission />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/admin" element={
                    <AppLayout>
                      <AdminLogin />
                    </AppLayout>
                  } />

                  <Route path="/admin/dashboard" element={
                    <ProtectedAdminRoute>
                      <AppLayout>
                        <AdminDashboard />
                      </AppLayout>
                    </ProtectedAdminRoute>
                  } />

                  <Route path="/quest/:id" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <QuestDetail />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                </Routes>
              </DataProvider>
            </AuthProvider>
          </Router>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
