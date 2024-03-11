import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';

const CustomModal = ({ show, setShow, ModalBody, header, footer }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} centered>
      {header && (
        <Modal.Header className= 'custom-header' closeButton>
          <Modal.Title className="m-auto">{header()}</Modal.Title>
        </Modal.Header>
      )}

      {ModalBody && <Modal.Body className="bg-light">{ModalBody()}</Modal.Body>}

      {footer && <Modal.Footer className="m-auto">{footer()}</Modal.Footer>}
    </Modal>
  );
};

export default CustomModal;
