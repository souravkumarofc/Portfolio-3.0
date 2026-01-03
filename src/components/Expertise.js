import React from 'react';

const Expertise = () => {
  const expertiseItems = [
    {
      icon: 'fa-laptop-code',
      title: 'Frontend Engineering',
      description: 'Building robust, accessible React applications with clean component architecture and strong UX focus.'
    },
    {
      icon: 'fa-building',
      title: 'Enterprise Solutions',
      description: 'Developing and customizing enterprise applications on platforms like ServiceNow, focusing on workflow automation and user experience.'
    },
    {
      icon: 'fa-users',
      title: 'Product-minded Development',
      description: 'Shipping features that solve user problems and align with business goals—prioritizing reliability and clarity.'
    }
  ];

  return (
    <section id="expertise" className="py-20 gradient-bg px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800 dark:text-white">
            What I Do
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Frontend engineering, enterprise solutions, and building
            user-focused products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertiseItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg card-hover border border-gray-200 dark:border-gray-700 group"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/70 transition-colors duration-300">
                <i className={`fa-solid ${item.icon} text-2xl text-purple-600 dark:text-purple-400`}></i>
              </div>
              <h3 className="font-playfair font-bold text-2xl mb-4 text-gray-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;

