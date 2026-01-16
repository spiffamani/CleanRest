// AdminView.jsx - Admin dashboard for managing entire system
import React, { useState } from 'react';
import '../styles/AdminView.css';
import { restrooms as initialRestrooms } from '../data/restroomData';

const AdminView = () => {
  const [restrooms, setRestrooms] = useState(initialRestrooms);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRestroom, setEditingRestroom] = useState(null);
  const [newRestroom, setNewRestroom] = useState({
    name: '',
    address: '',
    price: 50,
    lat: 0,
    lng: 0
  });

  // Calculate statistics
  const totalRestrooms = restrooms.length;
  const totalRevenue = restrooms.reduce((sum, r) => sum + (r.usageCount * r.price), 0);
  const totalUsage = restrooms.reduce((sum, r) => sum + r.usageCount, 0);
  const averageRating = (restrooms.reduce((sum, r) => sum + r.rating, 0) / restrooms.length).toFixed(1);
  const occupiedCount = restrooms.filter(r => r.isOccupied).length;
  const needsCleaningCount = restrooms.filter(r => r.cleanliness < 75).length;

  // Handle delete restroom
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this restroom?')) {
      setRestrooms(restrooms.filter(r => r.id !== id));
      alert('Restroom deleted successfully! ✅');
    }
  };

  // Handle edit restroom
  const handleEdit = (restroom) => {
    setEditingRestroom(restroom);
    setShowAddModal(true);
    setNewRestroom({
      name: restroom.name,
      address: restroom.address,
      price: restroom.price,
      lat: restroom.location.lat,
      lng: restroom.location.lng
    });
  };

  // Handle add/update restroom
  const handleSaveRestroom = () => {
    if (!newRestroom.name || !newRestroom.address) {
      alert('Please fill all required fields!');
      return;
    }

    if (editingRestroom) {
      // Update existing restroom
      setRestrooms(restrooms.map(r =>
        r.id === editingRestroom.id
          ? {
              ...r,
              name: newRestroom.name,
              address: newRestroom.address,
              price: newRestroom.price,
              location: { lat: newRestroom.lat, lng: newRestroom.lng }
            }
          : r
      ));
      alert('Restroom updated successfully! ✅');
    } else {
      // Add new restroom
      const newId = Math.max(...restrooms.map(r => r.id)) + 1;
      const restroomToAdd = {
        id: newId,
        name: newRestroom.name,
        address: newRestroom.address,
        location: { lat: parseFloat(newRestroom.lat), lng: parseFloat(newRestroom.lng) },
        price: parseInt(newRestroom.price),
        rating: 0,
        usageCount: 0,
        hasWater: true,
        isOccupied: false,
        cleanliness: 100,
        lastUpdated: new Date().toLocaleTimeString(),
        facilities: ['Toilet Paper', 'Soap'],
        image: 'https://via.placeholder.com/300x200?text=New+Restroom'
      };
      setRestrooms([...restrooms, restroomToAdd]);
      alert('Restroom added successfully! ✅');
    }

    // Reset form
    setShowAddModal(false);
    setEditingRestroom(null);
    setNewRestroom({ name: '', address: '', price: 50, lat: 0, lng: 0 });
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingRestroom(null);
    setNewRestroom({ name: '', address: '', price: 50, lat: 0, lng: 0 });
  };

  return (
    <div className="admin-view">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>⚙️ Admin Dashboard</h1>
            <p>Manage restrooms, monitor system performance, and view analytics</p>
          </div>
          <button className="add-restroom-btn" onClick={() => setShowAddModal(true)}>
            ➕ Add Restroom
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card blue">
            <div className="stat-content">
              <div className="stat-icon">🏢</div>
              <div>
                <h3>Total Restrooms</h3>
                <p className="stat-value">{totalRestrooms}</p>
              </div>
            </div>
          </div>

          <div className="admin-stat-card green">
            <div className="stat-content">
              <div className="stat-icon">💰</div>
              <div>
                <h3>Total Revenue</h3>
                <p className="stat-value">₦{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="admin-stat-card purple">
            <div className="stat-content">
              <div className="stat-icon">👥</div>
              <div>
                <h3>Total Usage</h3>
                <p className="stat-value">{totalUsage}</p>
              </div>
            </div>
          </div>

          <div className="admin-stat-card orange">
            <div className="stat-content">
              <div className="stat-icon">⭐</div>
              <div>
                <h3>Avg Rating</h3>
                <p className="stat-value">{averageRating}</p>
              </div>
            </div>
          </div>

          <div className="admin-stat-card red">
            <div className="stat-content">
              <div className="stat-icon">🚪</div>
              <div>
                <h3>Occupied</h3>
                <p className="stat-value">{occupiedCount}</p>
              </div>
            </div>
          </div>

          <div className="admin-stat-card yellow">
            <div className="stat-content">
              <div className="stat-icon">🧹</div>
              <div>
                <h3>Needs Cleaning</h3>
                <p className="stat-value">{needsCleaningCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Restrooms Management Table */}
        <div className="management-section">
          <h2>Manage Restrooms</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Usage</th>
                  <th>Revenue</th>
                  <th>Cleanliness</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restrooms.map(restroom => (
                  <tr key={restroom.id}>
                    <td>{restroom.id}</td>
                    <td className="restroom-name-cell">{restroom.name}</td>
                    <td className="address-cell">{restroom.address}</td>
                    <td>₦{restroom.price}</td>
                    <td>
                      <span className="rating-badge">⭐ {restroom.rating}</span>
                    </td>
                    <td>{restroom.usageCount}</td>
                    <td className="revenue-cell">₦{(restroom.usageCount * restroom.price).toLocaleString()}</td>
                    <td>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${restroom.cleanliness}%`,
                            backgroundColor: restroom.cleanliness >= 75 ? '#10b981' : '#f59e0b'
                          }}
                        ></div>
                        <span className="progress-text">{restroom.cleanliness}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`admin-status-badge ${restroom.isOccupied ? 'occupied' : 'available'}`}>
                        {restroom.isOccupied ? 'Occupied' : 'Available'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEdit(restroom)}>
                          ✏️
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(restroom.id)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Restroom Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingRestroom ? 'Edit Restroom' : 'Add New Restroom'}</h2>
            
            <div className="form-group">
              <label>Restroom Name *</label>
              <input
                type="text"
                placeholder="e.g., Mile 2 Public Restroom"
                value={newRestroom.name}
                onChange={(e) => setNewRestroom({ ...newRestroom, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                placeholder="e.g., Mile 2, Lagos"
                value={newRestroom.address}
                onChange={(e) => setNewRestroom({ ...newRestroom, address: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₦) *</label>
                <input
                  type="number"
                  placeholder="50"
                  value={newRestroom.price}
                  onChange={(e) => setNewRestroom({ ...newRestroom, price: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  placeholder="6.5244"
                  value={newRestroom.lat}
                  onChange={(e) => setNewRestroom({ ...newRestroom, lat: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  placeholder="3.3792"
                  value={newRestroom.lng}
                  onChange={(e) => setNewRestroom({ ...newRestroom, lng: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveRestroom}>
                {editingRestroom ? 'Update' : 'Add'} Restroom
              </button>
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;