// src/components/Header.js
import React from 'react';

function Header({ user, handleLogout }) {
  return (
    <header>
      <h1>Wings Cafe Inventory Dashboard</h1>
      <div id="userDisplaySection">
        <span>Welcome, {user.username}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
