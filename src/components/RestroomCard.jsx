// RestroomCard.jsx - Component to display individual restroom card
import React from 'react';
import '../styles/RestroomCard.css';
import { getStatusColor, getStatusText, calculateDistance } from '../services/restroomService';

const RestroomCard = ({ restroom, userLocation, onUseRestroom }) => {
  // Calculate distance from user to this restroom
  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    restroom.location.lat,
    restroom.location.lng
  );

  // Get status color and text
  const statusColor = getStatusColor(restroom);
  const statusText = getStatusText(restroom);

  return (
    <div className="restroom-card">
      {/* Restroom Image */}
      <div className="card-image">
        <img src={restroom.image} alt={restroom.name} />
        <div className={`status-badge ${statusColor}`}>
          {statusText}
        </div>
      </div>

      {/* Restroom Info */}
      <div className="card-content">
        <h3 className="restroom-name">{restroom.name}</h3>
        <p className="restroom-address">{restroom.address}</p>

        {/* Status Icons */}
        <div className="status-icons">
          <div className="status-item">
            <span className="icon">💧</span>
            <span className={restroom.hasWater ? 'text-green' : 'text-red'}>
              {restroom.hasWater ? 'Water Available' : 'No Water'}
            </span>
          </div>
          <div className="status-item">
            <span className="icon">✨</span>
            <span>Cleanliness: {restroom.cleanliness}%</span>
          </div>
          <div className="status-item">
            <span className="icon">📍</span>
            <span>{distance} km away</span>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="card-footer">
          <div className="rating">
            <span className="star">⭐</span>
            <span>{restroom.rating}</span>
            <span className="usage-count">({restroom.usageCount} uses)</span>
          </div>
          <div className="price">₦{restroom.price}</div>
        </div>

        {/* Facilities */}
        <div className="facilities">
          {restroom.facilities.map((facility, index) => (
            <span key={index} className="facility-badge">
              {facility}
            </span>
          ))}
        </div>

        {/* Last Updated */}
        <div className="last-updated">
          <span className="icon">🕐</span>
          <span>Updated: {restroom.lastUpdated}</span>
        </div>

        {/* Action Button */}
        <button
          className={`use-button ${restroom.isOccupied ? 'disabled' : ''}`}
          onClick={() => onUseRestroom(restroom)}
          disabled={restroom.isOccupied}
        >
          {restroom.isOccupied ? 'Occupied' : 'Use This Restroom'}
        </button>
      </div>
    </div>
  );
};

export default RestroomCard;