import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ResetUserPassword } from '../../../utils/apiService';
import strings from '../../../utils/constant/stringConstant';
import { useAppContext } from '../../../contextApi/context';


function ResetModalAfterLogin({ showResetModal, setShowResetModal }) {
    const { store, dispatch } = useAppContext();
    const navigate = useNavigate();
    const [resetPassword, setResetPassword] = useState(setInitialValues());

    function setInitialValues() {
        return {
            confirmPassword: "",
            oldPassword: "",
            newPassword: "",
        };
    }

    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: resetPassword,
        onSubmit: function (values) {
            handelresetPassword(values);
        },
    });

    async function handelresetPassword(values) {
        try {
            const response = await ResetUserPassword(values, true);
            if (response && response.success) {
                setResetPassword(values);
                dispatch({
                    type: strings.LOG_OUT,
                    payload: { isLogin: false },
                });
                navigate("/");
                toast.success("Password changed successfully!");
            } else {
                toast.error(
                    response.message || "Failed to change password. Please try again."
                );
            }
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("An error occurred. Please try again.");
        }
    }
    function header() {
        return <h4 className="d-flex justify-content-center">Login</h4>;
    }

    function ModalBody() {
        return (
            <div className="py-3">
                <div className="d-flex justify-content-center position-relative">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        placeholder="Enter Your Username"
                        value={values.userName}
                        onChange={handleChange}
                    />
                    <span
                        className="position-absolute small"
                        style={{ left: "60px", top: "36px" }}
                    >
                        {errors.userName && touched.userName ? (
                            <p>{errors.userName}</p>
                        ) : null}
                    </span>
                </div>
                <br />
                <div className="d-flex justify-content-center position-relative ">
                    <label htmlFor="oldPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        name="oldPassword"
                        placeholder="Enter Old Password"
                        value={values.oldPassword}
                        onChange={handleChange}
                    />

                    <span
                        className="position-absolute small"
                        style={{ left: "60px", top: "36px" }}
                    >
                        {errors.password && touched.password ? (
                            <p>{errors.password}</p>
                        ) : null}
                    </span>
                </div>
                <div className="d-flex justify-content-center position-relative ">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Type here...."
                        aria-label="Confirm Password"
                        aria-describedby="basic-addon1"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />

                    <span
                        className="position-absolute small"
                        style={{ left: "60px", top: "36px" }}
                    >
                        {errors.password && touched.password ? (
                            <p>{errors.password}</p>
                        ) : null}
                    </span>
                </div>
            </div>
        );
    }

    function footer() {
        return (
            <div className="d-flex flex-column w-100">

                <Button
                    variant="secondary"
                    onClick={handleSubmit}
                    style={{
                        backgroundImage: "linear-gradient(to top, #044469 4%, #1AA0D1 92%)",
                    }}
                >
                    Sign in
                </Button>
                <Button
                    variant="link"
                    onClick={() => navigate('/passwordReset')}
                    style={{ textDecoration: 'none', color: '#1AA0D1' }}
                >
                    Reset Password
                </Button>

            </div>



        );
    }

    return (
        <Modal show={showResetModal} onHide={setShowResetModal} centered>
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

export default ResetModalAfterLogin;
