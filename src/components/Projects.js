import React from 'react';

const Projects = () => {
  const projects = [
    {
      image: '/images/chef.png',
      title: 'Chef Claude — AI-Powered Recipe Generator',
      description: 'A personal frontend project that generates custom recipes based on a list of ingredients using the OpenRouter AI API. Focuses on dynamic AI content generation, responsive design, and robust API handling.',
      tags: ['React', 'OpenRouter API', 'Netlify'],
      codeLink: 'https://github.com/souravkumarofc/ChefClaude',
      demoLink: 'https://ai-chefclaude.netlify.app/'
    },
    {
      image: '/images/meme.png',
      title: 'Meme Generator — Web App',
      description: 'A dynamic meme generator built with React and JavaScript that fetches real-time meme templates from an API and allows users to add custom text, download, and share their creations. This project showcases dynamic API handling and DOM manipulation with a focus on a responsive UI.',
      tags: ['React', 'JavaScript', 'Netlify'],
      codeLink: 'https://github.com/souravkumarofc/MemeGenerator',
      demoLink: 'https://generate-trendingmemes.netlify.app/'
    },
    {
      image: '/images/tenzies.png',
      title: 'Roll Dice Tenzies — Interactive Game',
      description: 'An interactive dice game built with React.js that challenges players to roll all ten dice until they all show the same number. It features state management with React Hooks, component-based rendering, and accessibility features like keyboard focus and screen reader support for an improved UX.',
      tags: ['React.js', 'JavaScript', 'Component-Based Design'],
      codeLink: 'https://github.com/souravkumarofc/Tenzies',
      demoLink: 'https://rolldice-tenzies.netlify.app/'
    },
    {
      image: '/images/Inventos.png',
      title: 'Inventos — Inventory Management Software',
      description: 'A full-stack project designed as a manufacturing industry inventory management software. It was built using a combination of frontend technologies like HTML5, CSS, and JavaScript, with a Python/Django backend.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Django'],
      codeLink: 'https://github.com/souravkumarofc?tab=repositories',
      demoLink: 'https://inventos.netlify.app/'
    },
    {
      image: '/images/travel.png',
      title: 'My Travel Journey — Portfolio Project',
      description: 'A personal portfolio-style project built with React that showcases a collection of travel destinations. This application demonstrates the use of React components for structuring content and dynamic rendering of data from a local JSON file. Book your next travel destination with "Travel Journey".',
      tags: ['React', 'JavaScript', 'Netlify'],
      codeLink: 'https://github.com/souravkumarofc/travel_journey',
      demoLink: 'https://travel-with-myjourney.netlify.app/'
    },
    {
      image: '/images/covid-19.png',
      title: 'Covid-19 — Data Tracker',
      description: 'A web application that provides a real-time tracking of COVID-19 data, with a focus on India. The project integrates with public APIs to display statistics on confirmed cases, recoveries, and deaths, and may include features related to vaccine registration, such as the Co-WIN platform.',
      tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
      codeLink: 'https://github.com/souravkumarofc',
      demoLink: 'https://covid19-cowin.netlify.app/'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800 dark:text-white">
            Featured Projects
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of projects that highlight my frontend and full-stack
            capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden card-hover group"
            >
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 flex items-center justify-center h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  draggable="false"
                  loading="lazy"
                  className="object-contain h-full w-full p-4 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-purple-600 dark:text-purple-400"><i class="fa-solid fa-image text-4xl"></i></div>';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair font-bold text-xl mb-3 text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white transition-all duration-300 font-semibold"
                  >
                    <i className="fa-solid fa-code"></i>
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-800 transition-all duration-300 font-semibold"
                  >
                    <i className="fa-solid fa-rocket"></i>
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

