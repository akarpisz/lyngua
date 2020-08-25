import React from "react";

import TopMenu from "../src/components/Navbar";
import Login from './components/pages/Login';
import Home from "./components/pages/Home/Home";
import Signup from './components/pages/Signup';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      
      <Router>
      <TopMenu />
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
        <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
