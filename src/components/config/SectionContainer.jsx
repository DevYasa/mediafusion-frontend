import React from 'react';

const SectionContainer = ({ title, tooltip, children }) => {
  return (
    <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-700/30 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-teal-300 flex items-center">
        {title}
        {tooltip && (
          <span 
            className="ml-2 text-sm text-gray-400 font-normal"
            title={tooltip}
          >
            ({tooltip})
          </span>
        )}
      </h2>
      {children}
    </section>
  );
};

export default SectionContainer;