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
import {BiMessageAdd} from 'react-icons/bi';

const MsgModal = (props) => {
  const { handleInputChange,modalSubmit, toggle, modal, msgState, cancelMsg } = props;
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Send This Translation?</ModalHeader>
        <ModalBody>
          <Label for="message recipient">Recipient: </Label>
          <Input type="text" onChange={handleInputChange}name="msgRecip" value={msgState.msgRecip} />
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            type="submit"
            onClick={() => {
              toggle();
              modalSubmit(msgState.transId);
            }}
          >
            <BiMessageAdd/>
          </Button>{" "}
          <Button color="outline-danger" onClick={()=>{toggle(); cancelMsg()}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MsgModal;
