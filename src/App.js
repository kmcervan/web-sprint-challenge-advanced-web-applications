import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';

function App() {
  return (
    <Router>
      <div className="App">
        <PrivateRoute exact path ='/bubble' component={BubblePage} />
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute