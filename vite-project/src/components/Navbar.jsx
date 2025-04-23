import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ userScore = 0, userName = "Guest" }) {
  return (
    <nav className="navbar">
      {/* Left side - Logo */}
      <Link to="/" className="logo-link">
        <h1 className="logo">QuizClash 💡</h1>
      </Link>

      {/* Right side - Navigation items */}
      <div className="nav-right">
        {/* Leaderboard icon with score */}
        <Link to="/leaderboard" className="leaderboard-link">
          <span className="trophy-icon">🏆</span>
          <span className="user-score">{userScore}</span>
        </Link>

        {/* Profile section */}
        <div className="profile-section">
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            className="profile-pic"
          />
          <span className="username">{userName}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;