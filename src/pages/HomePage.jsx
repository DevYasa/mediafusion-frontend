import React from 'react';

const HomePage = () => {
  const addonName = "MediaFusion";
  const version = "4.3.28";
  const logoUrl = "/images/logo.jpg";
  const backgroundImage = "/images/background.jpg"; // Adjust path as needed

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat fixed inset-0 overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for additional depth */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative h-full flex items-center justify-center p-4">
        <div 
          className="w-full max-w-4xl bg-black/85 rounded-2xl border border-indigo-900/50 shadow-2xl shadow-indigo-900/30 
                     max-h-[90vh] overflow-y-auto overflow-x-hidden 
                     scrollbar-thin scrollbar-track-indigo-900/30 scrollbar-thumb-indigo-700/50"
        >
          {/* Content remains the same as previous version */}
          <div className="p-8">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <img 
                  src={logoUrl} 
                  alt={addonName} 
                  className="w-48 h-48 object-contain rounded-full border-4 border-indigo-700/50 shadow-2xl"
                />
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">
                {addonName} | ElfHosted - {version}
              </h1>
            </div>

            {/* What is ElfHosted Section */}
            <section className="mb-8 bg-indigo-900/20 rounded-xl p-6 border border-indigo-700/30">
              <h2 className="text-2xl font-semibold mb-4 text-teal-300">🤖 What is ElfHosted?</h2>
              <p className="text-gray-300 mb-4">
                ElfHosted is an open-source platform for "Self-hosting" Plex, Jellyfin, or Emby with Real Debrid (using plex_debrid, River, or Radarr & Sonarr), and your awesome self-hosted apps, automatically and easily.
              </p>
              <ul className="space-y-2 text-gray-200">
                <li>🔗 Get your own, private, hosted MediaFusion instance (for custom indexers, channels, etc.)</li>
                <li>🎬 Share your Real Debrid account from multiple locations at once</li>
                <li>📺 Watch your paid IPTV with Stremio (MediaFusion)</li>
                <li>📥 Install a Stremio Live TV addon (MediaFusion)</li>
                <li>🏈 Watch recorded/live sports with Stremio (MediaFusion)</li>
              </ul>
            </section>

            {/* Feature Sections */}
            <FeatureSection 
              title="🔎 Advanced Scraping Capabilities"
              description="Tap into a world of content with our enhanced scraping features:"
              features={[
                "🏎️ Formula Racing: Exclusive scraping from TorrentGalaxy for all your racing needs.",
                "🏈🏀⚾⚽🏒🏉🎾 American Football, Basketball, Baseball, Football, Hockey, Rugby/AFL, and Other Sports: Now all scraping through sport-video.org.ua for catchup videos.",
                "🏈🏀⚾⚽🏒🏉🎾🏏 Sports Live Events: Watch live sports events from DaddyLiveHD",
                "🎥 TamilMV: Specialized scraping for regional contents.",
                "🌟 TamilBlasters: Dedicated access to an extensive library of regional content.",
                "📺 TamilUltra & NowMeTV: Get the best of Live TV channels right at your fingertips.",
                "🔄 Prowlarr Integration: Supercharge your scraping streams with Prowlarr's powerful integration.",
                "🌊 Torrentio/KnightCrawler Streams: Optional scraping streams directly from Torrentio/KnightCrawler streams for even more variety.",
                "🔍 Advanced Prowlarr Integration: Improved Prowlarr feed scraping for more comprehensive content discovery with latest updates.",
                "📺 MPD DRM Scraping: Scraping MPD & Support streaming functionality with MediaFlow MPD DRM support."
              ]}
            />

            <FeatureSection 
              title="🎬 Streaming Provider Integration"
              description="Seamless playback from a diverse array of torrent and cloud storage services:"
              features={[
                "📥 Direct Torrent (Free)",
                "🌩️ PikPak (Free Quota / Premium)",
                "🌱 Seedr.cc (Free Quota / Premium)",
                "☁️ OffCloud (Free Quota / Premium)",
                "📦 Torbox (Free Quota / Premium)",
                "💎 Real-Debrid (Premium)",
                "🔗 Debrid-Link (Premium)",
                "✨ Premiumize (Premium)",
                "🏠 AllDebrid (Premium)",
                "📦 EasyDebrid (Premium)",
                "🔒 qBittorrent - WebDav (Free/Premium)"
              ]}
            />

            <FeatureSection 
              title="🛠️ Enhanced Additional Features"
              description="Our addon comes packed with features designed to elevate your streaming experience:"
              features={[
                "🔒 API Security: Fortify your self-hosted API with a password to prevent unauthorized access.",
                "🔐 User Data Encryption: Encrypt user data for heightened privacy and security, storing only encrypted URLs on Stremio.",
                "📋 Watchlist Catalog Support: Sync your streaming provider's watchlist directly into the Stremio catalog for a personalized touch.",
                "⚙️ Stream Filters: Customize your viewing experience with filters that sort streams by file size, resolution, seeders and much more.",
                "🖼️ Poster with Title: Display the poster with the title for a more visually appealing catalog on sport events.",
                "📺 M3U Playlist Import: Import M3U playlists for a more personalized streaming experience.",
                "✨ Manual Scraper Triggering UI: Manage your scraping sources with a manual trigger UI for a more hands-on approach.",
                "🗑️ Delete Watchlist: Delete your watchlist from the stremio for quick control over your content.",
                "🔍 Prowlarr Indexer Support: Use MediaFusion as an indexer in Prowlarr for searching movies and TV shows with Radarr and Sonarr.",
                "🔞 Parental Controls: Filter content based on nudity and certification ratings.",
                "🎬 IMDb Integration: Display IMDb ratings with the logo for quick quality assessment.",
                "🕰️ Sports Event Timing: View the time for sports events directly on the poster for better planning.",
                "🌐 MediaFlow Proxy: Support for MediaFlow Proxy for Debrid and Live streams, enhancing accessibility.",
                "🎥 RPDB Posters: Support for RPDB posters with fallback to MediaFusion posters.",
                "📥 Browser Download Support: Support for downloading video files from debrid services directly in the browser.",
                "🚫 Support DMCA Take Down: Torrent blocking feature for DMCA compliance."
              ]}
            />

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <ActionButton 
                id="configureAddon" 
                href="/configure" 
                text="⚙️ Configure Add-on" 
                primary 
              />
              <ActionButton 
                id="metricsDashboard" 
                href="/metrics" 
                text="📊 Metrics Dashboard" 
              />
              <ActionButton 
                id="scraperControls" 
                href="/scraper" 
                text="🕸️ Scraper Controls" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature section component
const FeatureSection = ({ title, description, features }) => {
  return (
    <section className="mb-8 bg-indigo-900/20 rounded-xl p-6 border border-indigo-700/30">
      <h2 className="text-2xl font-semibold mb-4 text-teal-300">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="space-y-2 text-gray-200">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2 opacity-70">▶</span>
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
};

// Action button component
const ActionButton = ({ id, href, text, primary = false }) => {
  return (
    <a
      id={id}
      href={href}
      className={`
        flex-1 text-center py-3 px-4 rounded-xl transition-all duration-300 ease-in-out
        border border-indigo-700/50 hover:shadow-xl hover:transform hover:-translate-y-1
        ${primary 
          ? "bg-gradient-to-r from-teal-600 to-indigo-700 text-white hover:from-teal-700 hover:to-indigo-800" 
          : "bg-indigo-900/40 text-gray-200 hover:bg-indigo-900/60"
        }
      `}
    >
      {text}
    </a>
  );
};

export default HomePage;