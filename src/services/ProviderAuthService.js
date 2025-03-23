import axios from 'axios';

class ProviderAuthService {
  constructor(apiBaseUrl = '/api') {
    this.apiBaseUrl = apiBaseUrl;
    this.providerSignupUrls = {
      pikpak: 'https://mypikpak.com/referral/',
      seedr: 'https://www.seedr.cc/',
      offcloud: 'https://offcloud.com',
      torbox: 'https://torbox.app',
      realdebrid: 'https://real-debrid.com',
      debridlink: 'https://debrid-link.com',
      premiumize: 'https://www.premiumize.me',
      alldebrid: 'https://alldebrid.com',
      easydebrid: 'https://www.easydebrid.com'
    };
  }

  /**
   * Fetch MDBList lists by type
   * @param {string} apiKey - MDBList API Key
   * @param {string} type - List type ('my', 'top', or 'search')
   * @param {string} query - Search query (only for type='search')
   * @returns {Promise<Array>} - List of MDBList lists
   */
  async fetchMDBLists(apiKey, type = 'my', query = '') {
    try {
      const params = { api_key: apiKey };
      if (type === 'search' && query) {
        params.query = query;
      }
      
      const response = await axios.get(`${this.apiBaseUrl}/mdblist/${type}`, { params });
      return response.data.lists || [];
    } catch (error) {
      console.error(`MDBList ${type} lists fetch error:`, error);
      return [];
    }
  }

  /**
   * Add a list to MDBList configuration
   * @param {string} apiKey - MDBList API Key
   * @param {Object} listConfig - List configuration
   * @returns {Promise<{success: boolean, message: string, list?: Object}>} - Operation result
   */
  async addMDBList(apiKey, listConfig) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/mdblist/list`, {
        api_key: apiKey,
        ...listConfig
      });
      return response.data;
    } catch (error) {
      console.error('MDBList add error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add list' 
      };
    }
  }

  /**
   * Submit the complete configuration to the server
   * @param {Object} config - Complete addon configuration
   * @returns {Promise<{success: boolean, manifest_url?: string, message?: string}>} - Operation result
   */
  async submitConfiguration(config) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/configure`, config);
      return response.data;
    } catch (error) {
      console.error('Configuration submission error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Configuration submission failed' 
      };
    }
  }

  /**
   * Setup Kodi addon with a code
   * @param {string} code - 6-digit Kodi setup code
   * @param {Object} config - Complete addon configuration
   * @returns {Promise<{success: boolean, message: string}>} - Operation result
   */
  async setupKodiAddon(code, config) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/kodi/setup`, {
        code,
        config
      });
      return response.data;
    } catch (error) {
      console.error('Kodi setup error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Kodi setup failed' 
      };
    }
  }
   * Get the signup URL for a provider
   * @param {string} provider - Provider ID
   * @returns {string} - Signup URL
   */
  getSignupUrl(provider) {
    return this.providerSignupUrls[provider] || '#';
  }

  /**
   * Authenticate with credentials (email/password)
   * @param {string} provider - Provider ID
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{token: string, user: Object}>} - Authentication result
   */
  async authenticateWithCredentials(provider, email, password) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/auth/${provider}`, {
        email,
        password
      });
      
      return response.data;
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    }
  }

  /**
   * Start OAuth2 authentication flow
   * @param {string} provider - Provider ID
   * @returns {Promise<{device_code: string, verification_url: string}>} - OAuth initialization data
   */
  async startOAuth(provider) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/oauth/${provider}/initialize`);
      return response.data;
    } catch (error) {
      console.error('OAuth init error:', error);
      throw error;
    }
  }

  /**
   * Check OAuth2 authorization status
   * @param {string} provider - Provider ID
   * @param {string} deviceCode - Device code from startOAuth
   * @returns {Promise<{status: string, token?: string}>} - Authorization status
   */
  async checkOAuthStatus(provider, deviceCode) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/oauth/${provider}/check`, {
        device_code: deviceCode
      });
      
      return response.data;
    } catch (error) {
      console.error('OAuth check error:', error);
      throw error;
    }
  }

  /**
   * Verify if a token is valid
   * @param {string} provider - Provider ID
   * @param {string} token - Provider token
   * @returns {Promise<{valid: boolean, user?: Object}>} - Validation result
   */
  async verifyToken(provider, token) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/verify/${provider}`, {
        token
      });
      
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      return { valid: false };
    }
  }

  /**
   * Get streaming provider features and capabilities
   * @param {string} provider - Provider ID
   * @returns {Promise<Object>} - Provider features
   */
  async getProviderFeatures(provider) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/providers/${provider}/features`);
      return response.data;
    } catch (error) {
      console.error('Provider features error:', error);
      return {};
    }
  }

  /**
   * For qBittorrent, test the connection settings
   * @param {Object} config - qBittorrent configuration
   * @returns {Promise<{success: boolean, message: string}>} - Test result
   */
  async testQBittorrentConnection(config) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/qbittorrent/test`, config);
      return response.data;
    } catch (error) {
      console.error('qBittorrent test error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Connection test failed' 
      };
    }
  }

  /**
   * For WebDAV, test the connection settings
   * @param {Object} config - WebDAV configuration
   * @returns {Promise<{success: boolean, message: string}>} - Test result
   */
  async testWebDAVConnection(config) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/webdav/test`, config);
      return response.data;
    } catch (error) {
      console.error('WebDAV test error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Connection test failed' 
      };
    }
  }

  /**
   * For MediaFlow, test the proxy connection
   * @param {Object} config - MediaFlow configuration
   * @returns {Promise<{success: boolean, message: string}>} - Test result
   */
  async testMediaFlowConnection(config) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/mediaflow/test`, config);
      return response.data;
    } catch (error) {
      console.error('MediaFlow test error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Connection test failed' 
      };
    }
  }

  /**
   * For RPDB, verify the API key
   * @param {string} apiKey - RPDB API Key
   * @returns {Promise<{valid: boolean, message: string}>} - Validation result
   */
  async verifyRPDBApiKey(apiKey) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/rpdb/verify`, { api_key: apiKey });
      return response.data;
    } catch (error) {
      console.error('RPDB API key verification error:', error);
      return { 
        valid: false, 
        message: error.response?.data?.message || 'API key verification failed' 
      };
    }
  }

  /**
   * For MDBList, verify the API key and fetch user lists
   * @param {string} apiKey - MDBList API Key
   * @returns {Promise<{valid: boolean, lists: Array, message?: string}>} - Validation result and lists
   */
  async verifyMDBListApiKey(apiKey) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/mdblist/verify`, { api_key: apiKey });
      return response.data;
    } catch (error) {
      console.error('MDBList API key verification error:', error);
      return { 
        valid: false, 
        lists: [],
        message: error.response?.data?.message || 'API key verification failed' 
      };
    }
  }

  /**
   