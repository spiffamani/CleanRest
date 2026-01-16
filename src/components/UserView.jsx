// UserView.jsx - Main user interface for finding and using restrooms
import React, { useState, useEffect } from 'react';
import RestroomCard from './RestroomCard';
import '../styles/UserView.css';
import { restrooms as initialRestrooms, userLocation } from '../data/restroomData';
import { simulateSensorUpdate, processQRPayment, recordUsage, sortByDistance } from '../services/restroomService';

const UserView = () => {
  const [restrooms, setRestrooms] = useState(initialRestrooms);
  const [view, setView] = useState('list'); // 'list' or 'map'
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Simulate real-time sensor updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRestrooms(prevRestrooms => 
        prevRestrooms.map(restroom => simulateSensorUpdate(restroom))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle "Use Restroom" button click
  const handleUseRestroom = (restroom) => {
    setSelectedRestroom(restroom);
    setShowQRScanner(true);
  };

  // Handle QR code scan payment
  const handleScanQR = () => {
    setIsScanning(true);

    // Process payment (simulated)
    processQRPayment(selectedRestroom, (result) => {
      if (result.success) {
        setIsScanning(false);
        setPaymentSuccess(true);

        // Record usage and update restroom status
        setRestrooms(prevRestrooms =>
          prevRestrooms.map(r =>
            r.id === selectedRestroom.id ? recordUsage(r) : r
          )
        );

        // Close scanner after 3 seconds
        setTimeout(() => {
          setShowQRScanner(false);
          setPaymentSuccess(false);
          setSelectedRestroom(null);
        }, 3000);
      }
    });
  };

  // Close scanner
  const closeScanner = () => {
    setShowQRScanner(false);
    setSelectedRestroom(null);
    setIsScanning(false);
    setPaymentSuccess(false);
  };

  // Filter restrooms based on selected filter
  const getFilteredRestrooms = () => {
    let filtered = [...restrooms];

    if (filterStatus === 'available') {
      filtered = filtered.filter(r => !r.isOccupied && r.hasWater);
    } else if (filterStatus === 'nearest') {
      filtered = sortByDistance(filtered, userLocation.lat, userLocation.lng);
    }

    return filtered;
  };

  const filteredRestrooms = getFilteredRestrooms();

  return (
    <div className="user-view">
      {/* Header Section */}
      <div className="user-header">
        <h1>🚻 Find a Clean Restroom</h1>
        <p>Quick, affordable, and reliable restroom access</p>
        <div className="live-indicator">
          <span className="pulse-dot"></span>
          <span>Live sensor updates</span>
        </div>
      </div>

      {/* View Toggle and Filter */}
      <div className="controls">
        <div className="view-toggle">
          <button
            className={view === 'list' ? 'active' : ''}
            onClick={() => setView('list')}
          >
            📋 List View
          </button>
          <button
            className={view === 'map' ? 'active' : ''}
            onClick={() => setView('map')}
          >
            🗺️ Map View
          </button>
        </div>

        <div className="filter-section">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Restrooms</option>
            <option value="available">Available Only</option>
            <option value="nearest">Nearest First</option>
          </select>
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="restrooms-grid">
          {filteredRestrooms.map(restroom => (
            <RestroomCard
              key={restroom.id}
              restroom={restroom}
              userLocation={userLocation}
              onUseRestroom={handleUseRestroom}
            />
          ))}
        </div>
      )}

      {/* Map View */}
      {view === 'map' && (
        <div className="map-view">
          <div className="map-placeholder">
            <h2>🗺️ Map View</h2>
            <p>Restroom locations on map</p>
            <div className="map-markers">
              {filteredRestrooms.map(restroom => (
                <div key={restroom.id} className="map-marker-item">
                  <span className="marker-icon">📍</span>
                  <div className="marker-info">
                    <strong>{restroom.name}</strong>
                    <span className={`marker-status ${restroom.isOccupied ? 'occupied' : 'available'}`}>
                      {restroom.isOccupied ? 'Occupied' : 'Available'}
                    </span>
                  </div>
                  <button
                    className="navigate-btn"
                    onClick={() => handleUseRestroom(restroom)}
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="modal-overlay" onClick={closeScanner}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {!paymentSuccess ? (
              <>
                <h2>Scan QR Code</h2>
                <p className="restroom-name">{selectedRestroom?.name}</p>
                <p className="price-info">Amount: ₦{selectedRestroom?.price}</p>

                <div className="qr-scanner-box">
                  {isScanning ? (
                    <div className="scanning-animation">
                      <div className="scanner-line"></div>
                      <p>Processing payment...</p>
                    </div>
                  ) : (
                    <div className="qr-code-placeholder">
                      <div className="qr-code">
                        <div className="qr-pattern"></div>
                      </div>
                      <p>Position QR code in frame</p>
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    className="scan-button"
                    onClick={handleScanQR}
                    disabled={isScanning}
                  >
                    {isScanning ? 'Scanning...' : 'Scan Now'}
                  </button>
                  <button className="cancel-button" onClick={closeScanner}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h2>Payment Successful!</h2>
                <p>Door unlocking...</p>
                <p className="enjoy-text">Enjoy your visit!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserView;