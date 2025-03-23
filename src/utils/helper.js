/**
 * Utilities for the MediaFusion configuration page
 */

/**
 * Formats a byte size into a human-readable string
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted size string
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  if (bytes >= 107266808218) return 'Unlimited';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Converts a size string (e.g., "10 GB") back to bytes
 * @param {string} sizeStr - Size string
 * @returns {number} - Size in bytes
 */
export const parseSizeToBytes = (sizeStr) => {
  if (sizeStr.toLowerCase() === 'unlimited') return 107266808218;

  const sizes = {
    'bytes': 1,
    'kb': 1024,
    'mb': 1024 * 1024,
    'gb': 1024 * 1024 * 1024,
    'tb': 1024 * 1024 * 1024 * 1024
  };

  const parts = sizeStr.match(/^(\d+(?:\.\d+)?)\s*([a-z]+)$/i);
  if (!parts) return 0;

  const size = parseFloat(parts[1]);
  const unit = parts[2].toLowerCase();

  return size * (sizes[unit] || 1);
};

/**
 * Get a provider icon based on the provider ID
 * @param {string} providerId - Provider identifier
 * @returns {string} - Icon class or path
 */
export const getProviderIcon = (providerId) => {
  const icons = {
    'pikpak': 'pikpak-icon',
    'seedr': 'seedr-icon',
    'offcloud': 'offcloud-icon',
    'torbox': 'torbox-icon',
    'realdebrid': 'rd-icon',
    'debridlink': 'dl-icon',
    'premiumize': 'pm-icon',
    'alldebrid': 'ad-icon',
    'easydebrid': 'ed-icon',
    'qbittorrent': 'qb-icon',
    'stremthru': 'st-icon',
    '': 'torrent-icon'  // Direct torrent
  };

  return icons[providerId] || 'generic-provider-icon';
};

/**
 * Format a quality group
 * @param {string} qualityGroup - Quality group name
 * @param {Object} qualityGroups - Map of quality groups to their codecs
 * @returns {string} - Formatted quality group with codec examples
 */
export const formatQualityGroup = (qualityGroup, qualityGroups) => {
  if (!qualityGroups[qualityGroup]) {
    return qualityGroup;
  }

  const codecs = qualityGroups[qualityGroup];
  if (codecs.length === 0) {
    return qualityGroup;
  }

  return `${qualityGroup} (${codecs.join(', ')})`;
};

/**
 * Get language flag emoji for a language
 * @param {string} language - Language name
 * @returns {string} - Flag emoji
 */
export const getLanguageFlag = (language) => {
  const flags = {
    'English': '🇺🇸',
    'Hindi': '🇮🇳',
    'Tamil': '🇮🇳',
    'Telugu': '🇮🇳',
    'Malayalam': '🇮🇳',
    'Kannada': '🇮🇳',
    'Bengali': '🇧🇩',
    'Marathi': '🇮🇳',
    'Punjabi': '🇮🇳',
    'Gujarati': '🇮🇳',
    'Urdu': '🇵🇰',
    'Spanish': '🇪🇸',
    'French': '🇫🇷',
    'German': '🇩🇪',
    'Italian': '🇮🇹',
    'Russian': '🇷🇺',
    'Japanese': '🇯🇵',
    'Korean': '🇰🇷',
    'Chinese': '🇨🇳',
    'Arabic': '🇸🇦',
    'Portuguese': '🇵🇹',
    'Unknown': '❓'
  };

  return flags[language] || '🌐';
};

/**
 * Get a sort direction description
 * @param {string} key - Sort key
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {string} - Human-readable description of sort direction
 */
export const getSortDirectionDescription = (key, direction) => {
  const descriptions = {
    'language': {
      'desc': 'Sort by preferred languages first',
      'asc': 'Sort by least preferred languages first'
    },
    'cached': {
      'desc': 'Show cached results first',
      'asc': 'Show uncached results first'
    },
    'resolution': {
      'desc': 'Highest resolution first',
      'asc': 'Lowest resolution first'
    },
    'quality': {
      'desc': 'Best quality first',
      'asc': 'Lower quality first'
    },
    'size': {
      'desc': 'Largest size first',
      'asc': 'Smallest size first'
    },
    'seeders': {
      'desc': 'Most seeders first',
      'asc': 'Fewest seeders first'
    },
    'created_at': {
      'desc': 'Newest first',
      'asc': 'Oldest first'
    }
  };

  if (!descriptions[key]) {
    return direction === 'desc' ? 'Descending' : 'Ascending';
  }

  return descriptions[key][direction] || (direction === 'desc' ? 'Descending' : 'Ascending');
};

/**
 * Generate a tooltip for a quality group
 * @param {string} qualityGroup - Quality group name
 * @param {Object} qualityGroups - Map of quality groups to their codecs
 * @returns {string} - Tooltip text
 */
