import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Input, Label, Button, Row, Col} from 'reactstrap';
import API from '../../util/API';
const Login = () => {
    const history = useHistory();
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
        e.preventDefault();
        API.login(loginState).then(token=>{
            localStorage.setItem("token", token.data);
        }).then(()=>{
            history.push("/userhome");
        })
        //.then go to userHome
    }

    return (
        <>
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
                autoComplete="true"
                >
                </Input>
                <Button
                color="primary"
                onClick={handleSubmit}
                >
                    Login
                </Button>
                </Form>
            </Col>
            <Col md="3" xs="0"/>
        </Row>
        </>
    )
};

export default Login;