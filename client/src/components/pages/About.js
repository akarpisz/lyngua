import React from "react";
import {Card, CardHeader, CardBody, Row, Col} from "reactstrap";
const About = () => {
    return (
        <>
        <Row>
            <Col md={12} xs={12}>
            <Card >
                <CardHeader className="text-center">About Lyngua</CardHeader>
                <CardBody >
                    <br/>
                    <p style={{textAlign:"left"}}>
                    Lyngua is built with ReactJS, NodeJS, ExpressJS.
                    <br/>
                    After signing up, users can tranlate from their native language without entering it, as the API detects what language is sent to be translated. 
                    <br/>
                    All user translations are saved in the database, but can delete them from their saved translations page. Lyngua is still under development, and more features will be added regularly.
                    <br/><br/>
                    Go to my github page (link in footer) to request a feature, if it's not listed below.
                    </p>
                    <br/>
                    <p style={{textAlign:"left"}}>
                        <ul>
                            <h4>Features to be added:</h4>
                            <br/>
                            <li>Various alerts (wrong password, username taken, etc.)</li>
                            <li>Unread messages notification</li>
                            <li>The ability to find and connect with other users</li>
                            <li>Messages divided into conversations with connected users</li>
                            <li>Transliteration of translations</li>
                            <li>Ability to email translations</li>
                            <li>Who knows...</li>
                        </ul>
                    </p>
                </CardBody>
            </Card>
            </Col>
        </Row>
        </>
    )
}

export default About;