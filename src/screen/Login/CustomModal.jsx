import React, { useState } from 'react';
import { Modal, Button, closeButton } from 'react-bootstrap';

const CustomModal = ({ show, setShow, ModalBody, header, footer }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="modal-body">
        <div className="row">
          <div className="col-4 h-100 w-100">
            <div className="col-sm-4 h-250 w-250">
              <Modal show={show} onHide={handleClose} centered>
                {header && (
                  <Modal.Header closeButton>
                    <Modal.Title className="m-auto">{header()}</Modal.Title>
                  </Modal.Header>
                )}
                {ModalBody && <Modal.Body className="bg-light">{ModalBody()}</Modal.Body>}
                {footer && <Modal.Footer className="m-auto">{footer()}</Modal.Footer>}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
