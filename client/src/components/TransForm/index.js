import React, { useState } from "react";
import {
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
const TransForm = ({ transText, handleInputChange, supportedLang }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Form>
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
                <DropdownToggle caret>Languages</DropdownToggle>
                <DropdownMenu name="toLang" onChange={handleInputChange}>
                  {Object.entries(supportedLang).map((lang) => {
                    return (
                      <DropdownItem
                        onSelect={handleInputChange}
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
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default TransForm;
