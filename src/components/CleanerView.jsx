// CleanerView.jsx - Interface for cleaners to manage their tasks
import React, { useState } from 'react';
import '../styles/CleanerView.css';
import { restrooms as initialRestrooms } from '../data/restroomData';

const CleanerView = () => {
  const [restrooms, setRestrooms] = useState(initialRestrooms);
  const [selectedTask, setSelectedTask] = useState(null);

  // Get restrooms that need cleaning
  const getTasksNeedingCleaning = () => {
    return restrooms.filter(r => r.cleanliness < 75);
  };

  // Handle marking a task as completed
  const handleCompleteTask = (restroomId) => {
    setRestrooms(prevRestrooms =>
      prevRestrooms.map(r =>
        r.id === restroomId
          ? { ...r, cleanliness: 95, lastUpdated: new Date().toLocaleTimeString() }
          : r
      )
    );
    setSelectedTask(null);
    alert('Cleaning task completed! ✅');
  };

  // Handle viewing task details
  const handleViewTask = (restroom) => {
    setSelectedTask(restroom);
  };

  const tasksNeedingCleaning = getTasksNeedingCleaning();

  return (
    <div className="cleaner-view">
      <div className="cleaner-container">
        {/* Header */}
        <div className="cleaner-header">
          <h1>🧹 Cleaner Dashboard</h1>
          <p>Manage cleaning tasks and maintain restroom standards</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>Total Tasks</h3>
              <p className="stat-number">{restrooms.length}</p>
            </div>
          </div>
          <div className="stat-card urgent">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <h3>Needs Cleaning</h3>
              <p className="stat-number">{tasksNeedingCleaning.length}</p>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Clean</h3>
              <p className="stat-number">{restrooms.length - tasksNeedingCleaning.length}</p>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="tasks-section">
          <h2>Cleaning Tasks</h2>

          {tasksNeedingCleaning.length === 0 ? (
            <div className="no-tasks">
              <div className="no-tasks-icon">🎉</div>
              <h3>All restrooms are clean!</h3>
              <p>Great job! No cleaning tasks at the moment.</p>
            </div>
          ) : (
            <div className="tasks-list">
              {tasksNeedingCleaning.map(restroom => (
                <div key={restroom.id} className="task-card">
                  <div className="task-header">
                    <h3>{restroom.name}</h3>
                    <span className={`priority-badge ${restroom.cleanliness < 65 ? 'high' : 'medium'}`}>
                      {restroom.cleanliness < 65 ? 'HIGH PRIORITY' : 'MEDIUM'}
                    </span>
                  </div>
                  <p className="task-address">{restroom.address}</p>
                  
                  <div className="task-details">
                    <div className="detail-item">
                      <span className="detail-label">Cleanliness:</span>
                      <span className="detail-value">{restroom.cleanliness}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Water:</span>
                      <span className={`detail-value ${restroom.hasWater ? 'text-green' : 'text-red'}`}>
                        {restroom.hasWater ? 'Available' : 'No Water'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Usage Count:</span>
                      <span className="detail-value">{restroom.usageCount}</span>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      className="view-btn"
                      onClick={() => handleViewTask(restroom)}
                    >
                      View Details
                    </button>
                    <button
                      className="complete-btn"
                      onClick={() => handleCompleteTask(restroom.id)}
                    >
                      Mark as Clean
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Restrooms List */}
        <div className="all-restrooms-section">
          <h2>All Restrooms</h2>
          <div className="restrooms-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Cleanliness</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {restrooms.map(restroom => (
                  <tr key={restroom.id}>
                    <td>{restroom.name}</td>
                    <td>{restroom.address}</td>
                    <td>
                      <div className="cleanliness-bar">
                        <div
                          className="cleanliness-fill"
                          style={{
                            width: `${restroom.cleanliness}%`,
                            backgroundColor: restroom.cleanliness >= 75 ? '#10b981' : '#f59e0b'
                          }}
                        ></div>
                        <span className="cleanliness-text">{restroom.cleanliness}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${restroom.isOccupied ? 'occupied' : 'available'}`}>
                        {restroom.isOccupied ? 'Occupied' : 'Available'}
                      </span>
                    </td>
                    <td>{restroom.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Task Details</h2>
            <div className="task-detail-section">
              <h3>{selectedTask.name}</h3>
              <p className="modal-address">{selectedTask.address}</p>
              
              <div className="modal-stats">
                <div className="modal-stat">
                  <span className="modal-stat-label">Cleanliness</span>
                  <span className="modal-stat-value">{selectedTask.cleanliness}%</span>
                </div>
                <div className="modal-stat">
                  <span className="modal-stat-label">Usage Count</span>
                  <span className="modal-stat-value">{selectedTask.usageCount}</span>
                </div>
                <div className="modal-stat">
                  <span className="modal-stat-label">Rating</span>
                  <span className="modal-stat-value">⭐ {selectedTask.rating}</span>
                </div>
              </div>

              <div className="facilities-section">
                <h4>Facilities</h4>
                <div className="facilities-list">
                  {selectedTask.facilities.map((facility, index) => (
                    <span key={index} className="facility-tag">{facility}</span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="complete-modal-btn"
                  onClick={() => handleCompleteTask(selectedTask.id)}
                >
                  Mark as Clean
                </button>
                <button
                  className="close-modal-btn"
                  onClick={() => setSelectedTask(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanerView;