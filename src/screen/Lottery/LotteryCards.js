import React from 'react';
import AppDrawer from '../common/appDrawer';
import { useAppContext } from '../../contextApi/context';
import Layout from '../layout/layout';
import './LotteryCards.css';
import LotteryNewPage from './LotteryNewPage';
import LotteryPage from './LotteryPage';
import { useParams } from 'react-router-dom';




const  LotteryCards = ()  => {
    const { store } = useAppContext();
    const { drawId } = useParams(); 

    function newGame(){
        return (
            <div className={`global-margin-top${store.user.isLogin ? '-logged' : ''} `}>
        <AppDrawer showCarousel={false} isMobile={false} isHomePage={true}>
         {/* <LotteryPage/> */}
         <LotteryNewPage drawId={drawId} />

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


