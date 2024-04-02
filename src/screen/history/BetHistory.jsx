import React, { useState } from 'react';
import AppDrawer from '../common/appDrawer';
import Layout from '../layout/layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from '../common/Pagination';

const BetHistory = ({ currentPage, totalPages, handlePageChange, startIndex, endIndex, totalData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleGetHistory = () => {
    console.log('From:', startDate);
    console.log('To:', endDate);
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
            <div class="dropdown mb-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="showEntriesDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Show entries
              </button>
              <div class="dropdown-menu" aria-labelledby="showEntriesDropdown">
                <a class="dropdown-item">10</a>
                <a class="dropdown-item">25</a>
                <a class="dropdown-item">50</a>
                <a class="dropdown-item">100</a>
              </div>
            </div>

            <div style={{ overflow: 'auto' }}>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Column 1</th>
                    <th scope="col">Column 2</th>
                    <th scope="col">Column 3</th>
                    <th scope="col">Column 4</th>
                    <th scope="col">Column 5</th>
                    <th scope="col">Column 6</th>
                    <th scope="col">Column 7</th>
                    <th scope="col">Column 8</th>
                    <th scope="col">Column 9</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Row 1 Data 1</td>
                    <td>Row 1 Data 2</td>
                    <td>Row 1 Data 3</td>
                    <td>Row 1 Data 4</td>
                    <td>Row 1 Data 5</td>
                    <td>Row 1 Data 6</td>
                    <td>Row 1 Data 7</td>
                    <td>Row 1 Data 8</td>
                    <td>Row 1 Data 9</td>
                  </tr>
                  <tr>
                    <td>Row 2 Data 1</td>
                    <td>Row 2 Data 2</td>
                    <td>Row 2 Data 3</td>
                    <td>Row 2 Data 4</td>
                    <td>Row 2 Data 5</td>
                    <td>Row 2 Data 6</td>
                    <td>Row 2 Data 7</td>
                    <td>Row 2 Data 8</td>
                    <td>Row 2 Data 9</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              startIndex={startIndex}
              endIndex={endIndex}
              totalData={totalData}
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
