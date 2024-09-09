import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LotteryPage.css'; // Add custom styles here
import { Get_Lotteries } from '../../utils/apiService';


const LotteryPage = () => {
  const [lotteries, setLotteries] = useState([]); // State for lottery data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); 

  // Fetch lottery data on component mount
  useEffect(() => {
    const fetchLotteries = async () => {
      try {
        setLoading(true);
        const response = await Get_Lotteries();
        setLotteries(response.data || []); // Assuming response.data contains the lottery array
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch lotteries');
        setLoading(false);
      }
    };

    fetchLotteries();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading lotteries...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container lottery-page-container text-center py-5 mt-3">
      <h2 className="lottery-heading mb-4">Lottery</h2>

      {/* Blinking "Coming Soon" Message */}
      <div className="coming-soon alert alert-warning" role="alert">
        <p>The Game is <span className="blink">Coming Soon</span>!</p>
      </div>

      {/* Lottery Cards */}
      <div className="row justify-content-center">
        {lotteries.map((lottery, index) => (
          <div className="col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card lottery-card shadow-sm">
              <div className="card-body">
                <p className="card-text">{lottery.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotteryPage;
