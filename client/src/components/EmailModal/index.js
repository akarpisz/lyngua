import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  Input,
} from "reactstrap";

const EmailModal = (props) => {
  const { modalSubmit, toggle, modal, emailState } = props;
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Email This Translation?</ModalHeader>
        <ModalBody>
          <Label for="email recipient">Recipient: </Label>
          <Input type="text" name="emailrecip" />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            onClick={() => {
              toggle();
              modalSubmit(emailState.transId);
            }}
          >
            Email Translation
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EmailModal;
