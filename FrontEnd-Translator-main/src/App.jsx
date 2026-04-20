import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TranslatorPage from './pages/TranslatorPage';
import AdminPage from './pages/admin/AdminPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setAuthView('login');
  };

  return (
    <BrowserRouter>
      {isLoggedIn && user?.role === 'admin' ? (
        <AdminPage
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onLogout={handleLogout}
        />
      ) : isLoggedIn ? (
        <TranslatorPage
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onLogout={handleLogout}
        />
      ) : (
        <AuthPage
          currentView={authView}
          onLoginSuccess={handleLoginSuccess}
          onGoToRegister={() => setAuthView('register')}
          onGoToLogin={() => setAuthView('login')}
          onGoToRecuperar={() => setAuthView('recuperar')}
        />
      )}
    </BrowserRouter>
  );
}

export default App;