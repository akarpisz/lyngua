import React, { useState } from "react";
import { Form, Input, Label, Button, Col, Row } from "reactstrap";
import API from "../../util/API";
import {useHistory} from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [newUserState, setUserState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const handleInputChange = (e) => {
    //get values of inputs then update state
    const { name, value } = e.target;
    setUserState({
      ...newUserState,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    //take state and make api call
    e.preventDefault();
    console.log(newUserState);
    API.addUser(newUserState)
    .then(()=>{
    console.log("newuseradded");
      setUserState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
      });
    }).then(()=> {
      history.push("/login");
    })
 };
  return (
    <>
      <Row>
        <Col md="3" xs="0"></Col>
        <Col md="6" xs="12">
          <Form>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="New Username"
              value={newUserState.username}
              onChange={handleInputChange}
            />
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Email Address"
              value={newUserState.email}
              onChange={handleInputChange}
            />
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newUserState.firstName}
              onChange={handleInputChange}
            />
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newUserState.lastName}
              onChange={handleInputChange}
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={newUserState.password}
              onChange={handleInputChange}
              autoComplete="true"
            />

            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
        <Col md="3" xs="0"></Col>
      </Row>
    </>
  );
};

export default Signup;
