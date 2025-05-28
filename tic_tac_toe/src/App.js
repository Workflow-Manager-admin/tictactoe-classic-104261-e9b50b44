import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>
      <main>
        {/* Center TicTacToe board */}
        <div className="container" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', minHeight: 'calc(100vh - 75px)' }}>
          <TicTacToe />
        </div>
      </main>
    </div>
  );
}

export default App;