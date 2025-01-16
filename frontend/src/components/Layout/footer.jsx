import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center mt-auto">
      <p className="text-sm">© 2025 ChatApp. All rights reserved.</p>
      <div className="mt-2">
        <a
          href="https://www.example.com/privacy-policy"
          className="text-blue-400 hover:text-blue-500 text-sm"
        >
          Privacy Policy
        </a>
        {' | '}
        <a
          href="https://www.example.com/terms-of-service"
          className="text-blue-400 hover:text-blue-500 text-sm"
        >
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
