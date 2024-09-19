import React, { useState, useEffect } from "react";
import AppDrawer from "../common/appDrawer";
import Layout from "../layout/layout";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Pagination from "../common/Pagination";
import moment from "moment";
import { useAppContext } from "../../contextApi/context";

import {
  getDataFromHistoryLandingPage,
  user_getBackLayData_api,
  user_getBetHistory_api,
  // user_getOpenBetData_api,
  // user_getOpenBetmarket_api,
} from "../../utils/apiService";
import { getbiddingInitialState } from "../../utils/getInitiateState";

const BetHistory = () => {
  const [betHistoryData, setBetHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalEntries, setTotalEntries] = useState(10);
  const [openBet, setOpenBet] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedGameId, setSelectedGameId] = useState(null);

  const defaultStartDate = new Date();
  const [selected, setSelected] = useState(<Date />);
  // <Date/>
  const [dateValue, setDateValue] = useState({
    startDate: defaultStartDate,
    endDate: new Date(),
  });
  const [dateVisible, setDateVisible] = useState(false); // date visible only when user selects date

  defaultStartDate.setDate(defaultStartDate.getDate() - 1);
  function formatDate(dateString) {
    // Create a new Date object using the input string
    let date = new Date(dateString);
    // Extract year, month, and day
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 to month because January is 0
    let day = ("0" + date.getDate()).slice(-2);
    // Concatenate the parts with '-' separator
    return `${year}-${month}-${day}`;
  }
  console.log("date===>", formatDate(dateValue.startDate));
  console.log("date===> end date", formatDate(dateValue.endDate));
  const handleDateValue = (name, value) => {
    setDateValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [gameSelectionBetHistory, setGameSelectionBetHistory] = useState([]); // from dummy data into bet history selection
  console.log("=======>>> market selection", gameSelectionBetHistory);
  const [openBetSelectionbetHistory, setopenBetSelectionbetHistory] = useState(
    []
  ); // from dummy data into open bet selection
  console.log(
    "========>>>>>> line 63 selection data",
    openBetSelectionbetHistory
  );
  const [selectedOptions, setSelectedOptions] = useState({
    dataSource: "live",
    select2: "",
    select3: "",
  });
  const [fetchData, setFetchData] = useState(true);
  const { store } = useAppContext();
  console.log("=============> line 15 ", store.user?.UserId);

  let startIndex = Math.min((currentPage - 1) * totalEntries + 1);
  let endIndex = Math.min(currentPage * totalEntries, totalItems);
  // the api called for bet history data
  async function handleGetHistory() {
    const response = await user_getBetHistory_api({
      gameId: selectedGameId,
      // marketName: gameSelectionBetHistory,
      pageNumber: currentPage,
      dataLimit: totalEntries,
      startDate: formatDate(dateValue.startDate),
      endDate: formatDate(dateValue.endDate),
      dataSource: selectedOptions.dataSource,
    });

    if (response) {
      console.log("response for betHistoryData ", response);
      setBetHistoryData(response?.data);
      setTotalPages(response?.pagination?.totalPages);
      setTotalItems(response?.pagination?.totalItems);
    } else {
      //add loading part //
    }
  }
  // useeffect for bet history data
  useEffect(() => {
    if (selectedGameId != "") {
      handleGetHistory();
    }
  }, [currentPage, totalItems, totalEntries]);
  console.log("==========> line65", betHistoryData);

  // pagination handlechange (to be solved later )
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // entries for no. of entries for pagination
  const handleEntriesChange = (event) => {
    const entries = Number(event.target.value);
    console.log("entries", entries);
    setTotalEntries(entries);
    // After updating totalItems, we need to fetch data for the first page with the new number of items
    setCurrentPage(1);

    // handleGetHistory()
  };

  //this is the select market response whic for both open bets and bet history
  async function handleGetSelectData() {
    const response = await getDataFromHistoryLandingPage();
    if (response) {
      console.log(
        "===========>response for betOpenBetDataSelect and marketname(Line 237)",
        response
      );
      setGameSelectionBetHistory(response.data);
      // setopenBetSelectionbetHistory(response.data.currentMarket);
    } else {
      //add loading part //
    }
  }
  // useeffect for bet history and open bets selection input boxes only
  useEffect(() => {
    handleGetSelectData();
  }, []);
  console.log(
    "=========> gameSelectionBetHistory line 108",
    gameSelectionBetHistory
  );
  console.log(
    "=========> openBetSelectionbetHistor line 109",
    openBetSelectionbetHistory
  );

  // this is for open bets selection onchnage
  const handleSelectChange = (e) => {
    setSelectedMarket(e.target.value);
  };
  console.log("=====. line 157", selectedMarket);

  const handleGetHistoryChange = (e) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      dataSource: e.target.value,
    }));

    // Additional logic based on the selected option, if required
    // console.log(`Selected====> ${selectName}:`, value);
  };

  const handleGameChange = (e) => {
    console.log("empty value line 150", e.target.value);
    setSelectedGameId(e.target.value);
    setDateVisible(true); // Show date picker when market is selected
  };

  console.log("Market ID:", selectedGameId);

  // this is back lay open bets data but this api needs to be updated
  async function handleGetData() {
    const response = await user_getBackLayData_api({
      marketId: selectedMarket,
    });
    if (response && response.data && response.data.rows) {
      console.log(
        "===========>response for betOpenBetData(Line 173)",
        response
      );
      setOpenBet(response.data.rows);
    } else {
      //add loading part //
    }
  }
  // this is useEffect for  back lay open bets data but this api needs to be updated
  useEffect(() => {
    if (selectedMarket != "") {
      handleGetData();
    }
  }, [selectedMarket]);
  console.log("============> openBet", openBet);
  console.log("============> selectMarketId", selectedMarket);

  // Function to render "No data found" message when history data is empty
  const renderNoDataFound = () => {
    return (
      <div class="alert alert-danger text-center mt-2" role="alert">
        No data found
      </div>
    );
  };
  // this is the complete get history selection card with bet history data table
  function history() {
    return (
      <div>
        <div
          className="card shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: "120px" }}
        >
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    value={selectedOptions.dataSource}
                    onChange={(e) => handleGetHistoryChange(e)}
                  >
                    <option value="live" selected>
                      LIVE DATA
                    </option>
                    <option value="backup">BACKUP DATA</option>
                    <option value="olddata">OLD DATA</option>
                  </select>
                </div>
              </div>

              <div className="col-auto">&nbsp;</div>

              <div className="col">
                <div className="form-group">
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    value={selectedGameId || ""}
                    onChange={handleGameChange}
                  >
                    <option value=""> Select Game </option>
                    {gameSelectionBetHistory.map((game, index) => (
                      <option key={index} value={game.gameId}>
                        {game.gameName}
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
                    onChange={(e) => handleGetHistoryChange(e, "select3")}
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">SETTLE</option>
                    <option value="1">UNSETTLE</option>
                  </select>
                </div>
              </div>
            </div>

            {/* {dateVisible && ( */}
            <div className="row align-items-center">
              <div className="col">
                <div className="form-group">
                  <label>From:</label>
                  <div className="input-group" style={{ maxWidth: "100%" }}>
                    <Datetime
                      value={dateValue.startDate}
                      name="startDate"
                      dateFormat="DD-MM-YYYY"
                      onChange={(e) =>
                        handleDateValue("startDate", moment(e).toDate())
                      }
                      timeFormat="HH:mm"
                      isValidDate={(current) => current.isBefore(new Date())}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>To:</label>
                  <div className="input-group" style={{ maxWidth: "100%" }}>
                    <Datetime
                      value={dateValue.endDate}
                      name="endDate"
                      dateFormat="DD-MM-YYYY"
                      onChange={(e) =>
                        handleDateValue("endDate", moment(e).toDate())
                      }
                      timeFormat="HH:mm"
                      isValidDate={(current) => current.isBefore(new Date())}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => handleGetHistory()}
                  disabled={!selectedGameId}
                >
                  Get History
                </button>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>

        <div className="card shadow p-3 mb-5 bg-white rounded">
          <div
            className="card-header"
            style={{
              backgroundColor: "#2CB3D1",
              color: "white",
              textAlign: "center",
            }}
          >
            <h5 className="card-title">Bet History</h5>
          </div>
          {selectedGameId === null ? (
            <div className="alert alert-info text-center mt-2" role="alert">
              Please Select a Game Name & Click Get History
            </div>
          ) : betHistoryData?.length > 0 ? (
            <div className="card-body">
              {/* Show entries dropdown */}
              <div className="mb-3">
                <label htmlFor="showEntriesDropdown" className="form-label">
                  Show entries
                </label>
                <select
                  className="form-select"
                  id="showEntriesDropdown"
                  value={totalEntries}
                  onChange={handleEntriesChange}
                >
                  <option value="10" selected>
                    10 Entries
                  </option>
                  <option value="25">25 Entries</option>
                  <option value="50">50 Entries</option>
                  <option value="100">100 Entries</option>
                </select>
              </div>

              <div style={{ overflow: "auto" }}>
                <table className="table table-bordered">
                  <thead>
                    <tr align="center">
                      <th scope="col">Game Name</th>
                      <th scope="col">Market Name</th>
                      <th scope="col">Runner Name</th>
                      <th scope="col">Odd Req.</th>
                      <th scope="col">Value</th>
                      <th scope="col">Type</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {betHistoryData?.map((item, index) => (
                      <tr key={index} align="center">
                        <td>{item.gameName}</td>
                        <td>{item.marketName}</td>
                        <td>{item.runnerName}</td>
                        <td>{item.rate}</td>
                        <td className="fw-bold">{item.value}</td>
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
                startIndex={startIndex}
                endIndex={endIndex}
                totalData={totalItems}
              />
            </div>
          ) : (
            renderNoDataFound()
          )}
        </div>
      </div>
    );
  }

  // this is the open bets section with selection with conditinally rendering back and lay table data with market selection
  function openBets() {
    return (
      <div className="card" style={{ marginTop: "120px", height: "800px" }}>
        <div
          className="card-header"
          style={{
            backgroundColor: "#2CB3D1",
            color: "white",
            textAlign: "center",
          }}
        >
          <h5 className="card-title">Open Bets</h5>
        </div>
        <div className="card-body">
          <div className="form-group">
            <select
              className="form-select form-select-lg"
              id="selectMarket"
              style={{ width: "100%" }}
              onChange={handleSelectChange}
            >
              <option value={""}>Select Market</option>
              {openBetSelectionbetHistory.map((item, index) => (
                <option key={index} value={item.marketId}>
                  {item.marketName}
                </option>
              ))}
            </select>
          </div>

          {/* Render back  and laytable if market is selected */}
          {selectedMarket.length > 0 && !selectedMarket == "" && (
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
    return (
      <div
        className="card shadow p-3 mb-5 rounded"
        style={{ backgroundColor: "#cfe2f3" }}
      >
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              {/* Table header */}
              <thead>
                <tr>
                  <th className="d-none d-sm-table-cell">Back(Bet For)</th>
                  <th className="d-none d-sm-table-cell">Odds</th>
                  <th className="d-none d-sm-table-cell">Stake</th>
                  <th className="d-none d-sm-table-cell">Profit</th>
                  <th className="d-table-cell d-sm-none">Details</th>
                </tr>
              </thead>
              {/* Table body - data to be filled dynamically */}
              <tbody>
                {/* Insert rows for back bets */}
                {openBet
                  .filter((item) => item.type === "back") // Ensure correct type matching (case-sensitive)
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="d-none d-sm-table-cell">
                        {item.runnerName}
                      </td>
                      <td className="d-none d-sm-table-cell">{item.rate}</td>
                      <td className="d-none d-sm-table-cell">{item.value}</td>
                      <td className="d-none d-sm-table-cell">
                        {item.bidAmount}(-{item.value})
                      </td>
                      <td className="d-table-cell d-sm-none">
                        <div>
                          <strong>Back (Bet For):</strong> {item.runnerName}
                        </div>
                        <div>
                          <strong>Odds:</strong> {item.rate}
                        </div>
                        <div>
                          <strong>Stake:</strong> {item.value}
                        </div>
                        <div>
                          <strong>Profit:</strong> {item.bidAmount}(-
                          {item.value})
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Function to render lay table  called in open bets function
  const renderLayTable = () => {
    return (
      <div
        className="card shadow p-3 mb-5 rounded"
        style={{ backgroundColor: "#f8d7da" }}
      >
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              {/* Table header */}
              <thead>
                <tr>
                  <th className="d-none d-sm-table-cell">Lay(Bet Against)</th>
                  <th className="d-none d-sm-table-cell">Odds</th>
                  <th className="d-none d-sm-table-cell">Stake</th>
                  <th className="d-none d-sm-table-cell">Liability</th>
                  <th className="d-table-cell d-sm-none">Details</th>
                </tr>
              </thead>
              {/* Table body - data to be filled dynamically */}
              <tbody>
                {/* Insert rows for lay bets */}
                {openBet
                  .filter((item) => item.type === "lay")
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="d-none d-sm-table-cell">
                        {item.runnerName}
                      </td>
                      <td className="d-none d-sm-table-cell">{item.rate}</td>
                      <td className="d-none d-sm-table-cell">{item.value}</td>
                      <td className="d-none d-sm-table-cell">
                        {item.value}(-{item.bidAmount})
                      </td>
                      <td className="d-table-cell d-sm-none">
                        <div>
                          <strong>Lay(Bet Against):</strong> {item.runnerName}
                        </div>
                        <div>
                          <strong>Odds:</strong> {item.rate}
                        </div>
                        <div>
                          <strong>Stake:</strong> {item.value}
                        </div>
                        <div>
                          <strong>Liability:</strong> {item.value}(-
                          {item.bidAmount})
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
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
