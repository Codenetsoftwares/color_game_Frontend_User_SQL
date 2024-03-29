import { useEffect, useState } from 'react';
import '../common.css';
import {
  user_getAllGamesWithMarketData_api,
  user_getGameWithMarketData_api,
  user_getMarketWithRunnerData_api,
} from '../../../utils/apiService';
import {
  getGameWithMarketDataInitialState,
  getMarketWithRunnerDataInitialState,
} from '../../../utils/getInitiateState';
import { useLocation } from 'react-router-dom';
import biddingButton from '../../../utils/constant/biddingButton';

function GameWithMarketList({ isSingleMarket }) {
  const [user_allGamesWithMarketData, setUser_allGamesWithMarketData] = useState([]);
  const [user_gameWithMarketData, setUser_gameWithMarketData] = useState(getGameWithMarketDataInitialState());
  const [user_marketWithRunnerData, setUser_marketWithRunnerData] = useState(getMarketWithRunnerDataInitialState());

  const [bidding, setBidding] = useState({ rate: '', amount: 0 });
  const [toggle, setToggle] = useState({
    toggleOpen: false,
    indexNo: '',
    mode: '',
    stateindex: 0,
    runnerName: '',
  });

  const handleBiddingAmount = (name, value) => {
    setBidding((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggle = (runnerid, rate, value) => {
    console.log('runnerid', runnerid, 'value', value, 'indexNo', toggle.indexNo, 'mode', toggle.mode);
    if (toggle.toggleOpen || toggle.indexNo !== runnerid) {
      setToggle({
        toggleOpen: false,
        indexNo: runnerid,
        mode: value,
      });
      handleBiddingAmount('rate', rate);
    } else if (toggle.indexNo === runnerid && toggle.mode !== value) {
      setToggle({
        toggleOpen: false,
        indexNo: runnerid,
        mode: value,
      });
      handleBiddingAmount('rate', rate);
    } else if (toggle.indexNo === runnerid && toggle.mode === value) {
      setToggle({
        toggleOpen: true,
        indexNo: runnerid,
        mode: value,
      });
      handleBiddingAmount('rate', rate);
    } else {
      setToggle({
        toggleOpen: true,
        indexNo: runnerid,
        mode: value,
      });
      handleBiddingAmount('rate', rate);
    }
  };

  const handleCancel = () => {
    handleBiddingAmount('rate', '');
    handleBiddingAmount('amount', '');
    setToggle({ toggleOpen: true });
  };

  const gameIdFromUrl = useLocation().pathname.split('/')[3];
  const marketIdFromUrl = useLocation()?.pathname?.split('-')[1]?.split('/')[1];

  useEffect(() => {
    if (marketIdFromUrl) {
      user_getMarketsWithRunnerData();
    } else if (isSingleMarket) {
      user_getGameWithMarketData();
    } else {
      user_getAllGamesWithMarketData();
    }
  }, []);

  async function user_getMarketsWithRunnerData() {
    const response = await user_getMarketWithRunnerData_api({
      marketId: marketIdFromUrl,
    });
    if (response) {
      setUser_marketWithRunnerData(response.data);
    }
  }

  async function user_getAllGamesWithMarketData() {
    const response = await user_getAllGamesWithMarketData_api();
    if (response) {
      setUser_allGamesWithMarketData(response.data);
    }
  }
  async function user_getAllGamesWithMarketData() {
    const response = await user_getAllGamesWithMarketData_api();
    if (response) {
      setUser_allGamesWithMarketData(response.data);
    }
  }

  async function user_getGameWithMarketData() {
    const response = await user_getGameWithMarketData_api({
      gameId: gameIdFromUrl,
    });
    if (response) {
      setUser_gameWithMarketData(response.data);
    }
  }

  function getMarketDetailByMarketId() {
    const handleBidding = () => {
      const nData = biddingButton.map((list) => (
        <div className={`${list.col} p-0`}>
          <button
            className={`btn btn-sm bg-white border border-2 rounded-3 col-11`}
            onClick={() => handleBiddingAmount('amount', parseInt(list.name))}
          >
            {list.name}
          </button>
        </div>
      ));

      return nData;
    };
    return (
      <div className="row p-0 m-0">
        <div className="col-12 p-1 mt-2" style={{ backgroundColor: '#a1aed4' }}>
          {user_marketWithRunnerData.marketName} | {user_marketWithRunnerData.timeSpan}
        </div>
        {user_marketWithRunnerData &&
          user_marketWithRunnerData.runners.map((runnerData) => {
            return (
              <>
                <div className="row py-1 px-0 m-0 border">
                  <span className={`col-4 text-dark text-decoration-none text-nowrap`}>
                    {runnerData.runnerName.name}
                  </span>
                  {console.log('runnerid', runnerData._id)}
                  <div
                    className="col-4"
                    style={{ backgroundColor: 'blue' }}
                    onClick={() => handleToggle(runnerData._id, runnerData.rate[0].Back, 'back')}
                  >
                    {runnerData.rate[0].Back}
                  </div>

                  <div
                    className="col-4"
                    style={{ backgroundColor: 'pink' }}
                    onClick={() => handleToggle(runnerData._id, runnerData.rate[0].Lay, 'lay')}
                  >
                    {runnerData.rate[0].Lay}
                  </div>
                </div>

                {toggle.indexNo === runnerData._id && !toggle.toggleOpen && (
                  <div style={{ background: '#c6e7ee' }}>
                    <div className="row py-1 px-0 m-0">
                      <div className="col-2">
                        <button
                          className=" btn btn-sm bg-white border border-2 rounded-3"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-4">
                        <button className="col-3 rounded-start-4" style={{ width: '18%', border: '0' }}>
                          -
                        </button>
                        <input className="col-6 " type="text" value={bidding.rate} />
                        <button className="col-3 rounded-end-3" style={{ width: '18%', border: '0' }}>
                          +
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          className={`col-3 rounded-start-3 ${bidding.amount <= 100 ? 'disabled' : ''}`}
                          style={{ width: '18%', border: '0' }}
                          onClick={() => handleBiddingAmount('amount', bidding.amount - 100)}
                        >
                          -
                        </button>
                        <input
                          className="col-6"
                          type="text"
                          value={bidding.amount}
                          onChange={(e) => handleBiddingAmount('amount', e.target.value)}
                        />
                        <button
                          className="col-3 rounded-end-3"
                          style={{ width: '18%', border: '0' }}
                          onClick={() => handleBiddingAmount('amount', bidding.amount + 100)}
                        >
                          +
                        </button>
                      </div>
                      <div className="col-2">
                        <button className="btn btn-sm bg-white border border-2 rounded-3">Place Bet</button>
                      </div>
                    </div>
                    <div className="row py-1 px-0 m-0">
                      {handleBidding()}
                      {/* <div className="col-1 position-relative">
                        <button
                          className="btn btn-sm btn-danger rounded-3 position-absolute customWidth"
                          onClick={() => handleBiddingAmount("amount", 50)}
                        >
                          50
                        </button>
                      </div>
                      <div className="col-1">
                        <button
                          className="btn btn-sm btn-danger rounded-3"
                          onClick={() => handleBiddingAmount("amount", 100)}
                        >
                          100
                        </button>{" "}
                      </div>
                      <div className="col-1">
                        <button
                          className=" btn btn-sm btn-danger rounded-3"
                          onClick={() => handleBiddingAmount("amount", 200)}
                        >
                          200
                        </button>{" "}
                      </div>
                      <div className="col-1">
                        <button
                          className="btn btn-sm btn-danger rounded-3"
                          onClick={() => handleBiddingAmount("amount", 500)}
                        >
                          500
                        </button>{" "}
                      </div>
                      <div className="col-2">
                        <button
                          className="btn btn-sm btn-danger rounded-3"
                          onClick={() => handleBiddingAmount("amount", 1000)}
                        >
                          1000
                        </button>{" "}
                      </div>
                      <div className="col-2">
                        <button
                          className="btn btn-sm btn-danger rounded-3"
                          onClick={() => handleBiddingAmount("amount", 2000)}
                        >
                          2000
                        </button>{" "}
                      </div>
                      <div className="col-2">
                        <button
                          className=" btn btn-sm btn-danger rounded-3"
                          onClick={() => handleBiddingAmount("amount", 5000)}
                        >
                          5000
                        </button>
                      </div>
                      <div className="col-2">
                        <button
                          className=" btn btn-sm btn-primary rounded-3"
                          onClick={() => handleBiddingAmount("amount", 10000)}
                        >
                          10000
                        </button>
                      </div> */}
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </div>
    );
  }

  function getSingleMarket() {
    return (
      <div className="row p-0 m-0">
        <div className="col-12 p-1 mt-2" style={{ backgroundColor: '#a1aed4' }}>
          {user_gameWithMarketData.gameName}
        </div>
        {user_gameWithMarketData &&
          user_gameWithMarketData.markets.map((marketData) => {
            return (
              <div className="row py-1 px-0 m-0 border">
                <a
                  className={`col-4 text-dark text-decoration-none text-nowrap`}
                  href={`/gameView/${user_gameWithMarketData?.gameName?.replace(
                    /\s/g,
                    '',
                  )}-${marketData?.marketName?.replace(/\s/g, '')}/${marketData?.marketId}`}
                >
                  <span>{marketData.timeSpan}</span> | <span> {marketData.marketName}</span>
                </a>

                <div className="col-8" style={{ backgroundColor: 'orange' }}>
                  col-8
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  function getWholeMarket() {
    return (
      <div className="row p-0 m-0">
        {user_allGamesWithMarketData &&
          user_allGamesWithMarketData.map((gameWithMarketData) => {
            return (
              <>
                <div className="col-12 p-1 mt-2" style={{ backgroundColor: '#a1aed4' }}>
                  {gameWithMarketData.gameName}
                </div>
                {gameWithMarketData &&
                  gameWithMarketData.markets.map((marketData) => {
                    return (
                      <div className="row py-1 px-0 m-0 border">
                        <div className="col-4">
                          <span>{marketData.timeSpan}</span> | <span> {marketData.marketName}</span>
                        </div>
                        <div className="col-8" style={{ backgroundColor: 'orange' }}>
                          col-8
                        </div>
                      </div>
                    );
                  })}
                <a
                  className={`col-12 text-dark text-decoration-none text-nowrap`}
                  href={`/gameView/${gameWithMarketData?.gameName?.replace(/\s/g, '')}/${gameWithMarketData?.gameId}`}
                  style={{ textAlign: 'right' }}
                >
                  View more
                </a>
              </>
            );
          })}
      </div>
    );
  }

  function getBody() {
    return marketIdFromUrl ? getMarketDetailByMarketId() : isSingleMarket ? getSingleMarket() : getWholeMarket();
  }

  return getBody();
}

export default GameWithMarketList;
