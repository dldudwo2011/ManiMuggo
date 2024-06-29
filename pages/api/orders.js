// pages/api/orders.js
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, items } = req.body;

        const params = {
            TableName: 'Orders',
            Item: {
                orderId: id,
                userId: req.user.sub, // Assuming user info is added to the request
                items: items,
                status: 'placed',
                createdAt: new Date().toISOString()
            }
        };

        try {
            await dynamoDb.put(params).promise();
            res.status(200).json({ message: 'Order placed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error placing order', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
