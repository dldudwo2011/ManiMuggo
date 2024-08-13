import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SubscriptionServices = ({ userId }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const result = await dynamoDB.scan({
          TableName: 'Subscriptions',
          FilterExpression: 'userId = :userId',
          ExpressionAttributeValues: { ':userId': userId },
        }).promise();
        setSubscriptions(result.Items);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  const handleRenewSubscription = (subscriptionId) => {
    // Logic to renew the subscription
    alert(`Subscription ${subscriptionId} renewed`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Subscription Services</h2>
      <div className="bg-white shadow rounded-lg p-4">
        {subscriptions.length > 0 ? (
          <ul>
            {subscriptions.map(subscription => (
              <li key={subscription.id} className="py-2 border-b">
                {subscription.name} - Expires on {new Date(subscription.expiryDate).toLocaleDateString()}
                <button
                  onClick={() => handleRenewSubscription(subscription.id)}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Renew
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No subscriptions found</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionServices;
