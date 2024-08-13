import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 51.505, // Default center
  lng: -0.09,
};

const RealTimeOrderTracking = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [driverLocation, setDriverLocation] = useState(center);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchCurrentOrders = async () => {
      try {
        const result = await dynamoDB.scan({
          TableName: 'Orders',
          FilterExpression: 'userId = :userId AND status = :status',
          ExpressionAttributeValues: { ':userId': userId, ':status': 'In Progress' },
        }).promise();
        const activeOrders = result.Items;
        setOrders(activeOrders);

        if (activeOrders.length > 0) {
          setDriverLocation(activeOrders[0].driverLocation || center);
        }
      } catch (error) {
        console.error('Error fetching current orders:', error);
      }
    };

    fetchCurrentOrders();
  }, [userId]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Real-Time Order Tracking</h2>
      <div className="bg-white shadow rounded-lg p-4">
        {orders.length > 0 ? (
          <div>
            <p>Tracking Order ID: {orders[0].orderId}</p>
            <p>Status: {orders[0].status}</p>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={driverLocation}
            >
              <Marker position={driverLocation} />
            </GoogleMap>
          </div>
        ) : (
          <p>No current orders to track</p>
        )}
      </div>
    </div>
  );
};

export default RealTimeOrderTracking;

