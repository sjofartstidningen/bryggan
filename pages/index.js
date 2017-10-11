import React from 'react';
import Logotype from '../components/Logotype';

export default () => (
  <div className="wrapper">
    <header className="header">
      <div className="logotype">
        <Logotype />
      </div>

      <nav className="navigation">
        <ul>
          <li>Dashboard</li>
          <li>Tidningen</li>
          <li>Nyhetsbrev</li>
        </ul>
      </nav>

      <div className="profile">Adam Bergman</div>
    </header>
  </div>
);