export const getQualityGroupTooltip = (qualityGroup, qualityGroups) => {
  if (!qualityGroups[qualityGroup]) {
    return '';
  }

  const codecs = qualityGroups[qualityGroup];
  if (codecs.length === 0) {
    return '';
  }

  return `Contains: ${codecs.join(', ')}`;
};

/**
 * Format a provider name for display
 * @param {string} providerId - Provider identifier
 * @param {Array} providers - List of provider objects
 * @returns {string} - Formatted provider name
 */
export const formatProviderName = (providerId, providers) => {
  const provider = providers.find(p => p.value === providerId);
  if (!provider) {
    return providerId || 'Direct Torrent (P2P)';
  }

  return `${provider.label} (${provider.type})`;
};

/**
 * Get an appropriate signup URL for a provider
 * @param {string} providerId - Provider identifier
 * @returns {string} - Signup URL
 */
export const getProviderSignupUrl = (providerId) => {
  const signupUrls = {
    'pikpak': 'https://mypikpak.com/referral/',
    'seedr': 'https://www.seedr.cc/',
    'offcloud': 'https://offcloud.com',
    'torbox': 'https://torbox.app',
    'realdebrid': 'https://real-debrid.com',
    'debridlink': 'https://debrid-link.com',
    'premiumize': 'https://www.premiumize.me',
    'alldebrid': 'https://alldebrid.com',
    'easydebrid': 'https://www.easydebrid.com'
  };

  return signupUrls[providerId] || '#';
};

/**
 * Validate a URL
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidUrl = (url) => {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
};

/**
 * Format a configuration for display in the UI
 * @param {Object} config - Raw configuration object
 * @returns {Object} - Formatted configuration
 */
export const formatConfigForDisplay = (config) => {
  // Clone to avoid mutations
  const formatted = { ...config };

  // Format file size
  formatted.maxSizeFormatted = formatBytes(config.maxSize);

  // Join arrays for display
  formatted.selectedCatalogsString = (config.selectedCatalogs || []).join(', ');
  formatted.selectedResolutionsString = (config.selectedResolutions || []).join(', ');
  formatted.selectedLanguagesString = (config.selectedLanguages || []).join(', ');
  formatted.qualityFilterString = (config.qualityFilter || []).join(', ');
  formatted.certificationFilterString = (config.certificationFilter || []).join(', ');
  formatted.nudityFilterString = (config.nudityFilter || []).join(', ');

  // Format boolean values
  formatted.enableCatalogsStr = config.enableCatalogs ? 'Yes' : 'No';
  formatted.enableMetadataStr = config.enableMetadata ? 'Yes' : 'No';
  formatted.showFullTorrentNameStr = config.showFullTorrentName ? 'Yes' : 'No';
  formatted.showLanguageFlagStr = config.showLanguageFlag ? 'Yes' : 'No';
  formatted.liveSearchStreamsStr = config.liveSearchStreams ? 'Yes' : 'No';
  formatted.contributionStreamsStr = config.contributionStreams ? 'Yes' : 'No';

  return formatted;
};

/**
 * Attempt to auto-detect WebDAV URL based on qBittorrent URL
 * @param {string} qbittorrentUrl - qBittorrent WebUI URL
 * @returns {string} - Best guess for WebDAV URL
 */
export const guessWebDAVUrl = (qbittorrentUrl) => {
  if (!qbittorrentUrl) return '';

  try {
    const url = new URL(qbittorrentUrl);
    return `${url.protocol}//${url.hostname}:8080/webdav/`;
  } catch (e) {
    return '';
  }
};

/**
 * Convert configuration object to a URL-safe format
 * @param {Object} config - Configuration object
 * @returns {string} - URL-safe configuration string
 */
export const configToUrlString = (config) => {
  try {
    const configStr = JSON.stringify(config);
    return btoa(configStr);
  } catch (e) {
    console.error('Error converting configuration to URL string:', e);
    return '';
  }
};

/**
 * Parse a URL-safe configuration string back to an object
 * @param {string} urlString - URL-safe configuration string
 * @returns {Object|null} - Configuration object, or null if invalid
 */
export const urlStringToConfig = (urlString) => {
  try {
    const configStr = atob(urlString);
    return JSON.parse(configStr);
  } catch (e) {
    console.error('Error parsing URL string to configuration:', e);
    return null;
  }
};

export default {
  formatBytes,
  parseSizeToBytes,
  getProviderIcon,
  formatQualityGroup,
  getLanguageFlag,
  getSortDirectionDescription,
  getQualityGroupTooltip,
  formatProviderName,
  getProviderSignupUrl,
  isValidUrl,
  formatConfigForDisplay,
  guessWebDAVUrl,
  configToUrlString,
  urlStringToConfig
};