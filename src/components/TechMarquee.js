import React, { useEffect, useRef } from 'react';
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
  MongoDB,
  PostgreSQL,
  Java,
  Python,
  GitHub,
  Bitbucket,
  NPM,
  Postman,
  Git,
  Firebase,
  FastAPI,
  ServiceNow,
} from '../assets/skills';

const MARQUEE_SKILLS = [
  { Icon: TypeScript, name: 'TypeScript' },
  { Icon: JavaScript, name: 'JavaScript' },
  { Icon: ReactIcon, name: 'React' },
  { Icon: Next, name: 'Next.js' },
  { Icon: Node, name: 'Node.js' },
  { Icon: Express, name: 'Express' },
  { Icon: MongoDB, name: 'MongoDB' },
  { Icon: PostgreSQL, name: 'PostgreSQL' },
  { Icon: HTML5, name: 'HTML5' },
  { Icon: CSS3, name: 'CSS3' },
  { Icon: Redux, name: 'Redux' },
  { Icon: Python, name: 'Python' },
  { Icon: Java, name: 'Java' },
  { Icon: Git, name: 'Git' },
  { Icon: GitHub, name: 'GitHub' },
  { Icon: Bitbucket, name: 'Bitbucket' },
  { Icon: Postman, name: 'Postman' },
  { Icon: Firebase, name: 'Firebase' },
  { Icon: FastAPI, name: 'FastAPI' },
  { Icon: ServiceNow, name: 'ServiceNow' },
  { Icon: NPM, name: 'npm' },
];

const TechMarquee = ({ className = '' }) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const state = entry.isIntersecting ? 'running' : 'paused';
        if (track.style.animationPlayState !== state) {
          track.style.animationPlayState = state;
        }
      },
      { rootMargin: '120px 0px', threshold: 0 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`tech-marquee ${className}`}
      aria-label="Technologies I work with"
    >
      <div ref={trackRef} className="tech-marquee-track">
        {items.map((skill, index) => {
          const IconComponent = skill.Icon;
          return (
            <div className="tech-marquee-item" key={`${skill.name}-${index}`}>
              <IconComponent className="tech-marquee-icon" aria-hidden="true" />
              <span className="tech-marquee-label">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechMarquee;
