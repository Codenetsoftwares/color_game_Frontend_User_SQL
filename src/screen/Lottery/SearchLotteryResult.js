import React from 'react'

const SearchLotteryResult = ({ responseData }) => {
    console.log('response data line 4 lottery result',responseData)
    return (
        <div className="text-center">
            <h4 style={{ color: "#4682B4", fontWeight: "bold" }}>
                Search Results:
            </h4>
            <div className="mt-3">
                {responseData &&
                    responseData.tickets &&
                    responseData.tickets.length > 0 ? (
                    <>
                        <h5>Tickets:</h5>
                        <ul>
                            {responseData.tickets.map((ticket, index) => (
                                <li key={index} style={{ color: "#3b6e91" }}>
                                    {ticket}
                                </li>
                            ))}
                        </ul>
                        <h5>
                            Price:{" "}
                            <span style={{ color: "#3b6e91" }}>
                                ₹{responseData.price}
                            </span>
                        </h5>
                        <h5>
                            SEM:{" "}
                            <span style={{ color: "#3b6e91" }}>{responseData.sem}</span>
                        </h5>

                        {/* Buy Button */}
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-success"
                                onClick={()=>handleBuy}
                                style={{
                                    backgroundColor: "#28a745",
                                    padding: "10px 40px",
                                    fontWeight: "bold",
                                }}
                            >
                                Buy
                            </button>
                        </div>
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
    )
}

export default SearchLotteryResult