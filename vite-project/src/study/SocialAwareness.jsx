import React from 'react';
import './style.css';

function SocialAwareness() {
  return (
    <div className="gk-container">
      <h1 style={{"margin-top":"3rem"}}>🌍 Social Awareness</h1>
      <p style={{"padding": "10px", "margin-bottom":"3rem"}}>Expand your awareness of the world around you with interesting facts and videos!</p>

      <ul className="gk-list">
        <li>📌 If someone makes you uncomfortable, <strong>tell a trusted adult</strong>.</li>
        <li>📌 If someone is bullied, <strong>stand up and speak out</strong>.</li>
        <li>📌 Cyberbullying is <strong>bullying online</strong>.</li>
        <li>📌 Respecting space <strong>makes people feel safe</strong>.</li>
        <li>📌 Always <strong>ask permission before sharing photos</strong>.</li>
        <li>📌 To make friends, <strong>be kind and inclusive</strong>.</li>
        <li>📌 If asked for personal info online, <strong>never share</strong> it.</li>
        <li>📌 Empathy means <strong>understanding how others feel</strong>.</li>
        <li>📌 Include everyone in games to <strong>make them feel valued</strong>.</li>
        <li>📌 If you hurt someone’s feelings, <strong>apologize sincerely</strong>.</li>
      </ul>

      <h2 style={{"margin-top":"4rem"}}>🎥 Watch and Learn</h2>
      <div className="gk-videos">
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="GK Video 1" allowFullScreen></iframe>
          <p>🌐 Social Awareness Overview</p>
        </div>
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/oHg5SJYRHA0" title="GK Video 2" allowFullScreen></iframe>
          <p>🧠 Social Awareness Quiz</p>
        </div>
        <div className="video-card">
          <iframe width="300" height="180" src="https://www.youtube.com/embed/ysz5S6PUM-U" title="GK Video 3" allowFullScreen></iframe>
          <p>🌍 Social Awareness Made Easy</p>
        </div>
      </div>
    </div>
  );
}

export default SocialAwareness;
