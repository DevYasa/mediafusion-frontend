import React, { useState, useEffect } from 'react';

const ExternalServicesConfig = ({ userData, updateUserData }) => {
  // MediaFlow Configuration
  const [mediaflowConfig, setMediaflowConfig] = useState({
    enabled: !!userData.mediaflow_config,
    proxy_url: userData.mediaflow_config?.proxy_url || '',
    api_password: userData.mediaflow_config?.api_password || '',
    public_ip: userData.mediaflow_config?.public_ip || '',
    proxy_live_streams: userData.mediaflow_config?.proxy_live_streams || false,
    proxy_debrid_streams: userData.mediaflow_config?.proxy_debrid_streams || false
  });
  
  // RPDB Configuration
  const [rpdbConfig, setRpdbConfig] = useState({
    enabled: !!userData.rpdb_config,
    api_key: userData.rpdb_config?.api_key || ''
  });
  
  // MDBList Configuration
  const [mdblistConfig, setMdblistConfig] = useState({
    enabled: !!userData.mdblist_config,
    api_key: userData.mdblist_config?.api_key || '',
    lists: userData.mdblist_config?.lists || []
  });
  
  // Password visibility toggles
  const [showMediaFlowPassword, setShowMediaFlowPassword] = useState(false);
  const [showRPDBApiKey, setShowRPDBApiKey] = useState(false);
  const [showMDBListApiKey, setShowMDBListApiKey] = useState(false);

  // Update parent component when configs change
  useEffect(() => {
    const newUserData = { ...userData };
    
    // MediaFlow Config
    if (mediaflowConfig.enabled) {
      newUserData.mediaflow_config = {
        proxy_url: mediaflowConfig.proxy_url,
        api_password: mediaflowConfig.api_password,
        public_ip: mediaflowConfig.public_ip,
        proxy_live_streams: mediaflowConfig.proxy_live_streams,
        proxy_debrid_streams: mediaflowConfig.proxy_debrid_streams
      };
    } else {
      newUserData.mediaflow_config = null;
    }
    
    // RPDB Config
    if (rpdbConfig.enabled) {
      newUserData.rpdb_config = {
        api_key: rpdbConfig.api_key
      };
    } else {
      newUserData.rpdb_config = null;
    }
    
    // MDBList Config
    if (mdblistConfig.enabled) {
      newUserData.mdblist_config = {
        api_key: mdblistConfig.api_key,
        lists: mdblistConfig.lists
      };
    } else {
      newUserData.mdblist_config = null;
    }
    
    updateUserData(newUserData);
  }, [mediaflowConfig, rpdbConfig, mdblistConfig]);

  // MediaFlow Config Handlers
  const handleMediaFlowChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMediaflowConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // RPDB Config Handlers
  const handleRPDBChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRpdbConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // MDBList Config Handlers
  const handleMDBListChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMdblistConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Verify MDBList API Key
  const verifyMDBListApiKey = async () => {
    if (!mdblistConfig.api_key?.trim()) {
      alert('Please enter an API key');
      return;
    }
    
    // In a real app, this would call to your backend
    alert('API key verification would happen here');
    
    // This would normally be set based on the API response
    setMdblistConfig(prev => ({
      ...prev,
      verified: true
    }));
  };

  return (
    <div className="space-y-8">
      {/* MediaFlow Configuration */}
      <div className="bg-indigo-900/30 p-4 rounded-lg">
        <h3 className="text-lg text-gray-300 mb-3">MediaFlow Configuration</h3>
        <label className="flex items-start cursor-pointer mb-3">
          <input
            type="checkbox"
            name="enabled"
            checked={mediaflowConfig.enabled}
            onChange={handleMediaFlowChange}
            className="mt-1 mr-2"
          />
          <div>
            <span className="text-gray-300">Enable MediaFlow</span>
            <span 
              className="ml-1 text-gray-400 cursor-help"
              title="Enable to use MediaFlow for handling various stream types and routing."
            >
              (Stream handling)
            </span>
          </div>
        </label>
        
        {mediaflowConfig.enabled && (
          <div className="pl-6 space-y-3 mt-4">
            <div className="mb-2">
              <a 
                href="https://github.com/mhdzumair/mediaflow-proxy?tab=readme-ov-file#mediaflow-proxy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline"
              >
                MediaFlow Setup Guide
              </a>
            </div>
            
            <div>
              <label htmlFor="mediaflow_proxy_url" className="block text-gray-300 mb-1">MediaFlow Proxy URL:</label>
              <input
                type="text"
                id="mediaflow_proxy_url"
                name="proxy_url"
                className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                placeholder="https://your-mediaflow-proxy-url.com or http://127.0.0.1:8888"
                value={mediaflowConfig.proxy_url}
                onChange={handleMediaFlowChange}
              />
            </div>
            
            <div>
              <label htmlFor="mediaflow_api_password" className="block text-gray-300 mb-1">MediaFlow API Password:</label>
              <div className="flex">
                <input
                  type={showMediaFlowPassword ? "text" : "password"}
                  id="mediaflow_api_password"
                  name="api_password"
                  className="flex-grow bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-l-lg p-2"
                  value={mediaflowConfig.api_password}
                  onChange={handleMediaFlowChange}
                />
                <button
                  type="button"
                  className="bg-indigo-800/60 border border-indigo-700/50 border-l-0 rounded-r-lg px-3"
                  onClick={() => setShowMediaFlowPassword(!showMediaFlowPassword)}
                >
                  <span className={`bi ${showMediaFlowPassword ? 'bi-eye-slash' : 'bi-eye'} text-gray-300`}></span>
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="mediaflow_public_ip" className="block text-gray-300 mb-1">
                MediaFlow Public IP (Optional):
                <span 
                  className="ml-1 text-gray-400 cursor-help"
                  title="Configure this only when running MediaFlow locally with a proxy service. Leave empty if MediaFlow is configured locally without a proxy server or if it's hosted on a remote server."
                >
                  (Optional)
                </span>
              </label>
              <input
                type="text"
                id="mediaflow_public_ip"
                name="public_ip"
                className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                placeholder="Enter public IP address. (Optional, See tooltip for details)"
                value={mediaflowConfig.public_ip}
                onChange={handleMediaFlowChange}
              />
            </div>
            
            <div>
              <label className="flex items-start cursor-pointer mb-2">
                <input
                  type="checkbox"
                  name="proxy_live_streams"
                  checked={mediaflowConfig.proxy_live_streams}
                  onChange={handleMediaFlowChange}
                  className="mt-1 mr-2"
                />
                <div>
                  <span className="text-gray-300">Proxy Live Streams</span>
                  <span 
                    className="ml-1 text-gray-400 cursor-help"
                    title="Enable to proxy live streams through MediaFlow."
                  >
                    (Stream routing)
                  </span>
                </div>
              </label>
            </div>
            
            <div>
              <label className="flex items-start cursor-pointer mb-2">
                <input
                  type="checkbox"
                  name="proxy_debrid_streams"
                  checked={mediaflowConfig.proxy_debrid_streams}
                  onChange={handleMediaFlowChange}
                  className="mt-1 mr-2"
                />
                <div>
                  <span className="text-gray-300">Proxy Debrid Streams</span>
                  <span 
                    className="ml-1 text-gray-400 cursor-help"
                    title="Enable to proxy debrid streams through MediaFlow."
                  >
                    (Stream routing)
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* RPDB Configuration */}
      <div className="bg-indigo-900/30 p-4 rounded-lg">
        <h3 className="text-lg text-gray-300 mb-3">RPDB (RatingPosterDB) Configuration</h3>
        <label className="flex items-start cursor-pointer mb-3">
          <input
            type="checkbox"
            name="enabled"
            checked={rpdbConfig.enabled}
            onChange={handleRPDBChange}
            className="mt-1 mr-2"
          />
          <div>
            <span className="text-gray-300">Enable RPDB Posters</span>
            <span 
              className="ml-1 text-gray-400 cursor-help"
              title="Enable to use RPDB for rating posters. Poster configurations can be managed in your RPDB account settings."
            >
              (Enhanced posters)
            </span>
          </div>
        </label>

        {rpdbConfig.enabled && (
          <div className="pl-6 space-y-3 mt-4">
            <div className="flex space-x-4 mb-2">
              <a 
                href="https://ratingposterdb.com/api-key/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline"
              >
                Get RPDB API Key
              </a>
              <span className="text-gray-500">|</span>
              <a 
                href="https://manager.ratingposterdb.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline"
              >
                Configure RPDB Posters Settings
              </a>
            </div>

            <p className="text-gray-400 text-sm">
              <small>RPDB is an optional <b>Freemium</b> third-party service for enhanced rating posters. By default, MediaFusion generates rating posters using IMDb ratings.</small>
            </p>

            <div>
              <label htmlFor="rpdb_api_key" className="block text-gray-300 mb-1">RPDB API Key:</label>
              <div className="flex">
                <input
                  type={showRPDBApiKey ? "text" : "password"}
                  id="rpdb_api_key"
                  name="api_key"
                  className="flex-grow bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-l-lg p-2"
                  value={rpdbConfig.api_key}
                  onChange={handleRPDBChange}
                />
                <button
                  type="button"
                  className="bg-indigo-800/60 border border-indigo-700/50 border-l-0 rounded-r-lg px-3"
                  onClick={() => setShowRPDBApiKey(!showRPDBApiKey)}
                >
                  <span className={`bi ${showRPDBApiKey ? 'bi-eye-slash' : 'bi-eye'} text-gray-300`}></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MDBList Configuration */}
      <div className="bg-indigo-900/30 p-4 rounded-lg">
        <h3 className="text-lg text-gray-300 mb-3">MDBList Configuration</h3>
        <label className="flex items-start cursor-pointer mb-3">
          <input
            type="checkbox"
            name="enabled"
            checked={mdblistConfig.enabled}
            onChange={handleMDBListChange}
            className="mt-1 mr-2"
          />
          <div>
            <span className="text-gray-300">Enable MDBList Integration</span>
            <span 
              className="ml-1 text-gray-400 cursor-help"
              title="Enable to use MDBList for custom movie and TV show lists."
            >
              (Custom lists)
            </span>
          </div>
        </label>

        {mdblistConfig.enabled && (
          <div className="pl-6 space-y-3 mt-4">
            <div>
              <label htmlFor="mdblist_api_key" className="block text-gray-300 mb-1">MDBList API Key:</label>
              <div className="flex">
                <input
                  type={showMDBListApiKey ? "text" : "password"}
                  id="mdblist_api_key"
                  name="api_key"
                  className="flex-grow bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-l-lg p-2"
                  placeholder="Enter your MDBList API key"
                  value={mdblistConfig.api_key}
                  onChange={handleMDBListChange}
                />
                <button
                  type="button"
                  className="bg-indigo-800/60 border border-indigo-700/50 border-l-0 rounded-r-lg px-3"
                  onClick={() => setShowMDBListApiKey(!showMDBListApiKey)}
                >
                  <span className={`bi ${showMDBListApiKey ? 'bi-eye-slash' : 'bi-eye'} text-gray-300`}></span>
                </button>
                <button
                  type="button"
                  className="bg-indigo-700 border border-indigo-700 rounded-r-lg px-3 ml-1"
                  onClick={verifyMDBListApiKey}
                >
                  <i className="bi bi-check-circle mr-1"></i> Verify
                </button>
              </div>

              <small className="block mt-2 text-gray-400">
                To get your API key:
                <ol className="list-decimal ml-5 mt-1">
                  <li>Sign up/Login to <a href="https://mdblist.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">MDBList</a></li>
                  <li>Go to <a href="https://mdblist.com/preferences/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">API Key Preferences</a></li>
                  <li>Create a new API key if you don't have one</li>
                </ol>
              </small>
            </div>

            {/* In a real application, this would be replaced with actual MDBList Management UI */}
            <div className="bg-indigo-900/40 p-4 rounded-lg border border-indigo-700/30 mt-4">
              <p className="text-center text-gray-300">
                MDBList Management would be rendered here after API key verification
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalServicesConfig;