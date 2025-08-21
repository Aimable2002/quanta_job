import { legalConfigs } from "../comp/data";

export const TermsOfService = () => {
  const terms = legalConfigs.find(config => config.type === 'terms');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 sm:text-5xl">
            {terms?.title}
          </h1>
          <p className="mt-4 text-blue-300">
            Effective Date: {terms?.effectiveDate || 'To be announced'}
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl overflow-hidden">
          <div className="px-6 py-8 space-y-10">
            {terms?.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-blue-400 mb-6 pb-2 border-b border-gray-700/50">
                  {section.title}
                </h2>
                
                {section.content && (
                  <div className="prose prose-invert prose-blue max-w-none">
                    {section.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-300 leading-7 mb-4">{paragraph}</p>
                    ))}
                  </div>
                )}

                {section.subsections && section.subsections.map((subsection) => (
                  <div key={subsection.id} id={subsection.id} className="mt-8 ml-2 scroll-mt-20">
                    <h3 className="text-xl font-medium text-cyan-400 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {subsection.title}
                    </h3>
                    <div className="prose prose-invert prose-blue max-w-none">
                      {subsection.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="text-gray-300 leading-7 mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center text-blue-300 text-sm">
          <p>© {new Date().getFullYear()} Quanta. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};