const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();

const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

// Questions
const {
  generalKnowledge,
  math,
  science,
  socialAwareness,
} = require("./Questions");

const questions = {
  generalKnowledge,
  math,
  science,
  socialAwareness,
};

// Game rooms and chat rooms storage
const gameRooms = {};
const chatRooms = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Quiz Game Handlers
  socket.on("joinRoom", (room, name, subject) => {
    const cleanName = name.trim() || `Player-${socket.id.substr(0, 5)}`;
    socket.join(room);

    if (!gameRooms[room]) {
      gameRooms[room] = {
        players: [],
        currentQuestion: null,
        correctAnswer: null,
        questionTimeout: null,
        subject: subject,
      };
    }

    // Prevent duplicate names in the same room
    const existingNames = new Set(gameRooms[room].players.map((p) => p.name));
    let finalName = cleanName;
    let counter = 1;
    while (existingNames.has(finalName)) {
      finalName = `${cleanName}(${counter++})`;
    }

    gameRooms[room].players.push({
      id: socket.id,
      name: finalName,
      score: 0,
    });

    io.to(room).emit("message", `${finalName} has joined the ${subject} quiz!`);

    if (!gameRooms[room].currentQuestion) {
      askNewQuestion(room);
    }
  });

  socket.on("submitAnswer", (room, answerIndex) => {
    const roomData = gameRooms[room];
    if (!roomData) return;

    const player = roomData.players.find((p) => p.id === socket.id);
    if (!player) return;

    const isCorrect = roomData.correctAnswer === answerIndex;
    player.score += isCorrect ? 1 : -1;

    clearTimeout(roomData.questionTimeout);

    io.to(room).emit("answerResult", {
      playerName: player.name,
      isCorrect,
      correctAnswer: roomData.correctAnswer,
      scores: roomData.players.map((p) => ({
        name: p.name,
        score: p.score,
      })),
    });

    if (player.score >= 5) {
      io.to(room).emit("gameOver", { winner: player.name });
      delete gameRooms[room];
    } else {
      askNewQuestion(room);
    }
  });

  // Chat Handlers
  // In the joinChat handler, modify to:
  socket.on("joinChat", (room, name) => {
    // Use the provided name exactly as given, don't modify it
    const chatRoom = `chat-${room}`;

    if (!chatRooms.has(chatRoom)) {
      chatRooms.set(chatRoom, new Map());
    }

    const users = chatRooms.get(chatRoom);

    // Check if this socket ID already has a name
    if (!users.has(socket.id)) {
      users.set(socket.id, name); // Store the exact name provided

      socket.join(chatRoom);

      io.to(chatRoom).emit("newMessage", {
        sender: "System",
        text: `${name} has joined the chat`,
        timestamp: Date.now(),
      });
    }
  });

  socket.on("sendMessage", ({ room, text }) => {
    if (!room || !text) return;

    const chatRoom = `chat-${room}`;
    const users = chatRooms.get(chatRoom);
    if (!users) return;

    const senderName = users.get(socket.id);
    if (!senderName) return;

    io.to(chatRoom).emit("newMessage", {
      sender: senderName,
      text: text.trim(),
      timestamp: Date.now(),
    });
  });

  // Combined disconnect handler
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Clean up game rooms
    for (const room in gameRooms) {
      gameRooms[room].players = gameRooms[room].players.filter(
        (player) => player.id !== socket.id
      );

      if (gameRooms[room].players.length === 0) {
        clearTimeout(gameRooms[room].questionTimeout);
        delete gameRooms[room];
      }
    }

    // Clean up chat rooms
    chatRooms.forEach((users, room) => {
      if (users.has(socket.id)) {
        const userName = users.get(socket.id);
        io.to(room).emit("newMessage", {
          sender: "System",
          text: `${userName} has left the chat`,
          timestamp: Date.now(),
        });
        users.delete(socket.id);

        if (users.size === 0) {
          chatRooms.delete(room);
        }
      }
    });
  });
});

function askNewQuestion(room) {
  const roomData = gameRooms[room];
  if (!roomData || roomData.players.length === 0) {
    if (roomData) delete gameRooms[room];
    return;
  }

  const subject = roomData.subject || "generalKnowledge";
  const questionPool = questions[subject];
  const question =
    questionPool[Math.floor(Math.random() * questionPool.length)];

  roomData.currentQuestion = question;
  roomData.correctAnswer = question.answers.findIndex((a) => a.correct);

  io.to(room).emit("newQuestion", {
    question: question.question,
    answers: question.answers.map((a) => a.text),
    timer: 10,
    subject,
  });

  roomData.questionTimeout = setTimeout(() => {
    io.to(room).emit("answerResult", {
      playerName: "No one",
      isCorrect: false,
      correctAnswer: roomData.correctAnswer,
      scores: roomData.players.map((p) => ({
        name: p.name,
        score: p.score,
      })),
    });
    askNewQuestion(room);
  }, 10000);
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
