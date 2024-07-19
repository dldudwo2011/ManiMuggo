// pages/api/veriff-callback.js

export default async function handler(req, res) {
    const verification = req.body.verification;
  
    if (verification.status === 'approved') {
      const documentData = verification.document;
      const parsedData = {
        licenseNumber: documentData.number,
        firstName: documentData.firstName,
        lastName: documentData.lastName,
        dateOfBirth: documentData.dateOfBirth,
        expirationDate: documentData.expirationDate,
      };
      // Update the user status to verified in your database
    } else {
      // Handle other statuses
    }
  
    res.sendStatus(200);
  }
  