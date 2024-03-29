import React from 'react';
import { FaHome, FaPlay } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

const HamburgerNavBar = () => {
  return (
    <div
      style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
    >
    <div
      className="row fixed-bottom navbar-light bg-dark d-md-none p-2 m justify-content-between"
    >
      <div className="col-3 text-center text-white"><FaHome/></div>
      <div className="col-3 text-center text-white">opt2</div>
      <div className="col-3 text-center text-white">opt3</div>
      <div className="col-3 text-center text-white">opt4</div>
    </div>

    </div>
  );
};

export default HamburgerNavBar;
