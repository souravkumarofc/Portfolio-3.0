import React, { useState } from 'react';
import SectionHeader from './SectionHeader';

const isDev = process.env.NODE_ENV === 'development';
const devError = (...args) => {
  if (isDev) console.error(...args);
};

const HonorsAndAwards = () => {
  const [imageError, setImageError] = useState(false);

  const award = {
    title: 'ServiceNow Gen AI Hackathon 2024',
    company: 'Capgemini',
    achievement: 'Winner (1st Prize)',
    description:
      'Built an AI-based image recognition solution within ServiceNow to detect potholes and road damage from user-uploaded images. Automated intelligent ticket routing to relevant government departments.',
    recognition:
      'Recognized for innovation and cross-functional collaboration, delivering a real-world, client-aligned solution.',
    tags: ['Hackathon', 'Gen AI', 'ServiceNow'],
    certificateImage: '/images/service-now-certificate.png',
    linkedInUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7210853851720036352/',
  };

  return (
    <section id="honors-awards" className="theme-section-alt py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          title="Honors & Awards"
          subtitle="Recognition for innovation and applied engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="theme-card rounded-xl overflow-hidden card-hover">
            <a
              href={award.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer h-full"
            >
              <div className="award-certificate-frame">
                {!imageError ? (
                  <img
                    src={award.certificateImage}
                    alt={`${award.title} Certificate`}
                    draggable="false"
                    loading="lazy"
                    className="w-full h-auto object-contain max-h-[500px]"
                    style={{
                      imageRendering: 'auto',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                    }}
                    onError={() => {
                      devError('Image failed to load:', award.certificateImage);
                      setImageError(true);
                    }}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="award-cert-fallback">
                    <div className="award-cert-fallback-icon" aria-hidden="true">
                      <i className="fa-solid fa-trophy" />
                    </div>
                    <p className="text-theme-primary font-bold text-base mb-2">Certificate</p>
                    <p className="text-theme-secondary text-sm mb-2">{award.title}</p>
                    <p className="text-theme-muted text-xs">Image not found</p>
                  </div>
                )}
              </div>
            </a>
          </div>

          <div className="theme-card rounded-xl overflow-hidden card-hover">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-playfair font-bold text-2xl md:text-3xl text-theme-primary mb-2">
                  {award.title}
                </h3>
                <p className="text-lg text-theme-accent font-semibold mb-2">{award.company}</p>
                <div className="award-badge">🥇 {award.achievement}</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-theme-primary leading-relaxed font-medium mb-2">
                    Project Highlights:
                  </p>
                  <p className="text-theme-secondary leading-relaxed">{award.description}</p>
                </div>
                <div className="award-callout">
                  <p>{award.recognition}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-theme-muted mb-2 font-semibold">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {award.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={award.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-primary"
              >
                <i className="fa-brands fa-linkedin" aria-hidden="true" />
                <span>View Achievement on LinkedIn</span>
                <i className="fa-solid fa-external-link text-sm" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HonorsAndAwards;
