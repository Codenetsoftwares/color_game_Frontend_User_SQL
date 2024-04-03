import React, { useState, useEffect } from 'react';
import AppDrawer from '../common/appDrawer';
import Layout from '../layout/layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from '../common/Pagination';
import { useAppContext } from '../../contextApi/context';

import { user_getBetHistory_api } from '../../utils/apiService';

const BetHistory = ({}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [betHistoryData, setBetHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(3);

  const { store } = useAppContext();
  console.log('=============> line 15 ', store.user.id);

  const marketIdFromstore = store.userTxn?.marketId ?? '';
  const gameIdFromstore = store.userTxn?.gameId ?? '66053792d1a49b35bfd975aa';

  console.log('========> GAME ID ', gameIdFromstore);

  async function handleGetHistory() {
    debugger;
    const response = await user_getBetHistory_api({
      userId: store.user.id,
      gameId: gameIdFromstore,
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

  useEffect(() => {
    handleGetHistory();
  }, [currentPage, totalItems]);
  console.log('==========> line65', betHistoryData);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEntriesChange = (event) => {
    const entries = Number(event.target.value);
    console.log('entries', entries);
    setTotalItems(entries);
    // After updating totalItems, we need to fetch data for the first page with the new number of items
    setCurrentPage(1);

    // handleGetHistory()
  };

  function history() {
    return (
      <div>
        <div className="card shadow p-3 mb-5 bg-white rounded" style={{ marginTop: '120px' }}>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>

              <div className="col-auto">&nbsp;</div>

              <div className="col">
                <div className="form-group">
                  <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>

              <div className="col-auto">&nbsp;</div>

              <div className="col">
                <div className="form-group">
                  <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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

        <div className="card shadow p-3 mb-5 bg-white rounded">
          <div class="card-header bg-primary text-white">
            <h5 class="card-title">Bet History</h5>
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
      </div>
    );
  }

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
              style={{ width: '100%' }} // Long width input box
            >
              <option>Select Market</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

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
