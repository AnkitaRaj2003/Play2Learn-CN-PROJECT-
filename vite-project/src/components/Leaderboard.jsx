import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  // Sample leaderboard data
  const leaderboardData = [
    { id: 1, name: 'QuizMaster', score: 1250, avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Brainiac', score: 1100, avatar: 'https://via.placeholder.com/40' },
    { id: 3, name: 'TriviaKing', score: 950, avatar: 'https://via.placeholder.com/40' },
    { id: 4, name: 'WhizKid', score: 800, avatar: 'https://via.placeholder.com/40' },
    { id: 5, name: 'SmartyPants', score: 750, avatar: 'https://via.placeholder.com/40' },
  ];

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>
      <div className="leaderboard-table">
        <div className="table-header">
          <span>Rank</span>
          <span>Player</span>
          <span>Score</span>
        </div>
        {leaderboardData.map((player, index) => (
          <div key={player.id} className="table-row">
            <span className="rank">{index + 1}</span>
            <div className="player-info">
              <img src={player.avatar} alt={player.name} className="player-avatar" />
              <span className="player-name">{player.name}</span>
            </div>
            <span className="player-score">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;