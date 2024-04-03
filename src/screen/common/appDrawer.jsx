import React, { useState, useEffect } from 'react';
import './appDrawer.css';
import { user_getAllGamesWithMarketData_api } from '../../utils/apiService';
import { Link } from 'react-router-dom';
import { getAllGameDataInitialState } from '../../utils/getInitiateState';
import HamburgerNavBar from './hamburgerNavBar';
import { useAppContext } from '../../contextApi/context';
import strings from '../../utils/constant/stringConstant';
// import "./common.css";

function AppDrawer({ children, showCarousel, isMobile }) {
  const [toggleStates, setToggleStates] = useState({});
  const [user_allGames, setUser_allGames] = useState(getAllGameDataInitialState());
  const { dispatch } = useAppContext();

  useEffect(() => {
    user_getAllGames();
  }, []);

  const handleAllId = (gameId, marketId) => {
    dispatch({
      type: strings.placeBidding,
      payload: { gameId: gameId, marketId: marketId },
    });
  };

  async function user_getAllGames() {
    const response = await user_getAllGamesWithMarketData_api();
    if (response) {
      setUser_allGames(response.data);
    }
  }

  const handleToggle = (index) => {
    setToggleStates((prevState) => ({
      [index]: !prevState[index],
    }));

    if (isMobile) {
      // close app drawer logic should call here
    }
  };

  function getLeftNavBar() {
    return (
      <div className="sidebar" style={{ overflowY: 'auto', height: '100vh' }}>
        <span
          style={{
            background: '#2cb3d1',
            display: 'block',
            textIndent: '5px',
            fontWeight: '500',
            fontSize: '14px',
          }}
          className="text-white"
        >
          Popular{' '}
          <button
            type="button"
            className="btn-close d-xl-none d-lg-none "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            style={{ marginLeft: '70%' }}
          />
        </span>

        <ul>
          <li className={toggleStates['inPlay'] ? 'subMenuHead' : 'MenuHead'} onClick={() => handleToggle('inPlay')}>
            <a href="#">In-Play</a>
          </li>
          {user_allGames.map((gameObj, index) => (
            <React.Fragment key={index}>
              <li className={toggleStates[index] ? 'subMenuHead' : 'MenuHead'} onClick={() => handleToggle(index)}>
                <Link>{gameObj.gameName}</Link>
              </li>
              {/* Mapping over markets inside each gameName */}
              {toggleStates[index] && gameObj.markets.length > 0
                ? gameObj.markets.map((marketObj, marketIndex) => (
                    <li
                      className="subMenuItems"
                      key={marketIndex}
                      onClick={() => handleAllId(gameObj?.gameId, marketObj?.marketId)}
                    >
                      <Link
                        to={`/gameView/${gameObj?.gameName?.replace(/\s/g, '')}-${marketObj?.marketName?.replace(
                          /\s/g,
                          '',
                        )}/${marketObj?.marketId?.replace(/\s/g, '')}`}
                      >
                        {marketObj.marketName}
                      </Link>
                    </li>
                  ))
                : null}
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }

  function getMidCarousel() {
    return (
      <>
        <div id="carouselExampleAutoPlaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner ">
            <div class="carousel-item active">
              <img
                src="https://images.news18.com/ibnlive/uploads/2024/03/the-carnival-of-cricket-ipl-2024-begins-friday-in-chennai-2024-03-57866b703b220dfd84e70329b271fbd8-3x2.jpg"
                class="d-block w-100"
                alt="..."
                style={{ height: '300px' }}
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://www.hindustantimes.com/ht-img/img/2024/01/14/550x309/TOPSHOT-TENNIS-AUS-OPEN-33_1705249861778_1705249942860.jpg"
                class="d-block w-100"
                alt="..."
                //   style={{ height: "300px", objectFit: "cover" }}
                style={{ height: '300px' }}
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://assets-webp.khelnow.com/d7293de2fa93b29528da214253f1d8d0/640x360/news/uploads/2024/02/football-lead-pic.jpg.webp"
                class="d-block w-100"
                alt="..."
                //   style={{ height: "300px", objectFit: "cover" }}
                style={{ height: '300px' }}
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoPlaying"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoPlaying"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </>
    );
  }

  function getBody() {
    return isMobile ? (
      getLeftNavBar()
    ) : (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-2 position-fixed d-none d-md-block vertical-navbar p-0"
            style={{ border: '1px solid red', height: '100vh' }}
          >
            {getLeftNavBar()}
          </div>
          <div
            className="col-md-10 offset-md-2"
            style={{
              border: '1px solid red',
              height: '100vh',
              overflowY: 'auto',
            }}
          >
            <div className="col-md-12" style={{ background: 'green', overflowX: 'auto' }}>
              {showCarousel && getMidCarousel()}
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return <div>{getBody()}</div>;
}
export default AppDrawer;
