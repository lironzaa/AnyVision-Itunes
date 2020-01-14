import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';

import './App.css';

function App() {
  return (
    <Router>
      <div className="main-app-container">
        <Navbar />
        <Route exact path="/" component={Main} />>
      </div>
    </Router >
  );
}

export default App;