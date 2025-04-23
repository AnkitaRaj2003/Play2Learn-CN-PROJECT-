import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import { useParams, useLocation } from 'react-router-dom';

const socket = io("ws://localhost:5000");

function Chat() {
  const { room } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const [currentUser, setCurrentUser] = useState(() => {
  //   const storedName = localStorage.getItem('quizName');
  //   return storedName || `User-${Math.random().toString(36).substr(2, 5)}`;
  // });
  const { state } = useLocation(); // Get the passed name
  const [currentUser, setCurrentUser] = useState(
    state?.userName || localStorage.getItem('quizName') || `User-${Math.random().toString(36).slice(2, 7)}`
  );

  useEffect(() => {
    // Ensure we have a username in localStorage
    if (!localStorage.getItem('quizName')) {
      localStorage.setItem('quizName', currentUser);
    }

    socket.emit('joinChat', room, currentUser);

    socket.on('newMessage', (msg) => {
      setMessages(prev => [...prev, {
        ...msg,
        isCurrentUser: msg.sender === currentUser
      }]);
    });

    return () => {
      socket.off('newMessage');
      socket.emit('leaveChat', room);
    };
  }, [room, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", { 
        room: room,
        text: message
      });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat Room: {room}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div 
            key={`${msg.timestamp}-${index}`}
            className={`message ${msg.isCurrentUser ? 'sent' : 'received'}`}
          >
            {msg.sender !== 'System' && !msg.isCurrentUser && (
              <strong>{msg.sender}: </strong>
            )}
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;  // Make sure this default export exists