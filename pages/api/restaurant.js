// pages/api/restaurants.js
export default function handler(req, res) {
    const { lat, lon } = req.query;
  
    const restaurants = [
      { id: 1, name: "Restaurant A", lat: 37.7749, lon: -122.4194 },
      { id: 2, name: "Restaurant B", lat: 37.7749, lon: -122.4194 },
      { id: 3, name: "Restaurant C", lat: 37.7749, lon: -122.4194 }
    ];
  
    const nearbyRestaurants = restaurants.filter((restaurant) => {
      const distance = Math.sqrt(Math.pow(restaurant.lat - lat, 2) + Math.pow(restaurant.lon - lon, 2));
      return distance < 0.1;
    });
  
    res.status(200).json(nearbyRestaurants);
  }
  