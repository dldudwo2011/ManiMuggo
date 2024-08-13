import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const Favorites = ({ userId }) => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [favoriteDishes, setFavoriteDishes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const restaurantResult = await dynamoDB.scan({
          TableName: 'FavoriteRestaurants',
          FilterExpression: 'userId = :userId',
          ExpressionAttributeValues: { ':userId': userId },
        }).promise();
        setFavoriteRestaurants(restaurantResult.Items);

        const dishResult = await dynamoDB.scan({
          TableName: 'FavoriteDishes',
          FilterExpression: 'userId = :userId',
          ExpressionAttributeValues: { ':userId': userId },
        }).promise();
        setFavoriteDishes(dishResult.Items);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold">Favorite Restaurants</h3>
        <ul>
          {favoriteRestaurants.map(restaurant => (
            <li key={restaurant.id} className="py-2 border-b">{restaurant.name}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-6">Favorite Dishes</h3>
        <ul>
          {favoriteDishes.map(dish => (
            <li key={dish.id} className="py-2 border-b">{dish.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
