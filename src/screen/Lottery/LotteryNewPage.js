import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ticketService } from '../../utils/helper';


const LotteryNewPage = () => {
  // State for each dropdown
  const [firstHouse, setFirstHouse] = useState('');
  const [secondHouse, setSecondHouse] = useState('');
  const [thirdHouse, setThirdHouse] = useState('');
  const [semSelection, setSemSelection] = useState('');
  const [generatedTickets, setGeneratedTickets] = useState([]);

  // Options for each house
  const firstHouseOptions = Array.from({ length: 62 }, (_, i) => i + 38); // 38 to 99
  const secondHouseOptions = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'J', 'K', 'L'];
  const semOptions = [5, 10, 25, 50, 100, 200];

  // Function to generate random tickets
  const generateTickets = () => {
    const ticketNumbers = [];
    const semCount = parseInt(semSelection) || 0;

    for (let i = 0; i < semCount; i++) {
      const randomFiveDigitNumber = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
      const ticket = `${firstHouse}-${secondHouse}-${randomFiveDigitNumber}`;
      ticketNumbers.push(ticket);
    }

    setGeneratedTickets(ticketNumbers);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lottery Ticket Generator</h2>

      <div className="row mb-3">
        {/* First House: 38-99 */}
        <div className="col-md-2">
          <label>1st House (38-99)</label>
          <select className="form-control" value={firstHouse} onChange={(e) => setFirstHouse(e.target.value)}>
            <option value="">Select</option>
            {firstHouseOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Second House: A-L (excluding I, F) */}
        <div className="col-md-2">
          <label>2nd House (A-L)</label>
          <select className="form-control" value={secondHouse} onChange={(e) => setSecondHouse(e.target.value)}>
            <option value="">Select</option>
            {secondHouseOptions.map((char) => (
              <option key={char} value={char}>
                {char}
              </option>
            ))}
          </select>
        </div>

        {/* Third House: 00000-99999 */}
        <div className="col-md-3">
          <label>3rd House (00000-99999)</label>
          <input
            className="form-control"
            type="text"
            value={thirdHouse}
            onChange={(e) => setThirdHouse(e.target.value)}
            placeholder="Enter number (00000-99999)"
          />
        </div>

        {/* SEM Selection */}
        <div className="col-md-2">
          <label>SEM Selection</label>
          <select className="form-control" value={semSelection} onChange={(e) => setSemSelection(e.target.value)}>
            <option value="">Select SEM</option>
            {semOptions.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* "In General" Box */}
        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary btn-block" onClick={generateTickets}>
            Generate Tickets
          </button>
        </div>
      </div>

      {/* Display Generated Tickets */}
      <div className="row mt-4">
        <div className="col">
          <h5>Generated Tickets</h5>
          {generatedTickets.length > 0 ? (
            <ul className="list-group">
              {generatedTickets.map((ticket, index) => (
                <li key={index} className="list-group-item">
                  {ticket}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tickets generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LotteryNewPage;
