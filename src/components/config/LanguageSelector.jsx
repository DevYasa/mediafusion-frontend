import React, { useState, useEffect } from 'react';

/**
 * LanguageSelector - A standalone component for selecting multiple languages
 * 
 * @param {Object} props
 * @param {Array} props.selectedLanguages - Array of currently selected languages
 * @param {Function} props.onChange - Callback function when selection changes
 * @param {Array} [props.availableLanguages] - Optional custom list of available languages
 * @param {boolean} [props.showSearch=true] - Whether to show the search box
 * @param {boolean} [props.showSelectButtons=true] - Whether to show Select All/Deselect All buttons
 */
const LanguageSelector = ({ 
  selectedLanguages = [], 
  onChange,
  availableLanguages,
  showSearch = true,
  showSelectButtons = true
}) => {
  // Default languages list - use provided list or default to this comprehensive list
  const defaultLanguages = [
    "English", "Tamil", "Hindi", "Malayalam", "Kannada", "Telugu",
    "Chinese", "Russian", "Arabic", "Japanese", "Korean", "Taiwanese",
    "Latino", "French", "Spanish", "Portuguese", "Italian", "German",
    "Ukrainian", "Polish", "Czech", "Thai", "Indonesian", "Vietnamese",
    "Dutch", "Bengali", "Turkish", "Greek", "Swedish", "Romanian",
    "Hungarian", "Finnish", "Norwegian", "Danish", "Hebrew", "Lithuanian",
    "Punjabi", "Marathi", "Gujarati", "Bhojpuri", "Nepali", "Urdu",
    "Tagalog", "Filipino", "Malay", "Mongolian", "Armenian", "Georgian",
    "Unknown"
  ];

  const languages = availableLanguages || defaultLanguages;
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtered languages based on search term
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  
  // Update filtered languages when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLanguages(languages);
    } else {
      const filtered = languages.filter(lang => 
        lang.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLanguages(filtered);
    }
  }, [searchTerm, languages]);
  
  // Handle language selection toggle
  const handleLanguageChange = (language) => {
    const isSelected = selectedLanguages.includes(language);
    
    if (isSelected) {
      // Remove from selection
      onChange(selectedLanguages.filter(lang => lang !== language));
    } else {
      // Add to selection
      onChange([...selectedLanguages, language]);
    }
  };
  
  // Select all visible languages
  const selectAll = () => {
    // Get currently selected languages that aren't in the filtered list
    const unchangedSelection = selectedLanguages.filter(lang => !filteredLanguages.includes(lang));
    // Add all filtered languages
    onChange([...unchangedSelection, ...filteredLanguages]);
  };
  
  // Deselect all visible languages
  const deselectAll = () => {
    onChange(selectedLanguages.filter(lang => !filteredLanguages.includes(lang)));
  };
  
  // Clear search term
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="language-selector">
      {/* Search and Selection Controls */}
      {showSearch && (
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2 pl-9"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          {searchTerm && (
            <button 
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={clearSearch}
              type="button"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4 text-gray-500 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
      )}
      
      {/* Select/Deselect buttons */}
      {showSelectButtons && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={selectAll}
            className="bg-indigo-900/50 text-gray-200 hover:bg-indigo-800/50 px-3 py-1 rounded flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Select All
          </button>
          <button
            type="button"
            onClick={deselectAll}
            className="bg-gray-800/70 text-gray-300 hover:bg-gray-700/70 px-3 py-1 rounded flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Deselect All
          </button>
        </div>
      )}
      
      {/* Language grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {filteredLanguages.map(language => (
          <div 
            key={language}
            className={`${
              selectedLanguages.includes(language) 
                ? 'bg-indigo-700/60' 
                : 'bg-indigo-900/30'
            } rounded-md p-2 transition-all hover:-translate-y-1 cursor-pointer`}
            onClick={() => handleLanguageChange(language)}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-200">{language}</span>
              {selectedLanguages.includes(language) && (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredLanguages.length === 0 && (
        <div className="text-center py-4 text-gray-400">
          No languages match your search
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;