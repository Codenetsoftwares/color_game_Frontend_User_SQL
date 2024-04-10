import React, { useEffect, useState } from "react";
import AppDrawer from "../common/appDrawer";
import Layout from "../layout/layout";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
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
  const [profitAndLossMarketData, setProfitAndLossMarketData] = useState([]); //store market id
  const [marketIdData, setMarketIdData] = useState([]);
  const [profitAndLossData, setProfitAndLossData] = useState([]);
  const [gameIds, setGameIds] = useState([]);
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 1);
  const [selected, setSelected] = useState(<Date />);

  const [dateValue, setDateValue] = useState({
    startDate: defaultStartDate,
    endDate: new Date(),
  });

  console.log("===========> line 30", gameIds);

  const handleGameClick = async (value) => {
    try {
      const response = await profitAndLossMarket_Api({
        gameId: value,
        startDate: formatDate(dateValue.startDate),
        endDate: formatDate(dateValue.endDate),
      });
      // Process the response as needed
      console.log("Data for selected game ID:", response);
      setProfitAndLossGameData(response.data);
      const uniqueMarketId = [
        ...new Set(response.data.map((item) => item.marketId)),
      ];
      setMarketIdData(uniqueMarketId);
    } catch (error) {
      console.error("Error fetching data for game ID:", value, error);
    }
  };

  console.log("=========> Game ID from Api LINE 47", profitAndLossGameData); //click market data fm game id
  console.log("+++++++++>marketId++++++>", marketIdData); // market id
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

  const handleDateValue = (name, value) => {
    setDateValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // use to be for search, pending
  // const handelDate = () => {
  //   const sdate = moment(dateValue.startDate, "DD-MM-YYYY HH:mm").toDate();
  //   const edate = moment(dateValue.endDate, "DD-MM-YYYY HH:mm").toDate();
  //   const filteredDocuments = documentView.filter((data) => {
  //     const transactionDate = new Date(data.createdAt);
  //     return transactionDate >= sdate && transactionDate <= edate;
  //   });
  //   setDocumentFilter(filteredDocuments);
  //   setToggle(false);
  // };
  console.log("++++++>=",marketIdData)
  const handleMarketClick = async (marketIdData) => {
    try {
      const response = await profitAndLossRunner_Api({
        marketId: marketIdData,
        startDate: formatDate(dateValue.startDate),
        endDate: formatDate(dateValue.endDate),
      });
      console.log("&&&&&&&&&&bhaiAye++++>",response)
      setProfitAndLossMarketData(response.data);
      console.log("marketsdffbjkdfnsj=====>",profitAndLossMarketData)
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
      // console.log("__________++++>", response);
      setProfitAndLossData(response.data);
      const uniqueGameIds = [
        ...new Set(response.data.map((item) => item.gameId)),
      ];
      setGameIds(uniqueGameIds);
    }
  };

  useEffect(() => {
    handleFetchDateData();
  }, []);

  const handleReset = () => {
    setDateValue({
      startDate: defaultStartDate,
      endDate: new Date(),
    });
    setProfitAndLossData([]);
    setProfitAndLossGameData([]);
    setProfitAndLossMarketData([]);
  };

  function ProfitLoss() {
    return (
      <>
        <div className="card p-0 section" style={{ marginTop: '120px', fontWeight: '700', padding: '0px' }}>
          <span
            className="text-white"
            style={{
              backgroundColor: '#2CB3D1',
              display: 'block',
              fontWeight: '700',
              padding: '0px',
              textIndent: '5px',
            }}
          >
            Profit & Loss Report
          </span>
          <div className="row" style={{ margin: '10px' }}>
            <div className="col-sm-3 col-md-4 col-lg-3">
              <Datetime
                value={dateValue.startDate}
                name="startDate"
                dateFormat="DD-MM-YYYY"
                onChange={(e) => handleDateValue('startDate', moment(e).format('DD-MM-YYYY HH:mm'))}
                timeFormat="HH:mm"
              />
            </div>
            <div className="col-sm-3 col-md-4 col-lg-3">
              <Datetime
                value={dateValue.endDate}
                name="endDate"
                dateFormat="DD-MM-YYYY"
                onChange={(e) => handleDateValue('endDate', moment(e).format('DD-MM-YYYY HH:mm'))}
                timeFormat="HH:mm"
              />
            </div>
            <div className="col-lg-3">
              <div className="col-sm-6 d-flex justify-content-center ">
                <button
                  className="btn btn-secondary"
                  style={{ backgroundColor: "#2CB3D1" }}
                  onClick={handleFetchDateData}
                >
                  Go
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ backgroundColor: '#2CB3D1', marginLeft: '20px' }}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function ProfitLossData() {
    return (
      <>
        <div className="card p-0 section" style={{ marginTop: '15px' }}>
          <div className="table-container overflow-x-scroll" style={{ overflowX: 'auto', margin: '10px' }}>
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
                {profitAndLossData
                  ? profitAndLossData.map((item, index) => (
                      <tr key={index}>
                        <td onClick={() => handleGameClick(item.gameId)}>
                          {item.gameName}
                        </td>
                        <td>{item.profitLoss}</td>
                        <td>{item.profitLoss}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
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
                {profitAndLossGameData
                  ? profitAndLossGameData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.gameName}</td>
                        <td onClick={() => handleMarketClick(item.marketId)}>
                          {item.marketName}
                        </td>
                        <td>{item.profitLoss}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
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
                    runnerName
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
                    gameName
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
                {profitAndLossMarketData
                  ? profitAndLossMarketData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.runnerName}</td>
                        <td>{item.marketName}</td>
                        <td>{item.gameName}</td>
                        <td>{item.profitLoss}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  return (
    < div  data-aos="zoom-in">
      <AppDrawer showCarousel={false}>
        <Layout />
        {ProfitLoss()}
        {ProfitLossData()}
      </AppDrawer>
    </div>
  );
};
export default ProfitAndLoss;
