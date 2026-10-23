import React from 'react';
import SectionHeader from './SectionHeader';

const Education = () => {
  const education = [
    {
      degree: 'M.Tech — Artificial Intelligence',
      institution: 'Indian Institute of Technology Jodhpur',
      period: '2026 — 2028',
      highlights: [
        'Pursuing advanced studies in artificial intelligence and machine learning',
        'Building on 4+ years of industry experience in React and full-stack development',
      ],
    },
    {
      degree: 'B.Tech — Computer Science & Engineering',
      institution: 'Gandhi Engineering College (BPUT), Bhubaneswar',
      period: 'Aug 2018 — July 2022 • CGPA: 8.79',
      highlights: [
        'Strong foundation in algorithms, data structures, and software engineering',
        'Worked on multiple web projects during studies',
      ],
    },
  ];

  return (
    <section id="education" className="theme-section-alt py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          index="02"
          title="Education"
          subtitle="Academic foundation and ongoing learning in artificial intelligence."
        />
        <ol className="relative border-l ml-4" style={{ borderColor: 'var(--border-strong)' }}>
          {education.map((item) => (
            <li key={item.degree} className="mb-10 ml-6">
              <div className="theme-card rounded-2xl p-6 card-hover">
                <h3 className="font-bold text-lg text-theme-accent mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
                  {item.degree}
                </h3>
                <p className="text-theme-secondary mb-1">{item.institution}</p>
                <p className="text-theme-muted text-sm mb-1">{item.period}</p>
                <ul className="list-disc ml-5 text-theme-muted text-sm">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;
