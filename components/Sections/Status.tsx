import React, { useEffect } from 'react';
import { SITE_CONTENT } from '../../data/content';

const Status: React.FC = () => {
  // Directly use the color specified in the data file
  const { indicatorColor } = SITE_CONTENT.status;

  return (
    <section className="w-full py-12 md:py-14 lg:py-16 bg-void border-t border-code/10 relative z-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-8 md:mb-0">
          <div className="relative">
            <div className={`w-2 h-2 ${indicatorColor} rounded-full`}></div>
            <div className={`absolute inset-0 ${indicatorColor} rounded-full animate-ping opacity-75`}></div>
          </div>
          <div className="font-mono text-xs text-code uppercase tracking-widest">
            {SITE_CONTENT.status.text} <span className="text-paper">{SITE_CONTENT.status.value}</span>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="font-serif italic text-xl text-code hover:text-gold transition-colors duration-500 cursor-help" title={SITE_CONTENT.status.tooltip}>
            {SITE_CONTENT.status.quote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Status;