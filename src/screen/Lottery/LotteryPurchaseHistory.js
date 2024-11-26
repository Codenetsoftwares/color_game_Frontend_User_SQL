import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import Pagination from "../common/Pagination";
import {
  GetPurchaseHistoryMarketTimings,
  lotteryPurchaseHIstoryUserNew,
} from "../../utils/apiService";

const LotteryPurchaseHistory = ({ MarketId }) => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
  });

  const [markets, setMarkets] = useState([]);
  const [selectedMarketId, setSelectedMarketId] = useState(MarketId);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await GetPurchaseHistoryMarketTimings();
        if (response?.success) {
          setMarkets(response.data || []);
          if (!selectedMarketId && response.data.length > 0) {
            setSelectedMarketId(response.data[0].marketId);
          }
        } else {
          console.error("Failed to fetch markets");
        }
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    };

    fetchMarketData();
  }, [MarketId]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (!selectedMarketId) return;

      try {
        const response = await lotteryPurchaseHIstoryUserNew({
          marketId: selectedMarketId,
          page: pagination.page,
          limit: pagination.limit,
        });

        if (response?.success) {
          const filteredData = response.data.map((item) => ({
            drawDate: item.drawDate,
            tickets: item.tickets,
            price: item.price,
            userName: item.userName,
            sem: item.sem,
          }));

          setPurchaseHistory(filteredData);
          setPagination({
            page: response.pagination?.page || 1,
            limit: response.pagination?.limit || 10,
            totalPages: response.pagination?.totalPages || 0,
            totalItems: response.pagination?.totalItems || 0,
          });
        } else {
          console.error("Failed to fetch purchase history");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, [selectedMarketId, pagination.page, pagination.limit]);

  const handleMarketClick = (marketId) => {
    setSelectedMarketId(marketId);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset pagination on market change
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const startIndex = (pagination.page - 1) * pagination.limit + 1;
  const endIndex = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
        <span className="ml-2 mt-5">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className="container mt-5 p-3"
      style={{
        background: "#e6f7ff",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      }}
    >
      {/* Top Navigation for Markets */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Markets</h4>
        <div className="d-flex flex-wrap">
          {markets.length > 0 ? (
            markets.map((market) => (
              <span
                key={market.marketId}
                className={`badge ${
                  selectedMarketId === market.marketId
                    ? "bg-success"
                    : "bg-primary"
                } me-2`}
                style={{ cursor: "pointer" }}
                onClick={() => handleMarketClick(market.marketId)}
              >
                {market.marketName}
              </span>
            ))
          ) : (
            <span>No markets available</span>
          )}
        </div>
      </div>
      <h2 className="text-center mb-4" style={{ color: "#4682B4" }}>
        My Lottery Purchases
      </h2>
      <Table striped hover responsive bordered className="table-sm">
        <thead
          style={{
            backgroundColor: "#4682B4",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <tr>
            <th>Serial Number</th>
            <th>Draw Time</th>
            <th>Price</th>
            <th>SEM</th>
            <th>Ticket Numbers</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {purchaseHistory.length > 0 ? (
            purchaseHistory.map((purchase, index) => (
              <tr key={index}>
                <td>{startIndex + index}</td>
                <td>{purchase.drawDate || "N/A"}</td>
                <td>{purchase.price !== undefined ? purchase.price : "N/A"}</td>
                <td>{purchase.sem || "N/A"}</td>
                <td>
                  {/* Dropdown for ticket numbers */}
                  <div className="dropdown" style={{ position: "relative" }}>
                    <button
                      className="btn btn-link dropdown-toggle"
                      type="button"
                      onClick={() => toggleDropdown(index)}
                    >
                      View Tickets
                    </button>
                    {dropdownOpen === index && (
                      <div className="custom-dropdown-menu">
                        <span className="dropdown-item-text">
                          Ticket Numbers:
                        </span>
                        <div className="dropdown-divider" />
                        <div
                          className="ticket-list"
                          style={{
                            maxHeight: "150px",
                            overflowY:
                              purchase.tickets.length > 8 ? "auto" : "visible",
                          }}
                        >
                          {Array.isArray(purchase.tickets) &&
                          purchase.tickets.length > 0 ? (
                            purchase.tickets.map((number, i) => (
                              <span key={i} className="dropdown-item">
                                {number}
                              </span>
                            ))
                          ) : (
                            <span className="dropdown-item text-muted">
                              No ticket numbers available
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td>{purchase.userName || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No purchase history available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        handlePageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalData={pagination.totalItems}
      />
    </div>
  );
};

export default LotteryPurchaseHistory;
