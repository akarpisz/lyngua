import React, { useState, useEffect } from "react";
import API from "../../util/API";
import { BsStar, BsStarFill, BsTrash } from "react-icons/bs";
import { Col, Row, Card, CardBody, CardHeader, Jumbotron, Button } from "reactstrap";

//use 'react-icons library for fav-stars!

const Saved = () => {
  const [saved, setSaved] = useState({ translations: [], received: false, starFiltered: false });
    const refreshPage = () => {
        window.location.reload(false);
    }
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
  const changeFav = (id, favState) => {
    let token = localStorage.getItem("token");
    let newState = !favState;

    API.updateTrans(token, id, newState).then(res=>{
        if (res.status) {
            refreshPage();
        }
    })
  };
  const handleFavSort = () => {
      let toggleSort = !saved.starFiltered
      setSaved({
          ...saved, starFiltered: toggleSort
      })
  }
  const delTrans = (id)=>{
    console.log(id);
    let token = localStorage.getItem("token");

    API.deleteTrans(token, id).then(res=>{
        console.log(res)
        if(res.status === 200){
            refreshPage();
        }
        
    })
  };

  return (saved.received ? (
    <>
      <Row>
        <Col>
          <Jumbotron><span>Saved Translations</span></Jumbotron>
        </Col>
      </Row>
      <Row>
          <Col>
          <Button onClick={handleFavSort}>View Favorites Only</Button>
          </Col>
      </Row>
      <Row>
        <Col>
        {saved.starFiltered ? (<div>
  {saved.translations
    .filter(trans => trans.starred)
    .map(trans => {
      return(
      <div key={trans._id}>
        <Card>
          <span
            onClick={() => {
              changeFav(trans._id, trans.starred);
            }}
          >
            {trans.starred ? <BsStarFill /> : <BsStar />}
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
      )
    })}
</div>): (<div>
        {saved.translations.map((trans) => {
          return(
          <div key={trans._id}>
            <Card>
              <span
                onClick={() => {
                  changeFav(trans._id, trans.starred);
                }}
              >
                {trans.starred ? <BsStarFill /> : <BsStar />}
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
          )
        })}
      </div>)}
          {/* {saved.translations.map((trans) => {
            return (
              <div key={trans._id}>
                <Card>
                  <span onClick={()=>{changeFav(trans._id, trans.starred)}}>{trans.starred ? <BsStarFill /> : <BsStar />}</span>
                  <CardHeader>From : {trans.fromLang}</CardHeader>
                  <CardBody>Text : {trans.fromTxt}</CardBody>
                  <CardHeader>To : {trans.toLang}</CardHeader>
                  <CardBody>{trans.toTxt}</CardBody>
                  <span onClick={()=>{delTrans(trans._id)}} ><BsTrash/></span>
                </Card>
                <br />
              </div>
            );
          })} */}
        </Col>
      </Row>
    </>
  ) : (
    <div />
  ))
};

export default Saved;
