import React from 'react';
import './gameView.css';
import Layout from '../layout/layout';
import AppDrawer from '../common/appDrawer';

const GameView = () => {
  function gamePage() {
    return (
      <AppDrawer>
        <h2>this is from game page</h2>
      </AppDrawer>
    );
  }

  function getBody() {
    return (
      <>
        <Layout />
        {gamePage()}
      </>
    );
  }

  return getBody();
};

export default GameView;
