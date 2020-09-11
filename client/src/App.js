import React, { useState, useEffect } from "react";
import TopMenu from "../src/components/Navbar";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import UserHome from "./components/pages/UserHome";
import NewTrans from "./components/pages/NewTrans";
import Saved from "./components/pages/Saved";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Messages from "./components/pages/Messages";

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      console.log("null token?");
      setLogin(false);
    } else {
      console.log("else");
      setLogin(true);
    }
  }, []);

  return (
    <div className="App" style={{minHeight:"40em"}}>
      <Container>
        <Router>
          {/* <LoginProvider> */}
          <TopMenu login={login} setLogin={setLogin} />
          {/* </LoginProvider> */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login login={login} setLogin={setLogin} />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/userhome">
              <UserHome login={login} setLogin={setLogin} />
            </Route>
            <Route path="/newtranslation">
              <NewTrans />
            </Route>
            <Route path="/saved">
              <Saved />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
