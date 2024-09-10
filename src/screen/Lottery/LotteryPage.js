import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LotteryPage.css"; // Add custom styles here
import { Get_Lotteries, Purchase_lottery } from "../../utils/apiService";
import LotteryTicket from "./LotteryTicket";

const LotteryPage = () => {
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch lottery data
  async function fetchLotteries(page) {
    setLoading(true);
    try {
      const response = await Get_Lotteries({
        pageNumber: page,
        pageSize: limit,
        totalItems: totalItems,
        pageLimit: limit,
      });

      console.log("======>>> response for lotteries", response);

      if (response.success) {
        setLotteries((prev) => {
          // Append new data and remove duplicates
          const updatedLotteries = [...prev, ...response.data];
          const uniqueLotteries = Array.from(
            new Set(updatedLotteries.map((a) => a.lotteryId))
          ).map((id) => {
            return updatedLotteries.find((a) => a.lotteryId === id);
          });
          return uniqueLotteries;
        });
        setTotalPages(response.pagination.totalPages); // Set total pages
        setLimit(response.pagination.limit); // Set page limit
        setTotalItems(response.pagination.totalItems);
      }
    } catch (error) {
      console.error("Failed to fetch lotteries", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLotteries(page);
  }, [page, totalPages, totalItems, limit]);

  // Handle the Buy Now button click
  const handleBuyNow = async (lotteryId, lotteryName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to buy a ticket for the lottery: ${lotteryName}?`
    );

    if (isConfirmed) {
      try {
        const response = await Purchase_lottery({ lotteryId });
        console.log("===>> response for purchase", response);
        alert("Ticket purchase successful!");
      } catch (error) {
        console.error("===>> error in purchase", error);
        alert("Ticket purchase failed. Please try again.");
      }
    } else {
      console.log("Purchase canceled");
    }
  };

  // Handle next and previous navigation
  const handleNext = () => {
    console.log("Next button clicked");
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      console.log("Already on the last page");
    }
  };

  const handlePrev = () => {
    console.log("Previous button clicked");
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      console.log("Already on the first page");
    }
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
    <div className="container lottery-page-container text-center py-5 mt-3" style={{ minHeight: "400px" }}>
       {/* Development Notice */}
       <div className="alert alert-info">
        <p>This page is currently under development. Some features may not be fully functional yet.</p>
      </div>
      {/* Blinking "Coming Soon" Message */}
      <div className="coming-soon alert alert-warning" role="alert">
        <p>
          The Game is <span className="blink">Coming Soon</span>!
        </p>
      </div>

      {/* Lottery Carousel */}
      <div className="carousel-container position-relative">
        {/* Left Arrow */}
        {/* <a
          className="carousel-control-prev"
          role="button"
          onClick={handlePrev}
          style={{ opacity: page === 1 ? 0.5 : 1 }} // Disable previous arrow if on the first page
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a> */}

        {/* Lottery Cards */}
        {lotteries.length > 0 ? (
          <div className="carousel-container position-relative">
            <div className="container-fluid">
              <div className="row justify-content-center">
                {lotteries.map((lottery, index) => (
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
          !loading &&
          lotteries.length === 0 && (
            <div className="no-lotteries-found mt-5">
              <h2>No lotteries found</h2>
              <p>Please check back later for available lotteries.</p>
            </div>
          )
        )}

        {/* Right Arrow */}
        {/* <a
          className="carousel-control-next"
          role="button"
          onClick={handleNext}
          style={{ opacity: page === totalPages ? 0.5 : 1 }} // Disable next arrow if on the last page
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a> */}
      </div>

      {/* Loading Spinner for Pagination */}
      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading more lotteries...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotteryPage;
