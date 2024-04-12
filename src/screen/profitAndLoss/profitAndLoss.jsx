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
const ProfitAndLoss = () => {
  const { dispatch, store } = useAppContext();
  const [profitAndLossGameData, setProfitAndLossGameData] = useState([]);
  const [profitAndLossMarketData, setProfitAndLossMarketData] = useState([]);
  const [profitAndLossData, setProfitAndLossData] = useState([]);
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
      });
      setProfitAndLossGameData(response.data);
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
      });
      if (
        response.data &&
        response.data.length > 0 &&
        response.data[0].runnerName
      ) {
        setProfitAndLossGameData(response.data);
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
    });
    if (response) {
      setProfitAndLossData(response.data);
    }
  };
  useEffect(() => {
    handleFetchDateData();
  }, []);
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
        </div>
      )}
    </>
  );
};
export default ProfitAndLoss;
