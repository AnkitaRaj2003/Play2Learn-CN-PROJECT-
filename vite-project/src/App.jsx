import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Quiz from './Quiz';
import Study from './Study';
import Chat from './Chat';
import Games from './Games';

import GK from "./study/GeneralKnowledge"
import Math from "./study/Math"
import Science from "./study/Science"
import SocialAwareness from "./study/SocialAwareness"

import { AiOutlineQuestionCircle, AiOutlineBook } from "react-icons/ai";
import { MdSportsEsports } from "react-icons/md";

import useClickSound from './useClickSound';

function App() {

  useClickSound();
  // Sample user data
  const user = {
    name: "Player",
    score: 0,
    photo: "https://i.imgur.com/JqYeS5k.png"
  };
  

  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/" className="logo">
            <h1>Play2Learn 🎯</h1>
          </Link>
          
          <div className="nav-right">
            <Link to="/leaderboard" className="nav-item">
              <span className="icon">🏆</span>
              <span className="score">{user.score}</span>
            </Link>
            
            <div className="profile">
              <img src={user.photo} alt="Profile" className="profile-pic" />
              <span>{user.name}</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="home">
                <h2 className="main-heading">Welcome to Play2Learn 🎯!</h2>
                <div className="buttons">
                  <Link to="/quiz" className="btn">
                    <AiOutlineQuestionCircle className="icon" /> Take Quiz
                  </Link>
                  <Link to="/study" className="btn">
                    <AiOutlineBook className="icon" /> Study Materials
                  </Link>
                  <Link to="/games" className="btn">
                    <MdSportsEsports className="icon" /> Games
                  </Link>
                </div>
              </div>
            }/>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/study" element={<Study />} />
            <Route path="/games" element={<Games />} />
            <Route path="/chat/:room" element={<Chat />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/study/generalknowledge" element={<GK />} />
            <Route path="/study/math" element={<Math />} />
            <Route path="/study/science" element={<Science />} />
            <Route path="/study/social" element={<SocialAwareness />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Simple Leaderboard Component (add to same file or separate)
function Leaderboard() {
  const scores = [
    { name: "Player1", score: 100 },
    { name: "Player2", score: 85 },
    { name: "Player3", score: 70 }
  ];

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;