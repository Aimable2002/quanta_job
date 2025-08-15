import { legalConfigs } from "../comp/data";

export const PrivacyPolicy = () => {
  const privacy = legalConfigs.find(config => config.type === 'privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{privacy?.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          Effective Date: {privacy?.effectiveDate || 'To be announced'}
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 space-y-6">
          {privacy?.sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-10">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">{section.title}</h2>
              
              {section.content && (
                <div className="prose prose-sm sm:prose">
                  {section.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mt-2 text-gray-600">{paragraph}</p>
                  ))}
                </div>
              )}

              {section.subsections && section.subsections.map((subsection) => (
                <div key={subsection.id} id={subsection.id} className="mt-6 ml-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{subsection.title}</h3>
                  <div className="prose prose-sm sm:prose">
                    {subsection.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="mt-2 text-gray-600">{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};