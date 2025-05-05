// src/components/Header.js
import React from 'react';
import './Header.css'; // Import the CSS for header styles

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/path-to-your-logo.png" alt="Tea Leaf Logo" className="logo" />
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#function1">Function 1</a></li>
          <li><a href="#function2">Function 2</a></li>
          <li><a href="#function3">Function 3</a></li>
          <li><a href="#function4">Function 4</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
