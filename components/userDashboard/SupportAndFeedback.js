import React, { useState } from 'react';

const SupportAndFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [orderIssue, setOrderIssue] = useState('');

  const handleFeedbackSubmit = () => {
    // Logic to submit feedback
    alert('Feedback submitted');
  };

  const handleOrderIssueSubmit = () => {
    // Logic to submit order issue
    alert('Order issue submitted');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Support and Feedback</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">Help Center</h3>
        <p>Access to FAQs, troubleshooting guides, and contact information for customer support.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Order Issues</h3>
        <textarea
          value={orderIssue}
          onChange={(e) => setOrderIssue(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Describe your issue with a past order"
        />
        <button
          onClick={handleOrderIssueSubmit}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Submit Order Issue
        </button>

        <h3 className="text-xl font-semibold mt-6 mb-2">Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Provide your feedback or rate your experience"
        />
        <button
          onClick={handleFeedbackSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default SupportAndFeedback;
