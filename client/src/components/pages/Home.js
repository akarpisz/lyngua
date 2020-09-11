import React, { useEffect } from "react";
import translate from "../images/translate.jpg";
import { Card, CardText, Jumbotron, Row, Col } from "reactstrap";

const Home = () => {
  return (
    <div id="main">
      <Row>
        <Col>
          <Jumbotron id="jumbotron">
            <h3 id="welcome">Welcome to Lyngua!</h3>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col md="6" xs="12">
          <img
            src={translate}
            alt="translate multiple languages"
            className="translate"
          />
        </Col>
        <Col md="6" xs="12">
          <Card>
            <CardText className="intro">
              Are you a polyglot, linguaphile, learning a new language, or have
              friends/family that doesn't speak english? Then this is the place
              for you. Translate to more than 60 languages with the Microsoft
              Translate API. Save your translations, email them to yourself or
              others, and send translated messages to other users!
              <br />
              <br />
              Hit signup if you are new, or login if you've been here before!
            </CardText>
          </Card>
        </Col>
      </Row>
      <footer>
        <br />
        &copy; 2020 Andrew A.K. | All Rights Reserved
        <br />
      </footer>
    </div>
  );
};
export default Home;
