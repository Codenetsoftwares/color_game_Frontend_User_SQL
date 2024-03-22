import React, { useState } from "react";
import { FaUser, FaCoins } from "react-icons/fa";
import Logo from "../../Asset/Logo.png";
import RightSlider from "./rightSlider";
import { useAppContext } from "../../contextApi/context";
import Login from "../login/login";

const NavBar = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleShow = () => setShowModalLogin(true);
  const { store, dispatch } = useAppContext();

  console.log("Store=>", store.user.isLogin);

  return (
    <div>
      <nav
        class="navbar navbar-dark bg-dark fixed-top"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #0a262c, #114651, #17687a, #1b8da6, #20b3d4)",
        }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={Logo} style={{ width: "150px" }} />
          </a>
          <button class="navbar-toggler border-0" type="button">
            {(store.user.isLogin && store.user.isLogin) ? (
              <span class="d-flex flex-column align-items-start">
                <span
                  className="btn btn-info mb-1 w-100 d-flex align-items-center text-white border border-white"
                  style={{
                    height: "30px",
                    backgroundImage:
                      "linear-gradient(to top, #114551, #226575, #34879b, #47abc2, #5ad0eb)",
                    fontSize: "13px",
                  }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasDarkNavbar"
                  aria-controls="offcanvasDarkNavbar"
                  aria-label="Toggle navigation"
                >
                  <FaCoins style={{ color: "#fec015" }} />
                  &nbsp; 0.00
                </span>
                <span
                  className="btn btn-info w-100 d-flex align-items-center text-white border border-white"
                  style={{
                    height: "30px",
                    backgroundImage:
                      "linear-gradient(to top, #114551, #226575, #34879b, #47abc2, #5ad0eb)",
                    fontSize: "13px",
                  }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasDarkNavbar"
                  aria-controls="offcanvasDarkNavbar"
                  aria-label="Toggle navigation"
                >
                  Exp : 0.00
                </span>
              </span>
            ) : (
              <span
                className="btn  text-white border border-white col"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, #114551, #226575, #34879b, #47abc2, #5ad0eb)",
                  fontSize: "13px",
                }}
                onClick={handleShow}
              >
                <FaUser style={{ width: "12px" }} className="mb-1" />
                &nbsp;
                <b>LOG IN</b>
              </span>
            )}
          </button>
        </div>
      </nav>
      <Login showLogin={showModalLogin} setShowLogin={setShowModalLogin} />
      <RightSlider />
      <h2>Hello</h2>
    </div>
  );
};

export default NavBar;

