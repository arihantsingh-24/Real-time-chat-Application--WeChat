const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/auth')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Use Auth Routes
app.use('/api/auth', authRoutes);

// Store active users and their sockets
const users = {};

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Store the user with the socket ID (on user login or connect)
  socket.on("setUsername", (username) => {
    users[username] = socket.id; // Store socket ID for the user
    console.log(`User ${username} connected`);
  });

  // Handle incoming chat messages
  socket.on("sendMessage", (message, recipientUsername) => {
    const recipientSocketId = users[recipientUsername];

    if (recipientSocketId) {
      // Emit message to the recipient user
      io.to(recipientSocketId).emit("receiveMessage", message);
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    for (const username in users) {
      if (users[username] === socket.id) {
        delete users[username]; // Remove user on disconnect
        console.log(`${username} disconnected`);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
