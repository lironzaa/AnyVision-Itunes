import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';
import ItemInfo from './components/pages/ItemInfo';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Main} />
          <Route exact path="/item-info" component={ItemInfo} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router >
    </Provider>
  );
}

export default App;