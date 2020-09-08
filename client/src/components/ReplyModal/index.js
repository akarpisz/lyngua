import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  Input,
  Form,
  FormGroup,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { MdSend } from "react-icons/md";

import API from "../../util/API";

const ReplyModal = (props) => {
  const {
    clearOutgoing,
    handleReply,
    toggleDrpDwn,
    toggleModal,
    outgoing,
    modal,
    dropdownOpen,
    handleInputChange,
  } = props;

  const [langs, setLangs] = useState([]);

  useEffect(() => {
    API.getLanguages().then((data) => {
      console.log(Object.entries(data.data));
      setLangs(Object.entries(data.data));
    });
  }, []);

  return (
    <div>
      <Modal isOpen={modal}>
          {/* We need help here */}
          {/* poor user experience */}
        {outgoing.newNotReply ? (
          <ModalHeader>New Message</ModalHeader>
        ) : (
          <ModalHeader>New Message for {outgoing.recip}</ModalHeader>
        )}
        <ModalBody>
          <Form>
            {outgoing.newNotReply ? (
                <FormGroup>
                    <Label for="recipient">Recipient</Label>
                    <Input name="recip" value={outgoing.recip} onChange={handleInputChange}/>
                </FormGroup>
            ): (<div/>)}
            <FormGroup>
              <Label for="fromTxt">Message:</Label>
              <Input
                type="text"
                name="fromTxt"
                value={outgoing.fromTxt}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDrpDwn}>
                <DropdownToggle color="primary" caret>
                  {outgoing.toLang}
                </DropdownToggle>
                <DropdownMenu onClick={handleInputChange}>
                  {langs.map((lang) => {
                    return (
                      <DropdownItem name="toLang" value={lang[0]} key={lang[0]}>
                        {lang[1]["name"]}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              handleReply();
              toggleModal();
              clearOutgoing();
            }}
          >
            <MdSend />
          </Button>{" "}
          |{" "}
          <Button
            onClick={() => {
              toggleModal();
              clearOutgoing();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ReplyModal;
