// restroomData.js - Store all restroom information
// This file contains the initial data for all restrooms

const restrooms = [
  {
    id: 1,
    name: 'Mile 2 Public Restroom',
    address: 'Mile 2, Amuwo Odofin, Lagos',
    location: {
      lat: 6.4419,
      lng: 3.3181
    },
    price: 50,
    rating: 4.5,
    usageCount: 234,
    // Sensor data (simulated - like from ESP32)
    hasWater: true,
    isOccupied: false,
    cleanliness: 85,
    lastUpdated: '12:30 PM',
    facilities: ['Toilet Paper', 'Soap', 'Hand Dryer'],
    image: 'https://via.placeholder.com/300x200?text=Mile+2'
  },
  {
    id: 2,
    name: 'Oshodi Central Restroom',
    address: 'Oshodi Bus Stop, Lagos',
    location: {
      lat: 6.5244,
      lng: 3.3792
    },
    price: 50,
    rating: 3.8,
    usageCount: 189,
    hasWater: true,
    isOccupied: true,
    cleanliness: 72,
    lastUpdated: '12:28 PM',
    facilities: ['Toilet Paper', 'Soap'],
    image: 'https://via.placeholder.com/300x200?text=Oshodi'
  },
  {
    id: 3,
    name: 'Wuse Market Restroom',
    address: 'Wuse Market, Abuja',
    location: {
      lat: 9.0765,
      lng: 7.4165
    },
    price: 50,
    rating: 4.2,
    usageCount: 156,
    hasWater: false,
    isOccupied: false,
    cleanliness: 68,
    lastUpdated: '12:25 PM',
    facilities: ['Toilet Paper'],
    image: 'https://via.placeholder.com/300x200?text=Wuse'
  },
  {
    id: 4,
    name: 'Ikeja City Mall',
    address: 'Obafemi Awolowo Way, Ikeja',
    location: {
      lat: 6.6018,
      lng: 3.3515
    },
    price: 100,
    rating: 4.8,
    usageCount: 412,
    hasWater: true,
    isOccupied: false,
    cleanliness: 95,
    lastUpdated: '12:32 PM',
    facilities: ['Toilet Paper', 'Soap', 'Hand Dryer', 'Air Freshener'],
    image: 'https://via.placeholder.com/300x200?text=Ikeja'
  },
  {
    id: 5,
    name: 'Marina Waterfront',
    address: 'Marina, Lagos Island',
    location: {
      lat: 6.4541,
      lng: 3.3947
    },
    price: 50,
    rating: 4.0,
    usageCount: 298,
    hasWater: true,
    isOccupied: false,
    cleanliness: 78,
    lastUpdated: '12:29 PM',
    facilities: ['Toilet Paper', 'Soap', 'Hand Dryer'],
    image: 'https://via.placeholder.com/300x200?text=Marina'
  },
  {
    id: 6,
    name: 'Yaba Tech Gate',
    address: 'Yaba, Lagos',
    location: {
      lat: 6.5147,
      lng: 3.3724
    },
    price: 30,
    rating: 3.5,
    usageCount: 145,
    hasWater: true,
    isOccupied: false,
    cleanliness: 70,
    lastUpdated: '12:20 PM',
    facilities: ['Toilet Paper'],
    image: 'https://via.placeholder.com/300x200?text=Yaba'
  }
];

// User location 
const userLocation = {
  lat: 6.5244,
  lng: 3.3792
};

export { restrooms, userLocation };