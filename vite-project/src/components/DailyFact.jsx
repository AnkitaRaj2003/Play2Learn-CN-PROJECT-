import React, { useState, useEffect } from 'react';
import './DailyFact.css';

const facts = [
  "The human brain can store about 2.5 petabytes of information.",
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
  "Octopuses have three hearts, nine brains, and blue blood.",
  "The shortest war in history was between Britain and Zanzibar in 1896. Zanzibar surrendered after 38 minutes.",
  "A day on Venus is longer than a year on Venus."
];

function DailyFact({ onClose }) {
  const [fact, setFact] = useState('');

  useEffect(() => {
    // Get a random fact or use date-based index for consistent daily fact
    const today = new Date().getDate();
    const factIndex = today % facts.length;
    setFact(facts[factIndex]);
  }, []);

  return (
    <div className="fact-popup-overlay">
      <div className="fact-popup">
        <h3>📚 Daily Fact</h3>
        <p>{fact}</p>
        <button onClick={onClose} className="close-btn">
          Got it!
        </button>
      </div>
    </div>
  );
}

export default DailyFact;