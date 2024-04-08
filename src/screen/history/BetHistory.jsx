import React, { useState, useEffect } from 'react';
import AppDrawer from '../common/appDrawer';
import Layout from '../layout/layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from '../common/Pagination';
import { useAppContext } from '../../contextApi/context';

import {
  getDataFromHistoryLandingPage,
  user_getBackLayData_api,
  user_getBetHistory_api,
  user_getOpenBetData_api,
  // user_getOpenBetmarket_api,
} from '../../utils/apiService';

const BetHistory = ({}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [betHistoryData, setBetHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(3);
  const [openBet, setOpenBet] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState('Select Market');

  const [bidding, setBidding] = useState({ rate: '', amount: 0 });
  const [marketSelectionbetHistory, setMarketSelectionbetHistory] = useState([]); // from dummy data into bet history selection
  const [openBetSelectionbetHistory, setopenBetSelectionbetHistory] = useState([]); // from dummy data into open bet selection

  const [selectedOptions, setSelectedOptions] = useState({
    select1: '',
    select2: '',
    select3: '',
  });
  const [fetchData, setFetchData] = useState(true);
  const { store } = useAppContext();
  console.log('=============> line 15 ', store.user.id);

  // static market id and game id
  const marketIdFromstore = store.userTxn?.marketId ?? '65f84911143d9f19ac0ded85';
  const gameIdFromstore = store.userTxn?.gameId ?? '66053792d1a49b35bfd975aa';

  console.log('========> GAME ID ', gameIdFromstore);

  // the api called for bet history data
  async function handleGetHistory() {
    if (Object.values(selectedOptions).some((option) => option === '' || option === 'Open this select menu')) {
      setFetchData(false);
      return; // If any select has this option selected, exit function
    }

    setFetchData(true);
    const response = await user_getBetHistory_api({
      // userId: store.user.id,
      marketId: marketIdFromstore,
      pageNumber: currentPage,
      dataLimit: totalItems,
    });
    if (response) {
      console.log('response for betHistoryData ', response);
      setBetHistoryData(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalItems(response.pagination.totalItems);
    } else {
      //add loading part //
    }
    console.log('From:', startDate);
    console.log('To:', endDate);
  }
  // useeffect for bet history data
  useEffect(() => {
    handleGetHistory();
  }, [currentPage, totalItems]);
  console.log('==========> line65', betHistoryData);

  // pagination handlechange (to be solved later )
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // entries for no. of entries for pagination
  const handleEntriesChange = (event) => {
    const entries = Number(event.target.value);
    console.log('entries', entries);
    setTotalItems(entries);
    // After updating totalItems, we need to fetch data for the first page with the new number of items
    setCurrentPage(1);

    // handleGetHistory()
  };

  //for open bet data that is not in use now

  // async function handleGetBet() {
  //   const response = await user;
  //   if (response) {
  //     console.log("===========>response for betOpenBetData(Line 76)", response);
  //     setOpenBet(response.data);
  //   } else {
  //     //add loading part //
  //   }
  //   console.log("From:", startDate);
  //   console.log("To:", endDate);
  // }

  // useeffect for  open bets selection input box only

  // useEffect(() => {
  //   handleGetBet();
  // }, []);

  //dummy sata response which has to be replaced by actual api for both open bets and bet history
  async function handleGetDummyData() {
    const response = await getDataFromHistoryLandingPage();
    if (response) {
      console.log('===========>response for betOpenBetDataSelect and marketname(Line 237)', response);
      setMarketSelectionbetHistory(response.data.betHistory);
      setopenBetSelectionbetHistory(response.data.currentMarket);
    } else {
      //add loading part //
    }
    console.log('From:', startDate);
    console.log('To:', endDate);
  }
  // useeffect for bet history and open bets selection input boxes only
  useEffect(() => {
    handleGetDummyData();
  }, []);
  console.log('=========> marketSelectionbetHistory line 108', marketSelectionbetHistory);
  console.log('=========> openBetSelectionbetHistor line 109', openBetSelectionbetHistory);

  // this is for open bets selection onchnage
  const handleSelectChange = (e) => {
    setSelectedMarket(e.target.value);
  };

  const handleGetHistoryChange = (e, selectName) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [selectName]: e.target.value,
    }));
  };

  // this is back lay open bets data but this api needs to be updated
  async function handleGetData() {
    const response = await user_getBackLayData_api({
      marketId: marketIdFromstore,
    });
    if (response) {
      console.log('===========>response for betOpenBetData(Line 237)', response);
      // setOpenBet(response.data);
    } else {
      //add loading part //
    }
    console.log('From:', startDate);
    console.log('To:', endDate);
  }
  // this is useEffect for  back lay open bets data but this api needs to be updated
  useEffect(() => {
    handleGetData();
  }, []);

  // this is the complete get history selection card with bet history data table
  function history() {
    return (
      <div>
        <div className="card shadow p-3 mb-5 bg-white rounded" style={{ marginTop: '120px' }}>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    value={selectedOptions.select1}
                    onChange={(e) => handleGetHistoryChange(e, 'select1')}
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">OLD DATA</option>
                    {/* <option value="2">Two</option> */}
                    {/* <option value="3">Three</option> */}
                  </select>
                </div>
              </div>

              <div className="col-auto">&nbsp;</div>

              <div className="col">
                <div className="form-group">
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    value={selectedOptions.select2}
                    onChange={(e) => handleGetHistoryChange(e, 'select2')}
                  >
                    <option selected>Open this select menu</option>
                    {marketSelectionbetHistory.map((market, index) => (
                      <option key={index} value={market.marketId}>
                        {market.marketName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-auto">&nbsp;</div>

              <div className="col">
                <div className="form-group">
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    value={selectedOptions.select3}
                    onChange={(e) => handleGetHistoryChange(e, 'select3')}
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">SETTLE</option>
                    {/* <option value="2">Two</option> */}
                    {/* <option value="3">Three</option> */}
                  </select>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col">
                <div className="form-group">
                  <label>From:</label>
                  <div className="input-group" style={{ maxWidth: '100%' }}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MM/dd/yyyy"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>To:</label>
                  <div className="input-group" style={{ maxWidth: '100%' }}>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="MM/dd/yyyy"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <button className="btn btn-primary" onClick={handleGetHistory}>
                  Get History
                </button>
              </div>
            </div>
          </div>
        </div>

        {fetchData && (
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title">Bet History</h5>
            </div>
            <div className="card-body">
              {/* Show entries dropdown */}
              <div className="mb-3">
                <label htmlFor="showEntriesDropdown" className="form-label">
                  Show entries
                </label>
                <select
                  className="form-select"
                  id="showEntriesDropdown"
                  value={totalItems}
                  onChange={handleEntriesChange}
                >
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div style={{ overflow: 'auto' }}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Game Name</th>
                      <th scope="col">Market Name</th>
                      <th scope="col">Runner Name</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Value</th>
                      <th scope="col">Type</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {betHistoryData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.gameName}</td>
                        <td>{item.marketName}</td>
                        <td>{item.runnerName}</td>
                        <td>{item.rate}</td>
                        <td>{item.value}</td>
                        <td>{item.type}</td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                startIndex={(currentPage - 1) * totalItems + 1}
                endIndex={Math.min(currentPage * totalItems, totalItems)}
                totalData={totalItems}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // this is the open bets section with selection with conditinally rendering back and lay table data with market selection
  function openBets() {
    return (
      <div className="card" style={{ marginTop: '120px', height: '800px' }}>
        <div className="card-header bg-primary text-white">
          <h5 className="card-title">Open Bets</h5>
        </div>
        <div className="card-body">
          <div className="form-group">
            <select
              className="form-select form-select-lg"
              id="selectMarket"
              style={{ width: '100%' }}
              onChange={handleSelectChange}
            >
              <option>Select Market</option>
              {openBetSelectionbetHistory.map((item, index) => (
                <option key={index} value={item.marketId}>
                  {item.marketName}
                </option>
              ))}
            </select>
          </div>

          {/* Render back table if market is selected */}
          {selectedMarket !== 'Select Market' && (
            <>
              {renderBackTable()}
              {renderLayTable()}
            </>
          )}
        </div>
      </div>
    );
  }
  // Function to render back table called in open bets function
  const renderBackTable = () => {
    // Render back table based on selected market

    return (
      <div className="card shadow p-3 mb-5  rounded" style={{ backgroundColor: '#cfe2f3' }}>
        <div className="card-body">
          <table className="table">
            {/* Table header */}
            <thead>
              <tr>
                <th>Back(Bet For)</th>
                <th>Odds</th>
                <th>Stake</th>
                <th>Profit</th>
              </tr>
            </thead>
            {/* Table body - data to be filled dynamically */}
            <tbody>
              {/* Insert rows for back bets */}
              {openBet
                .filter((item) => item.marketName === selectedMarket && item.type === 'Lay')
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.runnerName}</td>
                    <td>{item.rate}</td>
                    <td>{item.value}</td>
                    <td>Calculate liability here</td> {/* You need to calculate liability */}
                  </tr>
                ))}

              {/* <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  // Function to render lay table  called in open bets function
  const renderLayTable = () => {
    // Render lay table based on selected market
    return (
      <div className="card shadow p-3 mb-5  rounded" style={{ backgroundColor: '#f8d7da' }}>
        <div className="card-body">
          <table className="table">
            {/* Table header */}
            <thead>
              <tr>
                <th>Lay(Bet Against)</th>
                <th>Odds</th>
                <th>Stake</th>
                <th>Liability</th>
              </tr>
            </thead>
            {/* Table body - data to be filled dynamically */}
            <tbody>
              {/* Insert rows for lay bets */}
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  function getBody() {
    return (
      <>
        <div className="row">
          <div className="col-lg-9">{history()}</div>

          <div className="col-lg-3">{openBets()}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <AppDrawer showCarousel={false}>
        <Layout />
        {getBody()}
      </AppDrawer>
    </>
  );
};

export default BetHistory;
