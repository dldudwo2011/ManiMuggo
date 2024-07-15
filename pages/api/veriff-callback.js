// pages/api/veriff-callback.js

export default async function handler(req, res) {
    const verification = req.body.verification;
  
    if (verification.status === 'approved') {
      // Update the user status to verified in your database
    } else {
      // Handle other statuses
    }
  
    res.sendStatus(200);
  }
  