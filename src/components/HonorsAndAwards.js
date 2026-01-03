import React, { useState } from 'react';

// Only log in development
const isDev = process.env.NODE_ENV === 'development';
const devError = (...args) => { if (isDev) console.error(...args); };

const HonorsAndAwards = () => {
  const [imageError, setImageError] = useState(false);
  
  const award = {
    title: 'ServiceNow Gen AI Hackathon 2024',
    company: 'Capgemini',
    achievement: 'Winner (1st Prize)',
    description: 'Built an AI-based image recognition solution within ServiceNow to detect potholes and road damage from user-uploaded images. Automated intelligent ticket routing to relevant government departments.',
    recognition: 'Recognized for innovation and cross-functional collaboration, delivering a real-world, client-aligned solution.',
    tags: ['Hackathon', 'Gen AI', 'ServiceNow'],
    certificateImage: '/images/service-now-certificate.png',
    linkedInUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7210853851720036352/'
  };

  return (
    <section id="honors-awards" className="py-16 bg-white dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800 dark:text-white">
            🏆 Honors & Awards
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Container - Certificate Image */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden card-hover">
            <a
              href={award.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer h-full"
            >
              <div className="p-4 h-full flex items-center justify-center bg-white dark:bg-gray-800">
                {!imageError ? (
                  <img
                    src={award.certificateImage}
                    alt={`${award.title} Certificate`}
                    draggable="false"
                    loading="lazy"
                    className="w-full h-auto object-contain max-h-[500px]"
                    style={{ 
                      imageRendering: 'auto',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                    onError={(e) => {
                      devError('Image failed to load:', award.certificateImage);
                      setImageError(true);
                    }}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="w-full bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 flex flex-col items-center justify-center p-8 text-center min-h-[300px] rounded-lg">
                    <div className="w-24 h-24 mb-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-800/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center shadow-lg">
                      <i className="fa-solid fa-trophy text-5xl text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-bold text-base mb-2">Certificate</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">ServiceNow Gen AI Hackathon 2024</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">Image not found</p>
                  </div>
                )}
              </div>
            </a>
          </div>

          {/* Right Container - Award Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden card-hover">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-playfair font-bold text-2xl md:text-3xl text-gray-800 dark:text-white mb-2">
                  {award.title}
                </h3>
                <p className="text-lg text-blue-700 dark:text-blue-400 font-semibold mb-2">
                  {award.company}
                </p>
                <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-bold mb-4">
                  🥇 {award.achievement}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium mb-2">
                    Project Highlights:
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {award.description}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {award.recognition}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {award.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={award.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
              >
                <i className="fa-brands fa-linkedin"></i>
                <span>View Achievement on LinkedIn</span>
                <i className="fa-solid fa-external-link text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HonorsAndAwards;

