import React, { useState, useEffect } from 'react';
import AVIATOR from '../../../Asset/AVIATOR.png';
import HORSE from '../../../Asset/hORSE.png';
import CLUB from '../../../Asset/Red Abstract Income Money YouTube Thumbnail.png';
import './HitGames.css';
import { gethitgame } from '../../../utils/apiService';

const HitGames = () => {
  // states
  const [hitgame, SetHitgame] = useState([]);
  const [isModal, setIsModal] = useState(true);

  const HitGames = [HORSE, AVIATOR, CLUB];

  async function handelHitgame() {
    const response = await gethitgame();
    console.log('response handelHitgame =>>', response);
    SetHitgame(response);
  }

  useEffect(() => {
    handelHitgame();
  }, []);

  console.log('=========> hitgame', hitgame);
  return (
    <div className="row m-1 d-flex">
      {hitgame &&
        hitgame.length > 0 &&
        hitgame.map((item, index) => (
          <div className="col-4 col-sm-12 col-md-4 " data-bs-toggle="modal" data-bs-target="#exampleModal">
            {item.image ? (
              <img key={item.id} src={item.image} alt={`Image ${item.image}`} className="card-img-top" />
            ) : (
              <img key={item.id} src={HitGames[index]} alt={`Image ${item.image}`} className="card-img-top" />
            )}
          </div>
        ))}
      {/* {isModal && <Login setIsModal={setIsModal} />} */}
    </div>
  );
};

export default HitGames;
