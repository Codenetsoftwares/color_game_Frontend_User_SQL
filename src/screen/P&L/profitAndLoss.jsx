import React, { useState } from "react";
import AppDrawer from "../common/appDrawer";
import Layout from "../layout/layout";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const ProfitAndLoss = () => {
  const [selected, setSelected] = useState(<Date />);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    console.log(`You picked `, selected);
  }

  function DatePicker() {
    return <></>;
  }
  function ProfitLoss() {
    return (
      <>
        <div
          class="card p-0 section"
          style={{ marginTop: "120px", fontWeight: "700", padding: "0px" }}
        >
          <span
            className="text-white"
            style={{
              backgroundColor: "#2cb3d1",
              display: "block",
              fontWeight: "700",
              padding: "0px",
              textIndent: "5px",
            }}
          >
            Profit & Loss Report
          </span>
          <div className="row">
            <span
              className="col"
              style={{
                display: "block",
                fontWeight: "700",
                padding: "0px",
                textIndent: "5px",
              }}
            >
              <DayPicker mode="single" />
            </span>

            <span
              className="col"
              style={{
                display: "block",
                fontWeight: "700",
                padding: "0px",
                textIndent: "5px",
              }}
            >
              <DayPicker mode="single" />
            </span>
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
      </AppDrawer>
    </>
  );
};

export default ProfitAndLoss;
