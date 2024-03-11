import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AllGames } from '../../../utils/apiService';

const Navbar = () => {
  const [gameName, setGameName] = useState([]);
  const navigate = useNavigate();

  async function getGameName() {
    const response = await AllGames();
    setGameName(response);
  }

  useEffect(() => {
    getGameName();
  }, []);

  const handelNavigate = (games) => {
    navigate(`game/${games.GameName}/${games.id}`);
  };

  console.log('gameName from NavBar=>', gameName);
  return (
    <nav class="navbar navbar-expand-lg navbar-light p-0" style={{ backgroundColor: '#066196' }}>
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active text-white font-weight-bold" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active text-white font-weight-bold" tabindex="-1" aria-disabled="true" to="/inplay">
                In PLay
              </Link>
            </li>
            {gameName && gameName.length > 0
              ? gameName.map((games, index) => (
                  <li
                    class="nav-item nav-link active text-white font-weight-bold"
                    onClick={() => {
                      handelNavigate(games);
                    }}
                  >
                    {games.GameName}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
