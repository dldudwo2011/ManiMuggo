// pages/register-restaurant.js
import { useState } from 'react';

export default function RegisterRestaurant() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    ownerId: '',
    description: '',
    banner: null,
    profile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    const response = await fetch('/api/register-restaurant', {
      method: 'POST',
      body: formDataToSend,
    });

    if (response.ok) {
      alert('Restaurant registered successfully!');
    } else {
      alert('Error registering restaurant.');
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
        <h1 className="text-4xl font-bold mb-8 text-center">Register Your Restaurant</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">Restaurant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-lg font-medium mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-medium mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ownerId" className="block text-lg font-medium mb-2">Owner ID</label>
            <input
              type="text"
              id="ownerId"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="banner" className="block text-lg font-medium mb-2">Banner Image</label>
            <input
              type="file"
              id="banner"
              name="banner"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profile" className="block text-lg font-medium mb-2">Profile Photo</label>
            <input
              type="file"
              id="profile"
              name="profile"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
            Register Restaurant
          </button>
        </form>
      </main>
      <footer className="bg-yellow-400 text-center p-4 mt-auto">
        <p>&copy; 2024 먹자. All rights reserved.</p>
      </footer>
    </div>
  );
}


