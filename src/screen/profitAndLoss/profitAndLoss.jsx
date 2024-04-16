import React, { useEffect, useState } from "react";
import AppDrawer from "../common/appDrawer";
import Layout from "../layout/layout";
import Datetime from "react-datetime";
import moment from "moment";
import { useAppContext } from "../../contextApi/context";
import {
  profitAndLossMarket_Api,
  profitAndLossRunner_Api,
  profitAndLoss_Api,
} from "../../utils/apiService";
import Pagination from "../common/Pagination";

const ProfitAndLoss = () => {
  const { dispatch, store } = useAppContext();
  const [profitAndLossGameData, setProfitAndLossGameData] = useState([]);
  const [profitAndLossMarketData, setProfitAndLossMarketData] = useState([]);
  const [profitAndLossData, setProfitAndLossData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(5);
  const [totalEntriesTwo, setTotalEntriesTwo] = useState(5);
  //first table
  const [pagination, setPagination] = useState({
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
  });
  //second table
  const [paginationTow, setPaginetionTwo] = useState({
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
  });



  //first table

  let startIndex = Math.min((pagination.currentPage - 1) * totalEntries + 1);
  let endIndex = Math.min(
    pagination.currentPage * totalEntries,
    pagination.totalItems
  );

  //second table

  let startIndexTwo = Math.min(
    (paginationTow.currentPage - 1) * totalEntriesTwo + 1
  );
  let endIndexTwo = Math.min(
    paginationTow.currentPage * totalEntriesTwo,
    paginationTow.totalItems
  );

  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 1);
  const [dateValue, setDateValue] = useState({
    startDate: defaultStartDate,
    endDate: new Date(),
  });

  const handleGameClick = async (value) => {
    try {
      const response = await profitAndLossMarket_Api({
        gameId: value,
        startDate: formatDate(dateValue.startDate),
        endDate: formatDate(dateValue.endDate),
        pageNumber: paginationTow.currentPage,
        dataLimit: totalEntriesTwo,
      });
      setProfitAndLossGameData(response.data);
      setPaginetionTwo((prevState) => ({
        ...prevState,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
      }));
    } catch (error) {
      console.error("Error fetching data for game ID:", value, error);
    }
  };
  const handleMarketClick = async (marketIdData) => {
    try {
      const response = await profitAndLossRunner_Api({
        marketId: marketIdData,
        startDate: formatDate(dateValue.startDate),
        endDate: formatDate(dateValue.endDate),
        pageNumber: paginationTow.currentPage,
        dataLimit: totalEntriesTwo,
      });
      if (
        response.data &&
        response.data.length > 0 &&
        response.data[0].runnerName
      ) {
        setProfitAndLossGameData(response.data);
        setPaginetionTwo((prevState) => ({
          ...prevState,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems,
        }));
      } else {
        setProfitAndLossGameData([]);
      }
    } catch (error) {
      console.error("Error fetching data for market ID:", marketIdData, error);
    }
  };
  const handleFetchDateData = async () => {
    const response = await profitAndLoss_Api({
      startDate: formatDate(dateValue.startDate),
      endDate: formatDate(dateValue.endDate),
      pageNumber: pagination.currentPage,
      dataLimit: totalEntries,
    });
    if (response) {
      setProfitAndLossData(response.data);
      // setTotalPages(response.pagination.totalPages);
      // setTotalItems(response.pagination.totalItems);
      setPagination((prevState) => ({
        ...prevState,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
      }));
      // setPagination(prevState => ({
      //   ...prevState,
      //   totalItems: response.pagination.totalItems

      // }));
    }
  };
  useEffect(() => {
    handleFetchDateData();
  }, [pagination.currentPage, pagination.totalItems, totalEntries]);

  const handleDateValue = (name, value) => {
    
    setDateValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleReset = () => {
    setDateValue({
      startDate: defaultStartDate,
      endDate: new Date(),
    });
    setProfitAndLossData([]);
    setProfitAndLossGameData([]);
    setProfitAndLossMarketData([]);
  };

  // entries for no. of entries for pagination
  const handleEntriesChange = (event) => {
    const entries = Number(event.target.value);
    console.log("entries", entries);
    setTotalEntries(entries);
    // After updating totalItems, we need to fetch data for the first page with the new number of items
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 1,
    }));
  };
  // table two total entries pagination
  const handleEntriesTwoChange = (event) => {
    const entries = Number(event.target.value);
    console.log("entries", entries);
    setTotalEntriesTwo(entries);
    // After updating totalItems, we need to fetch data for the first page with the new number of items
    setPaginetionTwo((prevState) => ({
      ...prevState,
      currentPage: 1,
    }));
  };
