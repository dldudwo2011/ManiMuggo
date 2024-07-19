import React, { useState} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [veriffSessionUrl, setVeriffSessionUrl] = useState(null);
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
    sentCode: '',
    workPermitPhoto: null,
    backgroundCheckConsent: false,
    driverLicensePhoto: null, // Added field for driver's license photo
  });

  const [isVeriffButtonClicked, setIsVeriffButtonClicked] = useState(false); // New state to track button click
  

  const handleVeriffButtonClick = async () => {
    if (!formData.driverLicensePhoto) {
      toast.error('Please upload the driver license photo.');
      return;
    }
  
    if (isVeriffButtonClicked) return;
    setIsVeriffButtonClicked(true);
  
    try {
      const veriffResponse = await axios.post('/api/create-veriff-session');
      const { veriffSessionUrl } = veriffResponse.data;
      setVeriffSessionUrl(veriffSessionUrl);
  
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.driverLicensePhoto);
  
      const uploadResponse = await axios.post('/api/proxy-veriff', {
        sessionUrl: `${veriffSessionUrl}/files`,
        file: uploadFormData,
      });
  
      if (uploadResponse.data.success) {
        toast.success('File uploaded successfully and Veriff session started.');
        const veriff = new Veriff({
          host: 'https://stationapi.veriff.com',
          apiKey: process.env.NEXT_PUBLIC_VERIFF_API_KEY,
          parentId: 'veriffContainer',
        });
  
        veriff.setParams({
          sessionUrl: veriffSessionUrl,
        });
  
        veriff.mount();
      }
    } catch (error) {
      console.error('Error creating Veriff session:', error);
      toast.error(`Error creating Veriff session: ${error.message}`);
    }
  };
  

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      phone: selectedCountry === 'canada' || selectedCountry === 'usa' ? '+1' : '+1',
    });
  };

  const handlePhoneChange = (event) => {
    setFormData({
      ...formData,
      phone: event.target.value,
    });
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('/api/sendVerificationCode', { phone: formData.phone });
      console.log('Verification code sent:', response.data);
      toast.success('Verification code sent!');
    } catch (error) {
      console.error('Error sending verification code:', error);
      toast.error('Error sending verification code. Please try again.');
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post('/api/verifyCode', { phone: formData.phone, code: formData.verificationCode });
      if (response.data.success) {
        setFormData({ ...formData, phoneVerified: true });
        toast.success('Phone number verified!');
      } else {
        toast.error('Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      toast.error('Error verifying code. Please try again.');
    }
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.phoneVerified
        );
      case 1:
        return (
          formData.vehicleBrand &&
          formData.vehicleType &&
          formData.vehicleYear &&
          formData.vehicleName &&
          formData.licensePlate
        );
      case 2:
        return formData.driverLicensePhoto; // Ensure driver license photo is required
      case 3:
        return formData.workPermitPhoto;
      case 4:
        return formData.backgroundCheckConsent;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.error('Please complete all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      if (step === 3) {
        handleVeriffButtonClick(); // Start Veriff session if on the verification step
      } else {
        toast.success('All the forms submitted successfully! We will review and contact you later!');
      }
    } else {
      toast.error('Please complete all required fields before submitting.');
    }
  };

  return   (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="hidden md:flex items-center justify-center col-span-1">
        <img
         src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-2.png" alt="office image 2"
          className="w-lg h-auto object-cover rounded-xl"
        />
      </div>
      <TransitionGroup>
        <CSSTransition key={step} timeout={300} classNames="fade">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 0 && (
              
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 1: Personal Information</h2>
                <div className="space-y-4">
                  <label className="block">
                    First Name:
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                  </label>
                  <label className="block">
                    Last Name:
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                  </label>
                  <label className="block">
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                  </label>
                  <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="" disabled>Select a country</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {!formData.phoneVerified && (
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={sendVerificationCode}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Send Verification Code
                      </button>
                      <label className="block">
                        Verification Code:
                        <input
                          type="text"
                          name="verificationCode"
                          value={formData.verificationCode}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={verifyCode}
                        className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 mt-2"
                      >
                        Verify Code
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 2: Vehicle Information</h2>
                <div className="space-y-4">
                  <label className="block">
                    Vehicle Brand:
                    <select
                      name="vehicleBrand"
                      value={formData.vehicleBrand}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    >
                      <option value="">Select Brand</option>
                      {vehicleBrands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Vehicle Type:
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    >
                      <option value="">Select Type</option>
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Vehicle Year:
                    <select
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Vehicle Name:
                    <input
                      type="text"
                      name="vehicleName"
                      value={formData.vehicleName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                  </label>
                  <label className="block">
                    License Plate:
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                  </label>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 3: ID Verification</h2>
<<<<<<< HEAD
                <div id="veriffContainer">
                <label className="block">
                Upload Driver License Photo:
                <input type="file" name="driverLicensePhoto" accept="image/*" onChange={handleFileChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </label>
                <button onClick={handleVeriffButtonClick} id="veriffButton" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 mb-4">
                Start Veriff Session
              </button>
              </div>
              <div className="flex justify-between mt-6">
                  <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600">Previous</button>
                  <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600">Next</button>
=======
                <div className="space-y-4">
                  <label className="block">
                    License Number:
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                  </label>
                  <label className="block">
                    Upload Face Photo:
                    <input
                      type="file"
                      name="facePhoto"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                  </label>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    id="veriffButton"
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                    onClick={handleVeriffButtonClick}
                  >
                    Verify with Veriff
                  </button>
>>>>>>> d316703cc7c75abdbd85be1a03b7cf23ea2fb869
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 4: Work Permit Verification</h2>
                <div className="space-y-4">
                  <label className="block">
                    Upload Work Permit Photo:
                    <input
                      type="file"
                      name="workPermitPhoto"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                  </label>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="form-step">
                <h2 className="text-2xl font-bold mb-6">Step 5: Background Check</h2>
                <div className="space-y-4">
                  <label className="block">
                    <input
                      type="checkbox"
                      name="backgroundCheckConsent"
                      checked={formData.backgroundCheckConsent}
                      onChange={handleChange}
                      required
                      className="mr-2"
                    />
                    I consent to a background check and agree to the terms and conditions.
                  </label>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </CSSTransition>
      </TransitionGroup>
      <script src='https://cdn.veriff.me/sdk/js/1.5/veriff.min.js'></script>
      <script src='https://cdn.veriff.me/incontext/js/v1/veriff.js'></script>
    </div>
  );
};

export default DriverRegistration;


