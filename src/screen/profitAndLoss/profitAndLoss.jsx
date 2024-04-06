import React, { Children, useState } from "react";
import AppDrawer from "../common/appDrawer";
import Layout from "../layout/layout";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
const ProfitAndLoss = () => {
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 1);
  const [selected, setSelected] = useState(<Date />);
  const [dateValue, setDateValue] = useState({
    startDate: defaultStartDate,
    endDate: new Date(),
  });
  let footer = <p>Please pick a day.</p>;
  if (selected) {
    console.log(`You picked `, selected);
  }
  function DatePicker() {
    return <></>;
  }
  const handleDateValue = (name, value) => {
    setDateValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(
    "sdate",
    moment(dateValue.startDate, "DD-MM-YYYY HH:mm").toDate()
  );
  console.log("sdate", moment(dateValue.endDate, "DD-MM-YYYY HH:mm").toDate());
  const handelDate = () => {
    const sdate = moment(dateValue.startDate, "DD-MM-YYYY HH:mm").toDate();
    const edate = moment(dateValue.endDate, "DD-MM-YYYY HH:mm").toDate();
    const filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });
    setDocumentFilter(filteredDocuments);
    setToggle(false);
  };
  const handleReset = () => {
    setDateValue({
      startDate: defaultStartDate,
      endDate: new Date(),
    });
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
                    Sport
                  </th>
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
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
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