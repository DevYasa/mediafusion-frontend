import { useEffect, useState } from 'react';

// Data constants
const providers = [
  { value: "", label: "Direct Torrent (P2P)", type: "Free" },
  { value: "pikpak", label: "PikPak", type: "Free Quota / Premium" },
  { value: "seedr", label: "Seedr.cc", type: "Free Quota / Premium" },
  { value: "offcloud", label: "OffCloud", type: "Free Quota / Premium" },
  { value: "torbox", label: "Torbox", type: "Free Quota / Premium" },
  { value: "realdebrid", label: "Real-Debrid", type: "Premium" },
  { value: "debridlink", label: "Debrid-Link", type: "Premium" },
  { value: "premiumize", label: "Premiumize", type: "Premium" },
  { value: "alldebrid", label: "AllDebrid", type: "Premium" },
  { value: "easydebrid", label: "EasyDebrid", type: "Premium" },
  { value: "qbittorrent", label: "qBittorrent - WebDav", type: "Free/Premium" },
  { value: "stremthru", label: "StremThru", type: "Interface" }
];

const stremthruStores = [
  { value: "", label: "" },
  { value: "torbox", label: "Torbox" },
  { value: "realdebrid", label: "Real-Debrid" },
  { value: "debridlink", label: "Debrid-Link" },
  { value: "premiumize", label: "Premiumize" },
  { value: "alldebrid", label: "AllDebrid" }
];

const catalogs = [
  ['american_football', 'American Football'],
  ['arabic_movies', 'Arabic Movies'],
  ['arabic_series', 'Arabic Series'],
  ['baseball', 'Baseball'],
  ['basketball', 'Basketball'],
  ['bangla_movies', 'Bangla Movies'],
  ['bangla_series', 'Bangla Series'],
  ['english_hd_movies', 'English HD Movies'],
  ['english_series', 'English Series'],
  ['english_tcrip_movies', 'English TCRip Movies'],
  ['hindi_dubbed_movies', 'Hindi Dubbed Movies'],
  ['hindi_hd_movies', 'Hindi HD Movies'],
  ['hindi_old_movies', 'Hindi Old Movies'],
  ['hindi_series', 'Hindi Series'],
  ['hindi_tcrip_movies', 'Hindi TCRip Movies'],
  ['hockey', 'Hockey'],
  ['kannada_dubbed_movies', 'Kannada Dubbed Movies'],
  ['kannada_hd_movies', 'Kannada HD Movies'],
  ['kannada_old_movies', 'Kannada Old Movies'],
  ['kannada_series', 'Kannada Series'],
  ['kannada_tcrip_movies', 'Kannada TCRip Movies'],
  ['live_sport_events', 'Live Sport Events']
];

const resolutions = [
  '4k', '2160p', '1440p', '1080p', '720p', '576p', '480p', '360p', '240p', 'Unknown'
];

const qualityGroups = {
  'BluRay/UHD': ['bluray', 'remux', 'uhd', 'bdrip', 'brrip'],
  'WEB/HD': ['web', 'webrip', 'webdl', 'hdrip', 'webhd'],
  'DVD/TV/SAT': ['dvd', 'dvdrip', 'hdtv', 'pdtv', 'dsr', 'tvrip', 'sdtv', 'satrip'],
  'CAM/Screener': ['cam', 'camrip', 'hdcam', 'telesync', 'ts', 'hdts', 'screener', 'scr'],
  'Unknown': []
};

const sortedLanguages = [
  'English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada',
  'Bengali', 'Marathi', 'Punjabi', 'Gujarati', 'Urdu', 'Spanish',
  'French', 'German', 'Italian', 'Russian', 'Japanese', 'Korean',
  'Chinese', 'Arabic', 'Portuguese', 'Unknown'
];

const sortingOptions = [
  { key: 'language', direction: 'desc' },
  { key: 'cached', direction: 'desc' },
  { key: 'resolution', direction: 'desc' },
  { key: 'quality', direction: 'desc' },
  { key: 'size', direction: 'desc' },
  { key: 'seeders', direction: 'desc' },
  { key: 'created_at', direction: 'desc' }
];

