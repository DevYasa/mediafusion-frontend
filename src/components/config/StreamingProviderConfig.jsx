import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this package

const StreamingProviderConfig = ({ userData, updateUserData }) => {
  // Changed the state to handle multiple providers
  const [providerList, setProviderList] = useState(() => {
    // Initialize with existing providers or an empty array with a default Direct Torrent
    const existingProviders = userData.streaming_providers || [];
    return existingProviders.length > 0 ? existingProviders : [
      {
        id: uuidv4(),
        name: 'Default',
        service: '',
        url: '',
        token: '',
        email: '',
        password: '',
        enable_watchlist_catalogs: false,
        download_via_browser: false,
        only_show_cached_streams: false,
        qbittorrent_config: null,
        stremthru_store_name: '',
      }
    ];
  });
  
  // Password visibility states for each provider
  const [passwordVisibility, setPasswordVisibility] = useState({});
  
  // Provider data
  const providers = [
    { value: "", label: "Direct Torrent (P2P)", type: "Free", allowMultiple: false },
    { value: "pikpak", label: "PikPak", type: "Free Quota / Premium", allowMultiple: true },
    { value: "seedr", label: "Seedr.cc", type: "Free Quota / Premium", allowMultiple: true },
    { value: "offcloud", label: "OffCloud", type: "Free Quota / Premium", allowMultiple: true },
    { value: "torbox", label: "Torbox", type: "Free Quota / Premium", allowMultiple: true },
    { value: "realdebrid", label: "Real-Debrid", type: "Premium", allowMultiple: true },
    { value: "debridlink", label: "Debrid-Link", type: "Premium", allowMultiple: true },
    { value: "premiumize", label: "Premiumize", type: "Premium", allowMultiple: true },
    { value: "alldebrid", label: "AllDebrid", type: "Premium", allowMultiple: true },
    { value: "easydebrid", label: "EasyDebrid", type: "Premium", allowMultiple: true },
    { value: "qbittorrent", label: "qBittorrent - WebDav", type: "Free/Premium", allowMultiple: true },
    { value: "stremthru", label: "StremThru", type: "Interface", allowMultiple: true }
  ];

  const stremthruStores = [
    { value: "", label: "" },
    { value: "torbox", label: "Torbox" },
    { value: "realdebrid", label: "Real-Debrid" },
    { value: "debridlink", label: "Debrid-Link" },
    { value: "premiumize", label: "Premiumize" },
    { value: "alldebrid", label: "AllDebrid" }
  ];

  const providerSignupLinks = {
    pikpak: 'https://mypikpak.com/drive/activity/invited?invitation-code=52875535',
    seedr: 'https://www.seedr.cc/?r=2726511',
    offcloud: 'https://offcloud.com/?=9932cd9f',
    realdebrid: 'http://real-debrid.com/?id=9490816',
    debridlink: 'https://debrid-link.com/id/kHgZs',
    alldebrid: 'https://alldebrid.com/?uid=3ndha&lang=en',
    torbox: 'https://torbox.app/subscription?referral=339b923e-fb23-40e7-8031-4af39c212e3c',
    easydebrid: 'https://paradise-cloud.com/products/easydebrid',
    premiumize: 'https://www.premiumize.me',
    qbittorrent: 'https://github.com/mhdzumair/MediaFusion/tree/main/streaming_providers/qbittorrent#qbittorrent-webdav-setup-options-with-mediafusion',
    stremthru: 'https://github.com/MunifTanjim/stremthru?tab=readme-ov-file#configuration',
  };

  const servicesRequiringUrl = ['stremthru'];
  const servicesRequiringCredentials = ['pikpak'];
  
  // Update parent component when providerList changes
  useEffect(() => {
    updateUserData({
      ...userData,
      streaming_providers: providerList
    });
  }, [providerList]);

  // Helper to toggle password visibility
  const togglePasswordVisibility = (providerId, field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [`${providerId}_${field}`]: !prev[`${providerId}_${field}`]
    }));
  };

  // Add a new provider
  const addProvider = () => {
    setProviderList(prev => [
      ...prev,
      {
        id: uuidv4(),
        name: `Account ${prev.length + 1}`,
        service: '',
        url: '',
        token: '',
        email: '',
        password: '',
        enable_watchlist_catalogs: false,
        download_via_browser: false,
        only_show_cached_streams: false,
        qbittorrent_config: null,
        stremthru_store_name: '',
      }
    ]);
  };

  // Remove a provider
  const removeProvider = (providerId) => {
    setProviderList(prev => prev.filter(provider => provider.id !== providerId));
  };

  // Handle field changes for a specific provider
  const handleProviderChange = (providerId, field, value) => {
    setProviderList(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, [field]: value } 
          : provider
      )
    );
  };

  // Handle service type change for a provider
  const handleServiceChange = (providerId, service) => {
    // Find the provider definition
    const providerDef = providers.find(p => p.value === service);
    const allowMultiple = providerDef?.allowMultiple || false;
    
    // Check if this service type is already in use and doesn't allow multiple
    if (!allowMultiple) {
      const exists = providerList.some(p => p.id !== providerId && p.service === service);
      if (exists) {
        alert(`You can only have one ${providerDef?.label || 'Direct Torrent'} provider.`);
        return;
      }
    }
    
    setProviderList(prev => 
      prev.map(provider => {
        if (provider.id === providerId) {
          // Reset provider-specific fields
          const updated = {
            ...provider,
            service,
            url: '',
            token: '',
            email: '',
            password: '',
            qbittorrent_config: service === 'qbittorrent' ? {
              qbittorrent_url: '',
              qbittorrent_username: '',
              qbittorrent_password: '',
              seeding_time_limit: 1440,
              seeding_ratio_limit: 1.0,
              play_video_after: 100,
              category: 'MediaFusion',
              webdav_url: '',
              webdav_username: '',
              webdav_password: '',
              webdav_downloads_path: '/'
            } : null,
            stremthru_store_name: '',
          };
          return updated;
        }
        return provider;
      })
    );
  };

  // Handle qBittorrent config changes
  const handleQbittorrentChange = (providerId, field, value) => {
    setProviderList(prev => 
      prev.map(provider => {
        if (provider.id === providerId) {
          return {
            ...provider,
            qbittorrent_config: {
              ...provider.qbittorrent_config,
              [field]: value
            }
          };
        }
        return provider;
      })
    );
  };

  // Init OAuth flow for a provider
  const initiateOAuthFlow = async (providerId, service) => {
    // Set a loading state for this provider
    setProviderList(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, isAuthorizing: true } 
          : provider
      )
    );
    
    let getDeviceCodeUrl, authorizeUrl;
    
    if (service === 'seedr') {
      getDeviceCodeUrl = '/streaming_provider/seedr/get-device-code';
      authorizeUrl = '/streaming_provider/seedr/authorize';
    } else if (service === 'realdebrid') {
      getDeviceCodeUrl = '/streaming_provider/realdebrid/get-device-code';
      authorizeUrl = '/streaming_provider/realdebrid/authorize';
    } else if (service === 'debridlink') {
      getDeviceCodeUrl = '/streaming_provider/debridlink/get-device-code';
      authorizeUrl = '/streaming_provider/debridlink/authorize';
    } else if (service === 'premiumize') {
      window.location.href = "/streaming_provider/premiumize/authorize";
      return;
    }
    
    try {
      const response = await fetch(getDeviceCodeUrl);
      const data = await response.json();
      
      if (data.device_code) {
        // Update provider with device code and verification URL
        setProviderList(prev => 
          prev.map(provider => {
            if (provider.id === providerId) {
              return {
                ...provider,
                deviceCode: data.user_code,
                verificationUrl: data.verification_url || ''
              };
            }
            return provider;
          })
        );
        
        // Start polling for authorization
        checkAuthorization(providerId, data.device_code, authorizeUrl);
      }
    } catch (error) {
      console.error('Error fetching device code:', error);
      // Reset authorizing state
      setProviderList(prev => 
        prev.map(provider => {
          if (provider.id === providerId) {
            return {
              ...provider,
              isAuthorizing: false
            };
          }
          return provider;
        })
      );
    }
  };

  const checkAuthorization = async (providerId, deviceCode, authorizeUrl) => {
    setTimeout(async () => {
      // Get the latest state of the provider
      const provider = providerList.find(p => p.id === providerId);
      
      // If provider is no longer authorizing, exit the polling
      if (!provider || !provider.isAuthorizing) return;
      
      try {
        const response = await fetch(authorizeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ device_code: deviceCode })
        });
        
        const data = await response.json();
        
        if (data.token) {
          // Update provider with token and reset authorizing state
          setProviderList(prev => 
            prev.map(p => {
              if (p.id === providerId) {
                return {
                  ...p,
                  token: data.token,
                  isAuthorizing: false,
                  deviceCode: '',
                  verificationUrl: ''
                };
              }
              return p;
            })
          );
        } else {
          // Continue polling
          checkAuthorization(providerId, deviceCode, authorizeUrl);
        }
      } catch (error) {
        console.error('Error checking authorization:', error);
        // Reset authorizing state
        setProviderList(prev => 
          prev.map(p => {
            if (p.id === providerId) {
              return {
                ...p,
                isAuthorizing: false
              };
            }
            return p;
          })
        );
      }
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Provider List */}
      {providerList.map((provider, index) => {
        // Determine what to show based on the provider service
        const showServiceUrl = servicesRequiringUrl.includes(provider.service);
        const showStremthruConfig = provider.service === 'stremthru';
        const showCredentials = servicesRequiringCredentials.includes(provider.service);
        const showToken = provider.service && !servicesRequiringCredentials.includes(provider.service) && provider.service !== 'qbittorrent';
        const showQbittorrentConfig = provider.service === 'qbittorrent';
        const showOAuthSection = ['seedr', 'realdebrid', 'debridlink', 'premiumize'].includes(provider.service) && !provider.token;
        const showSignupSection = provider.service in providerSignupLinks;
        const showProviderOptions = !!provider.service;
        const showAccountName = provider.service !== ''; // Show account name for all except Direct Torrent
        
        return (
          <div 
            key={provider.id} 
            className="bg-indigo-900/30 p-5 rounded-lg border border-indigo-700/30 relative"
          >
            {/* Remove button - only show if there's more than one provider */}
            {providerList.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
                onClick={() => removeProvider(provider.id)}
              >
                <i className="bi bi-x-circle text-xl"></i>
              </button>
            )}
            
            <div className="space-y-4">
              {/* Provider Label */}
              <div className="text-lg text-teal-300 font-medium">
                Provider {index + 1}
              </div>
              
              {/* Provider Selection */}
              <div>
                <label htmlFor={`provider_service_${provider.id}`} className="block text-gray-300 mb-2">
                  Streaming Provider: 
                  <span 
                    className="ml-1 text-gray-400 cursor-help"
                    title="Choose a streaming provider to integrate with the addon. Each has unique features and capabilities."
                  >
                    (Choose a provider)
                  </span>
                </label>
                <select
                  className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                  name="service"
                  id={`provider_service_${provider.id}`}
                  value={provider.service || ''}
                  onChange={(e) => handleServiceChange(provider.id, e.target.value)}
                >
                  {providers.map((p) => (
                    <option 
                      key={p.value} 
                      value={p.value}
                      className="bg-indigo-900"
                    >
                      {p.label} ({p.type})
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Account Name - only for non-Direct Torrent providers */}
              {showAccountName && (
                <div>
                  <label htmlFor={`account_name_${provider.id}`} className="block text-gray-300 mb-2">
                    Account Name:
                    <span 
                      className="ml-1 text-gray-400 cursor-help"
                      title="Give this account a name to identify it easily."
                    >
                      (For identification)
                    </span>
                  </label>
                  <input
                    className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                    type="text"
                    id={`account_name_${provider.id}`}
                    placeholder="Enter a name for this account"
                    value={provider.name}
                    onChange={(e) => handleProviderChange(provider.id, 'name', e.target.value)}
                  />
                </div>
              )}
              
              {/* Service URL */}
              {showServiceUrl && (
                <div>
                  <label htmlFor={`service_url_${provider.id}`} className="block text-gray-300 mb-2">Service URL:</label>
                  <input
                    className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                    type="text"
                    id={`service_url_${provider.id}`}
                    placeholder="https://"
                    value={provider.url || ''}
                    onChange={(e) => handleProviderChange(provider.id, 'url', e.target.value)}
                  />
                </div>
              )}

              {/* StremThru Configuration */}
              {showStremthruConfig && (
                <div>
                  <label htmlFor={`stremthru_store_name_${provider.id}`} className="block text-gray-300 mb-2">Store Name:</label>
                  <select
                    className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                    id={`stremthru_store_name_${provider.id}`}
                    value={provider.stremthru_store_name || ''}
                    onChange={(e) => handleProviderChange(provider.id, 'stremthru_store_name', e.target.value)}
                  >
                    {stremthruStores.map((store) => (
                      <option 
                        key={store.value} 
                        value={store.value}
                        className="bg-indigo-900"
                      >
                        {store.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Affiliate Signup Links */}
              {showSignupSection && (
                <div>
                  <h6 className="text-gray-300 mb-2">Don't have an account?</h6>
                  <a 
                    href={providerSignupLinks[provider.service]} 
                    className="inline-block px-4 py-2 bg-gradient-to-r from-teal-600 to-indigo-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Create Account
                  </a>
                </div>
              )}

              {/* Credentials Input */}
              {showCredentials && (
                <div className="bg-indigo-900/40 p-4 rounded-lg">
                  <h6 className="text-gray-300 mb-3">Enter Credentials</h6>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor={`email_${provider.id}`} className="block text-gray-300 mb-2">Email:</label>
                      <input
                        className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                        type="text"
                        id={`email_${provider.id}`}
                        placeholder="Enter Email"
                        value={provider.email || ''}
                        onChange={(e) => handleProviderChange(provider.id, 'email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor={`password_${provider.id}`} className="block text-gray-300 mb-2">Password:</label>
                      <div className="flex">
                        <input
                          className="flex-grow bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-l-lg p-2"
                          type={passwordVisibility[`${provider.id}_password`] ? "text" : "password"}
                          id={`password_${provider.id}`}
                          placeholder="Enter Password"
                          value={provider.password || ''}
                          onChange={(e) => handleProviderChange(provider.id, 'password', e.target.value)}
                        />
                        <button
                          type="button"
                          className="bg-indigo-800/60 border border-indigo-700/50 border-l-0 rounded-r-lg px-3"
                          onClick={() => togglePasswordVisibility(provider.id, 'password')}
                        >
                          <span className={`bi ${passwordVisibility[`${provider.id}_password`] ? 'bi-eye-slash' : 'bi-eye'} text-gray-300`}></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OAuth Section */}
              {showOAuthSection && (
                <div className="bg-indigo-900/40 p-4 rounded-lg">
                  <h6 className="text-gray-300 mb-2">
                    Authorize Addon (Recommended) 
                    <span 
                      className="ml-1 text-gray-400 cursor-help"
                      title="Authorize the addon to access your streaming provider account. This is recommended instead using your private token."
                    >
                      (Recommended)
                    </span>
                  </h6>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-indigo-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    onClick={() => initiateOAuthFlow(provider.id, provider.service)}
                    disabled={provider.isAuthorizing}
                  >
                    {provider.isAuthorizing ? 'Authorizing...' : `Authorize with ${provider.service.charAt(0).toUpperCase() + provider.service.slice(1)}`}
                  </button>
                  
                  {provider.isAuthorizing && provider.deviceCode && (
                    <div className="mt-4 bg-indigo-900/50 p-4 rounded-lg border border-indigo-700/50">
                      <p className="text-gray-300">To complete the authorization, follow these steps:</p>
                      <ol className="text-gray-300 list-decimal ml-5 mt-2">
                        <li>
                          Visit the authorization link: 
                          <a 
                            href={provider.verificationUrl} 
                            className="ml-1 text-teal-400 hover:underline" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {provider.verificationUrl}
                          </a>
                        </li>
                        <li>Enter the device code provided below into the authorization page.</li>
                      </ol>
                      <p className="mt-2 text-gray-300">
                        Your device code: <strong className="text-teal-300">{provider.deviceCode}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Token for Providers */}
              {showToken && (
                <div>
                  <label htmlFor={`provider_token_${provider.id}`} className="block text-gray-300 mb-2">
                    Token: 
                    <span 
                      className="ml-1 text-gray-400 cursor-help"
                      title="Enter Encoded Token previously generated or Click 'Authorize' to generate a new token or Provide your Private Token."
                    >
                      (Enter your token)
                    </span>
                  </label>
                  <input
                    className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                    type="text"
                    id={`provider_token_${provider.id}`}
                    placeholder="Enter Token"
                    value={provider.token || ''}
                    onChange={(e) => handleProviderChange(provider.id, 'token', e.target.value)}
                    disabled={provider.isAuthorizing}
                  />
                </div>
              )}

              {/* qBittorrent Configuration */}
              {showQbittorrentConfig && (
                <div className="bg-indigo-900/40 p-4 rounded-lg space-y-4">
                  <h5 className="text-lg font-medium text-teal-300 mb-3">qBittorrent Configuration</h5>
                  {/* qBittorrent fields - simplified version */}
                  <div>
                    <label htmlFor={`qbittorrent_url_${provider.id}`} className="block text-gray-300 mb-2">qBittorrent URL:</label>
                    <input
                      className="w-full bg-indigo-900/40 text-gray-300 border border-indigo-700/50 rounded-lg p-2"
                      type="text"
                      id={`qbittorrent_url_${provider.id}`}
                      placeholder="Enter qBittorrent URL"
                      value={provider.qbittorrent_config?.qbittorrent_url || ''}
                      onChange={(e) => handleQbittorrentChange(provider.id, 'qbittorrent_url', e.target.value)}
                    />
                  </div>
                  
                  {/* Additional qBittorrent fields would go here */}
                  {/* ... */}
                </div>
              )}

              {/* Streaming Provider Options */}
              {showProviderOptions && (
                <div className="bg-indigo-900/40 p-4 rounded-lg">
                  <h6 className="text-gray-300 mb-3">Streaming Provider Options:</h6>
                  <div className="space-y-3">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={provider.enable_watchlist_catalogs || false}
                        onChange={(e) => handleProviderChange(provider.id, 'enable_watchlist_catalogs', e.target.checked)}
                        className="mt-1 mr-2"
                      />
                      <span className="text-gray-300">
                        Enable {provider.service.charAt(0).toUpperCase() + provider.service.slice(1)} Watchlist
                      </span>
                    </label>
                    
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={provider.download_via_browser || false}
                        onChange={(e) => handleProviderChange(provider.id, 'download_via_browser', e.target.checked)}
                        className="mt-1 mr-2"
                      />
                      <div>
                        <span className="text-gray-300">Enable Download via Browser</span>
                        <span 
                          className="ml-1 text-gray-400 cursor-help"
                          title="Show a download option in Stremio & Kodi to access torrent streams via web browser."
                        >
                          (For browser access)
                        </span>
                      </div>
                    </label>
                    
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={provider.only_show_cached_streams || false}
                        onChange={(e) => handleProviderChange(provider.id, 'only_show_cached_streams', e.target.checked)}
                        className="mt-1 mr-2"
                      />
                      <span className="text-gray-300">Only Show Cached Streams</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Add Provider Button */}
      <div className="flex justify-center">
        <button
          type="button"
          className="px-4 py-2 bg-indigo-900/50 text-gray-300 rounded-lg hover:bg-indigo-900/70 transition-colors flex items-center"
          onClick={addProvider}
        >
          <i className="bi bi-plus-circle mr-2"></i>
          Add Another Provider
        </button>
      </div>
    </div>
  );
};

export default StreamingProviderConfig;