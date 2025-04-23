import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Study.css';

import { GiBookCover, GiBrain, GiAtom, GiWorld } from "react-icons/gi";


function Study() {
  const navigate = useNavigate();

  const subjects = [
    { name: "General Knowledge", path: "/study/generalknowledge", icon: <GiBookCover /> },
    { name: "Mathematics", path: "/study/math", icon: <GiBrain /> },
    { name: "Science", path: "/study/science", icon: <GiAtom /> },
    { name: "Social Awareness", path: "/study/social", icon: <GiWorld /> },
  ];
  

  return (
    <div className="study-container">
      <h2 style={{"font-size":"40px", "padding":"10px"}}>Study Materials</h2>
      <p>Select a subject to explore learning resources:</p>
      
      <div className="subject-buttons">
        {subjects.map((subject, index) => (
          <button key={index} className="subject-btn" onClick={() => navigate(subject.path)}>
            {subject.icon} {subject.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Study;