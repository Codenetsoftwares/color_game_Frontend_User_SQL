import React, { useState, useEffect } from 'react';
import { footer, footerwarning } from '../../../utils/apiService';
import './Footer.css';

const Footer = () => {
  const [footerimage, SetFooterimage] = useState([]);
  const [warning, SetWarning] = useState('');

  async function handelgetfooterimage() {
    const response = await footer();
    // console.log("response line 12 footer image  =>>", response);
    SetFooterimage(response);
  }

  async function HandleWarning() {
    const response = await footerwarning();
    // console.log("Response for footer warning", response);
    SetWarning(response[0].data);
  }

  useEffect(() => {
    handelgetfooterimage();
    HandleWarning();
  }, []);
  // console.log("==================footer image ---line 21 ", footerimage);
  return (
    <footer style={{ backgroundColor: '#57b088', padding: '10px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!!footerimage.length &&
          footerimage.map((image, index) => (
            <img
              key={index}
              src={image.image}
              alt={`footer-image-${index}`}
              style={{ margin: '5px', width: '100px', height: 'auto' }}
            />
          ))}
      </div>

      <p
        style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
        }}
      ></p>

      <marquee class="text-white fs-6">{warning}</marquee>
    </footer>
  );
};

export default Footer;
