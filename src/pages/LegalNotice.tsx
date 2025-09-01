import React from 'react';
import { legalContent } from '../comp/legalContent';

const LegalNotice: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 sm:text-5xl">
            {legalContent.title}
          </h1>
          <p className="mt-4 text-blue-200">Last updated: August 25, 2025</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
          {legalContent.sections.map((section, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {section.content.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-blue-300 text-sm">
          <p>© {new Date().getFullYear()} QUANTA. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;