import React, { useEffect, useState } from "react";
import AppDrawer from "../common/appDrawer";
import Layout from "../layout/layout";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { useAppContext } from "../../contextApi/context";
import { profitAndLossMarket_Api, profitAndLoss_Api } from "../../utils/apiService";


const ProfitAndLoss = () => {


  const{dispatch,store}=useAppContext();
  console.log('=====+++++=====>ID line 16', store.user.id);
  const [profitAndLossMarketData,setProfitAndLossMarketData]=useState([]);
  const [profitAndLossData,setProfitAndLossData]=useState([]);

  const[gameIdData,setGameIdData]=useState("")
  const defaultStartDate = new Date();
  const [selected, setSelected] = useState(<Date />);
  const [dateValue, setDateValue] = useState({
    startDate: defaultStartDate,
    endDate: new Date(),
  });
  defaultStartDate.setDate(defaultStartDate.getDate() - 1);


  function formatDate(dateString) {
    // Create a new Date object using the input string
    let date = new Date(dateString);
  
    // Extract year, month, and day
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month because January is 0
    let day = ('0' + date.getDate()).slice(-2);
  
    // Concatenate the parts with '-' separator
    return `${year}-${month}-${day}`;
  }

  console.log("date===>",formatDate(dateValue.startDate))
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

  const gameIdFromstore = store.userTxn?.gameId ?? '66053792d1a49b35bfd975aa';

   const handleGameData =async ()=>{

    const response =await profitAndLossMarket_Api({
      
      gameId:gameIdFromstore,
      startDate:formatDate(dateValue.startDate),
      endDate:formatDate(dateValue.endDate)
      })
    console.log("+++++++++&&&&&&&&&+++>",response)
   }
    
   async function handleRunnerData (){
    const response=  profitAndLossRunner_Api({
     
      gameId:gameIdFromstore,
      startDate:formatDate(dateValue.startDate),
      endDate:formatDate(dateValue.endDate)
      })
   }


  const handleFetchDateData = async ( )=>{

      const response= await profitAndLoss_Api({
      startDate:formatDate(dateValue.startDate),
      endDate:formatDate(dateValue.endDate)
      });
      if(response){
        console.log("__________++++>",response);
        setProfitAndLossData(response.data)
        setGameIdData(response.data[0].gameId)
      }
  }
   const gameId = gameIdData;
  console.log("&&&&&&&&&&+++++>75",profitAndLossData);
  console.log("&&&&&&&&&&+++++>96",gameId);

  useEffect(()=>{
    handleFetchDateData();
    },[])
    
  const handleReset = () => {
    setDateValue({
      startDate: defaultStartDate,
      endDate: new Date(),
    });
    setProfitAndLossData([])
  };

  function ProfitLoss() {
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
                  handleDateValue(
                    "endDate",
                    moment(e).format("DD-MM-YYYY HH:mm")
                  )
                }
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
                  style={{ backgroundColor: "#2CB3D1", marginLeft: "20px" }}
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
                   Market Name
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
            {profitAndLossData? profitAndLossData.map((item,index)=>(
                <tr key={index}>
                  <td onClick={handleGameData}>{item.gameName}</td>
                  <td>{item.profitLoss}</td>
                  <td>{item.profitLoss}</td>
                </tr>
              )): null }
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <AppDrawer showCarousel={false}>
        <Layout />
        {ProfitLoss()}
        {ProfitLossData()}
      </AppDrawer>
    </>
  );
};
export default ProfitAndLoss;