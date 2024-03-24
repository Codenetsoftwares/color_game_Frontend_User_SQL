import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { login } from '../../utils/apiService';
import { useAppContext } from '../../contextApi/context';
import strings from '../../utils/constant/stringConstant';
import { useFormik } from 'formik';
import LoginSchema from '../../schema/LoginSchema';

function Login({ showLogin, setShowLogin }) {
  const [loginCred, setLoginCred] = useState(setInitialValues());

  const { dispatch } = useAppContext();

  useEffect(() => {
    if (!showLogin) {
      resetForm();
    }
  }, [showLogin]);

  function setInitialValues() {
    return {
      userName: '',
      password: '',
    };
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: loginCred,
    validationSchema: LoginSchema,
    onSubmit: (values, action) => {
      console.log('values++===============>', values);
      loginHandler(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!showLogin) {
      resetForm();
    }
  }, [showLogin]);

  async function loginHandler(values) {
    const response = await login(values, true);
    if (response) {
      dispatch({
        type: strings.LOG_IN,
        payload: { isLogin: true, ...response.data },
      });
      setShowLogin(!showLogin);
    }
  }

  function header() {
    return <h4 className="d-flex justify-content-center">Login</h4>;
  }

  console.log(errors);
  function ModalBody() {
    return (
      <div className="py-3">
        <div className="d-flex justify-content-center position-relative">
          <input
            type="text"
            className="form-control w-75"
            placeholder="enter userName"
            name="userName"
            style={{ border: '1px solid black' }}
            value={values.userName}
            onChange={handleChange}
          />
          <span className="position-absolute small" style={{ left: '60px', top: '36px' }}>
            {errors.userName && touched.userName ? <p>{errors.userName}</p> : null}
          </span>
        </div>
        <br />
        <div className="d-flex justify-content-center position-relative ">
          <input
            type="password"
            className="form-control w-75"
            placeholder="enter password"
            name="password"
            // style={{ border: '1px solid black' }}
            value={values.password}
            onChange={handleChange}
          />

          <span className="position-absolute small" style={{ left: '60px', top: '36px' }}>
            {errors.password && touched.password ? <p>{errors.password}</p> : null}
          </span>
        </div>
      </div>
    );
  }

  function footer() {
    return (
      <Button
        variant="secondary"
        onClick={handleSubmit}
        style={{
          backgroundImage: 'linear-gradient(to top, #044469 4%, #1AA0D1 92%)',
        }}
      >
        Sign in
      </Button>
    );
  }

  return (
    <Modal show={showLogin} onHide={setShowLogin} centered>
      {header && (
        <Modal.Header className="custom-header" closeButton>
          <Modal.Title className="m-auto">{header()}</Modal.Title>
        </Modal.Header>
      )}

      {ModalBody && <Modal.Body className="bg-light">{ModalBody()}</Modal.Body>}

      {footer && <Modal.Footer className="m-auto">{footer()}</Modal.Footer>}
    </Modal>
  );
}

export default Login;
