import React from 'react';
import { FaHome, FaPlay } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

const HamburgerNavBar = () => {
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light d-md-none" style={{  borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active" title="Home">
            <a className="nav-link" href="#">
              <FaHome />
              asdfsf
            </a>
          </li>
          <li className="nav-item" title="Video Play">
            <a className="nav-link" href="#">
              <FaPlay />
            </a>
          </li>
          <li className="nav-item" title="Animated Round Card (Mini Game)">
            <a className="nav-link" href="#">
              <div className="animated-card">
                <div className="heart red"></div>
                <div className="heart black"></div>
              </div>
            </a>
          </li>
          <li className="nav-item" title="Menu">
            <a className="nav-link" href="#">
              <div className="menu-icon">
                <BsThreeDots />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HamburgerNavBar;
