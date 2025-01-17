# Real-Time Chat Application🗨️🗨️

## Overview
This is a real-time chat application built using the following technologies:
- **Frontend**: React.js
- **Backend**: Express.js
- **Real-Time Communication**: WebSocket (Socket.IO)
- **Data Storage**: Local Storage (for authentication)

The application allows users to register, log in, and chat in real time.

---

## Features
1. **User Authentication**:
   - Login and Register pages for user authentication.
   - Data stored in the browser's local storage.
2. **Real-Time Messaging**:
   - Instant messaging using WebSocket (Socket.IO).
   - Notification when users connect or disconnect.
3. **Responsive UI**:
   - Built with React.js for a modern, responsive interface.
4. **Server-Side Setup**:
   - Express.js backend to handle API requests and manage WebSocket connections.

---

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- npm or yarn

### Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/your-repo-url/real-time-chat-app.git
cd real-time-chat-app
```

#### 2. Set Up the Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The backend server will start on `http://localhost:5000`.

#### 3. Set Up the Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend server will start on `http://localhost:3000`.

---

## Project Structure

### Backend (`/backend`)
```
backend/
├── src/
│   ├── routes/
│   │   └── auth.js        # Authentication routes
│   ├── controllers/
│   │   └── authController.js  # Authentication logic
│   ├── config/
│   │   └── socket.js      # Socket.IO configuration
│   ├── server.js          # Main server file
├── package.json
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.js       # Login component
│   │   ├── Register.js    # Register component
│   │   └── Chat.js        # Chat interface
│   ├── App.js             # Main App component
│   ├── index.js           # React entry point
├── package.json
```

---

## How It Works

### Backend
- **Express.js** handles API routes for user authentication.
- **Socket.IO** enables real-time, bi-directional communication between the client and server.
- Configured CORS to allow frontend-backend communication.

### Frontend
- **React.js** provides a dynamic, responsive user interface.
- Local storage is used to store user data (e.g., login credentials).
- WebSocket connection is established to send and receive messages in real time.

---

## Future Improvements
- Implement persistent storage (e.g., MongoDB) for user data and chat history.
- Add support for private messaging and group chats.
- Include typing indicators and read receipts.
- Enhance security with hashed passwords and JWT authentication.

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).
