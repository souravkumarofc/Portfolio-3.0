import React from 'react';

const Hero = () => (
  <section id="hero" className="hero-editorial gradient-bg px-4 relative overflow-hidden">
    <div className="container mx-auto max-w-6xl relative z-10">
      <div className="max-w-3xl">
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          Open to meaningful opportunities
        </div>

        <p className="hero-eyebrow mb-4">
          Software Developer · Full-Stack Engineer · AI Enthusiast
        </p>

        <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-theme-primary mb-3">
          Hi, I&apos;m <span className="text-theme-accent">Sourav Kumar</span>
        </h1>

        <div className="hero-education mb-6">
          <p className="text-base md:text-lg font-semibold text-theme-secondary">
            M.Tech in Artificial Intelligence
          </p>
          <p className="text-sm md:text-base text-theme-muted mt-1">
            Indian Institute of Technology Jodhpur
          </p>
        </div>

        <p className="text-xl md:text-2xl text-theme-secondary font-medium leading-relaxed mb-6">
          I build scalable digital products where engineering meets thoughtful design.
        </p>

        <p className="text-base md:text-lg text-theme-muted leading-relaxed mb-8 max-w-2xl">
          Software Developer at Aimleap with 4+ years of experience across React, Next.js, TypeScript,
          Node.js, and REST APIs—shipping production features for wealth management, supply chain, and
          enterprise platforms while pursuing M.Tech in Artificial Intelligence at{' '}
          <strong className="font-semibold text-theme-secondary">IIT Jodhpur</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a href="#contact" className="btn-editorial-primary">
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            Get in Touch
          </a>
          <a href="#experience" className="btn-editorial-secondary">
            View Experience
            <i className="fa-solid fa-arrow-down text-sm" aria-hidden="true" />
          </a>
        </div>

        <p className="text-sm text-theme-muted">
          Bangalore, Karnataka, India · Originally from Jamshedpur, Jharkhand
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
