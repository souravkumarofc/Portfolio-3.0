import React from 'react';
import SectionHeader from './SectionHeader';
import TechMarquee from './TechMarquee';

const professionalProjects = [
  {
    title: 'RADAR — Supply Chain Risk Intelligence',
    description:
      'Engineered React.js/Next.js workflows for supplier risk, network analysis, alerts, risk scores, and interactive visualizations across core risk-analysis API workflows. Implemented offset-based pagination and infinite scrolling for large datasets.',
    tags: ['React.js', 'Next.js', 'REST APIs', 'Infinite Scroll', 'Data Visualization'],
  },
  {
    title: 'ANNISE — Wealth Management Application',
    description:
      'Developed React.js/Next.js features for dashboards, financial data workflows, and user-specific experiences within a wealth-management platform. Implemented RBAC to control feature and data visibility across permissions.',
    tags: ['React.js', 'Next.js', 'RBAC', 'Dashboards', 'FinTech'],
  },
  {
    title: 'PRICELEAP — Price Tracking Product',
    description:
      'Contributed across React.js, Node.js, Express.js, and MongoDB. Designed cron-based background job scheduling to automate recurring workflows and built asynchronous API-driven processes decoupled from user-facing operations.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cron Jobs'],
  },
  {
    title: 'Panasonic — Virtual Customer Service Chatbot',
    description:
      'Built enterprise interfaces with React.js, JavaScript, and TypeScript for Panasonic Singapore. Integrated a virtual customer service chatbot with backend services and external REST APIs, improving internal query resolution efficiency by 40%.',
    tags: ['React.js', 'TypeScript', 'REST APIs', 'Chatbot', 'Enterprise'],
  },
];

const personalProjects = [
  {
    title: 'Chef Claude — AI-Powered Recipe Generator',
    description:
      'Generates custom recipes from ingredients using the OpenRouter AI API, with responsive UI and robust API handling.',
    tags: ['React', 'OpenRouter API', 'Netlify'],
    codeLink: 'https://github.com/souravkumarofc/ChefClaude',
    demoLink: 'https://ai-chefclaude.netlify.app/',
  },
  {
    title: 'Meme Generator — Web App',
    description:
      'Fetches real-time meme templates and lets users add custom text, download, and share creations.',
    tags: ['React', 'JavaScript', 'Netlify'],
    codeLink: 'https://github.com/souravkumarofc/MemeGenerator',
    demoLink: 'https://generate-trendingmemes.netlify.app/',
  },
  {
    title: 'Roll Dice Tenzies — Interactive Game',
    description:
      'Interactive dice game with React Hooks, component-based rendering, and accessibility features.',
    tags: ['React.js', 'JavaScript'],
    codeLink: 'https://github.com/souravkumarofc/Tenzies',
    demoLink: 'https://rolldice-tenzies.netlify.app/',
  },
  {
    title: 'Inventos — Inventory Management Software',
    description:
      'Full-stack inventory management for manufacturing with JavaScript frontend and Python/Django backend.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Django'],
    codeLink: 'https://github.com/souravkumarofc?tab=repositories',
    demoLink: 'https://inventos.netlify.app/',
  },
  {
    title: 'My Travel Journey — Portfolio Project',
    description:
      'React-based travel showcase using component architecture and JSON-driven content.',
    tags: ['React', 'JavaScript', 'Netlify'],
    codeLink: 'https://github.com/souravkumarofc/travel_journey',
    demoLink: 'https://travel-with-myjourney.netlify.app/',
  },
  {
    title: 'Covid-19 — Data Tracker',
    description:
      'Real-time COVID-19 tracking for India using public APIs for cases, recoveries, and deaths.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
    codeLink: 'https://github.com/souravkumarofc',
    demoLink: 'https://covid19-cowin.netlify.app/',
  },
];

const ProjectCard = ({ project }) => (
  <article className="theme-card rounded-2xl p-6 md:p-8 card-hover h-full flex flex-col">
    <h3 className="font-playfair font-bold text-xl mb-3 text-theme-primary">{project.title}</h3>
    <p className="text-theme-secondary mb-5 leading-relaxed flex-grow">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-6">
      {project.tags.map((tag) => (
        <span key={tag} className="tag-pill text-sm">{tag}</span>
      ))}
    </div>
    {(project.codeLink || project.demoLink) && (
      <div className="flex flex-wrap gap-3 mt-auto">
        {project.codeLink && (
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-secondary !py-2.5 !px-4 text-sm"
          >
            <i className="fa-solid fa-code" aria-hidden="true" />
            Code
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-primary !py-2.5 !px-4 text-sm"
          >
            <i className="fa-solid fa-rocket" aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>
    )}
  </article>
);

const Projects = () => (
  <section id="projects" className="theme-section-alt py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader
        index="05"
        title="Projects"
        subtitle="Professional products from industry work and personal builds that showcase full-stack delivery."
      />

      <TechMarquee className="mb-14" />

      <div className="mb-14">
        <h3 className="text-2xl font-playfair font-bold text-theme-primary mb-6">Professional Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {professionalProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-playfair font-bold text-theme-primary mb-6">Personal Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Projects;
