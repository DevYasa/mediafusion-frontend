import React, { useState, useEffect } from 'react';

const CatalogConfig = ({ userData, updateUserData }) => {
  const [catalogs, setCatalogs] = useState(userData.selected_catalogs || []);
  const [enableCatalogs, setEnableCatalogs] = useState(userData.enable_catalogs || true);
  const [enableImdbMetadata, setEnableImdbMetadata] = useState(userData.enable_imdb_metadata || true);
  
  // Sample catalog data - in production this would come from an API
  const availableCatalogs = [
    ['movie_top_rated', 'Movies - Top Rated'],
    ['movie_trending', 'Movies - Trending'],
    ['movie_popular', 'Movies - Popular'],
    ['movie_action', 'Movies - Action'],
    ['movie_adventure', 'Movies - Adventure'],
    ['movie_animation', 'Movies - Animation'],
    ['movie_comedy', 'Movies - Comedy'],
    ['movie_crime', 'Movies - Crime'],
    ['movie_documentary', 'Movies - Documentary'],
    ['movie_drama', 'Movies - Drama'],
    ['movie_family', 'Movies - Family'],
    ['movie_fantasy', 'Movies - Fantasy'],
    ['movie_history', 'Movies - History'],
    ['movie_horror', 'Movies - Horror'],
    ['movie_music', 'Movies - Music'],
    ['movie_mystery', 'Movies - Mystery'],
    ['movie_romance', 'Movies - Romance'],
    ['movie_science_fiction', 'Movies - Science Fiction'],
    ['movie_thriller', 'Movies - Thriller'],
    ['movie_war', 'Movies - War'],
    ['movie_western', 'Movies - Western'],
    ['series_top_rated', 'Series - Top Rated'],
    ['series_trending', 'Series - Trending'],
    ['series_popular', 'Series - Popular'],
    ['series_action_adventure', 'Series - Action & Adventure'],
    ['series_animation', 'Series - Animation'],
    ['series_comedy', 'Series - Comedy'],
    ['series_crime', 'Series - Crime'],
    ['series_documentary', 'Series - Documentary'],
    ['series_drama', 'Series - Drama'],
    ['series_family', 'Series - Family'],
    ['series_kids', 'Series - Kids'],
    ['series_mystery', 'Series - Mystery'],
    ['series_reality', 'Series - Reality'],
    ['series_sci_fi_fantasy', 'Series - Sci-Fi & Fantasy'],
    ['series_soap', 'Series - Soap'],
    ['series_talk', 'Series - Talk'],
    ['series_war_politics', 'Series - War & Politics'],
    ['series_western', 'Series - Western'],
  ];

  useEffect(() => {
    updateUserData({
      ...userData,
      selected_catalogs: catalogs,
      enable_catalogs: enableCatalogs,
      enable_imdb_metadata: enableImdbMetadata
    });
  }, [catalogs, enableCatalogs, enableImdbMetadata]);

  const handleCatalogChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCatalogs(prev => [...prev, value]);
    } else {
      setCatalogs(prev => prev.filter(catalog => catalog !== value));
    }
  };

  const handleEnableCatalogsChange = (e) => {
    setEnableCatalogs(e.target.checked);
  };

  const handleEnableImdbMetadataChange = (e) => {
    setEnableImdbMetadata(e.target.checked);
  };

  const selectAllCatalogs = () => {
    setCatalogs(availableCatalogs.map(catalog => catalog[0]));
  };

  const deselectAllCatalogs = () => {
    setCatalogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Catalog Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg text-gray-300">
            Select & Arrange Catalogs:
            <span 
              className="ml-1 text-gray-400 cursor-help"
              title="Select and arrange the catalogs that you want to display in Stremio."
            >
              (Choose catalogs)
            </span>
          </h6>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={selectAllCatalogs}
              className="px-3 py-1 text-sm bg-gradient-to-r from-teal-600 to-indigo-700 text-white rounded-md transition-colors hover:from-teal-700 hover:to-indigo-800"
            >
              <i className="bi bi-check-all mr-1"></i> Select All
            </button>
            <button
              type="button"
              onClick={deselectAllCatalogs}
              className="px-3 py-1 text-sm bg-indigo-900/50 text-gray-300 hover:bg-indigo-900/70 rounded-md transition-colors"
            >
              <i className="bi bi-x-lg mr-1"></i> Deselect All
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableCatalogs.map(([id, name]) => (
            <div key={id} className="bg-indigo-900/30 rounded-md p-2 transition-transform hover:-translate-y-1 cursor-move">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="selected_catalogs"
                  value={id}
                  checked={catalogs.includes(id)}
                  onChange={handleCatalogChange}
                  className="mr-2"
                />
                <span className="text-gray-300">{name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Enable Catalogs Checkbox */}
      <div className="bg-indigo-900/30 p-4 rounded-lg">
        <h6 className="text-lg text-gray-300 mb-3">Enable Catalogs:</h6>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="enable_catalogs"
            checked={enableCatalogs}
            onChange={handleEnableCatalogsChange}
            className="mr-2"
          />
          <div>
            <span className="text-gray-300">Show Catalogs in Stremio & Kodi</span>
            <span 
              className="ml-1 text-gray-400 cursor-help"
              title="Toggle to add or hide catalogs in Stremio. This is perfect for when you want to install multiple addons without creating duplicate catalog content and only want to display streams."
            >
              (Toggle visibility)
            </span>
          </div>
        </label>
      </div>

      {/* Enable IMDb Metadata Response Checkbox */}
      <div className="bg-indigo-900/30 p-4 rounded-lg">
        <h6 className="text-lg text-gray-300 mb-3">Enable IMDb Title Meta Data Response:</h6>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="enable_imdb_metadata"
            checked={enableImdbMetadata}
            onChange={handleEnableImdbMetadataChange}
            className="mr-2"
          />
          <div>
            <span className="text-gray-300">Enable IMDb Meta Data Response</span>
            <span 
              className="ml-1 text-gray-400 cursor-help"
              title="Toggle to enable or disable IMDb title metadata response. Stremio users prefer to only use cinemeta Addon for metadata and disable this. For the Kodi users, this option needs to be enabled."
            >
              (Metadata option)
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default CatalogConfig;