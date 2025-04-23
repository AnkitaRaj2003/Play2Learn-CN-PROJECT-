import React from 'react';
import './style.css';

function GK() {
  return (
    <div className="gk-container">
      <h1 style={{"margin-top":"3rem"}}>🌍 General Knowledge</h1>
      <p style={{"padding": "10px", "margin-bottom":"3rem"}}>Expand your awareness of the world around you with interesting facts and videos!</p>

      <ul className="gk-list">
        <li>📌 The capital of Japan is <strong>Tokyo</strong>.</li>
        <li>📌 The 'Red Planet' is <strong>Mars</strong>.</li>
        <li>📌 The Mona Lisa was painted by <strong>Leonardo da Vinci</strong>.</li>
        <li>📌 The largest ocean is the <strong>Pacific Ocean</strong>.</li>
        <li>📌 Kangaroos are native to <strong>Australia</strong>.</li>
        <li>📌 The currency of the UK is the <strong>Pound Sterling</strong>.</li>
        <li>📌 The tallest mountain is <strong>Mount Everest</strong>.</li>
        <li>📌 The 'King of the Jungle' is the <strong>Lion</strong>.</li>
        <li>📌 The largest country by area is <strong>Russia</strong>.</li>
      </ul>

      <h2 style={{"margin-top":"4rem"}}>🎥 Watch and Learn</h2>
      <div className="gk-videos">
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="GK Video 1" allowFullScreen></iframe>
          <p>🌐 World Facts Overview</p>
        </div>
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/oHg5SJYRHA0" title="GK Video 2" allowFullScreen></iframe>
          <p>🧠 Fun General Knowledge Quiz</p>
        </div>
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/ysz5S6PUM-U" title="GK Video 3" allowFullScreen></iframe>
          <p>🌍 Geography Made Easy</p>
        </div>
      </div>
    </div>
  );
}

export default GK;
