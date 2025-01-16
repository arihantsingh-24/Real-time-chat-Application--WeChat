import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./pages/Home"

const App = () => {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const loggedUsername = localStorage.getItem("username");
    if (loggedUsername) {
      setUsername(loggedUsername);
      setIsLogged(true);
    }
  }, []);

  const handleLoginSuccess = (loggedInUsername) => {
    setUsername(loggedInUsername);
    setIsLogged(true); // Triggers a re-render when this state changes
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(""); // Clear username
    setIsLogged(false); // Set logged out state
  };

  return (
    <div className="flex flex-col h-screen">
      <Router>
        <Header username={username} isLoged={isLogged} handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
