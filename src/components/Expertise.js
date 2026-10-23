import React from 'react';
import SectionHeader from './SectionHeader';
import EditorialCard from './EditorialCard';
import { ReactIcon, Next, Node, Express, MongoDB, TypeScript, Redux } from '../assets/skills';

const expertiseAreas = [
  {
    index: '01',
    title: 'Full-stack delivery',
    description:
      'End-to-end feature development across React/Next.js frontends, Node.js services, REST APIs, and databases — from UI to background jobs.',
    footer: 'APIs · Data systems · Delivery engineering',
    icons: [ReactIcon, Next, Node, Express, MongoDB],
  },
  {
    index: '02',
    title: 'Frontend architecture',
    description:
      'Scalable React applications with TypeScript, component-driven design, state management, and performance-focused UI patterns.',
    footer: 'Design systems · State architecture · Developer tooling',
    icons: [ReactIcon, TypeScript, Next, Redux],
  },
  {
    index: '03',
    title: 'AI-assisted development',
    description:
      'Using AI tools to accelerate delivery while maintaining engineering quality — integrating intelligent workflows into modern product experiences.',
    footer: 'AI workflows · Product thinking · Rapid iteration',
    icons: [ReactIcon, Node, TypeScript],
  },
];

const Expertise = () => (
  <section id="expertise" className="theme-section py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader
        index="06"
        title="Expertise"
        subtitle="The stack I reach for, and the practices around it."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {expertiseAreas.map((area) => (
          <EditorialCard
            key={area.index}
            index={area.index}
            title={area.title}
            description={area.description}
            footer={area.footer}
          >
            <div className="expertise-icon-row">
              {area.icons.map((IconComponent, i) => (
                <IconComponent key={i} className="expertise-stack-icon" aria-hidden="true" />
              ))}
            </div>
          </EditorialCard>
        ))}
      </div>
    </div>
  </section>
);

export default Expertise;
