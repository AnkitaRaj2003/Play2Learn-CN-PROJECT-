import React from 'react';
import './style.css';

function Science() {
  return (
    <div className="gk-container">
      <h1 style={{"margin-top":"3rem"}}>🌍 Science</h1>
      <p style={{"padding": "10px", "margin-bottom":"3rem"}}>Expand your awareness of the world around you with interesting facts and videos!</p>

      <ul className="gk-list">
        <li>📌 Chemical symbol for water is <strong>H₂O</strong></li>
        <li>📌 Hardest natural substance is <strong>Diamond</strong></li>
        <li>📌 Plants absorb <strong>Carbon Dioxide</strong></li>
        <li>📌 Largest organ in the body is <strong>Skin</strong></li>
        <li>📌 Force pulling us down is <strong>Gravity</strong></li>
        <li>📌 Gold's symbol is <strong>Au</strong></li>
        <li>📌 Closest planet to Sun is <strong>Mercury</strong></li>
        <li>📌 Sun is mainly made of <strong>Hydrogen</strong></li>
        <li>📌 Speed of light is <strong>~299,792 km/s</strong></li>
        <li>📌 Pure water has a pH of <strong>7</strong></li>
      </ul>

      <h2 style={{"margin-top":"4rem"}}>🎥 Watch and Learn</h2>
      <div className="gk-videos">
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="GK Video 1" allowFullScreen></iframe>
          <p>🌐 Science Overview</p>
        </div>
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/oHg5SJYRHA0" title="GK Video 2" allowFullScreen></iframe>
          <p>🧠 Science Knowledge Quiz</p>
        </div>
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/ysz5S6PUM-U" title="GK Video 3" allowFullScreen></iframe>
          <p>🌍 Science Made Easy</p>
        </div>
      </div>
    </div>
  );
}

export default Science;
