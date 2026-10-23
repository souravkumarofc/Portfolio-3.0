import React from 'react';
import SectionHeader from './SectionHeader';
import EditorialCard from './EditorialCard';

const opportunities = [
  {
    index: '01',
    icon: 'fa-briefcase',
    title: 'Software engineering roles',
    description:
      'Full-time and contract opportunities across frontend and full-stack product teams building scalable web applications.',
  },
  {
    index: '02',
    icon: 'fa-chalkboard-user',
    title: 'Technical conversations',
    description:
      'Sharing lessons on React architecture, API integration, production delivery, and growing as an engineer.',
  },
  {
    index: '03',
    icon: 'fa-code-branch',
    title: 'Open-source collaboration',
    description:
      'Contributing to meaningful projects where thoughtful implementation and maintainable code matter.',
  },
  {
    index: '04',
    icon: 'fa-comments',
    title: 'AI + product engineering',
    description:
      'Discussions around AI-assisted development, intelligent workflows, and practical applications in modern web products.',
  },
];

const OpenTo = () => (
  <section id="open-to" className="theme-section-alt py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader
        index="08"
        title="Open to"
        subtitle="Selective collaborations, conversations, and opportunities to build meaningful things."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((item) => (
          <EditorialCard key={item.index} {...item} />
        ))}
      </div>
    </div>
  </section>
);

export default OpenTo;
