// App.jsx - Main application file
import React, { useState } from 'react';
import UserView from './components/UserView';
import CleanerView from './components/CleanerView';
import AdminView from './components/AdminView';
import './styles/App.css';

function App() {
  // State to track which view is active
  const [currentView, setCurrentView] = useState('user');

  // Function to render the appropriate view
  const renderView = () => {
    switch(currentView) {
      case 'user':
        return <UserView />;
      case 'cleaner':
        return <CleanerView />;
      case 'admin':
        return <AdminView />;
      default:
        return <UserView />;
    }
  };

  return (
    <div className="app">
      {/* Header with logo and navigation */}
      <header className="app-header">
        <div className="header-content">
          {/* Logo and App Name */}
          <div className="logo-section">
            <span className="logo-icon">🚻</span>
            <h1 className="app-title">CleanRest</h1>
          </div>

          {/* Navigation buttons */}
          <nav className="nav-buttons">
            <button
              className={`nav-btn ${currentView === 'user' ? 'active' : ''}`}
              onClick={() => setCurrentView('user')}
            >
              👤 User
            </button>
            <button
              className={`nav-btn ${currentView === 'cleaner' ? 'active' : ''}`}
              onClick={() => setCurrentView('cleaner')}
            >
              🧹 Cleaner
            </button>
            <button
              className={`nav-btn ${currentView === 'admin' ? 'active' : ''}`}
              onClick={() => setCurrentView('admin')}
            >
              ⚙️ Admin
            </button>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="main-content">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2025 CleanRest - Clean, Affordable, Reliable Restrooms</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;