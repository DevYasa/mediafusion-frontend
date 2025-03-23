import React, { useState, useEffect } from 'react';

const ParentalGuides = ({ userData, updateUserData }) => {
  const [certificationFilter, setCertificationFilter] = useState(userData.certification_filter || ['Disable']);
  const [nudityFilter, setNudityFilter] = useState(userData.nudity_filter || ['Disable']);

  useEffect(() => {
    updateUserData({
      ...userData,
      certification_filter: certificationFilter,
      nudity_filter: nudityFilter
    });
  }, [certificationFilter, nudityFilter]);

  const handleCertificationChange = (e) => {
    const { value, checked } = e.target;
    
    if (value === 'Disable') {
      if (checked) {
        // If Disable is checked, uncheck all other options
        setCertificationFilter(['Disable']);
      } else {
        // If Disable is unchecked, remove it from the selection
        setCertificationFilter(prev => prev.filter(cert => cert !== 'Disable'));
      }
    } else {
      if (checked) {
        // If another option is checked, remove 'Disable'
        setCertificationFilter(prev => 
          [...prev.filter(cert => cert !== 'Disable'), value]
        );
      } else {
        // If an option is unchecked, just remove it
        setCertificationFilter(prev => prev.filter(cert => cert !== value));
      }
      
      // If no options are selected, add 'Disable'
      if (certificationFilter.length === 1 && certificationFilter[0] !== 'Disable' && !checked) {
        setCertificationFilter(['Disable']);
      }
    }
  };

  const handleNudityChange = (e) => {
    const { value, checked } = e.target;
    
    if (value === 'Disable') {
      if (checked) {
        // If Disable is checked, uncheck all other options
        setNudityFilter(['Disable']);
      } else {
        // If Disable is unchecked, remove it from the selection
        setNudityFilter(prev => prev.filter(nudity => nudity !== 'Disable'));
      }
    } else {
      if (checked) {
        // If another option is checked, remove 'Disable'
        setNudityFilter(prev => 
          [...prev.filter(nudity => nudity !== 'Disable'), value]
        );
      } else {
        // If an option is unchecked, just remove it
        setNudityFilter(prev => prev.filter(nudity => nudity !== value));
      }
      
      // If no options are selected, add 'Disable'
      if (nudityFilter.length === 1 && nudityFilter[0] !== 'Disable' && !checked) {
        setNudityFilter(['Disable']);
      }
    }
  };

  const certificationLevels = [
    'Disable', 'Unknown', 'All Ages', 'Children', 'Parental Guidance',
    'Teens', 'Adults', 'Adults+'
  ];

  const nudityLevels = [
    'Disable', 'Unknown', 'None', 'Mild', 'Moderate', 'Severe'
  ];

  return (
    <div className="space-y-6">
      {/* Certification Filter */}
      <div>
        <h3 className="text-lg text-gray-300 mb-3">
          Select Certification Levels To Not Display
          <span 
            className="ml-1 text-gray-400 cursor-help"
            title="Select the certification levels that you prefer not to display in Stremio."
          >
            (Filter content)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certificationLevels.map(level => {
            const isDisabled = level !== 'Disable' && certificationFilter.includes('Disable');
            return (
              <div 
                key={level}
                className={`bg-indigo-900/30 rounded-md p-2 transition-transform hover:-translate-y-1
                          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <label className={`flex items-center ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    name="certification_filter"
                    value={level}
                    checked={certificationFilter.includes(level)}
                    onChange={handleCertificationChange}
                    disabled={isDisabled}
                    className="mr-2"
                  />
                  <span className="text-gray-300">{level}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nudity Filter */}
      <div>
        <h3 className="text-lg text-gray-300 mb-3">
          Select Nudity Filter Levels To Not Display
          <span 
            className="ml-1 text-gray-400 cursor-help"
            title="Select the nudity filter levels that you prefer not to display in Stremio."
          >
            (Filter content)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nudityLevels.map(level => {
            const isDisabled = level !== 'Disable' && nudityFilter.includes('Disable');
            return (
              <div 
                key={level}
                className={`bg-indigo-900/30 rounded-md p-2 transition-transform hover:-translate-y-1
                          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <label className={`flex items-center ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    name="nudity_filter"
                    value={level}
                    checked={nudityFilter.includes(level)}
                    onChange={handleNudityChange}
                    disabled={isDisabled}
                    className="mr-2"
                  />
                  <span className="text-gray-300">{level}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParentalGuides;