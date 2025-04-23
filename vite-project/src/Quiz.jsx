import React, { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import { GiBookCover, GiBrain, GiAtom, GiWorld } from "react-icons/gi";

const socket = io("ws://localhost:5000");

function Quiz() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [subject, setSubject] = useState("generalKnowledge");
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [currentSubject, setCurrentSubject] = useState("");

// In the handleSubmit function where names are set:
const handleSubmit = (e) => {
  e.preventDefault();
  if (name && room) {
    // Store the exact name provided by the user
    localStorage.setItem('quizName', name.trim());
    localStorage.setItem('quizRoom', room);
    setInfo(true);
    socket.emit("joinRoom", room, name.trim(), subject);
  }
};

  useEffect(() => {
    if (seconds === 0) return;

    const timerInterval = setInterval(() => {
      setSeconds((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [seconds]);

  useEffect(() => {
    socket.on("message", (message) => {
      toast(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    socket.on("newQuestion", (data) => {
      setQuestion(data.question);
      setOptions(data.answers);
      setAnswered(false);
      setSeconds(data.timer);
      setSelectedAnswerIndex(null);
      setCurrentSubject(data.subject);
    });

    socket.on("answerResult", (data) => {
      if (data.isCorrect) {
        toast(`Correct! ${data.playerName} got it right.`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setScores(data.scores);
    });

    socket.on("gameOver", (data) => {
      setWinner(data.winner);
    });

    return () => {
      socket.off("message");
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("gameOver");
    };
  }, []);

  const handleAnswer = (answerIndex) => {
    if (!answered) {
      setSelectedAnswerIndex(answerIndex);
      socket.emit("submitAnswer", room, answerIndex);
      setAnswered(true);
    }
  };

  if (winner) {
    return (
      <div className="winner-screen">
        <h1 style={{"margin":"3rem 0"}}>🎉 Winner is {winner} 🎉</h1>
        <h2>Final Scores:</h2>
        <ul className="final-scores">
          {scores.map((player, index) => (
            <li key={index} className={player.name === winner ? "winner" : ""}>
              {player.name}: {player.score} {player.name === winner && "👑"}
            </li>
          ))}
        </ul>
        <div className="winner-buttons">
          <button
            className="play-again-btn"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
          <button
            // className="discuss-btn"
            className="play-again-btn"
            onClick={() => {
              localStorage.setItem('quizRoom', room); // Store room for chat
              // navigate(`/chat/${room}`);
              navigate(`/chat/${room}`, { state: { userName: name } });
            }}
          >
            Want to discuss?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {!info ? (
        <div className="join-div">
          <h1 style={{ margin: "1rem 0" }}>Play2Learn 🎯</h1>
          <form onSubmit={handleSubmit}>
            <input
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              placeholder="Enter room no"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <div className="subject-selection">
              <label>Select Subject:</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="generalKnowledge">📖 General Knowledge</option>
                <option value="science">⚛️ Science</option>
                <option value="math">➗ Mathematics</option>
                <option value="socialAwareness">🌍 Social Awareness</option>
              </select>
            </div>

            <button type="submit" className="join-btn">
              JOIN
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Play2Learn 🎯</h1>
          <p className="room-id">
            Room: {room} | Subject: {currentSubject}
          </p>
          <ToastContainer />
          {question ? (
            <div className="quiz-div">
            <div className="quiz-header">
              <span>⏳ Time: {seconds}s</span>
              <span>
                {currentSubject === "generalKnowledge" && <GiBookCover />}
                {currentSubject === "science" && <GiAtom />}
                {currentSubject === "math" && <GiBrain />}
                {currentSubject === "socialAwareness" && <GiWorld />}
                {currentSubject}
              </span>
            </div>

              <div className="question">
                <p className="question-text">{question}</p>
              </div>
              <ul className="options-list">
                {options.map((answer, index) => (
                  <li key={index}>
                    <button
                      className={`options ${
                        selectedAnswerIndex === index ? "selected" : ""
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                    >
                      {answer}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="scoreboard">
                <h3>Scores:</h3>
                {scores.map((player, index) => (
                  <p key={index}>
                    {player.name}: {player.score}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p>Loading question...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
