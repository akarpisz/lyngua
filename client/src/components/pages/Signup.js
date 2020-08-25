import React, { useState } from 'react';
import { Form, Input, Label, Button, Container, Col, Row } from 'reactstrap';

const Signup= () => {
    const [newUserState, setUserState] = useState({
        username:"",
        firstName:"",
        lastName:"",

    })
    const handleInputChange = ()=>{
        //get values of inputs then update state
    }
    const handleSubmit = () => {
        //take state and make api call
    }
    return (
        <Container fluid={true}>
        <Row>
        <Col md="3" xs="0">
        </Col>
        <Col md="6" xs="12">
        <Form>
            <Label>Username</Label>
            <Input 
            type="text"
            name="username"
            placeholder="New Username"
            //value={newUserState.username}
            //onChange={handleInputChange}
            />
            <Button
            color="success"
            onClick={handleSubmit}
            >
                Submit
            </Button>
        </Form>
        </Col>
        <Col md="3" xs="0">
        </Col>
        </Row>
        </Container>
    )
};

export default Signup;