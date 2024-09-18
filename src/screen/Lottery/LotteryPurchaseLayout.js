import React from 'react'
import { useAppContext } from '../../contextApi/context'
import LotteryPurchaseHistory from './LotteryPurchaseHistory';
import Layout from '../layout/layout';
import AppDrawer from '../common/appDrawer';


const LotteryPurchaseLayout = () => {
    const { store } = useAppContext();
 
    function ticketHistory(){
        return (
            <div className={`global-margin-top${store.user.isLogin ? '-logged' : ''} `}>
        <AppDrawer showCarousel={false} isMobile={false} isHomePage={true}>
         <LotteryPurchaseHistory/>
        </AppDrawer>
      </div>
          );


    }

    function getBody() {
        return (
          <>
            <Layout/>
            {ticketHistory()}
          </>
        );
      }

      return getBody();

  
}

export default LotteryPurchaseLayout