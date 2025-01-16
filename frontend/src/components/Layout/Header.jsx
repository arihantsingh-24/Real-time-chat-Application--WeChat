import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ username, isLoged, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">WeChat</h1>
        {isLoged && <span className="text-sm">Welcome, {username}</span>}
      </div>
      <div>
        {isLoged ? (
          <button className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="bg-blue-700 px-4 py-2 rounded text-white hover:bg-green-600 mr-2" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="bg-blue-700 px-4 py-2 rounded text-white hover:bg-yellow-600" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
