import React, { useEffect, useState } from "react";
import API from "../../util/API";
import TransForm from "../TransForm";
import { Col, Row } from "reactstrap";
const NewTrans = () => {
  const [transState, setTransState] = useState({
    supported: {},
    fromTxt: "",
    toTxt: "",
    fromLang: "",
    toLang: null,
    timeStamp: null,
    starred: false,
  });
  useEffect(() => {
      async function getLang () {
      let langs = await API.getLanguages();
      console.log(langs.data);
      console.log(Object.keys(langs.data));
    //   console.log(langs);
    //   let arrLang = Object.values(langs.data);
    //   console.log(arrLang);
      setTransState({
          ...transState, supported: langs.data
      })  
        //use below to extract just the names
      //let langNames = arrLang.map(o=> { return o["name"]});
}
getLang();
  }, []);

  const handleInputChange = (e) => {
    //   const [name, value] = e.target;
    //   console.log(name+ " "+ value);
    //   setTransState({

    //   })
  };

  const handleSubmit = () => {};

  return (
    <>
      <Row>
        <Col md={2} xs={0} />
        <Col md={8} xs={12}>
          <TransForm
            transText={transState.fromTxt}
            handleInputChange={handleInputChange}
            supportedLang={transState.supported}
          />
        </Col>
        <Col md={2} xs={0} />
      </Row>
    </>
  );
};

export default NewTrans;
