import React, { useEffect, useState } from "react";
import AppDrawer from "../common/appDrawer";
import Layout from "../layout/layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useAppContext } from "../../contextApi/context";
import {
  getProfitLossEvent,
  getProfitLossGame,
  getProfitLossRunner,
  profitAndLossMarket_Api,
  profitAndLossRunner_Api,
  profitAndLoss_Api,
} from "../../utils/apiService";
import Pagination from "../common/Pagination";
import {
  getprofitLossDataState,
  getprofitLossEventDataState,
  getprofitLossRunnerDataState,
} from "../../utils/getInitiateState";
import { ToggleButtonGroup } from "react-bootstrap";

const ProfitAndLoss = () => {
  const [profitLossData, SetProfitLossData] = useState(
    getprofitLossDataState()
  );

  const formatDate = (dateString) => {
    // Parse the date string to create a Date object
    const date = new Date(dateString);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
  };

  console.log("profitLossData", profitLossData);

  async function getProfitLossGameWise() {
    try {
      const response = await getProfitLossGame({
        fromDate: formatDate(profitLossData.startDate),
        toDate: formatDate(profitLossData.endDate),
        limit: profitLossData.itemPerPage,
        searchName: profitLossData.searchItem,
        dataSource: profitLossData.dataSource,
      });

      console.log("getProfitLossGameWise", response);

      SetProfitLossData((prevState) => ({
        ...prevState,
        dataGameWise: response.data,
        totalPages: response.pagination.totalPages,
        totalData: response.pagination.totalItems,
      }));
    } catch (error) {
      console.error("Error fetching Profit/Loss data:", error);
    }
  }

  console.log(
    "profitLossData",
    profitLossData.currentPage,
    profitLossData.itemPerPage,
    profitLossData.totalData
  );
  const startIndex = Math.min(
    (profitLossData.currentPage - 1) * profitLossData.itemPerPage + 1
  );
  const endIndex = Math.min(
    profitLossData.currentPage * profitLossData.itemPerPage,
    profitLossData.totalData
  );

  const handleDateForProfitLoss = () => {
    SetProfitLossData((prevState) => ({
      ...prevState,
      startDate: formatDate(profitLossData.startDate),
      endDate: formatDate(profitLossData.endDate),
    }));
  };

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
    SetProfitLossData((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const handelItemPerPage = (event) => {
    console.log("event.target.value", event.target.value);
    SetProfitLossData((prevState) => ({
      ...prevState,
      itemPerPage: Number(event.target.value),
      currentPage: Number(currentPage),
    }));
  };

  const handleSearch = (e) => {
    SetProfitLossData((prev) => ({
      ...prev,
      searchItem: e.target.value,
    }));
  };

  useEffect(() => {
    getProfitLossGameWise();
  }, [
    profitLossData.startDate,
    profitLossData.endDate,
    profitLossData.currentPage,
    profitLossData.itemPerPage,
    profitLossData.dataSource,
  ]);

  // Debounce for search
  useEffect(() => {
    let timer = setTimeout(() => {
      getProfitLossGameWise();
    }, 300);
    return () => clearTimeout(timer);
  }, [profitLossData.searchItem]);

 const ProfitAndLossEvent = ({
   data,
   SetComponent,
   SetMarketId,
   SetProfitLossEventData,
   currentPage,
   SetToggle,
   totalItems,
 }) => {
   console.log("data", data);

   const startIndex = (currentPage - 1) * data.itemPerPage + 1;
   const endIndex = Math.min(currentPage * data.itemPerPage, data.totalData);

   const handleGotoRunnerWiseProfitLoss = (marketId, componentName) => {
     SetComponent(componentName);
     SetMarketId(marketId);
   };

   const handleItemPerPage = (event) => {
     console.log("event.target.value", event.target.value);
     SetProfitLossEventData((prevState) => ({
       ...prevState,
       itemPerPage: Number(event.target.value),
       currentPage: Number(currentPage),
     }));
     toast.error("Work Pending From ServerSide");
   };

   const handleSearch = (e) => {
     SetProfitLossEventData((prev) => ({
       ...prev,
       searchItem: e.target.value,
     }));
   };

   return (
     <>
       {/* card */}
       <div className="card w-100 rounded">
         <div
           className="card-heade text-white p-1 d-flex justify-content-between"
           style={{ backgroundColor: "#2CB3D1" }}
         >
           <b>&nbsp;&nbsp;Profit & Loss Events</b>
           <span
             style={{ cursor: "pointer" }}
             title="Back"
             onClick={() => {
               SetToggle(true);
             }}
           >
             <i className="fas fa-arrow-left"></i>
           </span>
         </div>
         <div className="m-1 d-flex justify-content-between align-items-center">
           <select
             className="form-select w-auto m-1"
             onChange={handleItemPerPage}
           >
             <option value="10" selected={data.itemPerPage === 10}>
               10 Entries
             </option>
             <option value="25" selected={data.itemPerPage === 25}>
               25 Entries
             </option>
             <option value="50" selected={data.itemPerPage === 50}>
               50 Entries
             </option>
             <option value="100" selected={data.itemPerPage === 100}>
               100 Entries
             </option>
           </select>
           <input
             type="search"
             className="form-control w-auto"
             placeholder="Search..."
             onChange={handleSearch}
           />
         </div>
         <ul className="list-group list-group-flush">
           <li className="list-group-item">
             <div className="white_card_body">
               {data?.data?.length === 0 && totalItems !== 0 ? (
                 // Loader
                 <div
                   className="d-flex justify-content-center align-items-center"
                   style={{ height: "100px" }}
                 >
                   <div className="spinner-border" role="status">
                     <span className="sr-only">Loading...</span>
                   </div>
                 </div>
               ) : (
                 // Table
                 <div className="QA_section">
                   <div className="QA_table mb_30">
                     <table className="table lms_table_active3 table-bordered">
                       <thead>
                         <tr
                           style={{
                             backgroundColor: "#e6e9ed",
                             color: "#5562a3",
                           }}
                           align="center"
                         >
                           <th scope="col">
                             <b>Sport Name</b>
                           </th>
                           <th scope="col">
                             <b>Event Name</b>
                           </th>
                           <th scope="col">
                             <b>Commission</b>
                           </th>
                           <th scope="col">
                             <b>Profit & Loss</b>
                           </th>
                           <th scope="col">
                             <b>Total P&L</b>
                           </th>
                         </tr>
                         {data?.data?.length > 0 ? (
                           data?.data?.map((data, index) => (
                             <tr key={index} align="center">
                               <td>{data?.gameName}</td>
                               <td
                                 className="text-primary fw-bold"
                                 style={{ cursor: "pointer" }}
                                 onClick={() => {
                                   handleGotoRunnerWiseProfitLoss(
                                     data.marketId,
                                     "ProfitAndLossRunner"
                                   );
                                 }}
                               >
                                 {data?.marketName}
                               </td>
                               <td>{data?.commission || "NDS"}</td>
                               <td>{data?.profitLoss || "NDS"}</td>
                               <td
                                 className={`fw-bold ${
                                   data?.totalProfitLoss > 0
                                     ? "text-success"
                                     : "text-danger"
                                 }`}
                               >
                                 {data?.totalProfitLoss}
                               </td>
                             </tr>
                           ))
                         ) : (
                           <tr align="center">
                             <td colSpan="5">
                               <div
                                 className="alert alert-info fw-bold"
                                 role="alert"
                               >
                                 No Data Found !!
                               </div>
                             </td>
                           </tr>
                         )}
                       </thead>
                     </table>
                   </div>
                 </div>
               )}
             </div>
           </li>
           <li className="list-group-item">
             {/* Pagination */}
             {data?.data?.length > 0 && (
               <Pagination
                 currentPage={data.currentPage}
                 totalPages={data.totalPages}
                 handlePageChange={data.handlePageChange}
                 startIndex={startIndex}
                 endIndex={endIndex}
                 totalData={data.totalData}
               />
             )}
             {/* Pagination */}
           </li>
         </ul>
       </div>
     </>
   );
 };


  const ProfitAndLossRunner = ({
    data,
    SetComponent,
    SetProfitLossRunnerData,
    currentPage,
    totalItems,
  }) => {
    console.log("data", data);

    const startIndex = (currentPage - 1) * data.itemPerPage + 1;
    const endIndex = Math.min(currentPage * data.itemPerPage, data.totalData);

    const handleItemPerPage = (event) => {
      console.log("event.target.value", event.target.value);
      SetProfitLossRunnerData((prevState) => ({
        ...prevState,
        itemPerPage: Number(event.target.value),
        currentPage: Number(currentPage),
      }));
      toast.error("Work Pending From ServerSide");
    };

    const handleSearch = (e) => {
      SetProfitLossRunnerData((prev) => ({
        ...prev,
        searchItem: e.target.value,
      }));
    };

    return (
      <>
        {/* card */}
        <div className="card w-100 rounded">
          <div
            className="card-heade text-white p-1 d-flex justify-content-between"
            style={{ backgroundColor: "#2CB3D1" }}
          >
            <b>&nbsp;&nbsp;Profit & Loss Markets</b>
            <span
              style={{ cursor: "pointer" }}
              title="Back"
              onClick={() => {
                SetComponent("ProfitAndLossEvent");
              }}
            >
              {" "}
              <i className="fas fa-arrow-left"></i>
            </span>
          </div>
          <div className="m-1 d-flex justify-content-between align-items-center">
            <select
              className="form-select w-auto m-1"
              onChange={handleItemPerPage}
            >
              <option value="10" selected={data.itemPerPage === 10}>
                10 Entries
              </option>
              <option value="25" selected={data.itemPerPage === 25}>
                25 Entries
              </option>
              <option value="50" selected={data.itemPerPage === 50}>
                50 Entries
              </option>
              <option value="100" selected={data.itemPerPage === 100}>
                100 Entries
              </option>
            </select>
            <input
              type="search"
              className="form-control w-auto"
              placeholder="Search..."
              onChange={handleSearch}
            />
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="white_card_body">
                {data?.data?.length === 0 && !loading ? (
                  // Loader
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100px" }}
                  >
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  // Table
                  <div className="QA_section">
                    <div className="QA_table mb_30">
                      <table className="table lms_table_active3 table-bordered">
                        <thead>
                          <tr
                            style={{
                              backgroundColor: "#e6e9ed",
                              color: "#5562a3",
                            }}
                            align="center"
                          >
                            <th scope="col">
                              <b>Sport Name</b>
                            </th>
                            <th scope="col">
                              <b>Event Name</b>
                            </th>
                            <th scope="col">
                              <b>Market Id</b>
                            </th>
                            <th scope="col">
                              <b>Market Name</b>
                            </th>
                            <th scope="col">
                              <b>Result</b>
                            </th>
                            <th scope="col">
                              <b>Profit & Loss</b>
                            </th>
                            <th scope="col">
                              <b>Commission</b>
                            </th>
                            <th scope="col">
                              <b>Settle Time</b>
                            </th>
                          </tr>
                          {data?.data?.length > 0 ? (
                            data?.data?.map((data, index) => (
                              <tr key={index} align="center">
                                <td>{data?.gameName}</td>
                                <td>{data?.runnerName}</td>
                                <td>{data?.marketId || "NDS"}</td>
                                <td
                                  className="text-primary fw-bold"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    toast.error("Work Pending From ServerSide");
                                  }}
                                >
                                  {"NDS"}
                                </td>
                                <td>{"NDS"}</td>
                                <td
                                  className={`fw-bold ${
                                    data?.profitLoss > 0
                                      ? "text-success"
                                      : "text-danger"
                                  }`}
                                >
                                  {data?.profitLoss}
                                </td>
                                <td>{"NDS"}</td>
                                <td>{"NDS"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr align="center">
                              <td colSpan="8">
                                <div
                                  className="alert alert-info fw-bold"
                                  role="alert"
                                >
                                  No Data Found !!
                                </div>
                              </td>
                            </tr>
                          )}
                        </thead>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              {/* Pagination */}
              {data?.data?.length > 0 && (
                <Pagination
                  currentPage={data.currentPage}
                  totalPages={data.totalPages}
                  handlePageChange={data.handlePageChange}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  totalData={data.totalData}
                />
              )}
              {/* Pagination */}
            </li>
          </ul>
        </div>
        {/* card */}
      </>
    );
  };


  const ProfitAndLoss = ({
    setEndDate,
    setStartDate,
    startDate,
    endDate,
    dataGameWise,
    currentPage,
    totalData,
    handlePageChange,
    totalPages,
    SetProfitLossData,
    handleDateForProfitLoss,
  }) => {
    const startIndex = Math.min((currentPage - 1) * 10 + 1);
    const endIndex = Math.min(currentPage * 10, totalData);

    const [profitLossEventData, SetProfitLossEventData] = useState(
      getprofitLossEventDataState()
    );

    const [profitLossRunnerData, SetProfitLossRunnerData] = useState(
      getprofitLossRunnerDataState()
    );

    const [toggle, SetToggle] = useState(true);
    const [component, SetComponent] = useState(null);
    const [marketId, SetMarketId] = useState(null);

    async function getProfitLossRunnerWise() {
      try {
        SetToggle(false);

        const response = await getProfitLossRunner({
          marketId: marketId,
          limit: profitLossRunnerData.itemPerPage,
          searchName: profitLossRunnerData.searchItem,
        });

        console.log("runner=>>>", response);

        SetProfitLossRunnerData((prevState) => ({
          ...prevState,
          data: response.data,
          totalPages: response.pagination.totalPages,
          totalData: response.pagination.totalItems,
        }));
      } catch (error) {
        console.error("Error fetching Profit/Loss runner data:", error);
      }
    }

    useEffect(() => {
      if (marketId) getProfitLossRunnerWise();
    }, [
      marketId,
      profitLossRunnerData.itemPerPage,
      profitLossRunnerData.searchItem,
    ]);

    async function getProfitLossEventWise(gameId, componentName) {
      try {
        // If useEffect is added, ensure toggle is false before hitting the endpoint
        SetToggle(false);
        SetComponent(componentName);

        const response = await getProfitLossEvent({
          gameId: gameId,
          searchName: profitLossEventData.searchItem,
        });

        console.log("event=>>>", response);

        SetProfitLossEventData((prevState) => ({
          ...prevState,
          data: response.data,
          totalPages: response.pagination.totalPages,
          totalData: response.pagination.totalItems,
        }));
      } catch (error) {
        console.error("Error fetching Profit/Loss event data:", error);
      }
    }

    console.log("component", component);
    let componentToRender;
    if (component === "ProfitAndLossEvent") {
      componentToRender = (
        <ProfitAndLossEvent
          data={profitLossEventData}
          SetComponent={SetComponent}
          SetMarketId={SetMarketId}
          SetProfitLossEventData={SetProfitLossEventData}
          currentPage={profitLossEventData.currentPage}
          SetToggle={SetToggle}
          totalItems={profitLossEventData.totalData}
        />
      );
    } else {
      componentToRender = (
        <ProfitAndLossRunner
          data={profitLossRunnerData}
          SetComponent={SetComponent}
          SetProfitLossRunnerData={SetProfitLossRunnerData}
          currentPage={profitLossRunnerData.currentPage}
          totalItems={profitLossRunnerData.totalData}
        />
      );
    }

    const handelItemPerPage = (event) => {
      console.log("event.target.value", event.target.value);
      SetProfitLossData((prevState) => ({
        ...prevState,
        itemPerPage: Number(event.target.value),
        currentPage: Number(currentPage),
      }));
    };

    const handleSearch = (e) => {
      SetProfitLossData((prev) => ({
        ...prev,
        searchItem: e.target.value,
      }));
    };
    return (
      <>
        {toggle && (
          <div
            className="card section"
            style={{ marginTop: "120px", fontWeight: "700", width: "100%" }}
          >
            <span
              className="text-white"
              style={{
                backgroundColor: "#2CB3D1",
                display: "block",
                padding: "0px",
                textIndent: "5px",
                textAlign: "center",
              }}
            >
              Profit & Loss Report
            </span>
            <div className="card">
              <div
                className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-md-between"
                // style={{ backgroundColor: "#e6e9ed" }}
              >
                <div className="form-group mb-3 mb-md-0 px-2">
                  <div class="container">
                    <div class="row">
                      <div class="col-sm">Data Source</div>
                      <div class="col-sm">From</div>
                      <div class="col-sm">To</div>
                      <div class="col-sm"></div>
                    </div>
                  </div>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm">
                        {" "}
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          value={profitLossData.dataSource}
                          onChange={(e) => {
                            SetProfitLossData((prevState) => ({
                              ...prevState,
                              dataSource: e.target.value,
                            }));
                          }}
                        >
                          <option value="live" selected>
                            LIVE DATA
                          </option>
                          <option value="backup">BACKUP DATA</option>
                          <option value="olddata">OLD DATA</option>
                        </select>
                      </div>
                      <div class="col-sm">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          placeholderText={"Select Start Date"}
                        />
                      </div>
                      <div class="col-sm">
                        {" "}
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          placeholderText={"Select End Date"}
                        />
                      </div>
                      <div class="col-sm">
                        <button
                          className="btn btn-primary mb-2"
                          disabled={startDate === "" || endDate === ""}
                          onClick={handleDateForProfitLoss}
                        >
                          Get Statement
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <br />
        {toggle ? (
          <div class="card w-100 rounded">
            <div
              class="card-heade text-white p-1"
              style={{ backgroundColor: "#2CB3D1" }}
            >
              <b>&nbsp;&nbsp;Profit & Loss</b>
            </div>

            <div className="m-1 d-flex justify-content-between align-items-center">
              <select
                className="form-select w-auto m-1"
                onChange={handelItemPerPage}
              >
                <option value="10" selected>
                  10 Entries
                </option>
                <option value="25">25 Entries</option>
                <option value="50">50 Entries</option>
                <option value="100">100 Entries</option>
              </select>
              <input
                type="search"
                className="form-control w-auto"
                placeholder="Search..."
                onChange={handleSearch}
              />
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div class="white_card_body">
                  {/* Table */}
                  <div class="QA_section">
                    <div class="QA_table mb_30">
                      <table class="table lms_table_active3 table-bordered">
                        <thead>
                          <tr
                            style={{
                              backgroundColor: "#e6e9ed",
                              color: "#5562a3",
                            }}
                            align="center"
                          >
                            <th scope="col">
                              <b>Sport Name</b>
                            </th>
                            <th scope="col">
                              <b>Profit & Loss</b>
                            </th>
                            <th scope="col">
                              <b>Commission</b>
                            </th>
                            <th scope="col">
                              <b>Total P&L</b>
                            </th>
                          </tr>
                          {dataGameWise?.length > 0 ? (
                            dataGameWise?.map((data) => (
                              <tr align="center">
                                {" "}
                                <td
                                  onClick={() =>
                                    getProfitLossEventWise(
                                      data?.gameId,
                                      "ProfitAndLossEvent"
                                    )
                                  }
                                  className="text-primary fw-bold"
                                  style={{ cursor: "pointer" }}
                                >
                                  {data?.gameName}
                                </td>
                                <td>{data?.totalProfitLoss}</td>
                                <td>{data?.commission || "NDS"}</td>
                                <td>
                                  <span
                                    className={`fw-bold ${
                                      data?.totalProfitLoss > 0
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {data?.totalProfitLoss}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr align="center">
                              <td colspan="4">
                                <div
                                  class="alert alert-info fw-bold"
                                  role="alert"
                                >
                                  No Data Found !!
                                </div>
                              </td>
                            </tr>
                          )}
                        </thead>
                      </table>
                    </div>
                    {/* Table */}
                  </div>

                  {/* No Data Found */}
                  {/* {props.length === 0 && (
                <div className="alert text-dark bg-light mt-3" role="alert">
                  <div className="alert-text d-flex justify-content-center">
                    <b> &#128680; No Data Found !! </b>
                  </div>
                </div>
              )} */}
                  {/* End of No Data Found */}
                </div>
              </li>
              <li class="list-group-item">
                {/* Pagiantion */}
                {dataGameWise.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalData={totalData}
                  />
                )}
                {/* Pagiantion */}
              </li>
            </ul>
          </div>
        ) : (
          <div style={{ marginTop: "96px" }}>{componentToRender}</div>
        )}
      </>
    );
  };

  return (
    <div data-aos="zoom-in">
      <AppDrawer showCarousel={false}>
        <Layout />
        <ProfitAndLoss
          dataGameWise={profitLossData.dataGameWise}
          startDate={profitLossData.startDate}
          endDate={profitLossData.endDate}
          setStartDate={(date) =>
            SetProfitLossData((prevState) => ({
              ...prevState,
              startDate: date,
            }))
          }
          setEndDate={(date) =>
            SetProfitLossData((prevState) => ({
              ...prevState,
              endDate: date,
            }))
          }
          currentPage={profitLossData.currentPage}
          totalData={profitLossData.totalData}
          totalPages={profitLossData.totalPages}
          handlePageChange={handlePageChange}
          SetProfitLossData={SetProfitLossData}
          handleDateForProfitLoss={handleDateForProfitLoss}
        />
      </AppDrawer>
    </div>
  );
};
export default ProfitAndLoss;
