import React, { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import './LotteryPurchaseHistory.css'; // Optional for additional styling
import { Get_Purchase_Lotteries_History } from '../../utils/apiService';
import Pagination from '../common/Pagination';

const LotteryPurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0
  });
  console.log('response for pagination from usestate',pagination)

  // Fetch data on component mount
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      const response = await Get_Purchase_Lotteries_History({page:pagination.page ,limit:pagination.limit,totalPages:pagination.totalPages,totalItems:pagination.totalItems});
      console.log('response for pagination',response.pagination)
      if (response?.success && response.pagination) {
        setPurchaseHistory(response.data);
        setPagination({
          page: response.pagination.page,
          limit: response.pagination.limit,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems
        }); 
      } else {
        console.error('Failed to fetch purchase history');
      }
      setLoading(false);
    };
    fetchPurchaseHistory();
  }, [pagination.page,, pagination.limit]);

    // Handle page change from pagination component
    const handlePageChange = (newPage) => {
      setPagination((prev) => ({ ...prev, page: newPage }));
    };
 
  const startIndex = (pagination.page - 1) * pagination.limit + 1;
  const endIndex = Math.min(pagination.page * pagination.limit, pagination.totalItems);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" />
        <span className="ml-2 mt-5">Loading...</span>
      </div>
    );
  }

  return (
    <div className='container mt-5 p-3' style={{ background: '#e6f7ff', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
      <h2 className='text-center mb-4' style={{ color: '#4682B4' }}>My Lottery Purchases</h2>
      <Table striped hover responsive bordered className='table-sm'>
        <thead style={{ backgroundColor: '#4682B4', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
          <tr>
            <th>Serial Number</th>
            <th>Lottery Name</th>
            <th>Date Purchased</th>
            <th>Purchased Amount</th>
            <th>SEM</th>
            <th>Ticket Number</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {purchaseHistory.length > 0 ? (
            purchaseHistory.map((purchase, index) => (
              <tr key={purchase.purchaseId}>
                <td>{startIndex + index}</td>
                <td>{purchase.name}</td>
                <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                <td>{purchase.purchaseAmount}</td>
                <td>{purchase.sem}</td>
                <td>{purchase.ticketNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No purchase history available</td>
            </tr>
          )}
        </tbody>
      </Table>

          {/* Pagination Component */}
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
