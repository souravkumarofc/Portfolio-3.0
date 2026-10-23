import React from 'react';
import SectionHeader from './SectionHeader';
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
    <section id="skills" className="theme-section py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          index="06"
          title="Skills"
          subtitle="Technologies and tools I use to build reliable, user-focused products."
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = skill.Icon;
            return (
              <div
                key={index}
                className="skill-card theme-card rounded-2xl p-6 text-center group card-hover"
              >
                <div className="mb-4 flex items-center justify-center h-14">
                  <IconComponent className="w-14 h-14 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <span className="font-semibold text-sm md:text-base text-theme-secondary">
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
