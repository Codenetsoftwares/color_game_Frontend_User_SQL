import React, { useState } from "react";
import { PurhaseLotteryTicketUser } from "../../utils/apiService";
import { useNavigate } from "react-router-dom";

const SearchLotteryResult = ({ responseData, marketId, setShowSearch }) => {
  const navigate = useNavigate();
  const [purchaseResponse, setPurchaseResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle the purchase button click
  const handleBuy = async (price) => {
    if (!responseData) return;

    const body = {
      generateId: responseData.generateId || "defaultId",
      lotteryPrice: price,
      marketId: marketId,
    };

    try {
      setLoading(true);
      const response = await PurhaseLotteryTicketUser(body);
      console.log("API response:", response);
      setPurchaseResponse(response);
      setTimeout(() => {
        setShowSearch((prev) => !prev);
      }, 2000);
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-5 rounded-4" style={{ background: "#E6F7FF" }}>
      <div className="d-flex align-items-center">
        <button
          className="border-0 px-4 py-1 rounded-3 text-white"
          style={{ backgroundColor: "#1A8096" }}
          onClick={() => setShowSearch(true)}
        >
          Back
        </button>
        <h4
          className="text-center mx-auto"
          style={{ color: "#4682B4", fontWeight: "bold" }}
        >
          Search Results:
        </h4>
      </div>
      <div className="mt-3">
        {responseData &&
        responseData.tickets &&
        responseData.tickets.length > 0 ? (
          <>
            <h4 className="mt-4 fw-bold ">Tickets:</h4>
            <div
              className="mt-4"
              style={{
                maxHeight: responseData.tickets.length > 8 ? "300px" : "auto",
                overflowY: responseData.tickets.length > 8 ? "scroll" : "unset",
                border:
                  responseData.tickets.length > 8 ? "2px solid #1A8096" : "none",
                padding: "10px",
                borderRadius: "3px",
              }}
            >
              <ul style={{ paddingLeft: 0, listStyleType: "none" }}>
                {responseData.tickets.map((ticket, index) => (
                  <li
                    key={index}
                    style={{ color: "black", background: "lightblue", borderRadius:"5px" }}
                    className="fw-bold mt-1"
                  >
                    {ticket}
                  </li>
                ))}
              </ul>
            </div>
            <h5 className="mt-4 fw-bold">
              Price:{" "}
              <span style={{ color: "#3b6e91" }}>₹{responseData.price}</span>
            </h5>
            <h5 className="fw-bold">
              SEM: <span style={{ color: "#3b6e91" }}>{responseData.sem}</span>
            </h5>

            {/* Buy Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-success"
                onClick={() => handleBuy(responseData.price)}
                style={{
                  backgroundColor: "#28a745",
                  padding: "10px 40px",
                  fontWeight: "bold",
                }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Buy"}
              </button>
            </div>

            {purchaseResponse && (
              <div className="mt-4">
                <h5 style={{ color: "#28a745" }}>
                  {purchaseResponse.message || "Purchase successful!"}
                </h5>
              </div>
            )}
          </>
        ) : (
          <h5 style={{ color: "#3b6e91" }}>
            {responseData
              ? responseData.message || "No tickets found."
              : "No data available."}
          </h5>
        )}
      </div>
    </div>
  );
};

export default SearchLotteryResult;
