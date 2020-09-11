import React, { useState, useEffect } from "react";
import API from "../../util/API";
import { BsStar, BsStarFill, BsTrash } from "react-icons/bs";
import { BiMessageAdd } from "react-icons/bi";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  Jumbotron,
  Button,
} from "reactstrap";
import MsgModal from "../MsgModal";

//use 'react-icons library for fav-stars!

const Saved = () => {

  const [saved, setSaved] = useState({
    translations: [],
    received: false,
    starFiltered: false,
  });
  

  const [msgState, setMsgState] = useState({
    transId: "",
    msgRecip: "",
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    let token = localStorage.getItem("token");
    API.getTrans(token).then((res) => {
      console.log(res.data);
      setSaved({
        ...saved,
        translations: res.data,
        received: true,
      });
    });
  }, []);
  const cancelMsg = () => {
    setMsgState({
      transId: "",
      msgRecip: "",
    });
  };
  const modalSubmit = (id) => {
    console.log(id);
    let token = localStorage.getItem("token");
    API.msgTrans(id, token, msgState.msgRecip).then(() => {
      setMsgState({
        transId: "",
        msgRecip: "",
      });
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, "  ", value);
    setMsgState({
      ...msgState,
      [name]: value,
    });
  };



  const changeFav = (id, favState) => {
    let token = localStorage.getItem("token");
    let newState = !favState;

    let updatedTrans = saved.translations.map(trans=> {
      if (trans._id === id){
        trans.starred = newState
        return trans
      } else {
        return trans
      }
    })
    console.log(updatedTrans);
    setSaved({...saved, translations: updatedTrans})
  
    
    API.updateTrans(token, id, newState).then((res) => {
      if (res.status === 200) {
        console.log("Favorite Changed");
      }
    });

  };

  const handleFavSort = () => {
    let toggleSort = !saved.starFiltered;
    setSaved({
      ...saved,
      starFiltered: toggleSort,
    });
  };

  const delTrans = (id) => {
    console.log(id);

    setSaved({
      ...saved,
      translations: saved.translations.filter((trans) => trans._id !== id),
    });
    let token = localStorage.getItem("token");

    API.deleteTrans(token, id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("deleted translation");
      }
    });
  };

  return saved.received ? (
    <>
      <Row>
        <Col>
          <Jumbotron>
            <span>Saved Translations</span>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleFavSort}>View Favorites Only</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <MsgModal
            handleInputChange={handleInputChange}
            modalSubmit={modalSubmit}
            toggle={toggle}
            modal={modal}
            msgState={msgState}
            cancelMsg={cancelMsg}
          />
          {saved.starFiltered ? (
            <div>
              {saved.translations
                .filter((trans) => trans.starred)
                .map((trans) => {
                  return (
                    <div key={trans._id}>
                      <Card>
                        <span
                          onClick={() => {
                            changeFav(trans._id, trans.starred);
                          }}
                        >
                          {trans.starred ? <BsStarFill /> : <BsStar />}
                        </span>
                        <span
                          onClick={() => {
                            toggle();
                            setMsgState({ ...msgState, transId: trans._id });
                          }}
                        >
                          <BiMessageAdd />
                        </span>
                        <CardHeader>From : {trans.fromLang}</CardHeader>
                        <CardBody>Text : {trans.fromTxt}</CardBody>
                        <CardHeader>To : {trans.toLang}</CardHeader>
                        <CardBody>{trans.toTxt}</CardBody>
                        <span
                          onClick={() => {
                            delTrans(trans._id);
                          }}
                        >
                          <BsTrash />
                        </span>
                      </Card>
                      <br />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div>
              {saved.translations.map((trans) => {
                return (
                  <div key={trans._id}>
                    <Card>
                      <span
                        onClick={() => {
                          changeFav(trans._id, trans.starred);
                        }}
                      >
                        {trans.starred ? <BsStarFill /> : <BsStar />}
                      </span>
                      <span
                        onClick={() => {
                          toggle();
                          setMsgState({ ...msgState, transId: trans._id });
                        }}
                      >
                        <BiMessageAdd />
                      </span>
                      <CardHeader>From : {trans.fromLang}</CardHeader>
                      <CardBody>Text : {trans.fromTxt}</CardBody>
                      <CardHeader>To : {trans.toLang}</CardHeader>
                      <CardBody>{trans.toTxt}</CardBody>
                      <span
                        onClick={() => {
                          delTrans(trans._id);
                        }}
                      >
                        <BsTrash />
                      </span>
                    </Card>
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </Col>
      </Row>
    </>
  ) : (
    <div />
  );
};

export default Saved;
