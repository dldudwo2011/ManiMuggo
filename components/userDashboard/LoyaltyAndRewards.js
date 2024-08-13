import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const LoyaltyAndRewards = ({ userId }) => {
  const [points, setPoints] = useState(0);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchLoyaltyData = async () => {
      try {
        const pointsResult = await dynamoDB.get({
          TableName: 'LoyaltyPoints',
          Key: { userId },
        }).promise();
        setPoints(pointsResult.Item?.points || 0);

        const promoResult = await dynamoDB.scan({
          TableName: 'Promotions',
        }).promise();
        setPromotions(promoResult.Items);
      } catch (error) {
        console.error('Error fetching loyalty data:', error);
      }
    };

    fetchLoyaltyData();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Loyalty and Rewards</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold">Points Balance</h3>
        <p className="text-lg">{points} Points</p>

        <h3 className="text-xl font-semibold mt-6">Promotions</h3>
        <ul>
          {promotions.map(promo => (
            <li key={promo.id} className="py-2 border-b">{promo.name}: {promo.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoyaltyAndRewards;
