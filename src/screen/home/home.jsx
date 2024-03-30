import './home.css';
import { dSlider, dHitGames, sGif, fFooterI } from '../../utils/dummyData';
import { useEffect, useState } from 'react';
import HandImg from '../../asset/best_betting_image-removeBg-preview.png';
import LogoImg from '../../asset/Logo.png';
import { useAppContext } from '../../contextApi/context';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';
import AppDrawer from '../common/appDrawer';
import GameWithMarketList from '../common/gameListView/gameWithMarketList';

const Home = () => {
  const [sliderData, setSliderData] = useState(dSlider);
  const [hitGameData, setHitGameData] = useState(dHitGames);
  const [gifData, setHitGifData] = useState(sGif);
  const [footerImageData, setFooterImageData] = useState(fFooterI);

  const location = useLocation();
  const { store } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('/home');
  }, []);

  function carrousel() {
    return (
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {sliderData.map((item, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {sliderData.map((item, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={item.image} className="d-block w-100" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }

  function hitGames() {
    return (
      <>
        <br />
        <div className="card-deck">
          {hitGameData.map((item, index) => (
            <div className="card rounded-lg" key={index}>
              <img src={item.image} className="card-img-top rounded" alt={`Card ${index}`} />
            </div>
          ))}
        </div>
      </>
    );
  }

  function gif() {
    return (
      <div className="row m-0">
        {gifData.map((item, index) => (
          <div className={`col-sm-6 p-0 ${index != 0 ? 'ps-md-3' : ''}`} key={index}>
            <div className="card">
              <img
                src={item.image}
                className="card-img-top"
                alt={`Gif ${index}`}
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  function downloadApp() {
    return (
      <>
        <br />
        <div
          className="1-app"
          style={{
            backgroundColor: '#080F1C',
            color: 'white',
            paddingTop: '50px',
            paddingBottom: '50px',
          }}
        >
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img
                  src={HandImg}
                  alt="Betting Logo"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginBottom: '20px',
                  }}
                />
              </div>
              <div className="col-md-6 text-center">
                <img
                  src={LogoImg}
                  alt="App Logo"
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    marginBottom: '30px',
                  }}
                />
                <h2 style={{ color: '#FFD700', marginBottom: '20px' }}>Get in on the Action!</h2>
                <p style={{ marginBottom: '30px' }}>
                  Download our app now and enjoy the excitement of betting anytime, anywhere!
                </p>
                <button className="btn btn-warning btn-lg">Download Now</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function footer() {
    return (
      <>
        <div className="footerBox">
          <div className="container">
            <footer className="py-2 my-2">
              {footerImageData ? (
                <ul className="nav justify-content-center border-bottom pb-3 mb-2 ">
                  {footerImageData.map((image, index) => (
                    <div className="row">
                      <li className="nav-item ">
                        <img key={index} src={image.image} alt={`footer-image-${index}`} className="icontainer" />
                      </li>
                    </div>
                  ))}
                </ul>
              ) : null}
            </footer>
          </div>
          <div className="marquee">
            <marquee className="text-white fs-6">
              You must be over 18 years old, or the legal age at which gambling or gaming activities are allowed under
              the law or jurisdiction that applies to you.
            </marquee>
          </div>
        </div>
      </>
    );
  }

  function getLoginHomePage() {
    return (
      <div className="global-margin-top-logged">
        <AppDrawer showCarousel={true} isMobile={false}>
          <GameWithMarketList isSingleMarket={false} />
        </AppDrawer>
      </div>
    );
  }

  function homePage() {
    return (
      <div className="global-margin-top">
        {carrousel()}
        {hitGames()}
        {gif()}
        <GameWithMarketList isSingleMarket={false} />
        {downloadApp()}
        {footer()}
      </div>
    );
  }

  function getBody() {
    return (
      <>
        <Layout />
        {store.user.isLogin ? getLoginHomePage() : homePage()}
      </>
    );
  }

  return getBody();
};

export default Home;
