import React, { useState, useEffect } from "react";
import API from "../../util/API";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  CardHeader,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import welcome from "../images/welcome.png";

const UserHome = (props) => {
  const { setLogin } = props;
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

  const { firstName, lastName, email } = userInfo;

  return (
    <div id="userhome">
      <Row>
        <Col md="6" xs="12" id="userleft">
          {/* <Jumbotron className="text-center" id="userwelcome"> */}
          <img src={welcome} width="100%" alt="welcome" />
          {/* </Jumbotron> */}
          <br />
          <Card>
            <CardHeader className="text-center">
              <h4>Your Info:</h4>
            </CardHeader>
            <CardBody>
              <div class="form-group row">
                <label for="staticFirstName" class="col col-form-label">
                  First Name:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly=""
                    class="form-control-plaintext"
                    id="staticFirstName"
                    value={firstName}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="staticLastNAme" class="col col-form-label">
                  Last Name:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly=""
                    class="form-control-plaintext"
                    id="staticLastName"
                    value={lastName}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col col-form-label">
                  Email:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly=""
                    class="form-control-plaintext"
                    id="staticEmail"
                    value={email}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" xs="12" id="userright">
          <Card style={{ color: "white" }}>
            <CardHeader className="text-center"><h4>Options</h4></CardHeader>
            <CardBody>
              <Button color="danger" onClick={handleLogout}>
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
