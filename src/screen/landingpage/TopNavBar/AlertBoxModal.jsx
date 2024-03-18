import React, { useState } from 'react';
import CustomModal from '../../Login/CustomModal';
import { Button } from 'react-bootstrap';
import { useAppContext } from '../../../contextApi/context';
import strings from '../../../global/constant/stringConstant';
import { toast } from 'react-toastify';
import './Avater.css';

const AlertBoxModal = ({ showAlertBoxModal, setShowAlertBoxModal }) => {
  const [show, setShow] = useState(false);
  const { dispatch } = useAppContext();

  const handleLogOut = () => {
    toast.success('Loged out');
    setShowAlertBoxModal(false);

    dispatch({
      type: strings.LOG_OUT,
      payload: { isLogin: false },
    });
  };

  const handleLogOutCancle = () => {
    setShowAlertBoxModal(false);
  };

  function header() {
    return (
      <>
        <h4 className="d-flex justify-content-center">ALERT</h4>
      </>
    );
  }

  function ModalBody() {
    return (
      <>
        <h5 className="d-flex justify-content-center mBody">DO YOU WANT TO LOGOUT</h5>
      </>
    );
  }

  function footer() {
    return (
      <>
        <Button variant="secondary" onClick={handleLogOut} className="btn-ft">
          YES
        </Button>
        <Button variant="secondary" onClick={handleLogOutCancle} className="btn-ft">
          NO
        </Button>
      </>
    );
  }

  return (
    <>
      <CustomModal
        show={showAlertBoxModal}
        setShow={setShowAlertBoxModal}
        header={header}
        ModalBody={ModalBody}
        footer={footer}
      />
    </>
  );
};

export default AlertBoxModal;
