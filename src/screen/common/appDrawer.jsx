import React, { useState } from 'react';
import HamburgerNavBar from './HamburgerNavBar';
// import "./common.css";

function AppDrawer({ children, showCarousel, isMobile }) {
  const [isActive, setIsActive] = useState(false);

  function getLeftNavBar() {
    return (
      <div className="sidebar" style={{ overflowY: 'auto', height: '100vh' }}>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Lorem</a>
          </li>
          <li>
            <a href="#">Ipsum</a>
          </li>
          <li>
            <a href="#">Dolor</a>
          </li>
          <li>
            <a href="#">Sit</a>
          </li>
          <li>
            <a href="#">Amet</a>
          </li>
          <li>
            <a href="#">Consectetur</a>
          </li>
          <li>
            <a href="#">Adipiscing</a>
          </li>
          <li>
            <a href="#">Elit</a>
          </li>
          <li>
            <a href="#">Sed</a>
          </li>
          <li>
            <a href="#">Do</a>
          </li>
          <li>
            <a href="#">Eiusmod</a>
          </li>
          <li>
            <a href="#">Tempor</a>
          </li>
          <li>
            <a href="#">Incididunt</a>
          </li>
          <li>
            <a href="#">Labore</a>
          </li>
          <li>
            <a href="#">Et</a>
          </li>
          <li>
            <a href="#">Dolore</a>
          </li>
          <li>
            <a href="#">Magna</a>
          </li>
          <li>
            <a href="#">Aliqua</a>
          </li>
          <li>
            <a href="#">Ut</a>
          </li>
          <li>
            <a href="#">Enim</a>
          </li>
          <li>
            <a href="#">Ad</a>
          </li>
          <li>
            <a href="#">Minim</a>
          </li>
          <li>
            <a href="#">Veniam</a>
          </li>
          <li>
            <a href="#">Quis</a>
          </li>
          <li>
            <a href="#">Nostrud</a>
          </li>
          <li>
            <a href="#">Exercitation</a>
          </li>
          <li>
            <a href="#">Ullamco</a>
          </li>
          <li>
            <a href="#">Laboris</a>
          </li>
          <li>
            <a href="#">Nisi</a>
          </li>
          <li>
            <a href="#">Aliquip</a>
          </li>
          <li>
            <a href="#">Ex</a>
          </li>
          <li>
            <a href="#">Commodo</a>
          </li>
          <li>
            <a href="#">Consequat</a>
          </li>
          <li>
            <a href="#">Duis</a>
          </li>
          <li>
            <a href="#">Aute</a>
          </li>
          <li>
            <a href="#">Iure</a>
          </li>
          <li>
            <a href="#">Reprehenderit</a>
          </li>
          <li>
            <a href="#">Voluptate</a>
          </li>
          <li>
            <a href="#">Velit</a>
          </li>
          <li>
            <a href="#">Esse</a>
          </li>
          <li>
            <a href="#">Cillum</a>
          </li>
          <li>
            <a href="#">Fugiat</a>
          </li>
          <li>
            <a href="#">Nulla</a>
          </li>
          <li>
            <a href="#">Pariatur</a>
          </li>
          <li>
            <a href="#">Excepteur</a>
          </li>
          <li>
            <a href="#">Sint</a>
          </li>
          <li>
            <a href="#">Occaecat</a>
          </li>
          <li>
            <a href="#">Cupidatat</a>
          </li>
          <li>
            <a href="#">Non</a>
          </li>
          <li>
            <a href="#">Proident</a>
          </li>
          <li>
            <a href="#">Sunt</a>
          </li>
          <li>
            <a href="#">In</a>
          </li>
          <li>
            <a href="#">Culpa</a>
          </li>
          <li>
            <a href="#">Qui</a>
          </li>
          <li>
            <a href="#">Officia</a>
          </li>
          <li>
            <a href="#">Deserunt</a>
          </li>
          <li>
            <a href="#">Mollit</a>
          </li>
          <li>
            <a href="#">Anim</a>
          </li>
          <li>
            <a href="#">Id</a>
          </li>
          <li>
            <a href="#">Est</a>
          </li>
          <li>
            <a href="#">Laborum</a>
          </li>
        </ul>
      </div>
    );
  }

  function getMidCarousel() {
    return (
      <>
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner ">
            <div class="carousel-item active">
              <img
                src="https://images.news18.com/ibnlive/uploads/2024/03/the-carnival-of-cricket-ipl-2024-begins-friday-in-chennai-2024-03-57866b703b220dfd84e70329b271fbd8-3x2.jpg"
                class="d-block w-100"
                alt="..."
                //   style={{ height: "300px", objectfit: "cover" }}
                style={{ height: '300px', objectfit: 'contain' }}
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://www.hindustantimes.com/ht-img/img/2024/01/14/550x309/TOPSHOT-TENNIS-AUS-OPEN-33_1705249861778_1705249942860.jpg"
                class="d-block w-100"
                alt="..."
                //   style={{ height: "300px", objectfit: "cover" }}
                style={{ height: '300px', objectfit: 'contain' }}
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://assets-webp.khelnow.com/d7293de2fa93b29528da214253f1d8d0/640x360/news/uploads/2024/02/football-lead-pic.jpg.webp"
                class="d-block w-100"
                alt="..."
                //   style={{ height: "300px", objectfit: "cover" }}
                style={{ height: '300px', objectfit: 'contain' }}
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
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
            className="col-md-2 position-fixed d-none d-md-block vertical-navbar"
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

  return (
    <div>
      {getBody()}
      <HamburgerNavBar />
    </div>
  );
}
export default AppDrawer;
