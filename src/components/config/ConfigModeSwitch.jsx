import React from 'react';

const ConfigModeSwitch = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-indigo-900/40 rounded-full p-1 flex items-center space-x-2">
        <button
          type="button"
          onClick={() => onModeChange('newbie')}
          className={`
            px-4 py-2 rounded-full transition-all duration-300
            ${currentMode === 'newbie' 
              ? 'bg-gradient-to-r from-teal-600 to-indigo-700 text-white' 
              : 'text-gray-300 hover:bg-indigo-900/60'}
          `}
        >
          <i className="bi bi-person-heart mr-2"></i>
          Newbie User
        </button>
        
        <button
          type="button"
          onClick={() => onModeChange('pro')}
          className={`
            px-4 py-2 rounded-full transition-all duration-300
            ${currentMode === 'pro' 
              ? 'bg-gradient-to-r from-teal-600 to-indigo-700 text-white' 
              : 'text-gray-300 hover:bg-indigo-900/60'}
          `}
        >
          <i className="bi bi-person-gear mr-2"></i>
          Pro User
        </button>
      </div>
    </div>
  );
};

export default ConfigModeSwitch;