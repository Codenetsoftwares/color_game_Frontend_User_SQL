import React, { useState, useEffect } from 'react';
import Img1 from '../../../Asset/What.png';
import Img2 from '../../../Asset/casino.jpg';
import Img3 from '../../../Asset/horsee.png';
import Img4 from '../../../Asset/roulette_casino.jpg';
import { getcarrousel } from '../../../utils/apiService';
import { useAppContext } from '../../../contextApi/context';
import strings from '../../../global/constant/stringConstant';

const Carousel = () => {
  const [carrouselImg, SetCarrouselImg] = useState([]);
  const Img = [Img2, Img3, Img4, Img1];

  const { dispatch } = useAppContext();

  async function handelCarousel(value) {
    const response = await getcarrousel(value, true);
    console.log('response handelCarousel  line 18 =>>', response);
    if (response) {
      SetCarrouselImg(response.data);
    }
  }

  // async function handelCarousel() {
  //   try {
  //     const response = await getcarrousel(true);
  //     console.log('response handelCarousel  line 18 =>>', response);
  //     if (response && response.data) {
  //       SetCarrouselImg(response.data);
  //     } else {
  //       // Handle unexpected response format from backend
  //       console.error('Unexpected response format from backend line 32 :', response);
  //     }
  //   } catch (error) {
  //     // Handle network errors or errors from backend
  //     console.error('Error fetching carousel data 36 :', error);

  //   }
  // }

  useEffect(() => {
    handelCarousel();
  }, []);

  console.log('carrouselImg ===========> Line 23', carrouselImg);
  return (
    <div>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {!!carrouselImg.length &&
            carrouselImg.map((item, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index} data-bs-interval="2000">
                {item.image ? (
                  <img src={item.image} className="d-block w-100" alt="..." style={{ height: '85vh' }} />
                ) : (
                  <img src={Img[index]} className="d-block w-100" alt="..." style={{ height: '50vh' }} />
                )}
              </div>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
