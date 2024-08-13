import React, { useState } from 'react';

const Settings = () => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [privacySettings, setPrivacySettings] = useState({
    twoFactorAuth: true,
  });

  const handleUpdateSettings = () => {
    // Logic to update settings
    alert('Settings updated');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">Notification Preferences</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
          <input
            type="checkbox"
            checked={notificationPreferences.email}
            onChange={() => setNotificationPreferences({ ...notificationPreferences, email: !notificationPreferences.email })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">SMS Notifications</label>
          <input
            type="checkbox"
            checked={notificationPreferences.sms}
            onChange={() => setNotificationPreferences({ ...notificationPreferences, sms: !notificationPreferences.sms })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Push Notifications</label>
          <input
            type="checkbox"
            checked={notificationPreferences.push}
            onChange={() => setNotificationPreferences({ ...notificationPreferences, push: !notificationPreferences.push })}
          />
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">Privacy Settings</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Two-Factor Authentication</label>
          <input
            type="checkbox"
            checked={privacySettings.twoFactorAuth}
            onChange={() => setPrivacySettings({ ...privacySettings, twoFactorAuth: !privacySettings.twoFactorAuth })}
          />
        </div>

        <button
          onClick={handleUpdateSettings}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
