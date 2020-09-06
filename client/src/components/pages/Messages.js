import React, { useEffect, useState } from "react";
import API from "../../util/API";
import { Col, Row, Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import { ImCancelCircle } from "react-icons/im";
import {BsReplyFill} from "react-icons/bs";
const Messages = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getMsgs(token).then((res) => {
      console.log(res);
      setMsgs(res.data);
    });
  }, []); //get messages from DB
  const [msgs, setMsgs] = useState([]);

  const delMsg = () => {
        //API.deleteMsg()
  };

  const handlereply = () => {

  }

  return (
    <>
      <Row>
        <Col>
        <Button/>
        </Col>
      </Row>
      <Row>
        <Col>
          <div id="msgDiv">
            { msgs.map(msg=>{
            return(
            <Card>
              <CardHeader>From: {msg.sender} <span onClick={handlereply}><BsReplyFill/></span></CardHeader>
            <CardBody>{msg.body}</CardBody>
              <CardFooter><span onClick={delMsg}><ImCancelCircle/></span></CardFooter>
            </Card>
            )
            })
            }
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Messages;
