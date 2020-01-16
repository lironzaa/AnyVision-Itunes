import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';
import ItemInfo from './components/pages/ItemInfo';

import './App.css';

function App() {
  return (
    <Router>
      <div className="main-app-container">
        <Navbar />
        <Route exact path="/" component={Main} />>
        <Route exact path="/item-info" component={ItemInfo} />>
      </div>
    </Router >
  );
}

export default App;