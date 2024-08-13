import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const AccountOverview = ({ userId }) => {
  const [accountBalance, setAccountBalance] = useState(0);
  const [referralProgram, setReferralProgram] = useState({});

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const balanceResult = await dynamoDB.get({
          TableName: 'AccountBalances',
          Key: { userId },
        }).promise();
        setAccountBalance(balanceResult.Item?.balance || 0);

        const referralResult = await dynamoDB.get({
          TableName: 'ReferralPrograms',
          Key: { userId },
        }).promise();
        setReferralProgram(referralResult.Item || {});
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    fetchAccountData();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold">Account Balance</h3>
        <p className="text-lg">${accountBalance.toFixed(2)}</p>

        <h3 className="text-xl font-semibold mt-6">Referral Program</h3>
        <p>Refer friends and earn rewards</p>
        <p>Referral Code: {referralProgram.code || 'N/A'}</p>
      </div>
    </div>
  );
};

export default AccountOverview;
