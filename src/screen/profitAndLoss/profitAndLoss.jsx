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
import { Link, useNavigate } from "react-router-dom";
const ProfitAndLoss = ( ) => {

  const [profitAndLossGameData, setProfitAndLossGameData] = useState([]);
  const [profitAndLossMarketData, setProfitAndLossMarketData] = useState([]);
  const [profitAndLossData, setProfitAndLossData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(5);
  const navigate = useNavigate();

  //first table
  const [pagination, setPagination] = useState({
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
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 1);
  const [dateValue, setDateValue] = useState({
    startDate: defaultStartDate,
    endDate: new Date(),
  });
      //check this for table two
     const handleGameClick = async (gameId) => {
       navigate(`/gameNameList/${gameId}`);
      };

    console.log("dataline number +++++>",profitAndLossGameData)



  const handleFetchDateData = async () => {
    const response = await profitAndLoss_Api({
      startDate: formatDate(dateValue.startDate),
      endDate: formatDate(dateValue.endDate),
      pageNumber: pagination.currentPage,
      dataLimit: totalEntries,
    });
    if (response) {
        setProfitAndLossData(response.data);
        setPagination((prevState) => ({
        ...prevState,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
      }));
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
  // pagination handlechange (to be solved later )
  const handlePageChange = (pageNumber) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
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
    isValidDate
  }) => {
    return (
      <>
        <div
          className="card section"
          style={{ marginTop: "120px", fontWeight: "700" ,width:"100%"}}
        >
          <span
            className="text-white"
            style={{
              backgroundColor: "#2CB3D1",
              display: "block",
              // fontWeight: "700",
              padding: "0px",
              textIndent: "5px",
              textAlign:"center"
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
                  className="btn btn-secondary proLossButton"
                  style={{ backgroundColor: "#2CB3D1", fontWeight: "bold" }}
                  onClick={handleFetchDateData}
                >
                  Go
                </button>
                <button
                  className="btn btn-secondary proLossButton"
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
          <div className="card p-0 section" style={{width:"100%"}}>
            <div
              className="table-container overflow-x-scroll"
              style={{ overflowX: "auto", margin: "10px"  }}
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
                      style={{ backgroundColor: "#2CB3D1", color: "white" ,textAlign:"center" }}
                    >
                      Game Name
                    </th>
                    <th
                      scope="col"
                      style={{ backgroundColor: "#2CB3D1", color: "white" ,textAlign:"center" }}
                    >
                      Profit&Loss
                    </th>
                    <th
                      scope="col"
                      style={{ backgroundColor: "#2CB3D1", color: "white" ,textAlign:"center" }}
                    >
                      Total P&L
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {profitAndLossData.map((item, index) => (
                    <tr key={index}>
                      <td
                       
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                      >
                        <Link to={`/gameNameList/${item.gameId}`}>
                        {item.gameName}
                        </Link>
                      </td>
                      <td>{item.profitLoss}</td>
                      <td>{item.profitLoss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           <div style={{margin:"10px" , display:"flex",justifyContent:"center"}}>
             <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              startIndex={startIndex}
              endIndex={endIndex}
              totalData={totalItems}
            />
           </div>
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
      </>
    );
  };
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
          // handleMarketClick={handleMarketClick}
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
          isValidDate={isValidDate}
        />
      </AppDrawer>
    </div>
  );
};
export default ProfitAndLoss;