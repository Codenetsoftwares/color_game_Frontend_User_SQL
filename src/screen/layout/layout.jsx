import { useEffect, useState } from 'react';
import { useAppContext } from '../../contextApi/context';
import NavBar from '../common/navBar';
import { user_getAllGames } from '../../utils/apiService';
import { getUser_allGames_I_state } from '../../utils/getInitiateState';

function Layout() {
  const [user_allGames, setUser_allGames] = useState([]);
  const appDrawerFromStore = useAppContext();

  // get all game data for from backend to display in navbar
  useEffect(async () => {
    const response = await user_getAllGames();
    if (response) {
      setUser_allGames(response.data);
    }
  }, []);

  // get option for navbar
  function getNavBarOption() {
    return <ul>{user_allGames.map((gameObj, index) => <li key={index}>{gameObj.gameName}</li>)}</ul>;
  }

  return (
    <>
      <NavBar />
      {/* {getNavBarOption()} */}
    </>
  );
}

export default Layout;
