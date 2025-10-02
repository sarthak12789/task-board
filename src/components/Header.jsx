import React from 'react';



export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Task Board</h1>
        <div className="header-buttons">
          <button className="button login">Login</button>
          <button className="button signup">Signup</button>
        </div>
      </div>
    </header>
  );
}
