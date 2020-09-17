import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { appMaterial } from './app-material';
import TopBar from './components/app/components/TopBar';
import { SignUp } from './components/user/SignUp';
import { PrivateRoute } from './components/user/PrivateRoute';
import SignIn from './components/user/SignIn';
import Dashboard from './components/Dashboard';
import WhatIDo from './components/WhatIDo';
import Porfolio from './components/Porfolio';
import About from './components/About';
import Contact from './components/Contact';
import Game from './components/game/Main';

function App() {
  return (
    <ThemeProvider theme={appMaterial}>
      <Router>
        <CssBaseline />

        <TopBar />
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute path="/game">
            <Game />
          </PrivateRoute>
          <Route path="/what-i-do">
            <WhatIDo />
          </Route>
          <Route path="/porfolio">
            <Porfolio />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
