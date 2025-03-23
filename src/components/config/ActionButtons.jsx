import React from 'react';

const ActionButtons = ({ onInstall, onShare, onCopy, onKodiSetup }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      <button 
        type="submit"
        onClick={onInstall}
        className="
          px-6 py-3 rounded-xl 
          bg-gradient-to-r from-teal-600 to-indigo-700 
          text-white hover:from-teal-700 hover:to-indigo-800
          transition-all duration-300 ease-in-out
          hover:shadow-xl hover:transform hover:-translate-y-1
        "
      >
        Install in Stremio
      </button>
      
      {onShare ? (
        <button 
          type="button"
          onClick={onShare}
          className="
            px-6 py-3 rounded-xl 
            bg-indigo-900/40 text-gray-200 
            hover:bg-indigo-900/60
            transition-all duration-300 ease-in-out
            hover:shadow-xl hover:transform hover:-translate-y-1
          "
        >
          Share Manifest URL
        </button>
      ) : (
        <button 
          type="button"
          onClick={onCopy}
          className="
            px-6 py-3 rounded-xl 
            bg-indigo-900/40 text-gray-200 
            hover:bg-indigo-900/60
            transition-all duration-300 ease-in-out
            hover:shadow-xl hover:transform hover:-translate-y-1
          "
        >
          Copy Manifest URL
        </button>
      )}
      
      <button 
        type="button"
        onClick={onKodiSetup}
        className="
          px-6 py-3 rounded-xl 
          bg-indigo-900/40 text-gray-200 
          hover:bg-indigo-900/60
          transition-all duration-300 ease-in-out
          hover:shadow-xl hover:transform hover:-translate-y-1
        "
      >
        Setup Kodi Addon
      </button>
    </div>
  );
};

export default ActionButtons;