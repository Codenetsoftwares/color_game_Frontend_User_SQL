import React, { useState } from "react";
import { FaHome, FaPlay, FaBars, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const HamburgerNavBar = () => {
  const [activeIcon, setActiveIcon] = useState(null);

  const navigate = useNavigate();

  const handleIconHover = (icon) => {
    setActiveIcon(icon);
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div
        className="navbar fixed-bottom navbar-light d-lg-none "
        style={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          background: "#25616a",
        }}
      >
        <div
          className={`col-3 col-md text-center text-white  ${activeIcon === "home" ? "active-icon" : ""
            }`}
          title="Home"
          onMouseEnter={() => handleIconHover("home")}
        >
          <div>
            <FaHome />
          </div>
          {activeIcon === "home" && <div className="hover-text ">Home</div>}
        </div>
        <div
          className={`col-3 col-md text-center text-white ${activeIcon === "play" ? "active-icon" : ""
            }`}
          title="Video Play"
          onMouseEnter={() => handleIconHover("play")}
        >
          <div>
            <FaPlay />
          </div>
          {activeIcon === "play" && <div className="hover-text">In-Play</div>}
        </div>
        <div
          className={`col-3 col-md text-center text-white d-flex align-items-center flex-column${activeIcon === "heart" ? "active-icon" : ""
            }`}
          title="Animated Round Card (Mini Game)"
          onMouseEnter={() => handleIconHover("heart")}
        >
          <div className="animated-coin">
            <FaHeart />
          </div>
          {activeIcon === "heart" && (
            <div className="hover-text">Mini Game</div>
          )}
        </div>
        <div
          className={`col-3 col-md text-center text-white ${activeIcon === "menu" ? "active-icon" : ""
            }`}
          title="Menu"
          onMouseEnter={() => handleIconHover("menu")}
        >
          <div
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <FaBars />
          </div>
          {activeIcon === "menu" && <div className="hover-text">Menu</div>}
        </div>
      </div>
    </div>
  );
};

export default HamburgerNavBar;
