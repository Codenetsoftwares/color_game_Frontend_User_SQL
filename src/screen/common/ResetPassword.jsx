import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Logo from "../../asset/Logo.png";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/context";
import strings from "../../utils/constant/stringConstant";
import { ResetUserPassword } from "../../utils/apiService";

const ResetPassword = () => {
  const { store, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(setInitialValues());

  function setInitialValues() {
    return {
      userName: "",
      oldPassword: "",
      newPassword: "",
    };
  }

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: resetPassword,
    onSubmit: function (values) {
      handelresetPassword(values);
    },
  });

  async function handelresetPassword(values) {
    console.log("====>>> ONCLICK OF BUTTON", values);

    try {
      const response = await ResetUserPassword(values, true);
      console.log("Response from reset password API:", response);
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

  return (
    <div className="container h-175">
      <div className="logo-container">
        <img
          src={Logo}
          alt="Logo"
          className="logo"
          style={{ height: "150px" }}
        />
      </div>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h5 className="card-title text-center">Change Password</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter New Password"
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  RESET PASSWORD
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
