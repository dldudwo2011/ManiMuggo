import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const NotificationsAndAlerts = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await dynamoDB.scan({
          TableName: 'Notifications',
          FilterExpression: 'userId = :userId',
          ExpressionAttributeValues: { ':userId': userId },
        }).promise();
        setNotifications(result.Items);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications and Alerts</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <ul>
          {notifications.map(notification => (
            <li key={notification.id} className="py-2 border-b">
              <strong>{notification.type}:</strong> {notification.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsAndAlerts;
