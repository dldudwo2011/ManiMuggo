import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const result = await dynamoDB.scan({
          TableName: 'Orders',
          FilterExpression: 'userId = :userId AND status = :status',
          ExpressionAttributeValues: { ':userId': userId, ':status': 'Completed' },
        }).promise();
        setOrders(result.Items);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  const handleReorder = async (order) => {
    // Logic to reorder the same items
    alert(`Reordering from ${order.restaurantName}`);
    // Implement reordering logic here
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="bg-white shadow rounded-lg p-4">
        {orders.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Restaurant</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Items</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.orderId}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.restaurantName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {order.items.map(item => (
                      <div key={item.name}>{item.name} x {item.quantity}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.total}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Reorder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No order history available</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
