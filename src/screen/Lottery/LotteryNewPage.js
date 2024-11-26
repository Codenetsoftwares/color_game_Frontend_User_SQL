import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LotteryNewPage.css";
import { LotteryRange, SearchLotteryTicketUser } from "../../utils/apiService";
import SearchLotteryResult from "./SearchLotteryResult";
import { getLotteryRange } from "../../utils/getInitiateState";

const LotteryNewPage = ({ drawId }) => {

  console.log('====>>>> line number 10',drawId)
  const [sem, setSem] = useState("");
  const [group, setGroup] = useState("");
  const [series, setSeries] = useState("");
  const [number, setNumber] = useState("");
  const [isGroupPickerVisible, setIsGroupPickerVisible] = useState(false);
  const [isSeriesPickerVisible, setIsSeriesPickerVisible] = useState(false);
  const [isNumberPickerVisible, setIsNumberPickerVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const [lotteryRange, setLotteryRange] = useState(getLotteryRange());
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]); // For filtered groups
  const [filteredSeries, setFilteredSeries] = useState([]); // For filtered series
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [seriesList, setSeriesList] = useState([]);
  const [marketIds, setMarketIds] = useState([]); 
  const [marketName, setMarketName] = useState("");
  console.log('===>> marketName',marketName)

  console.log('response from this page')

  // Fetch lottery range data when component mounts
 // Handle market data update when drawId changes
 useEffect(() => {
  const handleLotteryRange = async () => {
    try {
      const data = await LotteryRange(); // Fetch data from the API

      if (data && data.data) {
        // Filter the data to find the market with the matching marketId
        const filteredMarket = data.data.filter((item) => item.marketId === drawId);

        if (filteredMarket.length > 0) {
          const currentMarket = filteredMarket[0];

          // Set the market name
          setMarketName(currentMarket.marketName || "Unknown Market");

          // Set lottery range values based on the matched market
          setLotteryRange({
            group_start: currentMarket.group_start || "",
            group_end: currentMarket.group_end || "",
            series_start: currentMarket.series_start || "",
            series_end: currentMarket.series_end || "",
            number_start: currentMarket.number_start || 0,
            number_end: currentMarket.number_end || 0,
          });

          // Update the filtered values based on the new market range
          setFilteredNumbers(generateNumbers(currentMarket.number_start, currentMarket.number_end));
          setFilteredGroups(generateGroups(currentMarket.group_start, currentMarket.group_end));
          setFilteredSeries(generateSeries(currentMarket.series_start, currentMarket.series_end));
        } else {
          console.warn("No market found matching the given drawId");
          setMarketName("Unknown Market");
          setLotteryRange({});
          setFilteredNumbers([]);
          setFilteredGroups([]);
          setFilteredSeries([]);
        }
      } else {
        console.warn("LotteryRange returned null or undefined data");
      }
    } catch (error) {
      console.error("Error fetching lottery range:", error);
    }
  };

  handleLotteryRange();
}, [drawId]);

  // const handleLotteryRange = async () => {
  //   const data = await LotteryRange();
  //   setLotteryRange({
  //     group_start: data.data.group_start || "",
  //     group_end: data.data.group_end || "",
  //     series_start: data.data.series_start || "",
  //     series_end: data.data.series_end || "",
  //     number_start: data.data.number_start || 0,
  //     number_end: data.data.number_end || 0,
  //   });

  //   // Initialize the filtered numbers and groups based on the fetched range
  //   setFilteredNumbers(generateNumbers(data.data.number_start, data.data.number_end));
  //   setFilteredGroups(generateGroups(data.data.group_start, data.data.group_end)); // Initialize groups
  //   setSeriesList(generateSeries(data.data.series_start, data.data.series_end));
  //   setFilteredSeries(generateSeries(data.data.series_start, data.data.series_end)); // Initialize series
  // };

  // const handleLotteryRange = async () => {
  //   try {
  //     const data = await LotteryRange();
  //     console.log('====>>> response', data)
      
  //     if (data && data.data) {

  //       const currentMarket = data.data.find((item) => item.marketId === drawId);
  //       setMarketName(currentMarket?.marketName || "Unknown Market");
  //       const allMarketIds = data.data.map((item) => item.marketId === drawId);
  //       setMarketIds(allMarketIds);
  //       setLotteryRange({
  //         group_start: data.data.group_start || "",
  //         group_end: data.data.group_end || "",
  //         series_start: data.data.series_start || "",
  //         series_end: data.data.series_end || "",
  //         number_start: data.data.number_start || 0,
  //         number_end: data.data.number_end || 0,
  //       });
  
  //       // Initialize the filtered numbers and groups based on the fetched range
  //       setFilteredNumbers(generateNumbers(data.data.number_start || 0, data.data.number_end || 0));
  //       setFilteredGroups(generateGroups(data.data.group_start || 0, data.data.group_end || 0)); 
  //       setSeriesList(generateSeries(data.data.series_start || "A", data.data.series_end || "Z"));
  //       setFilteredSeries(generateSeries(data.data.series_start || "A", data.data.series_end || "Z"));
  //     } else {
  //       console.warn("LotteryRange returned null or undefined data");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching lottery range:", error);
  //   }
  // };

  // const handleLotteryRange = async () => {
  //   try {
  //     const data = await LotteryRange(); // Fetch data from the API
  //     console.log("====>>> response", data);
  
  //     if (data && data.data) {
  //       // Filter the data to find the market with the matching marketId
  //       const filteredMarket = data.data.filter((item) => item.marketId === drawId);
  
  //       if (filteredMarket.length > 0) {
  //         // We assume there's only one match, but filter will return an array.
  //         const currentMarket = filteredMarket[0];
  
  //         // Set the market name or default to "Unknown Market"
  //         setMarketName(currentMarket.marketName || "Unknown Market");
  
  //         // Set lottery range values based on the matched market
  //         setLotteryRange({
  //           group_start: currentMarket.group_start || "",
  //           group_end: currentMarket.group_end || "",
  //           series_start: currentMarket.series_start || "",
  //           series_end: currentMarket.series_end || "",
  //           number_start: currentMarket.number_start || 0,
  //           number_end: currentMarket.number_end || 0,
  //         });
  
  //         // Generate and set filtered data based on the current market range
  //         setFilteredNumbers(generateNumbers(currentMarket.number_start || 0, currentMarket.number_end || 0));
  //         setFilteredGroups(generateGroups(currentMarket.group_start || 0, currentMarket.group_end || 0));
  //         setSeriesList(generateSeries(currentMarket.series_start || "A", currentMarket.series_end || "Z"));
  //         setFilteredSeries(generateSeries(currentMarket.series_start || "A", currentMarket.series_end || "Z"));
  
  //         // Update the marketIds list (if needed)
  //         const allMarketIds = data.data.map((item) => item.marketId);
  //         setMarketIds(allMarketIds);
  //       } else {
  //         // If no matching market is found
  //         console.warn("No market found matching the given drawId");
  //         setMarketName("Unknown Market");
  //         setLotteryRange({});
  //         setFilteredNumbers([]);
  //         setFilteredGroups([]);
  //         setSeriesList([]);
  //         setFilteredSeries([]);
  //       }
  //     } else {
  //       console.warn("LotteryRange returned null or undefined data");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching lottery range:", error);
  //   }
  // };
  
  
  const handleSemChange = (e) => {
    setSem(e.target.value);
  };

  // Dynamically generate series based on the range from the API
  const generateSeries = (start, end) => {
    const letters = [];
    for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
      const letter = String.fromCharCode(i);
      if (letter !== 'I' && letter !== 'F') {
        letters.push(letter);
      }
    }
    return letters;
  };

  // Generate groups within a specified range
  const generateGroups = (start, end) => {
    return Array.from({ length: Math.abs(end - start) + 1 }, (_, i) => (i + start).toString());
  };

  const renderSeriesGrid = () => {
    return (
      <div className="calendar-grid">
        {filteredSeries.length === 0 ? (
          <div className="text-center">No Results</div>
        ) : (
          filteredSeries.map((letter) => (
            <button
              key={letter}
              className="calendar-cell"
              onClick={() => handleSeriesSelect(letter)}
            >
              {letter}
            </button>
          ))
        )}
      </div>
    );
  };

  const renderGroupGrid = () => {
    return (
      <div className="calendar-grid">
        {filteredGroups.length === 0 ? (
          <div className="text-center">No Results</div>
        ) : (
          filteredGroups.map((group) => (
            <button
              key={group}
              className="calendar-cell"
              onClick={() => handleGroupSelect(group)}
            >
              {group}
            </button>
          ))
        )}
      </div>
    );
  };

  const handleGroupSelect = (value) => {
    setGroup(value);
    setIsGroupPickerVisible(false);
  };

  const handleSeriesSelect = (value) => {
    setSeries(value);
    setIsSeriesPickerVisible(false);
  };

  // Generate numbers within a specified range
  const generateNumbers = (start, end) => {
    const actualStart = Math.min(start, end);
    const actualEnd = Math.max(start, end);
    return Array.from({ length: actualEnd - actualStart + 1 }, (_, i) => i + actualStart);
  };

  // Debounced filter function for number, group, and series inputs
  const debouncedFilter = useCallback(
    (value, type) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout); // Clear previous timeout
      }

      const timeout = setTimeout(() => {
        let filtered = [];
        switch (type) {
          case "number":
            filtered = generateNumbers(lotteryRange.number_start, lotteryRange.number_end).filter((num) =>
              num.toString().startsWith(value)
            );
            setFilteredNumbers(filtered);
            break;
          case "group":
            if (value) {
              filtered = filteredGroups.filter((group) =>
                group.startsWith(value)
              );
              setFilteredGroups(filtered);
            } else {
              // Reset to all groups if input is empty
              setFilteredGroups(generateGroups(lotteryRange.group_start, lotteryRange.group_end));
            }
            break;
          case "series":
            if (value) {
              filtered = filteredSeries.filter((series) =>
                series.startsWith(value)
              );
              setFilteredSeries(filtered);
            } else {
              // Reset to all series if input is empty
              setFilteredSeries(generateSeries(lotteryRange.series_start, lotteryRange.series_end));
            }
            break;
          default:
            break;
        }
      }, 1500);

      setDebounceTimeout(timeout);
    },
    [lotteryRange, debounceTimeout, filteredGroups, filteredSeries]
  );

  const handleNumberInputChange = (e) => {
    const inputValue = e.target.value;
    setNumber(inputValue);
    debouncedFilter(inputValue, "number"); // Pass type as "number"
  };

  const handleGroupInputChange = (e) => {
    const inputValue = e.target.value;
    setGroup(inputValue);
    debouncedFilter(inputValue, "group"); // Pass type as "group"
  };

  const handleSeriesInputChange = (e) => {
    const inputValue = e.target.value;
    setSeries(inputValue);
    debouncedFilter(inputValue, "series"); // Pass type as "series"
  };

  const handleNumberSelect = (value) => {
    setNumber(value);
    setIsNumberPickerVisible(false);
  };

  const renderNumberGrid = () => {
    return (
      <div className="calendar-grid" >
        {filteredNumbers.length === 0 ? (
          <div className="text-center">No Results</div>
        ) : (
          filteredNumbers.map((num) => (
            <button
              key={num}
              className="calendar-cell"
              onClick={() => handleNumberSelect(num.toString().padStart(5, "0"))}
            >
              {num.toString().padStart(5, "0")}
            </button>
          ))
        )}
      </div>
    );
  };

  const handleSearch = async () => {
    const requestBody = {
      group: group ? parseInt(group) : null,
      series: series || null,
      number: number || null,
      sem: sem ? parseInt(sem) : null,
      marketId : drawId

    };

    try {
      const response = await SearchLotteryTicketUser(requestBody);
      setResponseData(response.data);
      setShowSearch(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFocus = (type) => {
    setIsGroupPickerVisible(type === "group");
    setIsSeriesPickerVisible(type === "series");
    setIsNumberPickerVisible(type === "number");
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center mt-5"
      style={{ minHeight: "75vh", backgroundColor: "#f0f4f8" }}
    >
      <div
        className="border border-3 rounded-3 shadow-lg"
        style={{
          padding: "40px",
          width: "80%",
          maxWidth: "800px",
          backgroundColor: "#ffffff",
        }}
      >
        {showSearch ? (
          <>
            <div className="text-center mb-4">

            <h2
            className="mb-1"
            style={{
              color: "#ff4500",
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "2rem",
            }}
          >
            {marketName}
          </h2>
              <h2 className="mb-1" style={{ color: "#ff4500", fontWeight: "bold", letterSpacing: "1px", fontSize: "2rem" }}>
                🎉 Find Your Lucky Ticket & Win Big! 🎟️
              </h2>
              <p style={{ color: "#6c757d" }}>Search by Sem, Group, Series, or Number</p>
            </div>

            {/* Sem Input */}
            <div className="mb-3">
              <label className="form-label">SEM</label>
              <select className="form-select" value={sem} onChange={handleSemChange}>
                <option value="">Select Sem</option>
                {[5, 10, 25, 50, 100, 200].map((semValue) => (
                  <option key={semValue} value={semValue}>
                    {semValue}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Input */}
            <div className="mb-3">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Group"
                  className="form-control"
                  value={group}
                  onFocus={() => handleFocus("group")}
                  onChange={handleGroupInputChange} // Allow manual input
                />
                {isGroupPickerVisible && <div className="picker-dropdown">{renderGroupGrid()}</div>}
              </div>
            </div>

            {/* Series Input */}
            <div className="mb-3">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Series"
                  className="form-control"
                  value={series}
                  onFocus={() => handleFocus("series")}
                  onChange={handleSeriesInputChange} // Allow manual input
                />
                {isSeriesPickerVisible && <div className="picker-dropdown">{renderSeriesGrid()}</div>}
              </div>
            </div>

            {/* Number Input */}
            <div className="mb-3">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Number"
                  className="form-control"
                  value={number}
                  onFocus={() => handleFocus("number")}
                  onChange={handleNumberInputChange}
                />
                {isNumberPickerVisible && <div className="picker-dropdown">{renderNumberGrid()}</div>}
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleSearch}
              style={{
                width: "100%",
                backgroundColor: "#4682B4",
                border: "none",
                padding: "10px",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Search 
            </button>
          </>
        ) : (
          <SearchLotteryResult responseData={responseData} marketId={drawId}  />
        )}
      </div>
    </div>
  );
};

export default LotteryNewPage;
