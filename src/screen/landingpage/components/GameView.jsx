import React, { useState, useEffect } from 'react';
import { marketdata } from '../../../utils/apiService';

const GameView = () => {
  const [gameList, SetGameList] = useState([]);
  const [bidding, setBidding] = useState({ rate: '', amount: 0 });
  const [toggle, setToggle] = useState({
    toggleOpen: false,
    indexNo: '',
    mode: '',
    stateindex: 0,
    runnerName: '',
  });

  async function MarketData() {
    const response = await marketdata();
    SetGameList(response.data);
  }

  console.log('first', gameList);
  useEffect(() => {
    MarketData();
  }, []);

  const handleBiddingAmount = (name, value) => {
    setBidding((prevCarouselData) => ({
      ...prevCarouselData,
      [name]: value,
    }));
  };

  const handleToggle = (runnerid, rate, value, id) => {
    console.log(
      'runnerid',
      runnerid,
      'value',
      value,
      'indexNo',
      toggle.indexNo,
      'mode',
      toggle.mode,
      'id',
      toggle.stateindex,
    );
    if (toggle.toggleOpen || toggle.indexNo !== runnerid) {
      setToggle({
        toggleOpen: false,
        indexNo: runnerid,
        mode: value,
        stateindex: id,
      });
      handleBiddingAmount('rate', rate);
    } else if (toggle.indexNo === runnerid && toggle.mode !== value) {
      setToggle({
        toggleOpen: false,
        indexNo: runnerid,
        mode: value,
        stateindex: id,
      });
      handleBiddingAmount('rate', rate);
    } else if (toggle.indexNo === runnerid && toggle.mode === value) {
      setToggle({
        toggleOpen: true,
        indexNo: runnerid,
        mode: value,
        stateindex: id,
      });
      handleBiddingAmount('rate', rate);
    } else {
      setToggle({
        toggleOpen: true,
        indexNo: runnerid,
        mode: value,
        stateindex: id,
      });
      handleBiddingAmount('rate', rate);
    }
  };

  const handleSubmit = () => {};

  const handleCancel = () => {
    handleBiddingAmount('rate', '');
    handleBiddingAmount('amount', '');
  };

  console.log(gameList);

  return (
    <div>
      {!!gameList?.length &&
        gameList?.map((game, index) => (
          <table className="table table-sm m-1">
            <thead>
              <tr key={game._id}>
                <td colSpan="12" className="bg-info">
                  {game?.gameName}
                </td>
              </tr>
            </thead>
            <tbody>
              {game?.markets?.length > 0 && (
                <tr>
                  <td colSpan="6"></td>
                  <td>1</td>
                  <td>x</td>
                  <td>2</td>
                </tr>
              )}

              {game?.markets.map((market, marketIndex) => (
                <>
                  <tr key={market?.marketId}>
                    {market.runners.length > 0 && (
                      <td colSpan="6">
                        {market?.Date}&nbsp;&nbsp;&nbsp;&nbsp;
                        {market?.marketName}
                      </td>
                    )}
                    {market?.runners?.map((runner, runnerindex) => (
                      <React.Fragment key={runner?.runnerName?.runnerId}>
                        {runner.rate.map((rate, rateIndex) => (
                          <React.Fragment key={rateIndex}>
                            <td>
                              <span
                                style={{
                                  backgroundColor: '#8ad1f2',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  width: '5rem',
                                  textAlign: 'center',
                                }}
                                onClick={() =>
                                  handleToggle(runner?.runnerName?.runnerId, rate?.Back, 'back', runnerindex)
                                }
                              >
                                {rate.Back}
                              </span>
                              &nbsp;
                              <span
                                style={{
                                  backgroundColor: '#f7bac3',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  width: '5rem',
                                  textAlign: 'center',
                                }}
                                onClick={() =>
                                  handleToggle(runner?.runnerName?.runnerId, rate?.Lay, 'lay', runnerindex)
                                }
                              >
                                {rate.Lay}
                              </span>
                            </td>
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </tr>

                  {console.log('market', market?.runners[0]?.runnerName?.runnerId)}
                  {toggle.indexNo === market?.runners[toggle.stateindex]?.runnerName?.runnerId &&
                    !toggle.toggleOpen && (
                      <>
                        <tr className="">
                          <td colSpan="6"></td>
                          {/* <td colSpan="2"></td> */}
                          <td className="">
                            <div className="d-flex justify-content-end">
                              <button className=" btn btn-secondary text-nowrap">-</button>
                              &nbsp; &nbsp; &nbsp;
                              <input type="number" className="form-control w-50" value={bidding.rate} />
                              &nbsp; &nbsp; &nbsp;
                              <button className="btn btn-secondary text-nowrap ">+</button>
                            </div>
                          </td>
                          <td className="">
                            <div className="d-flex justify-content-start">
                              <button
                                className={`btn btn-secondary text-nowrap  ${bidding.amount <= 100 ? 'disabled' : ''}`}
                                onClick={() => handleBiddingAmount('amount', bidding.amount - 100)}
                              >
                                -
                              </button>
                              &nbsp; &nbsp; &nbsp;
                              <input
                                type="number"
                                className="form-control w-50"
                                value={bidding.amount}
                                onChange={(e) => handleBiddingAmount('amount', e.target.value)}
                              />
                              &nbsp; &nbsp; &nbsp;
                              <button
                                className=" btn btn-secondary text-nowrap"
                                onClick={() => handleBiddingAmount('amount', bidding.amount + 100)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="7"></td>
                          <td>
                            <div className="d-flex justify-content-end">
                              <button
                                type="button"
                                className="btn btn-primary text-nowrap"
                                onClick={() => handleBiddingAmount('amount', 100)}
                              >
                                100
                              </button>
                              &nbsp; &nbsp; &nbsp;
                              <button
                                type="button"
                                className="btn btn-primary text-nowrap"
                                onClick={() => handleBiddingAmount('amount', 200)}
                              >
                                200
                              </button>{' '}
                              &nbsp; &nbsp; &nbsp;
                              <button
                                type="button"
                                className=" btn btn-primary text-nowrap"
                                onClick={() => handleBiddingAmount('amount', 500)}
                              >
                                500
                              </button>{' '}
                            </div>
                          </td>
                          <td className="">
                            <div className="d-flex justify-content-start">
                              {' '}
                              <button
                                type="button"
                                className="btn btn-primary text-nowrap"
                                onClick={() => handleBiddingAmount('amount', 1000)}
                                style={{ whiteSpace: 'nowrap', height: '46px' }}
                              >
                                1000
                              </button>{' '}
                              &nbsp; &nbsp; &nbsp;
                              <button
                                type="button"
                                className="btn btn-primary "
                                onClick={() => handleSubmit()}
                                style={{ whiteSpace: 'nowrap', height: '46px' }}
                              >
                                place bet
                              </button>{' '}
                              &nbsp; &nbsp; &nbsp;
                              <button
                                type="button"
                                className="btn btn-primary text-nowrap"
                                onClick={() => handleCancel()}
                                style={{ whiteSpace: 'nowrap', height: '46px' }}
                              >
                                cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                </>
              ))}
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default GameView;
