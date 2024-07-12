import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
import SecureLS from 'secure-ls';

const restaurantTypes = ['Fast Food', 'Casual Dining', 'Fine Dining', 'Cafe', 'Buffet'];
const cuisineTypes = ['Italian', 'Chinese', 'Indian', 'Mexican', 'American', 'French', 'Japanese'];

const ls = typeof window !== 'undefined' ? new SecureLS({ encodingType: 'aes' }) : null;

const RestaurantRegistration = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    ownerFirstName: '',
    ownerLastName: '',
    email: '',
    phone: '',
    country: 'canada',
    province: '',
    city: '',
    postalCode: '',
    restaurantName: '',
    restaurantAddress: '',
    restaurantType: '',
    cuisineType: '',
    menu: null,
    menuUrl: '',
    consent: false,
    phoneVerified: false,
    verificationCode: '',
    sentCode: ''
  });

  useEffect(() => {
    if (ls) {
      const savedData = ls.get('restaurantFormData');
      if (savedData) {
        setFormData(savedData);
      }
    }
  }, []);

  useEffect(() => {
    if (ls) {
      ls.set('restaurantFormData', formData);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      menu: e.target.files[0],
    });
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      phone: selectedCountry === 'canada' ? '+1' : '+1'
    });
  };

  const handlePhoneChange = (event) => {
    setFormData({
      ...formData,
      phone: event.target.value
    });
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('/api/sendVerificationCode', { phone: formData.phone });
      console.log('Verification code sent:', response.data);
      alert('Verification code sent!');
      setFormData({ ...formData, sentCode: response.data.code });
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('Error sending verification code');
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post('/api/verifyCode', { phone: formData.phone, code: formData.verificationCode });
      if (response.data.success) {
        setFormData({ ...formData, phoneVerified: true });
        alert('Phone number verified!');
      } else {
        alert('Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('Error verifying code');
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the menu image to S3
    const formDataImage = new FormData();
    formDataImage.append('menu', formData.menu);

    try {
      const imageUploadResponse = await axios.post('/api/uploadMenu', formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const menuUrl = imageUploadResponse.data.url;

      // Submit the registration data to DynamoDB
      const registrationData = { ...formData, menuUrl };
      const response = await axios.post('/api/registerRestaurant', registrationData);

      if (response.data.success) {
        alert('Restaurant registered successfully!');
      } else {
        alert('Restaurant registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <TransitionGroup>
        <CSSTransition key={step} timeout={300} classNames="fade">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 0 && (
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 1: Personal Information</h2>
                <div className="space-y-4">
                  <label className="block">
                    First Name:
                    <input type="text" name="ownerFirstName" value={formData.ownerFirstName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label className="block">
                    Last Name:
                    <input type="text" name="ownerLastName" value={formData.ownerLastName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label className="block">
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                  <select 
                    id="country" 
                    value={formData.country} 
                    onChange={handleCountryChange} 
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>
                  <label htmlFor="province" className="block text-gray-700 text-sm font-bold mb-2">Province</label>
                  <input 
                    type="text" 
                    id="province" 
                    name="province" 
                    value={formData.province} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                  <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                  <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    id="postalCode" 
                    name="postalCode" 
                    value={formData.postalCode} 
                    onChange={handleChange} 
                    required 
                    pattern="[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d" 
                    title="Format: X1X 1X1" 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    id="phone" 
                    value={formData.phone} 
                    onChange={handlePhoneChange} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {!formData.phoneVerified && (
                    <div className="space-y-4">
                      <button 
                        onClick={sendVerificationCode} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Send Verification Code
                      </button>
                      <label className="block">
                        Verification Code:
                        <input type="text" name="verificationCode" value={formData.verificationCode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                      </label>
                      <button type="button" onClick={verifyCode} className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 mt-2">Verify Code</button>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600">Next</button>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 2: Restaurant Information</h2>
                <div className="space-y-4">
                  <label className="block">
                    Restaurant Name:
                    <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label className="block">
                    Restaurant Address:
                    <input type="text" name="restaurantAddress" value={formData.restaurantAddress} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label className="block">
                    Restaurant Type:
                    <select name="restaurantType" value={formData.restaurantType} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                      <option value="">Select Type</option>
                      {restaurantTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Cuisine Type:
                    <select name="cuisineType" value={formData.cuisineType} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                      <option value="">Select Cuisine</option>
                      {cuisineTypes.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600">Previous</button>
                  <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600">Next</button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 3: Menu Upload</h2>
                <div className="space-y-4">
                  <label className="block">
                    Upload Menu:
                    <input type="file" accept="image/*" onChange={handleFileChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600">Previous</button>
                  <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600">Next</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 4: Agreement and Consent</h2>
                <div className="space-y-4">
                  <label className="block">
                    <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required className="mr-2" />
                    I consent to a background check and agree to the terms and conditions.
                  </label>
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600">Previous</button>
                  <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600">Submit</button>
                </div>
              </div>
            )}
          </form>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RestaurantRegistration;

