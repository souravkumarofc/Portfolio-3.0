import React, { useState, useEffect } from 'react';
import ParticleNetwork from './ParticleNetwork';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Preload image to ensure it's ready
    const img = new Image();
    img.src = '/images/new_pic.png';
    
    let mounted = true;
    let hasLoaded = false;
    
    img.onload = () => {
      if (mounted && !hasLoaded) {
        hasLoaded = true;
        // Small delay for animation effect
        setTimeout(() => {
          setImageLoaded(true);
          setImageError(false);
        }, 150);
      }
    };
    
    img.onerror = () => {
      console.error('Failed to load image: /images/new_pic.png');
      if (mounted && !hasLoaded) {
        hasLoaded = true;
        setImageError(true);
        setImageLoaded(true); // Still show animation even on error
      }
    };
    
    // Fallback: ensure animation triggers even if image loads instantly or is cached
    const fallbackTimer = setTimeout(() => {
      if (mounted && !hasLoaded) {
        hasLoaded = true;
        setImageLoaded(true);
      }
    }, 500);
    
    // Prevent right-click context menu on the entire hero section
    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    
    // Prevent drag and drop
    const preventDrag = (e) => {
      e.preventDefault();
      return false;
    };
    
    // Prevent text/image selection
    const preventSelect = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };
    
    // Prevent copy
    const preventCopy = (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('.image-container')) {
        e.preventDefault();
        return false;
      }
    };
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('contextmenu', preventContextMenu);
      heroSection.addEventListener('dragstart', preventDrag);
      heroSection.addEventListener('selectstart', preventSelect);
      heroSection.addEventListener('copy', preventCopy);
    }
    
    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      if (heroSection) {
        heroSection.removeEventListener('contextmenu', preventContextMenu);
        heroSection.removeEventListener('dragstart', preventDrag);
        heroSection.removeEventListener('selectstart', preventSelect);
        heroSection.removeEventListener('copy', preventCopy);
      }
    };
  }, []); // Empty dependency array - only run once

  return (
    <section
      id="hero"
      className="pt-20 md:pt-24 pb-32 flex flex-col items-center gradient-bg hero-pattern px-4 relative overflow-hidden"
    >
      <ParticleNetwork />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mx-auto mb-8 image-container" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
          <div
            className={`w-72 h-72 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] mx-auto transition-all duration-1200 ease-out relative`}
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              opacity: imageLoaded ? 1 : 0,
              transform: imageLoaded ? 'scale(1) translateY(0) blur(0)' : 'scale(0.9) translateY(10px) blur(4px)'
            }}
          >
            {/* Invisible overlay to prevent interactions */}
            <div 
              className="absolute inset-0 z-10 rounded-2xl"
              style={{ 
                userSelect: 'none',
                pointerEvents: 'auto',
                cursor: 'default',
                background: 'transparent'
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onSelectStart={(e) => e.preventDefault()}
            />
            <img
              src="/images/new_pic.png"
              alt="Sourav Kumar"
              draggable="false"
              onLoad={(e) => {
                console.log('Image loaded successfully via onLoad');
                // Check if image is actually loaded
                if (e.target.complete && e.target.naturalHeight !== 0) {
                  setImageLoaded(true);
                  setImageError(false);
                }
              }}
              onError={(e) => {
                console.error('Image failed to load:', e);
                setImageError(true);
                setImageLoaded(true);
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onSelectStart={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              className="w-full h-full rounded-2xl shadow-[0_20px_60px_rgba(139,92,246,0.3)] object-cover hover:shadow-[0_25px_70px_rgba(139,92,246,0.4)] transition-shadow duration-300 select-none"
              style={{ 
                minHeight: '100%',
                minWidth: '100%',
                display: 'block',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                WebkitUserDrag: 'none',
                pointerEvents: 'none',
                position: 'relative',
                zIndex: 1
              }}
            />
            {imageError && (
              <div className="w-full h-full rounded-2xl shadow-[0_20px_60px_rgba(139,92,246,0.3)] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Image not found</span>
              </div>
            )}
          </div>
        </div>
        <h1
          className={`text-4xl md:text-6xl font-playfair font-bold mb-4 text-gray-800 tracking-tight leading-tight transition-all duration-1000 ease-out delay-200 ${
            imageLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Sourav Kumar
        </h1>
        <h2
          className={`text-xl md:text-2xl text-gray-600 font-semibold mb-6 transition-all duration-1000 ease-out delay-300 ${
            imageLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Frontend Developer, Building Scalable React Applications
        </h2>
        <p
          className={`max-w-2xl mx-auto text-center text-gray-700 text-lg md:text-xl mb-10 leading-relaxed transition-all duration-1000 ease-out delay-400 ${
            imageLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          I build performant, accessible, and user-focused interfaces translating complex product requirements into reliable, production-ready web experiences using React and TypeScript.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-500 ${
            imageLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300 font-semibold text-lg"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold text-lg"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

