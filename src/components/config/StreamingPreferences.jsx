import React, { useEffect, useState } from 'react';
import LanguageSelector from './LanguageSelector'; // Adjust path as needed

const StreamingPreferences = ({ userData, updateUserData, configMode }) => {
  const [resolutionsData, setResolutionsData] = useState({
    selected: userData.selected_resolutions || [],
  });

  const [qualityData, setQualityData] = useState({
    selected: userData.quality_filter || [],
  });

  const [maxSize, setMaxSize] = useState(userData.max_size === 'inf' ? 107266808218 : userData.max_size);

  const [torrentDisplay, setTorrentDisplay] = useState({
    option: userData.show_full_torrent_name ? 'fullName' : 'parsedData',
    showLanguageFlag: userData.show_language_country_flag || false
  });

  const [sortingOptions, setSortingOptions] = useState(
    userData.torrent_sorting_priority || [
      { key: 'cached', direction: 'desc' },
      { key: 'seeders', direction: 'desc' },
      { key: 'resolution', direction: 'desc' }
    ]
  );

  const [languageSorting, setLanguageSorting] = useState({
    selected: userData.language_sorting || [],
    showSection: true // Always show language section for both newbie and pro users
  });

  const [advancedOptions, setAdvancedOptions] = useState({
    maxStreamsPerResolution: userData.max_streams_per_resolution || 20,
    liveSearchStreams: userData.live_search_streams || false,
    contributionStreams: userData.contribution_streams || false
  });

  // Available resolutions
  const resolutions = [
    "4K", "2160p", "1440p", "1080p", "720p", "480p", "360p", ""
  ];

  // Quality filter groups
  const qualityGroups = {
    "High Quality": ["remux", "bluray", "dvd", "web", "hdtv"],
    "Proper Releases": ["proper", "repack"],
    "HDR Formats": ["hdr", "dolby vision", "dv"],
    "3D Videos": ["3d"],
    "Region": ["multi"],
    "10-bit Videos": ["10bit", "hi10", "hi10p"],
  };

  // Sorting options
  const availableSortingOptions = [
    { key: 'language', direction: 'desc', label: 'Language' },
    { key: 'cached', direction: 'desc', label: 'Cached' },
    { key: 'resolution', direction: 'desc', label: 'Resolution' },
    { key: 'quality', direction: 'desc', label: 'Quality' },
    { key: 'size', direction: 'desc', label: 'Size' },
    { key: 'seeders', direction: 'desc', label: 'Seeders' },
    { key: 'created_at', direction: 'desc', label: 'Created At' }
  ];

  // Tooltip text for sorting directions
  const tooltipText = {
    'language': ['Sort by preferred languages first', 'Sort by least preferred languages first'],
    'cached': ['Show cached results first', 'Show uncached results first'],
    'resolution': ['Highest resolution first', 'Lowest resolution first'],
    'quality': ['Best quality first', 'Lower quality first'],
    'size': ['Largest size first', 'Smallest size first'],
    'seeders': ['Most seeders first', 'Fewest seeders first'],
    'created_at': ['Newest first', 'Oldest first']
  };

  // Update parent component when data changes
  useEffect(() => {
    updateUserData({
      ...userData,
      selected_resolutions: resolutionsData.selected,
      quality_filter: qualityData.selected,
      max_size: maxSize >= 107266808218 ? 'inf' : maxSize,
      torrent_sorting_priority: sortingOptions,
      show_full_torrent_name: torrentDisplay.option === 'fullName',
      show_language_country_flag: torrentDisplay.showLanguageFlag,
      language_sorting: languageSorting.selected,
      max_streams_per_resolution: advancedOptions.maxStreamsPerResolution,
      live_search_streams: advancedOptions.liveSearchStreams,
      contribution_streams: advancedOptions.contributionStreams
    });
  }, [resolutionsData, qualityData, maxSize, sortingOptions, torrentDisplay, languageSorting.selected, advancedOptions]);

  // Handle resolution selection
  const handleResolutionChange = (e) => {
    const { value, checked } = e.target;
    setResolutionsData(prev => {
      const newSelected = checked
        ? [...prev.selected, value]
        : prev.selected.filter(r => r !== value);
      return { ...prev, selected: newSelected };
    });
  };

  // Handle quality filter selection
  const handleQualityFilterChange = (e) => {
    const { value, checked } = e.target;
    setQualityData(prev => {
      const newSelected = checked
        ? [...prev.selected, value]
        : prev.selected.filter(q => q !== value);
      return { ...prev, selected: newSelected };
    });
  };

  // Handle max size slider
  const handleMaxSizeChange = (e) => {
    setMaxSize(parseInt(e.target.value));
  };

  // Format bytes to human-readable
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes >= 107266808218) return 'Unlimited';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Handle sorting option selection
  const handleSortingOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the option if it doesn't exist
      if (!sortingOptions.some(opt => opt.key === value)) {
        const defaultOption = availableSortingOptions.find(opt => opt.key === value);
        setSortingOptions(prev => [...prev, { ...defaultOption }]);
      }
    } else {
      // Remove the option
      setSortingOptions(prev => prev.filter(opt => opt.key !== value));
    }
  };

  // Toggle sorting direction
  const toggleSortingDirection = (key) => {
    setSortingOptions(prev =>
      prev.map(opt =>
        opt.key === key ? { ...opt, direction: opt.direction === 'desc' ? 'asc' : 'desc' } : opt
      )
    );
  };

  // Handle language selection change via the new LanguageSelector component
  const handleLanguageSelectionChange = (newSelectedLanguages) => {
    setLanguageSorting(prev => ({
      ...prev,
      selected: newSelectedLanguages
    }));
  };

  // Handle torrent display option change
  const handleTorrentDisplayChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTorrentDisplay(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle advanced option changes
  const handleAdvancedOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdvancedOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Streaming Resolutions */}
      <div>
        <h3 className="text-lg text-gray-300 mb-3">
          Select Streaming Resolutions
          <span
            className="ml-1 text-gray-400 cursor-help"
            title="Select the streaming resolutions that you prefer. The addon will filter these when fetching streams."
          >
            (Choose quality)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resolutions.map(resolution => (
            <div key={resolution} className="bg-indigo-900/30 rounded-md p-2 transition-transform hover:-translate-y-1">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="selected_resolutions"
                  value={resolution}
                  checked={resolutionsData.selected.includes(resolution)}
                  onChange={handleResolutionChange}
                  className="mr-2"
                />
                <span className="text-gray-300">{resolution || 'Unknown'}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Language Selector - Now available for both newbie and pro users */}
      <div>
        <h3 className="text-lg text-gray-300 mb-3">
          Filter & Arrange Preferred Languages
          <span
            className="ml-1 text-gray-400 cursor-help"
            title="Select and arrange your preferred languages for streams."
          >
            (Language priority)
          </span>
        </h3>

        {/* Integrated Language Selector Component */}
        <LanguageSelector
          selectedLanguages={languageSorting.selected}
          onChange={handleLanguageSelectionChange}
        />
      </div>

      {/* File Size Range Filter */}
      <div>
        <h3 className="text-lg text-gray-300 mb-3">
          Set Torrent Size
          <span
            className="ml-1 text-gray-400 cursor-help"
            title="Select the file size range for the streams. Slide to the end for no limit."
          >
            (Size limit)
          </span>
        </h3>
        <div className="px-2">
          <input
            type="range"
            className="w-full h-2 bg-indigo-900/70 rounded-lg appearance-none cursor-pointer"
            id="max_size_slider"
            name="size_slider"
            min="0"
            max="107374182400"
            step="100000000"
            value={maxSize}
            onChange={handleMaxSizeChange}
            style={{
              background: `linear-gradient(to right, #4a47a3 ${(maxSize / 107266808218) * 100}%, #1e1e32 ${(maxSize / 107266808218) * 100}%, #1e1e32 100%)`
            }}
          />
        </div>
        <div className="flex justify-between items-center text-gray-400 mt-2">
          <label htmlFor="max_size_slider">Max Torrent Size:</label>
          <span id="max_size_output" className="text-teal-400 font-medium">{formatBytes(maxSize)}</span>
        </div>
      </div>

      {/* Quality Filter - Only show for Pro users */}
      {configMode === 'pro' && (
        <div>
          <h3 className="text-lg text-gray-300 mb-3">
            Select Quality Filter
            <span
              className="ml-1 text-gray-400 cursor-help"
              title="Select the quality levels to filter streams."
            >
              (Filter by type)
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(qualityGroups).map(([group, qualities]) => (
              <div key={group} className="bg-indigo-900/30 rounded-md p-2 transition-transform hover:-translate-y-1">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="quality_filter"
                    value={group}
                    checked={qualityData.selected.includes(group)}
                    onChange={handleQualityFilterChange}
                    className="mr-2"
                  />
                  <div>
                    <span className="text-gray-300">{group}</span>
                    <span
                      className="ml-1 text-gray-400 cursor-help"
                      title={`Contains: ${qualities.join(', ')}`}
                    >
                      (?)
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro Mode Sections */}
      {configMode === 'pro' && (
        <>
          {/* Stream Sorting Priority */}
          <div>
            <h3 className="text-lg text-gray-300 mb-3">
              Select & Arrange Sorting Priority
              <span
                className="ml-1 text-gray-400 cursor-help"
                title="Select and arrange the sorting options. Click to toggle sort direction."
              >
                (Order results)
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableSortingOptions.map(option => {
                const isSelected = sortingOptions.some(opt => opt.key === option.key);
                const currentDirection = sortingOptions.find(opt => opt.key === option.key)?.direction || 'desc';

                return (
                  <div
                    key={option.key}
                    className={`border rounded-lg p-3 transition-all duration-200 ${isSelected ? 'border-indigo-700 bg-indigo-900/30' : 'border-gray-700 bg-indigo-900/10'}`}
                  >
                    <div className="flex justify-between items-center">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="selected_sorting_options"
                          value={option.key}
                          checked={isSelected}
                          onChange={handleSortingOptionChange}
                          className="mr-2"
                        />
                        <span className="text-gray-300">{option.label}</span>
                      </label>

                      <button
                        type="button"
                        className={`px-3 py-1 rounded text-sm transition-colors ${isSelected ? 'bg-indigo-900/50 text-white' : 'bg-gray-800/50 text-gray-500'}`}
                        onClick={() => toggleSortingDirection(option.key)}
                        disabled={!isSelected}
                        title={tooltipText[option.key][currentDirection === 'desc' ? 0 : 1]}
                      >
                        <i className={`bi bi-sort-${currentDirection === 'desc' ? 'down' : 'up-alt'} mr-1`}></i>
                        <span className="hidden sm:inline">{currentDirection === 'desc' ? 'Desc' : 'Asc'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Maximum Streams Result per Resolution */}
          <div>
            <label htmlFor="maxStreamsPerResolution" className="block text-lg text-gray-300 mb-3">
              Max Streams Per Resolution
              <span
                className="ml-1 text-gray-400 cursor-help"
                title="Enter the maximum number of streams per resolution to display in Stremio."
              >
                (Limit results)
              </span>
            </label>
            <input
              type="number"
              className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
              id="maxStreamsPerResolution"
              name="maxStreamsPerResolution"
              min="1"
              placeholder="Enter maximum streams per resolution"
              value={advancedOptions.maxStreamsPerResolution}
              onChange={handleAdvancedOptionChange}
            />
          </div>

          {/* Torrent Information Display */}
          <div>
            <h3 className="text-lg text-gray-300 mb-3">
              Torrent Stream Display option
              <span
                className="ml-1 text-gray-400 cursor-help"
                title="Choose how you want to display the torrent information in Stremio."
              >
                (Display format)
              </span>
            </h3>
            <div className="bg-indigo-900/30 p-4 rounded-lg space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="option"
                  value="parsedData"
                  checked={torrentDisplay.option === 'parsedData'}
                  onChange={handleTorrentDisplayChange}
                  className="mr-2"
                />
                <span className="text-gray-300">Show Parsed Data (Quality, Resolution, Codec, Audio)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="option"
                  value="fullName"
                  checked={torrentDisplay.option === 'fullName'}
                  onChange={handleTorrentDisplayChange}
                  className="mr-2"
                />
                <span className="text-gray-300">Show Torrent Full Name</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="showLanguageFlag"
                  checked={torrentDisplay.showLanguageFlag}
                  onChange={handleTorrentDisplayChange}
                  className="mr-2"
                />
                <span className="text-gray-300">Show Language Country Flag</span>
              </label>
            </div>
          </div>

          {/* Live Search Streams */}
          <div>
            <h3 className="text-lg text-gray-300 mb-3">
              Live Search Streams
              <span
                className="ml-1 text-gray-400 cursor-help"
                title="Opt-in to enable live search based on search timeout period. Otherwise, the stream result will be based on the cached data."
              >
                (Real-time search)
              </span>
            </h3>
            <div className="bg-indigo-900/30 p-4 rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="liveSearchStreams"
                  checked={advancedOptions.liveSearchStreams}
                  onChange={handleAdvancedOptionChange}
                  className="mr-2"
                />
                <span className="text-gray-300">Enable on-demand search for movies & series streams</span>
              </label>
            </div>
          </div>

          {/* Contribution Streams */}
          <div>
            <h3 className="text-lg text-gray-300 mb-3">
              Contribution Streams
              <span
                className="ml-1 text-gray-400 cursor-help"
                title="This feature allows you to show optional stream to add your own stream data into MediaFusion."
              >
                (User contributions)
              </span>
            </h3>
            <div className="bg-indigo-900/30 p-4 rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="contributionStreams"
                  checked={advancedOptions.contributionStreams}
                  onChange={handleAdvancedOptionChange}
                  className="mr-2"
                />
                <span className="text-gray-300">Enable Contribution Streams</span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StreamingPreferences;