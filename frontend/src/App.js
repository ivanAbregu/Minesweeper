import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to MinesWeeper</h2>
        </div>
        <p className="App-intro">
            {/*<Game />*/}
        </p>
      </div>
    );
  }
}

export default App;
