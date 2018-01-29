import React, { Component } from 'react';
import Header from './components/Header';

const leadingZero = n => (n < 10 ? `0${n}` : `${n}`);

class App extends Component {
  render() {
    return (
      <div>
        <Header authorized />

        <main>
          <h1>Tidningen</h1>
          <h2>2017</h2>
          <div>
            {Array.from({ length: 11 }, (x, i) => i + 1).map(n => (
              <div>
                <img
                  src={`http://via.placeholder.com/210x275?text=Nummer ${leadingZero(
                    n,
                  )}`}
                  alt={`Omslag nummer ${leadingZero(n)}`}
                />
                <p>Nummer {leadingZero(n)}</p>
              </div>
            ))}
          </div>

          <h2>2016</h2>
          <div>
            {Array.from({ length: 11 }, (x, i) => i + 1).map(n => (
              <div>
                <img
                  src={`http://via.placeholder.com/210x275?text=Nummer ${leadingZero(
                    n,
                  )}`}
                  alt={`Omslag nummer ${leadingZero(n)}`}
                />
                <p>Nummer {leadingZero(n)}</p>
              </div>
            ))}
          </div>

          <h2>2015</h2>
          <div>
            {Array.from({ length: 11 }, (x, i) => i + 1).map(n => (
              <div>
                <img
                  src={`http://via.placeholder.com/210x275?text=Nummer ${leadingZero(
                    n,
                  )}`}
                  alt={`Omslag nummer ${leadingZero(n)}`}
                />
                <p>Nummer {leadingZero(n)}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
