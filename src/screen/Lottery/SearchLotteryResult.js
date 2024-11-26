import React, { useState } from "react";
import { PurhaseLotteryTicketUser } from "../../utils/apiService";
import { useNavigate } from "react-router-dom";


const SearchLotteryResult = ({ responseData, marketId }) => {
  console.log('====>>>> responseData', marketId);

  const navigate = useNavigate();
  const [purchaseResponse, setPurchaseResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle the purchase button click
  // const handleBuy = async (price) => {
  //   if (!responseData) return;

  //   const body = {
  //     generateId: responseData.generateId || "defaultId",

  //     lotteryPrice: responseData.price || "5.00",
  //     marketId: marketId || "defaultMarketId"  // Pass marketId to the body

  //     lotteryPrice: price,

  //   };

  //   try {
  //     setLoading(true);
  //     const response = await PurhaseLotteryTicketUser(body); // Use updated body
  //     console.log("API response:", response);
  //     setPurchaseResponse(response);
  //     setTimeout(() => {

  //       // window.location.reload();

  //       setShowSearch(prev=>!prev)

  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error purchasing ticket:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleBuy = async () => {
    if (!responseData) return;

    const body = {
      generateId: responseData.generateId || "defaultId",
      lotteryPrice: responseData.price || "5.00",
      marketId: marketId || "defaultMarketId"  // Pass marketId to the body
    };

    try {
      setLoading(true);
      const response = await PurhaseLotteryTicketUser(body); // Use updated body
      console.log("API response:", response);
      setPurchaseResponse(response);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h4 style={{ color: "#4682B4", fontWeight: "bold" }}>Search Results:</h4>
      <div className="mt-3">
        {responseData &&
          responseData.tickets &&
          responseData.tickets.length > 0 ? (
          <>
            <h5>Tickets:</h5>
            <div
              style={{
                maxHeight: responseData.tickets.length > 8 ? "200px" : "auto",
                overflowY: responseData.tickets.length > 8 ? "scroll" : "unset",
                border: responseData.tickets.length > 8 ? "1px solid #ccc" : "none",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <ul style={{ paddingLeft: 0, listStyleType: "none" }}>
                {responseData.tickets.map((ticket, index) => (
                  <li key={index} style={{ color: "#3b6e91" }}>
                    {ticket}
                  </li>
                ))}
              </ul>
            </div>
            <h5>
              Price:{" "}
              <span style={{ color: "#3b6e91" }}>₹{responseData.price}</span>
            </h5>
            <h5>
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
