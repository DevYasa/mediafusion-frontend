import React, { useState, useEffect } from 'react';

const LanguageSelectionComponent = ({ selectedLanguages, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [languages, setLanguages] = useState([
    "English", "Tamil", "Hindi", "Malayalam", "Kannada", "Telugu",
    "Chinese", "Russian", "Arabic", "Japanese", "Korean", "Taiwanese",
    "Latino", "French", "Spanish", "Portuguese", "Italian", "German",
    "Ukrainian", "Polish", "Czech", "Thai", "Indonesian", "Vietnamese",
    "Dutch", "Bengali", "Turkish", "Greek", "Swedish", "Romanian",
    "Hungarian", "Finnish", "Norwegian", "Danish", "Hebrew", "Lithuanian",
    "Punjabi", "Marathi", "Gujarati", "Bhojpuri", "Nepali", "Urdu",
    "Tagalog", "Filipino", "Malay", "Mongolian", "Armenian", "Georgian",
    "Unknown"
  ]);
  
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  
  // Filter languages based on search term
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
  
  const handleLanguageChange = (language, isChecked) => {
    if (isChecked) {
      onChange([...selectedLanguages, language]);
    } else {
      onChange(selectedLanguages.filter(lang => lang !== language));
    }
  };
  
  const selectAll = () => {
    onChange(filteredLanguages);
  };
  
  const deselectAll = () => {
    // Remove all filtered languages from selection
    const newSelection = selectedLanguages.filter(lang => !filteredLanguages.includes(lang));
    onChange(newSelection);
  };
  
  return (
    <div className="language-selection">
      <div className="mb-4">
        <h3 className="text-lg text-gray-300 mb-2">
          Filter & Arrange Preferred Languages
          <span 
            className="ml-1 text-gray-400 cursor-help"
            title="Select your preferred languages for streams."
          >
            (Language priority)
          </span>
        </h3>
        
        {/* Search input */}
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
              onClick={() => setSearchTerm('')}
            >
              <svg className="w-4 h-4 text-gray-500 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
        
        {/* Select/Deselect buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
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
      </div>
      
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
            onClick={() => handleLanguageChange(
              language, 
              !selectedLanguages.includes(language)
            )}
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

export default function StreamingLanguagePreferences() {
  const [selectedLanguages, setSelectedLanguages] = useState([
    "English", "Hindi", "Tamil", "Malayalam", "Telugu"  // Default selected languages
  ]);
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Language Preferences</h2>
      
      <div className="mb-6">
        <h3 className="text-xl mb-2">Max File Size: <span className="text-teal-400">Unlimited</span></h3>
        <div className="h-2 bg-indigo-900/70 rounded-lg w-full">
          <div className="h-full bg-indigo-600 rounded-lg" style={{ width: '100%' }}></div>
        </div>
      </div>
      
      <LanguageSelectionComponent 
        selectedLanguages={selectedLanguages}
        onChange={setSelectedLanguages}
      />
      
      <div className="flex justify-center gap-4 mt-8">
        <button className="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-6 rounded">
          Install in Stremio
        </button>
        <button className="bg-indigo-900/70 hover:bg-indigo-800/70 text-white py-2 px-6 rounded">
          Copy Manifest URL
        </button>
        <button className="bg-indigo-900/70 hover:bg-indigo-800/70 text-white py-2 px-6 rounded">
          Setup Kodi Addon
        </button>
      </div>
    </div>
  );
}