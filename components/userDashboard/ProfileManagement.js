import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { useSession } from 'next-auth/react';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const ProfileManagement = ({ userId }) => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', email: '' });
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResult = await dynamoDB.get({
          TableName: 'Users',
          Key: { userId },
        }).promise();
        setUserInfo(userResult.Item || {});

        const addressResult = await dynamoDB.scan({
          TableName: 'Addresses',
          FilterExpression: 'userId = :userId',
          ExpressionAttributeValues: { ':userId': userId },
        }).promise();
        setAddresses(addressResult.Items);

        const paymentResult = await dynamoDB.scan({
          TableName: 'PaymentMethods',
          FilterExpression: 'userId = :userId',
          ExpressionAttributeValues: { ':userId': userId },
        }).promise();
        setPaymentMethods(paymentResult.Items);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      await dynamoDB.update({
        TableName: 'Users',
        Key: { userId },
        UpdateExpression: 'set #name = :name, phone = :phone',
        ExpressionAttributeNames: { '#name': 'name' },
        ExpressionAttributeValues: {
          ':name': userInfo.name,
          ':phone': userInfo.phone,
        },
      }).promise();
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAddAddress = async () => {
    const newAddress = { id: new Date().getTime().toString(), address: 'New Address', userId };
    try {
      await dynamoDB.put({
        TableName: 'Addresses',
        Item: newAddress,
      }).promise();
      setAddresses([...addresses, newAddress]);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleAddPaymentMethod = async () => {
    const newPaymentMethod = { id: new Date().getTime().toString(), method: 'New Card', userId };
    try {
      await dynamoDB.put({
        TableName: 'PaymentMethods',
        Item: newPaymentMethod,
      }).promise();
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
    } catch (error) {
      console.error('Error adding payment method:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">User Information</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Profile
        </button>

        <h3 className="text-xl font-semibold mt-6 mb-2">Address Book</h3>
        <ul>
          {addresses.map(address => (
            <li key={address.id} className="py-2 border-b">{address.address}</li>
          ))}
        </ul>
        <button
          onClick={handleAddAddress}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Address
        </button>

        <h3 className="text-xl font-semibold mt-6 mb-2">Payment Methods</h3>
        <ul>
          {paymentMethods.map(method => (
            <li key={method.id} className="py-2 border-b">{method.method}</li>
          ))}
        </ul>
        <button
          onClick={handleAddPaymentMethod}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Payment Method
        </button>
      </div>
    </div>
  );
};

export default ProfileManagement;
