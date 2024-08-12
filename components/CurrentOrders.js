import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const CurrentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await dynamoDB.scan({ TableName: 'Orders' }).promise();
        setOrders(result.Items);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = orders.slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(orders.length / dataPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Customer</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Restaurant</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Driver</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((order) => (
              <tr key={order.orderId}>
                <td className="px-4 py-2 text-sm text-gray-700">{order.orderId}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{order.customerName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{order.restaurantName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{order.driverName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{order.status}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentOrders;
