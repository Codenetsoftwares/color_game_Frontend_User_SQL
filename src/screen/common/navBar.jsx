import React, { useState, useEffect } from 'react';
import Logo from '../../asset/Logo.png';
import { useAppContext } from '../../contextApi/context';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  FaCoins,
  FaUser,
  FaFileAlt,
  FaMoneyCheck,
  FaChartLine,
  FaHistory,
  FaRunning,
  FaSignOutAlt,
  FaKey,
  FaBook,
} from 'react-icons/fa';
import Login from '../loginModal/loginModal';
import strings from '../../utils/constant/stringConstant';
import { toast } from 'react-toastify';
import ansmt from '../../asset/ancmntv.png';
import AppDrawer from './appDrawer';
import HamburgerNavBar from './hamburgerNavBar';
import { userWallet } from '../../utils/apiService';

const NavBar = () => {
  const navigate = useNavigate();
  const [showModalLogin, setShowModalLogin] = useState(false);

  const { store, dispatch } = useAppContext();
  console.log('store from navbar', store);
  const userId = store.user?.id;

  const accessTokenFromStore = JSON.parse(localStorage.getItem(strings.LOCAL_STORAGE_KEY))?.user?.accessToken;
  useEffect(() => {
    if (userId && accessTokenFromStore) {
      handleUserWallet();
    }
  }, [userId, accessTokenFromStore]);

  const handleUserWallet = async () => {
    console.log('userId', userId);
    const response = await userWallet(userId, true);
    console.log(' response wallet=>>>>', response);
    if (response) {
      dispatch({
        type: strings.UserWallet,
        payload: {
          ...response.data,
        },
      });
      console.log(response);
    }
  };

  const handlePasswordChangeClick = () => {
    navigate('/forgetPassword');
  };

  const handleRulesPageClick = () => {
    navigate('/rulesPage');
  };

  const takeMetoProfitAndLoss = () => {
    navigate('/profit-loss');
  };

  const handleBetHistoryClick = () => {
    navigate('/betHistory');
  };

  const handleLogout = () => {
    dispatch({
      type: strings.LOG_OUT,
      payload: { isLogin: false },
    });
    const closeButton = document.querySelector('.btn-close');
    // if (closeButton) {
    //   closeButton.click();
    // }
    navigate('/home');
    toast.info('Logout successfully');
  };

  function getNav() {
    return (
      <nav
        className="navbar navbar-dark bg-dark  p-0"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #0a262c, #114651, #17687a, #1b8da6, #20b3d4)',
        }}
      >
        {!store.user.isLogin && (
          <div class="w-100 d-flex justify-content-between" style={{ background: '#25616a' }}>
            <img src={ansmt} style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
            {/* <FaCoins className="m-2" style={{ color: "#fec015" }} /> */}
            <marquee className="text-white">Your announcement text here</marquee>
            <span className="text-nowrap text-white px-2" style={{ fontSize: '14px' }}>
              March 24, 2024
            </span>
          </div>
        )}

        <div class="container-fluid">
          <button
            class="btn btn-primary d-lg-none hambargerIcon"
            type="button"
            // data-bs-toggle="offcanvas"
            // data-bs-target="#offcanvasExample"
            // aria-controls="offcanvasExample"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
            style={{ width: '44px' }}
          >
            ☰
          </button>
          <a class="navbar-brand" href="#">
            <img src={Logo} style={{ width: '150px' }} />
          </a>
          <button class="navbar-toggler border-0" type="button">
            {store.user.isLogin && store.user.isLogin ? (
              <span class="d-flex flex-column align-items-start">
                <span
                  className="btn btn-info mb-1 w-100 d-flex align-items-center text-white border border-white"
                  style={{
                    height: '30px',
                    backgroundImage: 'linear-gradient(to top, #114551, #226575, #34879b, #47abc2, #5ad0eb)',
                    fontSize: '13px',
                  }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasDarkNavbar"
                  aria-controls="offcanvasDarkNavbar"
                  aria-label="Toggle navigation"
                >
                  <FaCoins style={{ color: '#fec015' }} />
                  &nbsp; {store?.user?.wallet?.balance}
                </span>
                <span
                  className="btn btn-info w-100 d-flex align-items-center text-white border border-white"
                  style={{
                    height: '30px',
                    backgroundImage: 'linear-gradient(to top, #114551, #226575, #34879b, #47abc2, #5ad0eb)',
                    fontSize: '13px',
                  }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasDarkNavbar"
                  aria-controls="offcanvasDarkNavbar"
                  aria-label="Toggle navigation"
                >
                  Exp : {store?.user?.wallet?.exposure}
                </span>
              </span>
            ) : (
              <span
                className="btn  text-white border border-white col"
                style={{
                  backgroundImage: 'linear-gradient(to top, #114551, #226575, #34879b, #47abc2, #5ad0eb)',
                  fontSize: '13px',
                }}
                onClick={() => setShowModalLogin(true)}
              >
                <FaUser style={{ width: '12px' }} className="mb-1" />
                &nbsp;
                <b>LOG IN</b>
              </span>
            )}
          </button>
        </div>
      </nav>
    );
  }

  function getRightSlider() {
    return (
      <div>
        <div
          class="offcanvas offcanvas-end p-0 text-white"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
          style={{ width: '300px', background: '#0D505A' }}
        >
          <div class="offcanvas-header">
            <h6 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
              <FaUser
                style={{
                  width: '12px',
                  color: '#fec015',
                }}
              />
              &nbsp;&nbsp;
              {store.user?.userName} - ({store?.user?.wallet?.balance})
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
                      width: '500px',
                      height: '60px',
                      background: '#2FA8BA',
                    }}
                  >
                    Exposure {store.user?.wallet?.exposure}
                  </span>
                  <span
                    type="button"
                    class="btn btn-info d-flex justify-content-start text-white fw-bold border border-white"
                    style={{
                      width: '500px',
                      height: '60px',
                      background: '#2FA8BA',
                    }}
                  >
                    P&L {store.user?.wallet?.profit_loss}
                  </span>
                </span>
              </li>

              <li
                class="nav-item mb-3 align-items-start text-start"
                style={{
                  color: 'white', // Initial color
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2FA8BA'; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white'; // Color back to original on mouse out
                }}
              >
                <FaFileAlt
                  style={{
                    color: '#fec015',
                  }}
                />{' '}
                Account Statement
              </li>
              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: 'white', // Initial color
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2FA8BA'; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white'; // Color back to original on mouse out
                }}
              >
                <FaMoneyCheck
                  style={{
                    color: '#fec015',
                  }}
                />{' '}
                Rolling Commission
              </li>
              <li
                onClick={handlePasswordChangeClick}
                class="nav-item mb-3 align-items-start"
                style={{
                  color: 'white', // Initial color
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2FA8BA'; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white'; // Color back to original on mouse out
                }}
              >
                <FaKey
                  style={{
                    color: '#fec015',
                  }}
                />{' '}
                Change Password
              </li>
              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: 'white', // Initial color
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2FA8BA'; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white'; // Color back to original on mouse out
                }}
                onClick={takeMetoProfitAndLoss}
              >
                <FaChartLine
                  style={{
                    color: '#fec015',
                  }}
                />{' '}
                Profit & Loss
              </li>
              <li
                class="nav-item mb-3 align-items-start"
                onClick={handleBetHistoryClick}
                style={{
                  color: 'white', // Initial color
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2FA8BA'; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white'; // Color back to original on mouse out
                }}
              >
                <FaHistory
                  style={{
                    color: '#fec015',
                  }}
                />{' '}
                Bets History
              </li>

              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: 'white', // Initial color
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2FA8BA'; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white'; // Color back to original on mouse out
                }}
              >
                <FaRunning
                  style={{
                    color: '#fec015',
                  }}
                />{' '}
                Activity Log
              </li>

              <li
                onClick={handleRulesPageClick}
                class="nav-item mb-3 align-items-start text-start"
                style={{
                  color: 'white', // Initial color
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2FA8BA'; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white'; // Color back to original on mouse out
                }}
              >
                <FaBook
                  style={{
                    color: '#fec015',
                  }}
                />{' '}
                Rules
              </li>

              <li
                class="nav-item mb-3 align-items-start"
                style={{
                  color: 'white', // Initial color
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2FA8BA'; // Color change on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white'; // Color back to original on mouse out
                }}
                onClick={handleLogout}
              >
                <FaSignOutAlt
                  style={{
                    color: '#fec015',
                  }}
                />{' '}
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  function leftNav() {
    return (
      <>
        <div
          class="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
          style={{ width: '300px' }}
        >
          <AppDrawer showCarousel={false} isMobile={true} />
        </div>
      </>
    );
  }

  function getBody() {
    return (
      <>
        <HamburgerNavBar />
        {getNav()}
        {getRightSlider()}
        {leftNav()}
        <Outlet />
        <Login showLogin={showModalLogin} setShowLogin={setShowModalLogin} />
      </>
    );
  }

  return <>{getBody()} </>;
};

export default NavBar;
