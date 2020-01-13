import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Main} />>
        <Footer />
      </div>
    </Router >
  );
}

export default App;