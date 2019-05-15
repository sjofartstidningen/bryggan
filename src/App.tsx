import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <div>
        <header>
          <div>
            <h1>Bryggan</h1>
          </div>
        </header>

        <nav>
          <ul>
            <li>
              <a href="/tidningen">Tidningen</a>
            </li>
            <li>
              <a href="/installningar">Inställningar</a>
            </li>
          </ul>
        </nav>

        <div>
          <div>
            <div>Adam Bergman</div>
            <div>
              <a href="/sign-out">Logga ut</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
