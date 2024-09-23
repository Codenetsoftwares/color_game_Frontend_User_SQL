import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LotteryPage.css"; // Add custom styles here
import { Get_Lotteries, Get_Lotteries_dummy, Purchase_lottery } from "../../utils/apiService";
import LotteryTicket from "./LotteryTicket";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Oval } from "react-loader-spinner";

const LotteryPage = () => {
  const [lotteries, setLotteries] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageLimit = 10;
  
  
  // Fetch lottery data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await  Get_Lotteries({
        page: page,
        pageLimit: pageLimit
      });
      console.log("response", response.lotteries)
      const newLotteries = response.data;
      console.log( '=== >>> new lotteries',newLotteries)
      setLotteries((prevLotteries) => [...prevLotteries, ...newLotteries]);

      if (response.lotteries) {
        // const newLotteries = response[0].lotteries;
        // console.log( '=== >>> new lotteries',newLotteries)

        // setLotteries((prevLotteries) => [...prevLotteries, ...newLotteries]);

        if (newLotteries.length < pageLimit) {
          setHasMore(false); // No more data to load
        }
      
      }
    } 
    
   
    finally {
      setLoading(false);
    }
  };
 const fetchMoreData = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      
    }
  };
  useEffect(() => {
  fetchData(); // Fetch data  when we reaches at end ,initially and whenever the page changes
  }, [page]);
  
  console.log("======>>> response for lotteries", lotteries);
  
  

  

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
            // Remove the purchased lottery from the lotteries state
            setLotteries((prevLotteries) =>
              prevLotteries.filter((lottery) => lottery.lotteryId !== lotteryId)
            );
      } catch (error) {
        console.error("===>> error in purchase", error);
        alert("Ticket purchase failed. Please try again.");
      }
    } else {
      console.log("Purchase canceled");
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
    <div
      className="container lottery-page-container text-center py-5 mt-3"
      style={{ minHeight: "400px" }}
    >
      {/* Development Notice */}
      {/* <div className="alert alert-info">
        <p>This page is currently under development. Some features may not be fully functional yet.</p>
      </div> */}
      {/* Blinking "Coming Soon" Message */}
      {/* <div className="coming-soon alert alert-warning" role="alert">
        <p>
          The Game is <span className="blink">Coming Soon</span>!
        </p>
      </div> */}

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
     <InfiniteScroll
      dataLength={lotteries.length} // Track the length of the items array
      next={fetchMoreData} //function to load more data when we reaches at the end
      hasMore={hasMore}   //tell whether there is more data to load or not
      loader={
        <div className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <Oval
              height={40}
              width={40}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
      }
    endMessage={
      <p style={{ textAlign: "center" }}>
        <b>No more data to load</b>
      </p>
    }
  >

{/* {
            "lotteryId": "2723afdc-f93a-495f-87db-c8c24ffc38c0",
            "name": "Lottery 1",
            "date": "2024-06-03T06:15:49.067Z",
            "createdAt": "2024-09-20T06:59:55.435Z",
            "firstPrize": 545043,
            "isPurchased": true,
            "price": 10,
            "sem": 50
        }, */}
       
        {/* Lottery Cards */}
        {lotteries.length > 0 ? (
          <div className="carousel-container position-relative">
            <div className="container-fluid">
              <div className="row justify-content-center">
                {lotteries.map((lottery, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-4 " key={index}>
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
        </InfiniteScroll>
        

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
