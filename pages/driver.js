// pages/register-driver.js
import { useState } from 'react';

export default function RegisterDriver() {
  const [formData, setFormData] = useState({
    vehicleType: '',
    licenseNumber: '',
    city: '',
    phone: '',
    photo: null,
    license: null,
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSendVerificationCode = async () => {
    const response = await fetch('/api/send-verification-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: formData.phone }),
    });

    if (response.ok) {
      setVerificationSent(true);
      alert('Verification code sent!');
    } else {
      alert('Error sending verification code.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('verificationCode', verificationCode);

    const response = await fetch('/api/register-driver', {
      method: 'POST',
      body: formDataToSend,
    });

    if (response.ok) {
      alert('Driver registered successfully!');
    } else {
      alert('Error registering driver.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-yellow-400 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src="/logo.png" alt="먹자 Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold ml-2">먹자</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-8 flex flex-col items-center flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center">Register as a Driver</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-lg font-medium mb-2">Vehicle Type</label>
            <input
              type="text"
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="licenseNumber" className="block text-lg font-medium mb-2">License Number</label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-lg font-medium mb-2">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={handleSendVerificationCode}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
            >
              Send Verification Code
            </button>
          </div>
          {verificationSent && (
            <div className="mb-4">
              <label htmlFor="verificationCode" className="block text-lg font-medium mb-2">Verification Code</label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="photo" className="block text-lg font-medium mb-2">Your Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="license" className="block text-lg font-medium mb-2">Driver's License Photo</label>
            <input
              type="file"
              id="license"
              name="license"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
            Register Driver
          </button>
        </form>
      </main>
      <footer className="bg-yellow-400 text-center p-4 mt-auto">
        <p>&copy; 2024 먹자. All rights reserved.</p>
      </footer>
    </div>
  );
}

