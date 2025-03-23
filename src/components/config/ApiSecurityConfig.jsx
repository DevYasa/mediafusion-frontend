import React, { useState, useEffect } from 'react';

const ApiSecurityConfig = ({ userData, updateUserData }) => {
  const [apiPassword, setApiPassword] = useState(userData.api_password || '');
  const [showPassword, setShowPassword] = useState(false);

  // Update parent component when apiPassword changes
  useEffect(() => {
    updateUserData({
      ...userData,
      api_password: apiPassword
    });
  }, [apiPassword]);

  const handlePasswordChange = (e) => {
    setApiPassword(e.target.value);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="api_password" className="block text-gray-300 mb-2 flex items-center">
          API Password: 
          <span 
            className="ml-2 text-sm text-gray-400 font-normal"
            title="Enter the API password you configured in the environment variables."
          >
            (Enter the API password)
          </span>
        </label>
        <div className="flex">
          <input
            type={showPassword ? "text" : "password"}
            id="api_password"
            name="api_password"
            placeholder="Enter API Password"
            value={apiPassword}
            onChange={handlePasswordChange}
            className="flex-grow bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-l-lg p-2"
          />
          <button
            type="button"
            className="bg-indigo-800/60 border border-indigo-700/50 border-l-0 rounded-r-lg px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-gray-300`}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiSecurityConfig;