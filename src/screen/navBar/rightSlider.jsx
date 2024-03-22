import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaFileAlt,
  FaMoneyCheck,
  FaChartLine,
  FaHistory,
  FaRunning,
  FaSignOutAlt,
  FaKey,
  FaBook,
} from "react-icons/fa";
import strings from "../../global/constant/stringConstant";
import { useAppContext } from "../../contextApi/context";

const RightSlider = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useAppContext();
    const handleLogout = () => {
      dispatch({
        type: strings.LOG_OUT,
        payload: { isLogin: false },
      });
      window.location.reload();
    };
    console.log("store", store);
    return (
      <div>
        <div
          class="offcanvas offcanvas-end p-0 text-white"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
          style={{ width: "300px", background: "#0D505A" }}
        >
          <div class="offcanvas-header">
            <h6 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
              <FaUser
                style={{
                  width: "12px",
                  color: "#fec015",
                }}
              />
              &nbsp;&nbsp;
              {store.user.userName} - (0.00)
            </h6>
            <button
              type="button"
              class="btn-close btn-close-dark"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 ">
              <li class="nav-item mb-3 align-items-start">
                <span className="d-flex flex-row gap-1">
                  <span
                    type="button"
                    class="btn  d-flex justify-content-start text-white fw-bold border border-white"
                    style={{
                      width: "500px",
                      height: "60px",
                      background: "#2FA8BA",
                    }}
                  >
                    Exposure 0.00
                  </span>
                  <span
                    type="button"
                    class="btn btn-info d-flex justify-content-start text-white fw-bold border border-white"
                    style={{
                      width: "500px",
                      height: "60px",
                      background: "#2FA8BA",
                    }}
                  >
                    P&L 0.00
                  </span>
                </span>
              </li>
  
              <li
                class="nav-item mb-3 align-items-start text-start"
                style={{
                  color: "white", // Initial color
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#2FA8BA"; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "white"; // Color back to original on mouse out
                }}
              >
                <FaFileAlt
                  style={{
                    color: "#fec015",
                  }}
                />{" "}
                Account Statement
              </li>
              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: "white", // Initial color
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#2FA8BA"; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "white"; // Color back to original on mouse out
                }}
              >
                <FaMoneyCheck
                  style={{
                    color: "#fec015",
                  }}
                />{" "}
                Rolling Commission
              </li>
              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: "white", // Initial color
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#2FA8BA"; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "white"; // Color back to original on mouse out
                }}
              >
                <FaKey
                  style={{
                    color: "#fec015",
                  }}
                />{" "}
                Change Password
              </li>
              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: "white", // Initial color
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#2FA8BA"; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "white"; // Color back to original on mouse out
                }}
              >
                <FaChartLine
                  style={{
                    color: "#fec015",
                  }}
                />{" "}
                Profit & Loss
              </li>
              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: "white", // Initial color
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#2FA8BA"; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "white"; // Color back to original on mouse out
                }}
              >
                <FaHistory
                  style={{
                    color: "#fec015",
                  }}
                />{" "}
                Bets History
              </li>
  
              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: "white", // Initial color
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#2FA8BA"; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "white"; // Color back to original on mouse out
                }}
              >
                <FaRunning
                  style={{
                    color: "#fec015",
                  }}
                />{" "}
                Activity Log
              </li>
  
              <li
                class="nav-item mb-3 align-items-start text-start"
                style={{
                  color: "white", // Initial color
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#2FA8BA"; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "white"; // Color back to original on mouse out
                }}
              >
                <FaBook
                  style={{
                    color: "#fec015",
                  }}
                />{" "}
                Rules
              </li>
  
              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: "white", // Initial color
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#2FA8BA"; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "white"; // Color back to original on mouse out
                }}
                onClick={handleLogout}
              >
                <FaSignOutAlt
                  style={{
                    color: "#fec015",
                  }}
                />{" "}
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default RightSlider;