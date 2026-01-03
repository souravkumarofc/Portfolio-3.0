import React from 'react';
import aimleapLogo from '../assets/logos/aimleap_logo.jpeg';
import capgeminiLogo from '../assets/logos/capgemini_logo.jpg';
import worksbotLogo from '../assets/logos/worksbotapplications_logo.jpeg';
import lyearnLogo from '../assets/logos/lyearn_logo.jpeg';

const Experience = () => {
  const experiences = [
    {
      logo: aimleapLogo,
      title: 'Software Developer — Aimleap',
      period: 'Oct 2025 – Present',
      companyDescription: 'Aimleap is a technology-driven platform focused on building scalable, user-centric web applications for modern business needs.',
      workHeading: "What I'm working on:",
      logoBg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      points: [
        'Developing and maintaining **production-ready frontend features** using **React.js** and modern **JavaScript (ES6+)** for real-world business applications.',
        'Translating product requirements into **clean, reusable, and scalable UI components** with a strong focus on usability and maintainability.',
        'Collaborating closely with **product managers, designers, and backend engineers** to deliver features end-to-end in an agile environment.',
        'Improving **application performance, user experience, and frontend architecture** to support scalable product growth.',
        'Following best practices for **code quality, version control, and deployment workflows** in a production setting.'
      ]
    },
    {
      logo: capgeminiLogo,
      title: 'Analyst — Capgemini',
      period: 'Dec 2022 – Oct 2025',
      logoBg: 'bg-gradient-to-br from-red-50 to-orange-50',
      borderColor: 'border-red-200',
      points: [
        'Developed a customer service chatbot and an AI-powered ticketing system for enterprise clients (e.g., Panasonic), reducing manual workload and improving response times.',
        'Worked on integrating NLU-based classification for automated ticket generation and workflow routing.',
        'Collaborated with cross-functional teams to design, implement, and ship production-ready frontend modules using React and state management libraries.',
        'Contributed to improving support process efficiency by aligning frontend UX with backend automation logic.',
        '🏆 Winner — ServiceNow Gen AI Hackathon 2024'
      ]
    },
    {
      logo: worksbotLogo,
      title: 'Full Stack Developer — Worksbot',
      period: 'Jan 2022 – Mar 2022',
      logoBg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      points: [
        'Built and delivered **full-stack features** for internal tools using **React** and backend APIs, contributing to real-world product workflows.',
        'Implemented **authentication flows** and handled **data synchronization** between frontend and backend services.',
        'Collaborated with team members to understand requirements and translate them into working, **production-style features**.',
        'Gained hands-on experience with **end-to-end development**, API integration, and code versioning practices.'
      ]
    },
    {
      logo: lyearnLogo,
      title: 'Frontend Developer — Lyearn',
      period: 'Jun 2020 – Mar 2021',
      logoBg: 'bg-gradient-to-br from-green-50 to-teal-50',
      borderColor: 'border-green-200',
      points: [
        'Developed responsive and accessible UI components using modern frontend technologies across multiple application pages.',
        'Worked closely with designers to convert Figma designs into production-ready React components with attention to UX and consistency.',
        'Improved overall usability and accessibility, gaining early experience in frontend best practices.',
        'Built a strong foundation in component-based architecture and UI collaboration workflows.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-800 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800 dark:text-white">
            Work Experience
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex gap-4 hover:shadow-lg transition"
            >
              <div className={`flex-shrink-0 w-20 h-20 rounded-xl ${exp.logoBg} flex items-center justify-center border-2 ${exp.borderColor} p-2 shadow-sm overflow-hidden`}>
                <img
                  src={exp.logo}
                  alt={`${exp.title.split('—')[1]?.trim() || 'Company'} logo`}
                  draggable="false"
                  loading="lazy"
                  className="w-full h-full object-contain"
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-briefcase"></i> {exp.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">{exp.period}</p>
                {exp.companyDescription && (
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm italic">{exp.companyDescription}</p>
                )}
                {exp.workHeading && (
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-sm">{exp.workHeading}</p>
                )}
                <ul className="list-disc ml-5 text-gray-600 dark:text-gray-400 text-sm space-y-2">
                  {exp.points.map((point, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ 
                      __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800 dark:text-gray-200">$1</strong>')
                    }} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

