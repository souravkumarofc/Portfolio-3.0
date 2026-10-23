import React from 'react';
import SectionHeader from './SectionHeader';

const TECH_STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'REST APIs',
  'AI-assisted development',
];

const HIGHLIGHTS = [
  {
    icon: 'fa-briefcase',
    title: '4+ Years',
    subtitle: 'Production experience',
    description:
      'Shipping features across wealth management, supply chain, and enterprise platforms with cross-functional teams.',
  },
  {
    icon: 'fa-graduation-cap',
    title: 'IIT Jodhpur',
    subtitle: 'Further learning',
    description:
      'Pursuing M.Tech in Artificial Intelligence (2026–2028) at Indian Institute of Technology Jodhpur.',
  },
  {
    icon: 'fa-microchip',
    title: 'AI + Full-Stack',
    subtitle: 'Areas of focus',
    description:
      'Building scalable web products and exploring AI-powered workflows with modern frontend and backend tooling.',
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="theme-section py-20 md:py-28 px-4 relative overflow-hidden"
      aria-labelledby="about-section-title"
    >
      <div className="container relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          title="About"
          subtitle="Engineering with intent — from production systems to continuous learning in AI."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h3
              id="about-section-title"
              className="font-playfair text-3xl font-bold leading-tight text-theme-primary md:text-4xl"
            >
              Building software. Exploring AI. Never stopping learning.
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-theme-secondary">
              I&apos;m <span className="font-semibold text-theme-primary">Sourav Kumar</span>, a Software
              Developer at <span className="font-semibold text-theme-accent">Aimleap</span> with{' '}
              <span className="font-semibold text-theme-primary">4+ years</span> of experience delivering
              production-ready web applications.
            </p>

            <p className="mt-4 text-base leading-relaxed text-theme-muted md:text-lg">
              I work across React, Next.js, TypeScript, JavaScript, Node.js, Express, databases, and REST
              APIs—translating complex requirements into maintainable interfaces and scalable workflows.
            </p>

            <p className="mt-4 text-base leading-relaxed text-theme-muted md:text-lg">
              I am currently pursuing an{' '}
              <span className="font-semibold text-theme-secondary">
                M.Tech in Artificial Intelligence at Indian Institute of Technology Jodhpur (2026–2028)
              </span>
              .
            </p>

            <blockquote className="about-philosophy mt-8 border-l-4 pl-5 text-base italic leading-relaxed text-theme-secondary md:text-lg" style={{ borderColor: 'var(--accent)' }}>
              I care about writing maintainable code that solves real problems—shipping with clarity,
              collaborating openly, and staying curious about AI-powered products.
            </blockquote>

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-theme-muted">
                Core technologies
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Core technologies">
                {TECH_STACK.map((tech) => (
                  <li key={tech}>
                    <span className="tag-pill">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              <div className="image-container relative overflow-hidden rounded-[1.75rem] theme-card">
                <img
                  src="/images/new_pic.png"
                  alt="Portrait of Sourav Kumar, Software Developer"
                  width={480}
                  height={640}
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-top"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-theme-muted lg:text-left">
                Sourav Kumar · Software Developer
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <article key={item.title} className="theme-card rounded-2xl p-6 card-hover">
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                <i className={`fa-solid ${item.icon} text-lg`} aria-hidden="true" />
              </div>
              <h4 className="font-playfair text-xl font-bold text-theme-primary">{item.title}</h4>
              <p className="mt-1 text-sm font-semibold text-theme-accent">{item.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-theme-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
