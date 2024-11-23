import React, { useState, useEffect } from "react";

const NewResult = () => {
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxVisibleMarkets = 5;
  const visibleMarkets = markets.slice(
    scrollIndex,
    scrollIndex + maxVisibleMarkets
  );
  const handleScrollLeft = () => {
    if (scrollIndex > 0) setScrollIndex(scrollIndex - 1);
  };
  const handleScrollRight = () => {
    if (scrollIndex + maxVisibleMarkets < markets.length)
      setScrollIndex(scrollIndex + 1);
  };

  const handleOldResults = () => {
    alert("This portion is under development.");
  };
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <div
        className="d-flex align-items-center mt-5  "
        style={{
          backgroundColor: "#4682B4",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Left Arrow */}
        <button
          className="btn btn-light"
          style={{
            padding: "5px 10px",
            fontSize: "18px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
          onClick={handleScrollLeft}
          disabled={scrollIndex === 0}
        >
          &#8249;
        </button>
        {/* Market Buttons */}
        <div
          className="d-flex flex-nowrap justify-content-center"
          style={{
            overflow: "hidden",
            gap: "10px",
          }}
        >
          {visibleMarkets.map((market) => (
            <button
              key={market.marketId}
              className={`btn ${
                market.marketId === selectedMarket?.marketId
                  ? "btn-primary"
                  : "btn-outline-light"
              }`}
              onClick={() => setSelectedMarket(market)}
              style={{
                fontSize: "16px",
                borderRadius: "4px",
                boxShadow:
                  market.marketId === selectedMarket?.marketId
                    ? "0px 4px 6px rgba(0, 0, 0, 0.2)"
                    : "none",
                whiteSpace: "nowrap",
              }}
            >
              {market.marketName}
            </button>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          className="btn btn-light"
          style={{
            padding: "5px 10px",
            fontSize: "18px",
            borderRadius: "50%",
            marginLeft: "10px",
          }}
          onClick={handleScrollRight}
          disabled={scrollIndex + maxVisibleMarkets >= markets.length}
        >
          &#8250;
        </button>
        {/* Old Results Button */}
        <button
          className="btn btn-warning"
          onClick={handleOldResults}
          style={{
            marginLeft: "auto",
            borderRadius: "20px",
            padding: "5px 15px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Old Results
        </button>
      </div>
      {/* Market Result Display */}
      <div className="mt-4">
        <h2 className="text-center fw-bold " style={{ color: "#3b6e91" }}>
          Results For{" "}
          <span style={{ color: "#4682B4" }}>
            {selectedMarket?.marketName || "Selected Market"}
          </span>
        </h2>

     
      </div>
    </div>
  );
};

export default NewResult;