export const useConfigState = () => {
  // General configuration
  const [configMode, setConfigMode] = useState('newbie');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing your configuration...");
  const [fallbackUrl, setFallbackUrl] = useState('');
  const [showFallbackUrl, setShowFallbackUrl] = useState(false);
  const [apiPassword, setApiPassword] = useState('');

  // Streaming provider configuration
  const [providerService, setProviderService] = useState('');
  const [serviceUrl, setServiceUrl] = useState('');
  const [stremthruStoreName, setStremthruStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [providerToken, setProviderToken] = useState('');
  const [enableWatchlist, setEnableWatchlist] = useState(false);
  const [downloadViaBrowser, setDownloadViaBrowser] = useState(false);
  const [onlyShowCachedStreams, setOnlyShowCachedStreams] = useState(false);
  const [deviceCode, setDeviceCode] = useState('');
  const [verificationLink, setVerificationLink] = useState('');
  const [deviceCodeSection, setDeviceCodeSection] = useState(false);

  // qBittorrent config state
  const [qbittorrentUrl, setQBittorrentUrl] = useState('');
  const [qbittorrentUsername, setQBittorrentUsername] = useState('');
  const [qbittorrentPassword, setQBittorrentPassword] = useState('');
  const [seedingTimeLimit, setSeedingTimeLimit] = useState(1440);
  const [seedingRatioLimit, setSeedingRatioLimit] = useState(1.0);
  const [playVideoAfter, setPlayVideoAfter] = useState(100);
  const [category, setCategory] = useState('MediaFusion');
  const [webdavUrl, setWebdavUrl] = useState('');
  const [webdavUsername, setWebdavUsername] = useState('');
  const [webdavPassword, setWebdavPassword] = useState('');
  const [webdavDownloadsPath, setWebdavDownloadsPath] = useState('/');

  // Catalog configuration
  const [selectedCatalogs, setSelectedCatalogs] = useState([]);
  const [enableCatalogs, setEnableCatalogs] = useState(true);
  const [enableMetadata, setEnableMetadata] = useState(true);

  // Parental guides
  const [certificationFilter, setCertificationFilter] = useState([]);
  const [nudityFilter, setNudityFilter] = useState([]);

  // Streaming preferences
  const [selectedResolutions, setSelectedResolutions] = useState([]);
  const [qualityFilter, setQualityFilter] = useState([]);
  const [maxSize, setMaxSize] = useState(107266808218); // Unlimited by default
  const [torrentSortingPriority, setTorrentSortingPriority] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [maxStreamsPerResolution, setMaxStreamsPerResolution] = useState(10);
  const [showFullTorrentName, setShowFullTorrentName] = useState(false);
  const [showLanguageFlag, setShowLanguageFlag] = useState(true);
  const [liveSearchStreams, setLiveSearchStreams] = useState(true);
  const [contributionStreams, setContributionStreams] = useState(false);

  // External services
  const [enableMediaflow, setEnableMediaflow] = useState(false);
  const [mediaflowProxyUrl, setMediaflowProxyUrl] = useState('');
  const [mediaflowApiPassword, setMediaflowApiPassword] = useState('');
  const [mediaflowPublicIp, setMediaflowPublicIp] = useState('');
  const [proxyLiveStreams, setProxyLiveStreams] = useState(false);
  const [proxyDebridStreams, setProxyDebridStreams] = useState(false);

  const [enableRpdb, setEnableRpdb] = useState(false);
  const [rpdbApiKey, setRpdbApiKey] = useState('');

  const [enableMdblist, setEnableMdblist] = useState(false);
  const [mdblistApiKey, setMdblistApiKey] = useState('');
  const [mdblistConfiguredLists, setMdblistConfiguredLists] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);

  // UI state for conditionally showing sections
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showOAuthSection, setShowOAuthSection] = useState(false);
  const [showServiceUrl, setShowServiceUrl] = useState(false);
  const [showStremthruConfig, setShowStremthruConfig] = useState(false);
  const [showSignupSection, setShowSignupSection] = useState(false);
  const [showStreamingOptions, setShowStreamingOptions] = useState(false);
  const [showQBittorrentConfig, setShowQBittorrentConfig] = useState(false);

  // Functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfigModeChange = (mode) => {
    setConfigMode(mode);
  };

  const updateProviderFields = (updateUI = true) => {
    // Reset all provider-specific fields
    setShowCredentials(false);
    setShowTokenInput(false);
    setShowOAuthSection(false);
    setShowServiceUrl(false);
    setShowStremthruConfig(false);
    setShowSignupSection(false);
    setShowStreamingOptions(false);
    setShowQBittorrentConfig(false);

    // Set fields based on provider
    switch (providerService) {
      case 'pikpak':
      case 'seedr':
        setShowCredentials(true);
        setShowSignupSection(true);
        setShowStreamingOptions(true);
        break;
      case 'realdebrid':
      case 'debridlink':
      case 'premiumize':
      case 'alldebrid':
      case 'easydebrid':
        setShowTokenInput(true);
        setShowOAuthSection(true);
        setShowSignupSection(true);
        setShowStreamingOptions(true);
        break;
      case 'offcloud':
      case 'torbox':
        setShowTokenInput(true);
        setShowSignupSection(true);
        setShowStreamingOptions(true);
        break;
      case 'qbittorrent':
        setShowQBittorrentConfig(true);
        setShowStreamingOptions(true);
        break;
      case 'stremthru':
        setShowStremthruConfig(true);
        setShowStreamingOptions(true);
        break;
      default: // Direct torrent
        setShowStreamingOptions(true);
        break;
    }
  };

  const updateMaxSizeDisplay = (value) => {
    if (value >= 107266808218) {
      return "Unlimited";
    } else {
      // Convert bytes to appropriate size format
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (value === 0) return '0 Byte';
      const i = parseInt(Math.floor(Math.log(value) / Math.log(1024)));
      return Math.round(value / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
  };

  const handleMaxSizeChange = (e) => {
    const value = parseInt(e.target.value);
    setMaxSize(value);
  };

  const getConfigData = () => {
    return {
      configMode,
      providerService,
      email,
      password,
      providerToken,
      serviceUrl,
      enableWatchlist,
      downloadViaBrowser,
      onlyShowCachedStreams,
      stremthruStoreName,
      selectedCatalogs,
      enableCatalogs,
      enableMetadata,
      certificationFilter,
      nudityFilter,
      selectedResolutions,
      qualityFilter,
      maxSize,
      torrentSortingPriority,
      selectedLanguages,
      maxStreamsPerResolution,
      showFullTorrentName,
      showLanguageFlag,
      liveSearchStreams,
      contributionStreams,
      // qBittorrent config
      qbittorrentUrl,
      qbittorrentUsername,
      qbittorrentPassword,
      seedingTimeLimit,
      seedingRatioLimit,
      playVideoAfter,
      category,
      webdavUrl,
      webdavUsername,
      webdavPassword,
      webdavDownloadsPath,
      // External services
      enableMediaflow,
      mediaflowProxyUrl,
      mediaflowApiPassword,
      mediaflowPublicIp,
      proxyLiveStreams,
      proxyDebridStreams,
      enableRpdb,
      rpdbApiKey,
      enableMdblist,
      mdblistApiKey,
      mdblistConfiguredLists,
      apiPassword
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setLoadingMessage("Processing your configuration...");

    try {
      const configData = getConfigData();

      // This is where you would connect to your API
      // const response = await axios.post('/api/configure', configData);

      // For now, simulate a successful response
      setTimeout(() => {
        setShowFallbackUrl(true);
        setFallbackUrl('stremio://mediafusion.github.io/configure?jwt=example');
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  // Effect to update provider fields when provider changes
  useEffect(() => {
    updateProviderFields();
  }, [providerService]);

  // Return all state and handlers
  return {
    // Constants
    providers,
    stremthruStores,
    catalogs,
    resolutions,
    qualityGroups,
    sortedLanguages,
    sortingOptions,

    // General configuration
    configMode,
    showPassword,
    isLoading,
    loadingMessage,
    fallbackUrl,
    showFallbackUrl,
    apiPassword,
    setApiPassword,

    // Streaming provider
    providerService,
    serviceUrl,
    stremthruStoreName,
    email,
    password,
    providerToken,
    enableWatchlist,
    downloadViaBrowser,
    onlyShowCachedStreams,
    deviceCode,
    verificationLink,
    deviceCodeSection,

    // qBittorrent config
    qbittorrentUrl,
    qbittorrentUsername,
    qbittorrentPassword,
    seedingTimeLimit,
    seedingRatioLimit,
    playVideoAfter,
    category,
    webdavUrl,
    webdavUsername,
    webdavPassword,
    webdavDownloadsPath,

    // Catalog configuration
    selectedCatalogs,
    enableCatalogs,
    enableMetadata,

    // Parental guides
    certificationFilter,
    nudityFilter,

    // Streaming preferences
    selectedResolutions,
    qualityFilter,
    maxSize,
    torrentSortingPriority,
    selectedLanguages,
    maxStreamsPerResolution,
    showFullTorrentName,
    showLanguageFlag,
    liveSearchStreams,
    contributionStreams,

    // External services
    enableMediaflow,
    mediaflowProxyUrl,
    mediaflowApiPassword,
    mediaflowPublicIp,
    proxyLiveStreams,
    proxyDebridStreams,
    enableRpdb,
    rpdbApiKey,
    enableMdblist,
    mdblistApiKey,
    mdblistConfiguredLists,
    selectedLists,

    // UI state for sections
    showTokenInput,
    showCredentials,
    showOAuthSection,
    showServiceUrl,
    showStremthruConfig,
    showSignupSection,
    showStreamingOptions,
    showQBittorrentConfig,

    // Functions
    setConfigMode,
    setShowPassword,
    setIsLoading,
    setLoadingMessage,
    setFallbackUrl,
    setShowFallbackUrl,
    setProviderService,
    setServiceUrl,
    setStremthruStoreName,
    setEmail,
    setPassword,
    setProviderToken,
    setEnableWatchlist,
    setDownloadViaBrowser,
    setOnlyShowCachedStreams,
    setDeviceCode,
    setVerificationLink,
    setDeviceCodeSection,
    setQBittorrentUrl,
    setQBittorrentUsername,
    setQBittorrentPassword,
    setSeedingTimeLimit,
    setSeedingRatioLimit,
    setPlayVideoAfter,
    setCategory,
    setWebdavUrl,
    setWebdavUsername,
    setWebdavPassword,
    setWebdavDownloadsPath,
    setSelectedCatalogs,
    setEnableCatalogs,
    setEnableMetadata,
    setCertificationFilter,
    setNudityFilter,
    setSelectedResolutions,
    setQualityFilter,
    setMaxSize,
    setTorrentSortingPriority,
    setSelectedLanguages,
    setMaxStreamsPerResolution,
    setShowFullTorrentName,
    setShowLanguageFlag,
    setLiveSearchStreams,
    setContributionStreams,
    setEnableMediaflow,
    setMediaflowProxyUrl,
    setMediaflowApiPassword,
    setMediaflowPublicIp,
    setProxyLiveStreams,
    setProxyDebridStreams,
    setEnableRpdb,
    setRpdbApiKey,
    setEnableMdblist,
    setMdblistApiKey,
    setMdblistConfiguredLists,
    setSelectedLists,
    setShowTokenInput,
    setShowCredentials,
    setShowOAuthSection,
    setShowServiceUrl,
    setShowStremthruConfig,
    setShowSignupSection,
    setShowStreamingOptions,
    setShowQBittorrentConfig,

    togglePasswordVisibility,
    handleConfigModeChange,
    updateProviderFields,
    updateMaxSizeDisplay,
    handleMaxSizeChange,
    getConfigData,
    handleSubmit
  };
};

export default useConfigState;