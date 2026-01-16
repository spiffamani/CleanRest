// restroomService.js - Business logic and functions
// This file contains all the functions that do calculations and operations

// Function to simulate sensor updates (like ESP32 would send data)
export const simulateSensorUpdate = (restroom) => {
  return {
    ...restroom,
    hasWater: Math.random() > 0.15, // 85% chance has water
    isOccupied: Math.random() > 0.7, // 30% chance occupied
    cleanliness: Math.floor(Math.random() * 30) + 70, // Random score 70-100
    lastUpdated: new Date().toLocaleTimeString()
  };
};

// Function to calculate distance between two points
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance.toFixed(1); // Return distance in km with 1 decimal
};

// Function to get status color based on restroom condition
export const getStatusColor = (restroom) => {
  if (restroom.isOccupied) {
    return 'red';
  }
  if (!restroom.hasWater) {
    return 'orange';
  }
  if (restroom.cleanliness < 75) {
    return 'yellow';
  }
  return 'green';
};

// Function to get status text
export const getStatusText = (restroom) => {
  if (restroom.isOccupied) {
    return 'Occupied';
  }
  if (!restroom.hasWater) {
    return 'No Water';
  }
  if (restroom.cleanliness < 75) {
    return 'Needs Cleaning';
  }
  return 'Available';
};

// Function to process QR payment (simulated)
export const processQRPayment = (restroom, callback) => {
  // Simulate payment processing delay
  setTimeout(() => {
    const result = {
      success: true,
      message: 'Payment successful! Door unlocking...',
      restroomId: restroom.id,
      amount: restroom.price,
      timestamp: new Date().toISOString()
    };
    callback(result);
  }, 2000); // 2 second delay to simulate processing
};

// Function to record usage (increment usage count)
export const recordUsage = (restroom) => {
  return {
    ...restroom,
    usageCount: restroom.usageCount + 1,
    isOccupied: true
  };
};

// Function to mark restroom as available again
export const markAsAvailable = (restroom) => {
  return {
    ...restroom,
    isOccupied: false,
    cleanliness: Math.max(restroom.cleanliness - 5, 60) // Decrease cleanliness a bit after use
  };
};

// Function to filter restrooms by status
export const filterByStatus = (restrooms, status) => {
  switch(status) {
    case 'available':
      return restrooms.filter(r => !r.isOccupied && r.hasWater);
    case 'occupied':
      return restrooms.filter(r => r.isOccupied);
    case 'no-water':
      return restrooms.filter(r => !r.hasWater);
    case 'needs-cleaning':
      return restrooms.filter(r => r.cleanliness < 75);
    default:
      return restrooms;
  }
};

// Function to sort restrooms by distance
export const sortByDistance = (restrooms, userLat, userLng) => {
  return restrooms.sort((a, b) => {
    const distA = calculateDistance(userLat, userLng, a.location.lat, a.location.lng);
    const distB = calculateDistance(userLat, userLng, b.location.lat, b.location.lng);
    return distA - distB;
  });
};

// Function to get nearest restroom
export const getNearestRestroom = (restrooms, userLat, userLng) => {
  const sorted = sortByDistance([...restrooms], userLat, userLng);
  return sorted[0];
};