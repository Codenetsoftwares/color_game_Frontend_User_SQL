import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LotteryPage.css"; // Add custom styles here
import LotteryTicket from "./LotteryTicket";
import Pagination from "../common/Pagination";

const LotteryPage = () => {
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
  });

  // Generate 100 dummy lottery cards
  useEffect(() => {
    const dummyLotteries = Array.from({ length: 100 }, (v, i) => ({
      lotteryId: i + 1,
      name: `Lottery #${i + 1}`,
      date: new Date(),
      firstPrize: `$${(Math.random() * 10000).toFixed(2)}`,
      ticketNumber: Math.floor(Math.random() * 100000000),
      price: `$${(Math.random() * 100).toFixed(2)}`,
      sem: `Season ${Math.floor(Math.random() * 10) + 1}`,
    }));

    setLotteries(dummyLotteries);
    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(dummyLotteries.length / pagination.limit),
      totalItems: dummyLotteries.length,
    }));
    setLoading(false);
  }, []);

  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems
  );
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle the Buy Now button click (for demo purposes)
  const handleBuyNow = (lotteryId, lotteryName) => {
    alert(`Buying ticket for ${lotteryName} (ID: ${lotteryId})`);
  };

  // Loading state
  if (loading && lotteries.length === 0) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading lotteries...</p>
      </div>
    );
  }

  return (
    <div
      className="container lottery-page-container text-center py-5 mt-3"
      style={{ minHeight: "400px" }}
    >
      {/* Lottery Cards */}
      {lotteries.length > 0 ? (
        <div className="carousel-container position-relative">
          <div className="container-fluid">
            <div className="row justify-content-center">
              {lotteries.slice(startIndex, endIndex).map((lottery, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                  <LotteryTicket
                    lotteryName={lottery.name}
                    drawDate={new Date(lottery.date).toLocaleDateString()}
                    drawTime={new Date(lottery.date).toLocaleTimeString()}
                    firstPrize={lottery.firstPrize}
                    ticketNumber={lottery.ticketNumber}
                    price={lottery.price}
                    sem={lottery.sem}
                    onBuyClick={() =>
                      handleBuyNow(lottery.lotteryId, lottery.name)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="no-lotteries-found mt-5">
            <h2>No lotteries found</h2>
            <p>Please check back later for available lotteries.</p>
          </div>
        )
      )}

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        handlePageChange={handlePageChange}
        startIndex={startIndex + 1}
        endIndex={endIndex}
        totalData={pagination.totalItems}
      />
    </div>
  );
};

export default LotteryPage;
