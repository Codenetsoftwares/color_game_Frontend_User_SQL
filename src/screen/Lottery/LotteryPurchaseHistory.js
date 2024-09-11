import React, { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import './LotteryPurchaseHistory.css'; // Optional for additional styling
import { Get_Purchase_Lotteries_History } from '../../utils/apiService';

const LotteryPurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      const response = await Get_Purchase_Lotteries_History();
      if (response?.success) {
        setPurchaseHistory(response.data);
      } else {
        console.error('Failed to fetch purchase history');
      }
      setLoading(false); // Set loading to false after the data is fetched
    };
    fetchPurchaseHistory();
  }, []);

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
                <td>{index + 1}</td>
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
    </div>
  );
};

export default LotteryPurchaseHistory;
