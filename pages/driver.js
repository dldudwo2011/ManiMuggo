import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
import "../styles/DriverRegistration.module.css";

const vehicleBrands = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz',
  'Volkswagen', 'Audi', 'Kia', 'Hyundai', 'Mazda', 'Subaru', 'Lexus', 'Jeep',
  'Dodge', 'Ram', 'Tesla', 'Buick', 'Chrysler', 'Cadillac', 'GMC', 'Volvo',
  'Jaguar', 'Land Rover', 'Porsche', 'Infiniti', 'Acura', 'Mitsubishi', 'Mini'
];

const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Van', 'Coupe', 'Wagon', 'Convertible'];

const years = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => 1990 + i);

const DriverRegistration = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    licenseNumber: '',
    vehicleBrand: '',
    vehicleType: '',
    vehicleYear: '',
    vehicleName: '',
    licensePlate: '',
    consent: false,
    facePhoto: null,
    phoneVerified: false,
    verificationCode: '',
    sentCode: ''
  });

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
      facePhoto: e.target.files[0],
    });
  };

  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('canada');

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    if (selectedCountry === 'canada') {
      setPhone('+1');
    } else if (selectedCountry === 'usa') {
      setPhone('+1');
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('/api/sendVerificationCode', { phone });
      console.log('Verification code sent:', response.data);
      alert('Verification code sent!');
    } catch (error) {
      console.error('Error sending verification code:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post('/api/verifyCode', { phone, code: formData.verificationCode });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
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
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label className="block">
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label className="block">
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                  <select 
                    id="country" 
                    value={country} 
                    onChange={handleCountryChange} 
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    id="phone" 
                    value={phone} 
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
                <h2 className="text-2xl font-bold mb-6">Step 2: Vehicle Information</h2>
                <div className="space-y-4">
                  <label className="block">
                    Vehicle Brand:
                    <select name="vehicleBrand" value={formData.vehicleBrand} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                      <option value="">Select Brand</option>
                      {vehicleBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Vehicle Type:
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                      <option value="">Select Type</option>
                      {vehicleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Vehicle Year:
                    <select name="vehicleYear" value={formData.vehicleYear} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                      <option value="">Select Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Vehicle Name:
                    <input type="text" name="vehicleName" value={formData.vehicleName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label className="block">
                    License Plate:
                    <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
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
                <h2 className="text-2xl font-bold mb-6">Step 3: License Verification</h2>
                <div className="space-y-4">
                  <label className="block">
                    License Number:
                    <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </label>
                  <label className="block">
                    Upload Face Photo:
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

export default DriverRegistration;




