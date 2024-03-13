import React, { useState } from "react";
import { login } from "../../utils/apiService";
import strings from "../../global/constant/stringConstant";
import { useAppContext } from "../../contextApi/context";
import { name } from "../../utils/apiService";
import Carousel from "./components/Carousel";
import HitGames from "./components/HitGames";
import GifHolder from "./components/GifHolder";
import GameView from "./components/GameView";
import Footer from "./components/Footer";

const LandingPage = () => {
  const { dispatch, store } = useAppContext();
  console.log("store", store);

  return (
    <div className="bg-light">
      <Carousel />
      <HitGames />
      {/* <GifHolder /> */}
      <GameView />
      {/* <Footer/> */}
    </div>
  );
};

export default LandingPage;
