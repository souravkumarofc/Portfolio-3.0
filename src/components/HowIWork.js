import React from 'react';
import SectionHeader from './SectionHeader';
import EditorialCard from './EditorialCard';

const principles = [
  {
    index: '01',
    icon: 'fa-table-cells-large',
    title: 'Product before implementation',
    description:
      'I start with the problem, user, and constraints — then choose the simplest engineering path that solves it well.',
  },
  {
    index: '02',
    icon: 'fa-shield-halved',
    title: 'Architecture with intent',
    description:
      'Clear boundaries, pragmatic abstractions, and systems designed to stay understandable as products and teams grow.',
  },
  {
    index: '03',
    icon: 'fa-code',
    title: 'Precision without fragility',
    description:
      'High-quality interfaces, strong fundamentals, and attention to performance, accessibility, and maintainability.',
  },
  {
    index: '04',
    icon: 'fa-star',
    title: 'AI accelerates. Judgment leads.',
    description:
      'I use AI-assisted tools to move faster while keeping engineering decisions, code quality, and what ships firmly human-reviewed.',
  },
];

const HowIWork = () => (
  <section id="how-i-work" className="theme-section py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader index="07" title="How I work" subtitle="The principles behind how I ship." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((item) => (
          <EditorialCard key={item.index} {...item} />
        ))}
      </div>
    </div>
  </section>
);

export default HowIWork;
