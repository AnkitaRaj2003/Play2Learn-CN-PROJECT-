import React from 'react';
import './style.css';

function Math() {
  return (
    <div className="gk-container">
      <h1 style={{"margin-top":"3rem"}}>🌍 Mathematics</h1>
      <p style={{"padding": "10px", "margin-bottom":"3rem"}}>Expand your awareness of the world around you with interesting facts and videos!</p>

      <ul className="gk-list">
        <li>📌 15 × 6 = <strong>90</strong></li>
        <li>📌 π (pi) ≈ <strong>3.14</strong></li>
        <li>📌 2, 4, 8, 16... next is <strong>32</strong></li>
        <li>📌 Area of 8 × 5 rectangle = <strong>40</strong></li>
        <li>📌 25% of 200 = <strong>50</strong></li>
        <li>📌 √144 = <strong>12</strong></li>
        <li>📌 Solve 2x + 5 = 15 → x = <strong>5</strong></li>
        <li>📌 Triangle angles sum = <strong>180°</strong></li>
        <li>📌 7² = <strong>49</strong></li>
        <li>📌 Smallest prime number = <strong>2</strong></li>
      </ul>

      <h2 style={{"margin-top":"4rem"}}>🎥 Watch and Learn</h2>
      <div className="gk-videos">
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="GK Video 1" allowFullScreen></iframe>
          <p>🌐 Mathematics Overview</p>
        </div>
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/oHg5SJYRHA0" title="GK Video 2" allowFullScreen></iframe>
          <p>🧠 Fun Mathematics Quiz</p>
        </div>
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/ysz5S6PUM-U" title="GK Video 3" allowFullScreen></iframe>
          <p>🌍 Mathematics Made Easy</p>
        </div>
      </div>
    </div>
  );
}

export default Math;
