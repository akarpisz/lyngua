import React, { useState, useEffect } from 'react';
import API from '../../util/API';
import {Container, Row, Col} from 'reactstrap';

const UserHome = () => {

    const [userInfo, setUserInfo] = useState({
        id:"",
        username: "",
        firstName:"",
        lastName:"",
    })

    useEffect(()=>{
        let token = localStorage.getItem("token");
        
        API.getUserInfo(token).then((res)=>{
            setUserInfo(res.data)
        })
    }, [])

    const handleLogout= () => {
        //remove JWT from local storage
    }
    return(
        <Container>
        <Row>
           <Col md="6" xs="12"></Col>
           <Col md="6" xs="12"></Col> 
        </Row>

        </Container>
    )
}

export default UserHome;