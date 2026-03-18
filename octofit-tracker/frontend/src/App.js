import './App.css';
import { useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navItems = [
    { label: 'Activities', to: '/activities' },
    { label: 'Leaderboard', to: '/leaderboard' },
    { label: 'Teams', to: '/teams' },
    { label: 'Users', to: '/users' },
    { label: 'Workouts', to: '/workouts' },
  ];

  return (
    <div className="App min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark octofit-nav shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/activities" onClick={() => setIsNavOpen(false)}>
            OctoFit Tracker
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            aria-controls="octofitNav"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="octofitNav">
            <div className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsNavOpen(false)}
                  className={({ isActive }) =>
                    `nav-link px-3 fw-semibold ${isActive ? 'active text-warning' : 'text-white'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <header className="container py-4 pb-2">
        <div className="card border-0 shadow-sm rounded-4 hero-card">
          <div className="card-body text-start text-md-center py-4">
            <h1 className="display-6 fw-bold mb-2">Track your fitness journey with confidence</h1>
            <p className="lead text-secondary mb-2">
              Unified dashboards for activities, teams, users, workouts, and rankings.
            </p>
            <a
              className="link-primary fw-semibold text-decoration-none"
              href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
              target="_blank"
              rel="noreferrer"
            >
              Bootstrap UI reference
            </a>
          </div>
        </div>
      </header>

      <main className="pb-4">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
