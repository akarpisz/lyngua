import React from "react";

import translate from "../../images/translate.jpg";
import { Card, CardText, Jumbotron } from 'reactstrap';

const Home = () => {
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col">
          <Jumbotron className="jumbotron">
        <h3 id="welcome">Welcome to Lyngua!</h3>
        </Jumbotron>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <img
            src={translate}
            alt="translate multiple languages"
            className="translate"
          />
        </div>
        <div className="col-md-6 col-xs-12">
            <Card>
                <CardText className="intro">
          
            Are you a polyglot, linguaphile, learning a new language, or have
            friends/family that doesn't speak english? Then this is the place
            for you. Translate to more than 60 languages with the Microsoft
            Translate API. Save your translations, email them to yourself or
            others, and send translated messages to other users!
        <br/>
          Hit signup if you are new, or login if you've been here before!
          </CardText>
          </Card>
        </div>
      </div>
      <footer>
        <br/>
        &copy; 2020 Andrew A.K. | All Rights Reserved
        <br/>
      </footer>
    </div>
    </>
  );
};
export default Home;