console.log('showing entries:',paginationTow  , 'total entries :',totalEntriesTwo )
  // pagination handlechange (to be solved later )
  const handlePageChange = (pageNumber) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  };

  //paginetion handleChange table Two
  const handlePageChangeTwo = (pageNumberTwo) => {
    setPaginetionTwo((prevState) => ({
      ...prevState,
      currentPage: pageNumberTwo,
    }));
  };

  // Define isValidDate function here
const isValidDate = (current) => {
  return current.isBefore(moment(), "day");
};

  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  return (
    <div data-aos="zoom-in">
      <AppDrawer showCarousel={false}>
        <Layout />
        <ProfitLoss
          dateValue={dateValue}
          handleDateValue={handleDateValue}
          handleFetchDateData={handleFetchDateData}
          handleReset={handleReset}
          profitAndLossData={profitAndLossData}
          setProfitAndLossGameData={setProfitAndLossGameData}
          handleGameClick={handleGameClick}
          profitAndLossGameData={profitAndLossGameData}
          handleMarketClick={handleMarketClick}
          profitAndLossMarketData={profitAndLossMarketData}
          // for pagination
          totalEntries={totalEntries}
          handleEntriesChange={handleEntriesChange}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          handlePageChange={handlePageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={pagination.totalItems}
          // second table paginetion
          handleEntriesTwoChange={handleEntriesTwoChange}
          handlePageChangeTwo={handlePageChangeTwo}
          startIndexTwo={startIndexTwo}
          endIndexTwo={endIndexTwo}
          totalEntriesTwo={totalEntriesTwo}
          isValidDate={isValidDate}
        />
      </AppDrawer>
    </div>
  );
};
const ProfitLoss = ({
  dateValue,
  handleDateValue,
  handleFetchDateData,
  handleReset,
  profitAndLossData,
  setProfitAndLossGameData,
  handleGameClick,
  profitAndLossGameData,
  handleMarketClick,
  profitAndLossMarketData,

  // for pagination table 1
  totalEntries,
  handleEntriesChange,
  currentPage,
  totalPages,
  handlePageChange,
  startIndex,
  endIndex,
  totalItems,
  //for paginetion table 2
  handleEntriesTwoChange,
  handlePageChangeTwo,
  endIndexTwo,
  startIndexTwo,
  totalEntriesTwo,
  isValidDate

}) => {
  return (
    <>
      <div
        className="card p-0 section"
        style={{ marginTop: "120px", fontWeight: "700", padding: "0px" }}
      >
        <span
          className="text-white"
          style={{
            backgroundColor: "#2CB3D1",
            display: "block",
            fontWeight: "700",
            padding: "0px",
            textIndent: "5px",
          }}
        >
          Profit & Loss Report
        </span>
        <div className="row" style={{ margin: "10px" }}>
          <div className="col-sm-3 col-md-4 col-lg-3">
            <Datetime
              value={dateValue.startDate}
              name="startDate"
              dateFormat="DD-MM-YYYY"
              onChange={(e) =>
                handleDateValue(
                  "startDate",
                  moment(e).format("DD-MM-YYYY HH:mm")
                )
              }
              timeFormat="HH:mm"
              isValidDate={isValidDate}
            />
          </div>
          <div className="col-sm-3 col-md-4 col-lg-3">
            <Datetime
              value={dateValue.endDate}
              name="endDate"
              dateFormat="DD-MM-YYYY"
              onChange={(e) =>
                handleDateValue("endDate", moment(e).format("DD-MM-YYYY HH:mm"))
              }
              timeFormat="HH:mm"
              isValidDate={isValidDate}
            />
          </div>
          <div className="col-lg-3">
            <div className="col-sm-6 d-flex justify-content-center ">
              <button
                className="btn btn-secondary"
                style={{ backgroundColor: "#2CB3D1", fontWeight: "bold" }}
                onClick={handleFetchDateData}
              >
                Go
              </button>
              <button
                className="btn btn-secondary"
                style={{
                  backgroundColor: "#2CB3D1",
                  marginLeft: "20px",
                  fontWeight: "bold",
                }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      {profitAndLossData.length > 0 ? (
        <div className="card p-0 section" style={{ marginTop: "15px" }}>
          <div
            className="table-container overflow-x-scroll"
            style={{ overflowX: "auto", margin: "10px" }}
          >
            {/* show entries deopdown */}
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
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#2CB3D1", color: "white" }}
                  >
                    Game Name
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#2CB3D1", color: "white" }}
                  >
                    Profit&Loss
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#2CB3D1", color: "white" }}
                  >
                    Total P&L
                  </th>
                </tr>
              </thead>
              <tbody>
                {profitAndLossData.map((item, index) => (
                  <tr key={index}>
                    <td
                      onClick={() => handleGameClick(item.gameId)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.gameName}
                    </td>
                    <td>{item.profitLoss}</td>
                    <td>{item.profitLoss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         <div style={{margin:"10px"}}>
           <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalData={totalItems}
          />
         </div>
          {/* <Pagination
            currentPage={paginationTow.currentPage}
            totalPages={paginationTow.totalPages}
            handlePageChangeTwo={handlePageChangeTwo}
            startIndexTwo={startIndexTwo}
            endIndexTwo={endIndexTwo}
            totalData={paginationTow.totalItems}
            totalEntriesTwo={totalEntriesTwo}
            handleEntriesTwoChange={handleEntriesTwoChange}
          /> */}
        </div>
      ) : (
        <div
          class="alert alert-info"
          role="alert"
          style={{ textAlign: "center" }}
        >
          NO DATA FOUND !!
        </div>
      )}

      {profitAndLossGameData.length > 0 && (
        <div className="card p-0 section" style={{ marginTop: "15px" }}>
          <div
            className="table-container overflow-x-scroll"
            style={{ overflowX: "auto", margin: "10px" }}
          >
            {/* show entries deopdown */}
            <div className="mb-3">
              <label htmlFor="showEntriesDropdown" className="form-label">
                Show entries
              </label>
              <select
                className="form-select"
                id="showEntriesDropdown"
                value={totalEntriesTwo}
                onChange={handleEntriesTwoChange}
              >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* {profitAndLossGameData.data.runnerName ? <th
                  scope="col"
                  style={{ backgroundColor: "#2CB3D1", color: "white" }}
                >
                  runnerName
                </th>:null} */}
                  {profitAndLossGameData[0].runnerName && (
                    <th
                      scope="col"
                      style={{ backgroundColor: "#2CB3D1", color: "white" }}
                    >
                      runnerName
                    </th>
                  )}
                  <th
                    scope="col"
                    style={{ backgroundColor: "#2CB3D1", color: "white" }}
                  >
                    gameName
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#2CB3D1", color: "white" }}
                  >
                    marketName
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#2CB3D1", color: "white" }}
                  >
                    profitLoss
                  </th>
                </tr>
              </thead>
              <tbody>
                {profitAndLossGameData.map((item, index) => (
                  <tr key={index}>
                    {/* <td>{item.runnerName}</td>    */}
                    {item.runnerName && <td>{item.runnerName}</td>}
                    <td>{item.gameName}</td>
                    <td
                      onClick={() => handleMarketClick(item.marketId)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.marketName}
                    </td>
                    <td>{item.profitLoss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChangeTwo={handlePageChangeTwo}
            startIndexTwo={startIndexTwo}
            endIndexTwo={endIndexTwo}
            totalData={totalItems}
          />
        </div>
      )}
    </>
  );
};
export default ProfitAndLoss;
