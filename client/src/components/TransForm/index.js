import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


const TransForm = ({ transText, handleInputChange, handleSubmit, supportedLang }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <>
      <Card>
            <CardHeader></CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="from">Text to Translate: </Label>
                  <Input
                    type="text"
                    name="fromTxt"
                    onChange={handleInputChange}
                    value={transText}
                  />
                </FormGroup>
                <FormGroup>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle color="primary" caret>Languages</DropdownToggle>
                    <DropdownMenu onClick={handleInputChange}>
                      {Object.entries(supportedLang).map((lang) => {
                        return (
                          <DropdownItem
                            name="toLang"
                            value={lang[0]}
                            key={lang[0]}
                          >
                            {lang[1]["name"]}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
                <FormGroup>
                  <Button color="primary">Submit</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
    </>
  );
};

export default TransForm;
