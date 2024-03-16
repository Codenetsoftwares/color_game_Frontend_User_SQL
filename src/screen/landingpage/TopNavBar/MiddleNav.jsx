import React, { useState, useRef, useEffect } from 'react';
import Logo from '../../../Asset/Logo.png';
import { useAppContext } from '../../../contextApi/context';
import strings from '../../../global/constant/stringConstant';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './Avater.css';

import LoginMain from '../../common/login';
import AlertBoxModal from './AlertBoxModal';

const MiddleNav = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShowModalLogin(true);
  const [userImage, setUserImage] = useState(null);

  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState([]);
  const { store } = useAppContext();
  const { isLogin: userIsLoginFromStore, userName: userNameFromStore } = store.user;
  console.log('==store=======>', store);
  const [loginCred, setLoginCred] = useState({ username: '', password: '' });

  const { dispatch } = useAppContext();

  const uploadImage = async () => {
    // const settings = {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // };
    // try {
    //   const response = await avaterimage();
    //   setPhoto(response);
    // } catch (e) {
    //   console.log('error', e);
    // }
  };

  useEffect(() => {
    uploadImage();
  }, []);

  const handleImageChange = (event) => {
    console.log('event++++>', event);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setUserImage(reader.result);
      console.log('urlimage====>', reader.result); //b64 string
    };
    reader.onerror = (error) => {
      console.log('error+++>', error);
    };
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
    console.log('handleiconclick+++++++>');
  };

  const handleLogoutClick = () => {
    setShow(true);
    // dispatch({
    //   type: strings.LOG_OUT,
    //   payload: { isLogin: false },
    // });
  };

  return (
    <div
      className="card border-0 rounded-0"
      style={{
        backgroundImage: 'linear-gradient(to top, #1AA0D1 4%, #044469 92%)',
      }}
    >
      <div className="card-body p-0">
        <div className="d-flex bd-highlight">
          {/* main logo */}
          <div className="p-2 w-100 bd-highlight">
            <img src={Logo} style={{ width: '150px' }} alt="" />
          </div>

          {/* user is not login */}
          <div className="m-3 flex-shrink-1 bd-highlight" style={{ cursor: 'pointer' }}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>

          {/* user is login */}
          {userIsLoginFromStore ? (
            <div className="m-3 flex-shrink-1 bd-highlight" style={{ cursor: 'pointer' }}>
              <div className="border border-1 rounded p-1 ps-3 d-flex align-items-center">
                {userImage ? (
                  <img
                    src={userImage}
                    alt="User"
                    className="Imageuser" //normal css add
                  />
                ) : (
                  userNameFromStore && (
                    <span
                      className="Avater" // normal css add
                      onClick={handleIconClick}
                    >
                      {userNameFromStore.charAt(0)}
                    </span>
                  )
                )}
                <FaSignOutAlt
                  style={{ fontSize: '25px', color: 'white' }} /////do work here
                  onClick={handleLogoutClick}
                />
              </div>
            </div>
          ) : (
            <div className="m-3 flex-shrink-1 bd-highlight" style={{ cursor: 'pointer' }}>
              <button
                className="btn rounded text-white "
                style={{
                  backgroundImage: 'linear-gradient(to top, #044469 4%, #1AA0D1 92%)',
                  width: '5rem',
                  border: '1px solid white',
                  borderRadius: '25px',
                }}
                type="button"
                onClick={handleShow}
              >
                LOG IN
              </button>
            </div>
          )}
        </div>
      </div>

      {/* login modal */}
      <LoginMain showLogin={showModalLogin} setShowLogin={setShowModalLogin} />
      {/* AlertModal */}
      <AlertBoxModal showAlertBoxModal={show} setShowAlertBoxModal={setShow} />
    </div>
  );
};

export default MiddleNav;
