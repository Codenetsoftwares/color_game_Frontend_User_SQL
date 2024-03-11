import React, { useState, useEffect } from 'react';
import GIF1 from '../../../Asset/gifone.jpg';
import GIF2 from '../../../Asset/giftwo.jpg';
import { gifholder } from '../../../utils/apiService';
const GifHolder = () => {
  const [getgif, SetGetgif] = useState([]);
  const Gif = [GIF1, GIF2];
  async function handelgetgif() {
    const response = await gifholder();
    console.log('response handelCarousel =>>', response);
    SetGetgif(response);
    // dispatch({ type: strings.Name, payload: name });
  }

  useEffect(() => {
    handelgetgif();
  }, []);

  console.log('Gifholder', getgif);

  return (
    <div className="row m-1">
      {!!getgif?.length &&
        getgif.map((item, index) => (
          <div className=" bg-light col-lg-6 col-md-6 col-sm-12 col-12 mb-3 " key={index}>
            <div className=" d-flex justify-content-center align-items-center">
              {item.gif ? (
                <img src={item.gif} className="card-img-top img-fluid" alt={`GIF ${index + 1}`} />
              ) : (
                <img src={Gif[index]} className="card-img-top img-fluid" alt={`GIF ${index + 1}`} />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GifHolder;
