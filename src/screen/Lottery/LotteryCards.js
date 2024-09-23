import React from 'react';
import AppDrawer from '../common/appDrawer';
import { useAppContext } from '../../contextApi/context';
import LotteryPage from './LotteryPage';
import Layout from '../layout/layout';
import './LotteryCards.css';


const  LotteryCards = ()  => {
    const { store } = useAppContext();

    function newGame(){
        return (
            <div className={`global-margin-top${store.user.isLogin ? '-logged' : ''} `}>
        <AppDrawer showCarousel={true} isMobile={false} isHomePage={true}>
         <LotteryPage/>
        </AppDrawer>
      </div>
          );


    }

    function getBody() {
        return (
          <>
            <Layout/>
            {newGame()}
          </>
        );
      }

      return getBody();

}

export default LotteryCards;


