import React, { useState, useEffect } from 'react';
import SectionContainer from '../components/config/SectionContainer';
import ConfigModeSwitch from '../components/config/ConfigModeSwitch';
import StreamingProviderConfig from '../components/config/StreamingProviderConfig';
import CatalogConfig from '../components/config/CatalogConfig';
import ParentalGuides from '../components/config/ParentalGuides';
import StreamingPreferences from '../components/config/StreamingPreferences';
import ExternalServicesConfig from '../components/config/ExternalServicesConfig';
import ActionButtons from '../components/config/ActionButtons';

const ConfigurePage = () => {
  const [configMode, setConfigMode] = useState('newbie');
  const [userData, setUserData] = useState({
    streaming_provider: {
      service: '',
      url: '',
      token: '',
      enable_watchlist_catalogs: false,
      download_via_browser: false,
      only_show_cached_streams: false,
    },
    selected_catalogs: [],
    selected_resolutions: [],
    enable_catalogs: true,
    enable_imdb_metadata: true,
    quality_filter: [],
    max_size: 'inf',
    torrent_sorting_priority: [
      { key: 'cached', direction: 'desc' },
      { key: 'seeders', direction: 'desc' },
      { key: 'resolution', direction: 'desc' }
    ],
    show_full_torrent_name: false,
    show_language_country_flag: true,
    nudity_filter: ['Disable'],
    certification_filter: ['Disable'],
    language_sorting: [],
    mediaflow_config: null,
    rpdb_config: null,
    mdblist_config: null,
    live_search_streams: false,
    contribution_streams: false
  });
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Processing your configuration...');
  const [fallbackUrl, setFallbackUrl] = useState('');

  useEffect(() => {
    // Try to load saved config mode preference
    try {
      const savedMode = localStorage.getItem('configMode');
      if (savedMode) setConfigMode(savedMode);
    } catch (e) {
      console.warn('Failed to read config mode preference:', e);
    }
  }, []);

  const handleConfigModeChange = (mode) => {
    setConfigMode(mode);
    // Save preference
    try {
      localStorage.setItem('configMode', mode);
    } catch (e) {
      console.warn('Failed to save config mode preference:', e);
    }
  };

  const updateUserData = (section, data) => {
    setUserData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await getInstallationUrl(true);
  };

  const getInstallationUrl = async (isRedirect = false) => {
    try {
      setLoading(true);
      setLoadingMessage('Preparing installation URL...');

      let urlPrefix = window.location.protocol + "//";
      if (isRedirect) {
        urlPrefix = "stremio://";
      }

      // Get existing config if available
      const existingConfig = document.getElementById('existing_config')?.value || '';
      const encryptUrl = '/encrypt-user-data' + (existingConfig ? `/${existingConfig}` : '');

      const response = await fetch(encryptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.status === 'error' || data.detail) {
        setLoading(false);
        showNotification(data.message || data.detail[0].msg, 'error');
        return null;
      }

      if (!data.encrypted_str) {
        setLoading(false);
        showNotification('An error occurred while encrypting user data', 'error');
        return null;
      }

      const installationUrl = urlPrefix + window.location.host + "/" + data.encrypted_str + "/manifest.json";
      
      if (isRedirect) {
        window.location.href = installationUrl;
      } else {
        setFallbackUrl(installationUrl);
      }
      
      setLoading(false);
      return installationUrl;
    } catch (error) {
      setLoading(false);
      showNotification('An error occurred while encrypting user data', 'error');
      console.error('Error encrypting user data:', error);
      return null;
    }
  };

  const showNotification = (message, type = 'info') => {
    // Use toastr or similar notification library
    if (window.toastr) {
      window.toastr[type](message);
    } else {
      alert(message); // Fallback
    }
  };

  const initiateKodiSetup = () => {
    // Show modal to input Kodi code
    const kodiCodeModal = document.getElementById('kodiCodeModal');
    if (kodiCodeModal && window.bootstrap) {
      new window.bootstrap.Modal(kodiCodeModal).show();
    }
  };

  const setupKodiAddon = async (kodiCode) => {
    setLoading(true);
    setLoadingMessage('Setting up Kodi addon...');
    
    const installationUrl = await getInstallationUrl();

    if (installationUrl) {
      try {
        const response = await fetch('/kodi/associate_manifest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: kodiCode,
            manifest_url: installationUrl
          }),
        });
        
        const data = await response.json();

        if (response.ok) {
          showNotification('Kodi addon setup successful!', 'success');
        } else {
          showNotification(`Error: ${data.detail}`, 'error');
        }
      } catch (error) {
        console.error('Error setting up Kodi addon:', error);
        showNotification('An error occurred', 'error');
      }
    }
    
    setLoading(false);
  };

  const shareManifestUrl = async () => {
    setLoading(true);
    setLoadingMessage('Preparing share URL...');
    
    const manifestUrl = await getInstallationUrl();
    if (manifestUrl) {
      try {
        await navigator.share({
          title: 'MediaFusion Addon Manifest',
          url: manifestUrl,
        });
        showNotification('Manifest URL shared successfully', 'success');
      } catch (error) {
        setFallbackUrl(manifestUrl);
        showNotification('Unable to use Share API. URL is ready to be copied manually.', 'info');
      }
    }
    
    setLoading(false);
  };

  const copyManifestUrl = async () => {
    setLoading(true);
    setLoadingMessage('Generating installation URL...');
    
    const manifestUrl = await getInstallationUrl();
    if (manifestUrl) {
      try {
        await navigator.clipboard.writeText(manifestUrl);
        showNotification('Manifest URL copied to clipboard', 'success');
      } catch (error) {
        setFallbackUrl(manifestUrl);
        showNotification('Unable to access clipboard. URL is ready to be copied manually.', 'info');
      }
    }
    
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat fixed inset-0 overflow-hidden"
      style={{ backgroundImage: `url('/images/background.jpg')` }}
    >
      {/* Overlay for additional depth */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative h-full flex items-center justify-center p-4">
        <div 
          className="w-full max-w-6xl bg-black/85 rounded-2xl border border-indigo-900/50 shadow-2xl shadow-indigo-900/30 
                     max-h-[90vh] overflow-y-auto overflow-x-hidden 
                     scrollbar-thin scrollbar-track-indigo-900/30 scrollbar-thumb-indigo-700/50 p-8"
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <a href="/">
              <img src="/images/logo.jpg" alt="MediaFusion" className="w-32 h-32 object-contain mx-auto rounded-full border-4 border-indigo-700/50 shadow-lg" />
            </a>
            <h3 className="text-2xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">
              MediaFusion Addon Configuration
            </h3>
          </div>

          {/* Configuration Form */}
          <form id="configForm" className="space-y-6" onSubmit={handleFormSubmit}>
            
            {/* Configuration Mode Switch */}
            <ConfigModeSwitch 
              currentMode={configMode} 
              onModeChange={handleConfigModeChange} 
            />

            {/* Streaming Provider Configuration */}
            <SectionContainer title="Streaming Provider Configuration">
              <StreamingProviderConfig 
                userData={userData} 
                updateUserData={(data) => updateUserData('streaming_provider', data)} 
              />
            </SectionContainer>

            {/* Catalog Configuration - Only in Pro Mode */}
            {configMode === 'pro' && (
              <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-700/30">
                <h2 className="text-2xl font-semibold mb-4 text-teal-300">Catalog Configuration</h2>
                <CatalogConfig 
                  userData={userData} 
                  updateUserData={updateUserData} 
                />
              </section>
            )}

            {/* Parental Guides - Only in Pro Mode */}
            {configMode === 'pro' && (
              <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-700/30">
                <h2 className="text-2xl font-semibold mb-4 text-teal-300">Parental Guides</h2>
                <ParentalGuides 
                  userData={userData} 
                  updateUserData={updateUserData} 
                />
              </section>
            )}

            {/* Streaming Preferences */}
            <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-700/30">
              <h2 className="text-2xl font-semibold mb-4 text-teal-300">
                Streaming Preferences
                <span 
                  className="ml-2 text-sm text-gray-400 font-normal"
                  title="Customize how streams are sorted, limit results, and choose torrent display options to tailor your streaming experience in Stremio."
                >
                  (Customize how streams are sorted)
                </span>
              </h2>
              <StreamingPreferences 
                userData={userData} 
                updateUserData={updateUserData} 
                configMode={configMode}
              />
            </section>

            {/* External Services Configuration - Only in Pro Mode */}
            {configMode === 'pro' && (
              <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-700/30">
                <h2 className="text-2xl font-semibold mb-4 text-teal-300">External Services Configuration</h2>
                <ExternalServicesConfig 
                  userData={userData} 
                  updateUserData={updateUserData} 
                />
              </section>
            )}

            {/* Fallback URL Display - Initially hidden */}
            {fallbackUrl && (
              <div className="bg-black/37 rounded-lg p-4 mt-6">
                <label htmlFor="fallbackUrl" className="block mb-2 text-gray-300 font-medium">
                  Installation URL 
                  <span className="ml-1 bi bi-question-circle" title="This is the URL that you can use to install the addon in Stremio."></span>
                </label>
                <textarea 
                  id="fallbackUrl" 
                  className="w-full bg-gray-900 text-white border border-gray-700 p-2 rounded-md" 
                  readOnly 
                  value={fallbackUrl}
                />
                <p className="text-sm text-gray-400 mt-2">
                  Please manually copy the URL above and paste it in the Stremio search bar. Do not share this URL with unknown persons.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <ActionButtons 
              onInstall={handleFormSubmit}
              onShare={navigator.share ? shareManifestUrl : null}
              onCopy={copyManifestUrl}
              onKodiSetup={initiateKodiSetup}
            />
          </form>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-sm z-50">
          <div className="bg-indigo-900/70 p-8 rounded-xl border border-indigo-700/50 shadow-2xl text-center">
            <div className="animate-spin w-12 h-12 border-4 border-indigo-300 border-t-transparent rounded-full mx-auto"></div>
            <h5 className="text-xl font-medium text-gray-200 mt-4">Please Wait</h5>
            <p className="text-gray-400 mt-2">{loadingMessage}</p>
          </div>
        </div>
      )}

      {/* Kodi Code Input Modal */}
      <div id="kodiCodeModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-indigo-900/90 border border-indigo-700/50 rounded-xl text-gray-200">
            <div className="modal-header border-b border-indigo-700/50 p-4">
              <h5 className="modal-title text-teal-300">Enter Kodi Setup Code</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
              <div className="mb-4">
                <a href="https://github.com/mhdzumair/MediaFusion?tab=readme-ov-file#kodi-add-on-installation" 
                   target="_blank" rel="noopener" className="text-teal-400 hover:underline">
                  Kodi Addon Setup Guide
                </a>
              </div>
              <input 
                type="text" 
                id="kodiCodeInput"
                className="w-full bg-gray-800 border border-indigo-700/50 rounded-md p-2 text-white"
                placeholder="Enter 6-digit code" 
                maxLength="6" 
              />
            </div>
            <div className="modal-footer border-t border-indigo-700/50 p-4">
              <button type="button" className="btn btn-secondary bg-gray-700 text-white py-2 px-4 rounded-md" data-bs-dismiss="modal">Close</button>
              <button 
                type="button" 
                className="btn btn-primary bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md ml-2" 
                id="submitKodiCode"
                onClick={() => {
                  const kodiCode = document.getElementById('kodiCodeInput').value;
                  if (kodiCode && kodiCode.length === 6) {
                    document.querySelector('[data-bs-dismiss="modal"]').click();
                    setupKodiAddon(kodiCode);
                  } else {
                    showNotification('Please enter a valid 6-digit code.', 'error');
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurePage;