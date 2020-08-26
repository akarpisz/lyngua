import React, { useState } from 'react';
import {Form, Input, Label, Button, Container, Row, Col} from 'reactstrap';

//import API from '../../util/API';
const Login = () => {
    const [loginState, setLoginState] = useState({
        username: "",
        password: ""
    })
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setLoginState({
            ...loginState,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        console.log(loginState);
        //API.login(loginState).then go to userHome
    }

    return (
        <Container>
        <Row>
            <Col md="3" xs="0"/>
            <Col md="6" xs="12">
                <Form>
                <Label for="username">Username</Label>
                <Input 
                name="username" 
                value={loginState.username} 
                type="text" 
                maxLength="20"
                onChange={handleInputChange}
                />
                <Label for="password">Password</Label>
                <Input
                value={loginState.password}
                type="password"
                maxLength="25"
                name="password"
                onChange={handleInputChange}
                >
                </Input>
                <Button
                color="success"
                onClick={handleSubmit}
                >
                    Login
                </Button>
                </Form>
            </Col>
            <Col md="3" xs="0"/>
        </Row>
        </Container>
    )
};

export default Login;