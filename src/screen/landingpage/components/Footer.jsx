import React, { useState, useEffect } from "react";
import { footer, footerwarning } from "../../../utils/apiService";
import "./Footer.css";
const Footer = () => {
  const [footerimage, SetFooterimage] = useState([]);
  const [warning, SetWarning] = useState("");
  const dummydata = [
    {
      image:
        "https://cdn.vectorstock.com/i/preview-1x/07/15/bet-logo-bookmaker-sport-betting-gambling-game-vector-49290715.jpg",
    },
    {
      image:
        "https://cdn.vectorstock.com/i/preview-1x/95/87/online-sports-betting-poster-banner-design-vector-24059587.webp",
    },
  ];
  const dummywarning = [
    {
      data: "You must be over 18 years old, or the legal age at which gambling or gaming activities are allowed under the law or jurisdiction that applies to you.",
    },
  ];
  async function handelgetfooterimage() {
    const response = await footer();
    if (!response) {
      SetFooterimage(dummydata);
      // will be updated after updating api
    }
    // console.log("response line 12 footer image  =>>", response);
    SetFooterimage(response);
  }
  async function HandleWarning() {
    const response = await footerwarning();
    if (!response) {
      SetWarning(dummywarning[0].data);
      // will be updated after updating api
    }
    else {
      
      SetWarning(response[0].data);
    }
    // console.log("Response for footer warning", response);
  }
  useEffect(() => {
    handelgetfooterimage();
    HandleWarning();
  }, []);
  // console.log("==================footer image ---line 21 ", footerimage);
  return (
    <>
      <div className="footerBox">
        <div className="container">
          <footer className="py-2 my-3">
            {footerimage ? (
              <ul className="nav justify-content-center border-bottom pb-3 mb-3 ">
                {footerimage.map((image, index) => (
                  // <div className='row'>
                  <li className="nav-item col-md-1 col-sm-1 col-1">
                    <img
                      key={index}
                      src={image.image}
                      alt={`footer-image-${index}`}
                      className="imagecontainer"
                    />
                  </li>
                  // </div>
                ))}
              </ul>
            ) : null}
            {/* <p className="text-center text-muted">© 2022 Company, Inc</p> */}
          </footer>
        </div>
        <div className="marquee">
          {warning ? (
            <marquee className="text-white fs-6">{warning}</marquee>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Footer;