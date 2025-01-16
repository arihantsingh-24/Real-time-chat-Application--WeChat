import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Home = ({ username, onLogout }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected person for chatting
  const [people, setPeople] = useState([]); // List of people for the sidebar
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating people for now, later we will fetch this from the backend
    setPeople([
      { id: 1, username: "John" },
      { id: 2, username: "Alice" },
      { id: 3, username: "Bob" },
    ]);
  }, []);

  useEffect(() => {
    // Simulate fetching previous messages when a user is selected
    if (selectedUser) {
      setMessages([
        { user: "John", text: "Hello, how are you?" },
        { user: "Alice", text: "I'm good, thanks!" },
      ]);
    }
  }, [selectedUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message && selectedUser) {
      const newMessage = { user: username, text: message };
      setMessages([...messages, newMessage]);

      // Reset message input field
      setMessage("");

      // Simulate sending the message to the server
      try {
        await axios.post("http://localhost:5000/api/messages", newMessage, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };
  
  const handleCloseChat = () =>{
    setSelectedUser(null);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar: List of People */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h3 className="text-xl font-bold mb-4">People</h3>
        <ul>
          {people.map((person) => (
            <li
              key={person.id}
              className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => setSelectedUser(person)}
            >
              {person.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content: Chat Box */}
      <div className="flex-1 bg-gray-100 p-4">
        {selectedUser ? (
          <div className="flex flex-col h-full">
            <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold">Chat with {selectedUser.username}</h1>
              </div>
              <FontAwesomeIcon icon={faX} onClick={handleCloseChat}/>
            </header>

            <div className="flex-1 bg-white p-6 rounded shadow-md my-4 overflow-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <strong>{msg.user}:</strong>
                    <span>{msg.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Type a message..."
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center p-4">Select a person to chat with</div>
        )}
      </div>
    </div>
  );
};

export default Home;
