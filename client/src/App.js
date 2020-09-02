import React from "react";
import TopMenu from "../src/components/Navbar";
import Login from './components/pages/Login';
import Home from "./components/pages/Home/Home";
import Signup from './components/pages/Signup';
import UserHome from './components/pages/UserHome';
import NewTrans from './components/pages/NewTrans';
import Saved from './components/pages/Saved';
import {Container} from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";




//use state to have a "loggedIn" boolean property, allowing conditional menu display
//{logged ? <></> : <></>}



function App() {
  return (
    <div className="App">
      <Container>
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
        <Route path="/userhome">
          <UserHome/>
        </Route>
        <Route path="/newtranslation">
          <NewTrans/>
        </Route>
        <Route path="/saved">
        <Saved/>
        </Route>
        </Switch>
      </Router>
      </Container>
    </div>
  );
}

export default App;
