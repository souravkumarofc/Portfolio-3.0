import React from 'react';
import {
  TypeScript,
  JavaScript,
  HTML5,
  CSS3,
  ReactIcon,
  Next,
  Node,
  Express,
  Redux,
  ReactBootstrap,
  MongoDB,
  PostgreSQL,
  Java,
  Python,
  GitHub,
  JSON,
  Bitbucket,
  NPM,
  Postman,
  Jira,
  Git,
  Firebase,
  FastAPI,
  ServiceNow
} from '../assets/skills';

const Skills = () => {
  // ONLY Devicon-supported technologies - verified against https://github.com/devicons/devicon
  const skills = [
    { Icon: TypeScript, name: 'TypeScript' },
    { Icon: JavaScript, name: 'JavaScript' },
    { Icon: HTML5, name: 'HTML5' },
    { Icon: CSS3, name: 'CSS3' },
    { Icon: ReactIcon, name: 'React.js' },
    { Icon: Next, name: 'Next.js' },
    { Icon: Node, name: 'Node.js' },
    { Icon: Express, name: 'Express.js' },
    { Icon: Redux, name: 'Redux' },
    { Icon: ReactBootstrap, name: 'React Bootstrap' },
    { Icon: MongoDB, name: 'MongoDB' },
    { Icon: PostgreSQL, name: 'PostgreSQL' },
    { Icon: Java, name: 'Java' },
    { Icon: Python, name: 'Python' },
    { Icon: GitHub, name: 'GitHub' },
    { Icon: JSON, name: 'JSON' },
    { Icon: Bitbucket, name: 'Bitbucket' },
    { Icon: NPM, name: 'npm' },
    { Icon: Postman, name: 'Postman' },
    { Icon: Jira, name: 'Jira' },
    { Icon: Git, name: 'Git' },
    { Icon: Firebase, name: 'Firebase' },
    { Icon: FastAPI, name: 'FastAPI' },
    { Icon: ServiceNow, name: 'ServiceNow' }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800 dark:text-white">
            Technical Skills
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to craft high-quality web experiences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = skill.Icon;
            return (
              <div
                key={index}
                className="skill-card rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 group hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 flex items-center justify-center h-14">
                  <IconComponent className="w-14 h-14 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <span className="font-semibold text-sm md:text-base text-gray-700 dark:text-gray-300">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
