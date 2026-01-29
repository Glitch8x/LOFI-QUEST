import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { WalletProvider } from './context/WalletContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>Loading Quests... (Waiting for Auth)</div>;
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
    <Router>
      <AuthProvider>
        <WalletProvider>
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
        </WalletProvider>
      </AuthProvider>

      <style>{`
        .app-container {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          margin-left: 280px; /* Sidebar width + gap */
          padding: 16px;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 16px;
            padding-top: 64px; /* Space for fixed toggle button */
          }
        }
      `}</style>
    </Router>
  );
}

export default App;
