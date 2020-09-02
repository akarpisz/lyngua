import React, { useEffect, useState } from "react";
import API from "../../util/API";
import TransForm from "../TransForm";
import Results from "../Results";
import { Col, Row } from "reactstrap";

const NewTrans = () => {
  const [transState, setTransState] = useState({
    supported: {},
    fromTxt: "",
    toTxt: "",
    fromLang: "",
    toLang: null,
    
    starred: false,
    received: false,
  });
  useEffect(() => {
    async function getLang() {
      let langs = await API.getLanguages();
      console.log(langs.data);
      console.log(Object.keys(langs.data));
      setTransState({
        ...transState,
        supported: langs.data,
      });
    }
    getLang();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setTransState({
      ...transState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let result = await API.translate(transState, token);
    console.log(result.data[0].translations[0].text);
    setTransState({
      ...transState, toTxt: result.data[0].translations[0].text, toLang:  result.data[0].translations[0].to, received: true
    })
    
  };

  return (
    <div id="trans-div">
      <Row>
        <Col md={2} xs={0} />
        <Col md={8} xs={12}>
          <TransForm
            supportedLang={transState.supported}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        </Col>
        <Col md={2} xs={0} />
      </Row>

      {transState.received ? <Results transState={transState} /> : <div />}
    </div>
  );
};

export default NewTrans;
