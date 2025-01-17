import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import io from "socket.io-client";  // Import socket.io-client

const Home = ({ username, onLogout }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [people, setPeople] = useState([]);
  const [newChatUser, setNewChatUser] = useState("");
  const navigate = useNavigate();

  // Socket.IO connection
  const socket = io("http://localhost:5000");  // Connect to the server

  // Fetch people from the server
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPeople(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchPeople();
  }, []);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/messages?chatWith=${selectedUser.username}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedUser]);

  // Listen for incoming messages from socket
  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      if (
        (newMessage.sender === username && newMessage.receiver === selectedUser?.username) ||
        (newMessage.receiver === username && newMessage.sender === selectedUser?.username)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off("receive_message"); // Clean up on unmount
    };
  }, [selectedUser, username]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message && selectedUser) {
      const newMessage = {
        sender: username,
        receiver: selectedUser.username,
        text: message,
      };
      setMessages([...messages, newMessage]); // Update UI immediately

      // Emit message to the server using Socket.IO
      socket.emit("send_message", newMessage);

      // Optionally, store the message in the backend as well
      try {
        await axios.post("http://localhost:5000/api/messages", newMessage, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (err) {
        console.error("Error sending message:", err);
      }

      setMessage(""); // Clear input field
    }
  };

  const handleAddChat = () => {
    if (newChatUser) {
      setPeople([...people, { username: newChatUser }]);
      setNewChatUser(""); // Clear input field
    }
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar: List of People */}
      <div className="flex flex-col w-1/4 bg-gray-200 p-4">
        <h3 className="text-xl font-bold mb-4">People</h3>
        <ul className="flex-grow">
          {people.map((person, index) => (
            <li
              key={index}
              className="flex justify-between items-baseline p-2 cursor-pointer hover:bg-blue-500 hover:text-white rounded"
              onClick={() => setSelectedUser(person)}
            >
              {person.username}
              <FontAwesomeIcon
                icon={faX}
                className="cursor-pointer"
                // Functionality to remove users can be added here
              />
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            value={newChatUser}
            onChange={(e) => setNewChatUser(e.target.value)}
            placeholder="Add username"
            className="p-2 border rounded flex-grow"
          />
          <FontAwesomeIcon
            icon={faPlus}
            className="cursor-pointer text-blue-600"
            onClick={handleAddChat}
          />
        </div>
      </div>

      {/* Main Content: Chat Box */}
      <div className="flex-1 bg-gray-100 p-4">
        {selectedUser ? (
          <div className="flex flex-col h-full">
            <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <h1 className="text-xl font-bold">
                Chat with {selectedUser.username}
              </h1>
              <FontAwesomeIcon
                icon={faX}
                className="cursor-pointer"
                onClick={handleCloseChat}
              />
            </header>

            <div className="flex-1 bg-white p-6 rounded shadow-md my-4 overflow-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <strong>
                      {msg.sender === username ? "You" : msg.sender}:
                    </strong>
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
