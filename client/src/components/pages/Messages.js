import React, { useEffect, useState } from "react";
import API from "../../util/API";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "reactstrap";
import { ImCancelCircle } from "react-icons/im";
import { BsReplyFill } from "react-icons/bs";
import ReplyModal from "../ReplyModal";
const Messages = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getMsgs(token).then((res) => {
      console.log(res);
      setMsgs(res.data);
    });
  }, []);
  const [msgs, setMsgs] = useState([]);
  const [outgoing, setOutgoing] = useState({
    recip: "",
    toLang: "",
    fromTxt: "",
    newNotReply: false
  });
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  //   const refreshPage = () => {
  //     window.location.reload(false);
  //   };

  const delMsg = (id) => {
    let token = localStorage.getItem("token");
    setMsgs(msgs.filter((msg) => msg._id !== id));
    API.deleteMsg(id, token).then((res) => {
      if (res.status === 200) {
        console.log("deleted");
      }
    });
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDrpDwn = () => setDropdownOpen(!dropdownOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, "  ", value);
    setOutgoing({
      ...outgoing,
      [name]: value,
    });
  };

  const handleReply = () => {
    let token = localStorage.getItem("token");

    API.newMsg(token, outgoing.fromTxt, outgoing.recip, outgoing.toLang).then((res) => {
      console.log(res);
    });
  };
  const clearOutgoing = () => {
    setOutgoing({
      recip: "",
      toLang: "",
      fromTxt: "",
      newNotReply: false
    });
  };

  return (
    <>
      <Row>
        <Col>
          <Button onClick={()=>{toggleModal(); setOutgoing({...outgoing, newNotReply: true})}}>Send a Message</Button>
        </Col>
        <ReplyModal
          clearOutgoing={clearOutgoing}
          dropdownOpen={dropdownOpen}
          modal={modal}
          handleReply={handleReply}
          handleInputChange={handleInputChange}
          toggleDrpDwn={toggleDrpDwn}
          toggleModal={toggleModal}
          outgoing={outgoing}
        />
      </Row>
      <Row>
        <Col>
          <div id="msgDiv">
            {msgs.map((msg) => {
              return (
                <Card key={msg._id}>
                  <CardHeader>
                    From: {msg.sender}{" "}
                    <span
                      onClick={() => {
                        setOutgoing({ ...outgoing, recip: msg.sender });
                        toggleModal();
                      }}
                    >
                      <BsReplyFill />
                    </span>
                  </CardHeader>
                  <CardBody>{msg.body}</CardBody>
                  <CardFooter>
                    <span
                      onClick={() => {
                        delMsg(msg._id);
                      }}
                    >
                      <ImCancelCircle />
                    </span>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Messages;
