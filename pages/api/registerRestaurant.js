import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-2',
});

const registerRestaurant = async (req, res) => {
  const {
    ownerFirstName,
    ownerLastName,
    email,
    phone,
    country,
    province,
    city,
    postalCode,
    restaurantName,
    restaurantAddress,
    restaurantType,
    cuisineType,
    menuUrl,
  } = req.body;

  const params = {
    TableName: 'Restaurants',
    Item: {
      id: `${restaurantName}-${Date.now()}`,
      ownerFirstName,
      ownerLastName,
      email,
      phone,
      country,
      province,
      city,
      postalCode,
      restaurantName,
      restaurantAddress,
      restaurantType,
      cuisineType,
      menuUrl,
    },
  };

  try {
    await dynamodb.put(params).promise();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error registering restaurant:', error);
    res.status(500).send('Error registering restaurant');
  }
};

export default registerRestaurant;


