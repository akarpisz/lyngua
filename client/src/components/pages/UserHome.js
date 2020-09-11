import React, { useState, useEffect } from "react";
import API from "../../util/API";
import { useHistory } from "react-router-dom";
import {
  Jumbotron,
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import welcome from "../images/welcome.png";

const UserHome = (props) => {
  const { login, setLogin } = props;
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");

    API.getUserInfo(token).then((res) => {
      let data = res.data;
      setUserInfo({
        ...userInfo,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        id: data._id,
        email: data.email,
      });
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
    history.push("/");
  };

  const { username, firstName, lastName, email, id } = userInfo;

  return (
    <div id="userhome">
      <Row>
        <Col md="6" xs="12" id="userleft">
          <Jumbotron className="text-center" id="userwelcome">
          <img src={welcome} width="55%" alt="welcome"/>
          </Jumbotron>
          <Card style={{backgroundColor: "#82b6ff"}}>
            <CardTitle className="text-center">Your Info:</CardTitle>
            <CardBody>
        
              <br />
              <span>First Name: {firstName}</span>
              <br />
              <span>Last Name: {lastName}</span>
              <br />
              <span>Email: {email}</span>
              <br />
            </CardBody>
          </Card>
        </Col>
        <Col md="6" xs="12" id="userright">
          <Card style={{backgroundColor: "#82b6ff"}}>
            <CardTitle className="text-center">Options</CardTitle>
            <CardBody>
              <Button color="info" onClick={handleLogout}>
                Logout
              </Button>
              <br />
              <br />
              <Button color="primary" href="/newtranslation">
                New Translation
              </Button>
              <br />
              <br />
              <Button color="primary" href="/saved">
                See Saved Translations
              </Button>
              <br />
              <br />
              <Button color="primary" href="/messages">
                Messages
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
};

export default UserHome;
