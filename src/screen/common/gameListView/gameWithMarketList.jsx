import { useEffect, useState } from 'react';
import '../common.css';
import {
  userBidding,
  userWallet,
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
import { useAppContext } from '../../../contextApi/context';
import strings from '../../../utils/constant/stringConstant';
import { toast } from 'react-toastify';
import Login from '../../loginModal/loginModal';

function GameWithMarketList({ isSingleMarket }) {
  const [user_allGamesWithMarketData, setUser_allGamesWithMarketData] = useState([]);
  const [user_gameWithMarketData, setUser_gameWithMarketData] = useState(getGameWithMarketDataInitialState());
  const [user_marketWithRunnerData, setUser_marketWithRunnerData] = useState(getMarketWithRunnerDataInitialState());
  const [preExposure, setPreExposure] = useState(0);
  const [newToBeDecided, setNewToBeDecided] = useState(0);
  console.log('============> line 19 game id ', user_gameWithMarketData);

  const { store, dispatch } = useAppContext();
  const [gameId, setGameId] = useState('');
  const [bidding, setBidding] = useState({ rate: '', amount: 0 });
  const [loginModal, setLoginModal] = useState(false);
  const [toggle, setToggle] = useState({
    toggleOpen: false,
    indexNo: '',
    mode: '',
    stateindex: 0,
    runnerName: '',
  });

  const gameIdFromUrl = useLocation().pathname.split('/')[3];
  const marketIdFromUrl = useLocation()?.pathname?.split('-')[1]?.split('/')[1];

  useEffect(() => {
    handleRefreshOrGetInitialData();
  }, [marketIdFromUrl]);

  function handleRefreshOrGetInitialData() {
    if (marketIdFromUrl) {
      user_getMarketsWithRunnerData();
    } else if (isSingleMarket) {
      user_getGameWithMarketData();
    } else {
      user_getAllGamesWithMarketData();
    }
  }

  const handleBiddingAmount = (name, value) => {
    setBidding((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log('bidiingAmount', bidding.amount);
  const handleToggle = (runnerid, rate, value, id) => {
    console.log('runnerid', id);
    if (toggle.toggleOpen || toggle.indexNo !== runnerid) {
      setToggle({
        toggleOpen: false,
        indexNo: runnerid,
        mode: value,
      });
      handleBiddingAmount('rate', rate);

      handleRunnerId(id);
    } else if (toggle.indexNo === runnerid && toggle.mode !== value) {
      setToggle({
        toggleOpen: false,
        indexNo: runnerid,
        mode: value,
      });

      handleBiddingAmount('rate', rate);

      handleRunnerId(id);
    } else if (toggle.indexNo === runnerid && toggle.mode === value) {
      setToggle({
        toggleOpen: true,
        indexNo: runnerid,
        mode: value,
      });

      handleBiddingAmount('rate', rate);

      handleRunnerId(id);
    } else {
      setToggle({
        toggleOpen: true,
        indexNo: runnerid,
        mode: value,
      });

      handleBiddingAmount('rate', rate);

      handleRunnerId(id);
    }
  };

  const handleCancel = () => {
    handleBiddingAmount('rate', '');
    handleBiddingAmount('amount', 0);
    setToggle({ toggleOpen: true });
  };

  const handleGameId = (id) => {
    dispatch({
      type: strings.placeBidding,
      payload: { gameId: id },
    });
  };

  const handleRunnerId = (id) => {
    dispatch({
      type: strings.placeBidding,
      payload: { runnerId: id },
    });
  };

  const handleMarketId = (id) => {
    console.log(id, '===>');
    dispatch({
      type: strings.placeBidding,
      payload: { marketId: id },
    });
  };

  console.log('store', store.placeBidding);

  // const Number(runnerData.runnerName.bal) = 0;
  // const Number(runnerData.runnerName.bal)RunnerBlue = 100;
  // const Number(runnerData.runnerName.bal)Runner2 = 100;
  console.log('mode', toggle.mode);

  function getMaxNegativeBalance(runners) {
    let maxNegativeRunner = 0;

    // Iterate through the runners
    runners.forEach((runner) => {
      if (runner.runnerName.bal < maxNegativeRunner) {
        maxNegativeRunner = runner.runnerName.bal;
      }
    });
    return maxNegativeRunner;
  }

  const winBalance = bidding.amount * (Number(bidding.rate) === 0 ? Number(bidding.rate) : Number(bidding.rate) - 1);

  async function user_getMarketsWithRunnerData() {
    dispatch({
      type: strings.isLoading,
      payload: true,
    });
    const response = await user_getMarketWithRunnerData_api({
      marketId: marketIdFromUrl,
      userId: store?.user?.id,
    });
    dispatch({
      type: strings.isLoading,
      payload: false,
    });
    if (response) {
      console.log('response===>', response.data);
      const preMaxExposure = getMaxNegativeBalance(response.data.runners);
      setPreExposure(preMaxExposure);
      setUser_marketWithRunnerData(response.data);
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

  const handleUserBidding = async () => {
    if (!store.user.isLogin) {
      setLoginModal(true);
      return;
    }

    // preExposure
    // currentBetEffectiveAmt
    // finalEffectiveAmt

    if (bidding.amount == 0 || bidding.amount < 0 || bidding.amount == '') {
      if (bidding.amount == 0) {
        toast.error('Amount can not be zero');
        return;
      }
      toast.error('Amount fields cannot be empty.');
      return;
    }

    if (
      (bidding.amount > store.user?.wallet?.balance && !(toggle.mode === 'Lay')) ||
      ((Number(bidding.rate) - 1) * bidding.amount > store.user?.wallet?.balance && !(toggle.mode === 'Back'))
    ) {
      toast.error('insufficient amount.');
      return;
    }

    const values = {
      userId: store.user.id,
      gameId: store.placeBidding.gameId,
      marketId: store.placeBidding.marketId,
      runnerId: store.placeBidding.runnerId,
      value: bidding.amount,
      bidType: toggle.mode,
      exposure: 0,
      wallet: 0
    };

    dispatch({
      type: strings.isLoading,
      payload: true,
    });

    const response = await userBidding(values, true);

    dispatch({
      type: strings.isLoading,
      payload: false,
    });

    if (response) {
      (async () => {
        dispatch({
          type: strings.isLoading,
          payload: true,
        });
        const response = await userWallet(store.user.id, true, dispatch);
        dispatch({
          type: strings.isLoading,
          payload: false,
        });
        if (response) {
          dispatch({
            type: strings.UserWallet,
            payload: {
              ...response.data,
            },
          });
          toast.info(`wallet updated ${response.message}`);
        } else {
          toast.error(`wallet updated ${response.message}`);
        }
      })();
    }
    handleCancel();
    handleRefreshOrGetInitialData();
  };

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
        <div className="row py-1 px-0 m-0 ">
          <div className="col-4"></div>
          <div className="col-4 rounded-top-3" style={{ backgroundColor: 'lightblue' }}>
            Back
          </div>
          <div className="col-4 rounded-top-3" style={{ backgroundColor: 'pink' }}>
            Lay
          </div>
        </div>

        {user_marketWithRunnerData &&
          user_marketWithRunnerData.runners.map((runnerData, index) => {
            // Determine if current row should display
            const shouldDisplayTempLay =
              toggle.mode === 'Lay' &&
              toggle.indexNo === runnerData._id &&
              (winBalance !== 0 || Number(runnerData.runnerName.bal) - Math.round(Math.abs(winBalance)) !== 0);

            const shouldDisplayTempBack =
              toggle.mode === 'Back' &&
              toggle.indexNo === runnerData._id &&
              (winBalance !== 0 || Number(runnerData.runnerName.bal) - Math.round(Math.abs(winBalance)) !== 0);
            return (
              <>
                {/* {console.log(
                  "testing==>",index,
                  Number(runnerData.runnerName.bal) -
                    Math.round(Math.abs(winBalance)) >
                    0
                )}
                {console.log(
                  "testing1==>",index,
                  Number(runnerData.runnerName.bal) +
                    Math.round(Math.abs(winBalance)) >
                    0
                )} */}
                {toggle.mode === 'Lay' ? (
                  <>
                    {/* Lay */}
                    <div className="row py-1 px-0 m-0 border">
                      <span className={`col-4 text-dark text-decoration-none text-nowrap`}>
                        {runnerData.runnerName.name}
                        <span>
                          {/* Display bidding amount if conditions met */}
                          {shouldDisplayTempLay && (
                            <>
                              {Number(runnerData.runnerName.bal) === 0 && !bidding.amount ? (
                                ''
                              ) : Number(runnerData.runnerName.bal) > 0 ? (
                                <span className="text-success fw-bold a" mx-2>
                                  +{Number(runnerData.runnerName.bal)}
                                </span>
                              ) : (
                                <>
                                  {runnerData.runnerName.bal != 0 && (
                                    <span className="text-danger fw-bold a" mx-2>
                                      {Number(runnerData.runnerName.bal)}
                                    </span>
                                  )}
                                </>
                              )}

                              {Number(runnerData.runnerName.bal) - Math.round(Math.abs(winBalance)) > 0 ? (
                                <span className=" text-success fw-bold b">
                                  {bidding.amount != 0 && (
                                    <span>
                                      ({Number(runnerData.runnerName.bal) - Math.round(Math.abs(winBalance))})
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className=" text-danger fw-bold b">
                                  {bidding.amount != 0 && (
                                    <span>
                                      ({Number(runnerData.runnerName.bal) - Math.round(Math.abs(winBalance))})
                                    </span>
                                  )}
                                </span>
                              )}
                            </>
                          )}
                        </span>
                        {/* Display hiii only if shouldDisplayTempLay flag is false */}
                        {!shouldDisplayTempLay && (
                          <>
                            {Number(runnerData.runnerName.bal) === 0 && !bidding.amount ? (
                              ''
                            ) : Number(runnerData.runnerName.bal) > 0 ? (
                              <span className="text-success fw-bold c" mx-2>
                                {bidding.amount != 0 && runnerData.runnerName.bal}(
                                {Number(runnerData.runnerName.bal) + Math.round(bidding.amount)})
                              </span>
                            ) : (
                              <span className="text-danger fw-bold c" mx-2>
                                {runnerData.runnerName.bal != 0 && bidding.amount != 0 && runnerData.runnerName.bal}

                                <span className="text-success d fw-bold">
                                  ({Number(runnerData.runnerName.bal) + Math.round(bidding.amount)})
                                </span>
                              </span>
                            )}
                          </>
                        )}
                      </span>

                      <div
                        className="col-4"
                        style={{ backgroundColor: 'lightblue' }}
                        onClick={() =>
                          handleToggle(runnerData._id, runnerData.rate[0].Back, 'Back', runnerData.runnerName.runnerId)
                        }
                        key={index}
                      >
                        {runnerData.rate[0].Back}
                        {console.log('runnerData=>>>>>', runnerData.runnerName.name)}
                      </div>

                      <div
                        className="col-4"
                        style={{ backgroundColor: 'pink' }}
                        onClick={() =>
                          handleToggle(runnerData._id, runnerData.rate[0].Lay, 'Lay', runnerData.runnerName.runnerId)
                        }
                        key={index}
                      >
                        {runnerData.rate[0].Lay}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Back */}
                    <div className="row py-1 px-0 m-0 border">
                      <span className={`col-4 text-dark text-decoration-none text-nowrap`}>
                        {runnerData.runnerName.name}
                        <span>
                          {/* Display bidding amount if conditions met */}
                          {shouldDisplayTempBack && (
                            <>
                              {Number(runnerData.runnerName.bal) && !bidding.amount ? (
                                ''
                              ) : Number(runnerData.runnerName.bal) > 0 ? (
                                <span className="text-success fw-bold d" mx-2>
                                  +{Number(runnerData.runnerName.bal)}
                                </span>
                              ) : (
                                <>
                                  {runnerData.runnerName.bal != 0 && (
                                    <span className="text-danger fw-bold d" mx-2>
                                      {Number(runnerData.runnerName.bal)}
                                    </span>
                                  )}
                                </>
                              )}

                              {Number(runnerData.runnerName.bal) + Math.round(Math.abs(winBalance)) > 0 ? (
                                <span className=" text-success  fw-bold">
                                  {bidding.amount != 0 && (
                                    <span>
                                      ({Number(runnerData.runnerName.bal) + Math.round(Math.abs(winBalance))})
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className=" text-danger fw-bold e">
                                  {bidding.amount != 0 && (
                                    <span>
                                      ({Number(runnerData.runnerName.bal) + Math.round(Math.abs(winBalance))})
                                    </span>
                                  )}
                                </span>
                              )}
                            </>
                          )}
                        </span>
                        {/* Display hiii only if shouldDisplayTempLay flag is false */}
                        {!shouldDisplayTempBack && (
                          <>
                            {Number(runnerData.runnerName.bal) === 0 && !bidding.amount ? (
                              ''
                            ) : Number(runnerData.runnerName.bal) > 0 ? (
                              <span className="text-success  fw-bold" mx-2>
                                {bidding.amount != 0 && runnerData.runnerName.bal}
                                <span
                                  className={`3 text-${Number(runnerData.runnerName.bal) - Math.round(bidding.amount) > 0
                                    ? 'success'
                                    : 'danger'
                                    } fw-bold`}
                                >
                                  ({Number(runnerData.runnerName.bal) - Math.round(bidding.amount)})
                                </span>
                              </span>
                            ) : (
                              <span className="text-danger fw-bold f" mx-2>
                                {runnerData.runnerName.bal != 0 && bidding.amount != 0 && runnerData.runnerName.bal}(
                                {Number(runnerData.runnerName.bal) - Math.round(bidding.amount)})
                              </span>
                            )}
                          </>
                        )}
                      </span>

                      <div
                        className="col-4"
                        style={{ backgroundColor: 'lightblue' }}
                        onClick={() =>
                          handleToggle(runnerData._id, runnerData.rate[0].Back, 'Back', runnerData.runnerName.runnerId)
                        }
                        key={index}
                      >
                        {runnerData.rate[0].Back}
                        {console.log('runnerData=>>>>>', runnerData.runnerName.name)}
                      </div>

                      <div
                        className="col-4"
                        style={{ backgroundColor: 'pink' }}
                        onClick={() =>
                          handleToggle(runnerData._id, runnerData.rate[0].Lay, 'Lay', runnerData.runnerName.runnerId)
                        }
                        key={index}
                      >
                        {runnerData.rate[0].Lay}
                      </div>
                    </div>
                  </>
                )}

                {toggle.indexNo === runnerData._id && !toggle.toggleOpen && (
                  <div style={{ background: '#c6e7ee' }}>
                    <div className="row py-1 px-0 m-0">
                      <div className="d-none d-sm-block d-md-block d-lg-block d-xl-block col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <button
                          className=" btn btn-sm bg-white border border-2 rounded-3"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <button className="col-3 rounded-start-4" style={{ width: '18%', border: '0' }}>
                          -
                        </button>
                        <input className="col-6 " type="number" value={bidding.rate} />
                        <button className="col-3 rounded-end-3" style={{ width: '18%', border: '0' }}>
                          +
                        </button>
                      </div>
                      <div className="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <button
                          disabled={bidding.amount == 0 ? ' disabled' : ''}
                          className={`col-3  rounded-start-3 `}
                          style={{ width: '18%', border: '0' }}
                          onClick={
                            bidding.amount >= 100
                              ? () => handleBiddingAmount('amount', Number(bidding.amount) - 100)
                              : () => handleBiddingAmount('amount', Number(bidding.amount) - Number(bidding.amount))
                          }
                        >
                          -
                        </button>
                        <input
                          className="col-6"
                          type="number"
                          value={bidding.amount}
                          onChange={(e) => handleBiddingAmount('amount', e.target.value)}
                        />
                        <button
                          className="col-3 rounded-end-3"
                          style={{ width: '18%', border: '0' }}
                          onClick={() => handleBiddingAmount('amount', Number(bidding.amount) + 100)}
                        >
                          +
                        </button>
                      </div>
                      <div className="d-none d-sm-block d-md-block d-lg-block d-xl-block col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <button
                          className="btn btn-sm bg-white border border-2 rounded-3"
                          onClick={() => handleUserBidding()}
                        >
                          Place Bet
                        </button>
                      </div>
                    </div>
                    <div className="row py-1 px-0 m-0">{handleBidding()}</div>
                    <div className="row py-1 px-0 m-0">
                      <div className="d-block col-6 d-sm-none d-md-none d-lg-none d-xl-none">
                        <button
                          className=" btn btn-sm bg-white border border-2 rounded-3 col-12"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="d-block col-6 d-sm-none d-md-none d-lg-none d-xl-none">
                        <button
                          className="btn btn-sm bg-white border border-2 rounded-3 col-12"
                          onClick={() => handleUserBidding()}
                        >
                          Place Bet
                        </button>
                      </div>
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
                  onClick={() => handleMarketId(marketData?.marketId)}
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
                  onClick={() => handleGameId(gameWithMarketData?.gameId)}
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
    return (
      <>
        {marketIdFromUrl ? getMarketDetailByMarketId() : isSingleMarket ? getSingleMarket() : getWholeMarket()}
        ; <Login showLogin={loginModal} setShowLogin={setLoginModal} />
      </>
    );
  }

  return getBody();
}

export default GameWithMarketList;
