import React, { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 3.0;
        this.vy = (Math.random() - 0.5) * 3.0;
        this.radius = Math.random() * 2 + 1;
        this.baseRadius = this.radius;
        this.twinkle = Math.random() * Math.PI * 2; // For twinkling effect
        this.twinkleSpeed = 0.04 + Math.random() * 0.05;
      }

      update() {
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.18;
            this.vy -= Math.sin(angle) * force * 0.18;
            this.radius = this.baseRadius + force * 1.5;
          } else {
            this.radius = this.baseRadius;
          }
        } else {
          this.radius = this.baseRadius;
        }

        // Maintain minimum velocity to prevent stopping
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const minSpeed = 0.8;
        if (speed < minSpeed && speed > 0) {
          this.vx = (this.vx / speed) * minSpeed;
          this.vy = (this.vy / speed) * minSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Very minimal damping - just to prevent infinite acceleration
        this.vx *= 0.9998;
        this.vy *= 0.9998;

        // Update twinkle for star effect
        this.twinkle += this.twinkleSpeed;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        // Twinkling effect for constellation look
        const twinkleIntensity = 0.6 + Math.sin(this.twinkle) * 0.2;
        
        // Outer glow - subtle gray-purple tone
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${0.15 * twinkleIntensity})`);
        gradient.addColorStop(0.4, `rgba(139, 92, 246, ${0.08 * twinkleIntensity})`);
        gradient.addColorStop(0.7, `rgba(139, 92, 246, ${0.03 * twinkleIntensity})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle - subtle purple dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.4 * twinkleIntensity})`;
        ctx.fill();
      }
    }

    // Initialize particles - more particles for better constellation effect
    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Set canvas size
    const resizeCanvas = (shouldReinit = true) => {
      const width = canvas.offsetWidth || window.innerWidth;
      const height = canvas.offsetHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Reinitialize particles on resize
      if (shouldReinit && width > 0 && height > 0) {
        initParticles();
      }
    };

    // Mouse tracking for interactive effect - track on parent section
    const handleMouseMove = (e) => {
      const heroSection = canvas.closest('section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Draw connections between nearby particles - constellation style
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 180; // Increased for more constellation-like connections

          if (distance < maxDistance) {
            // Subtle lines that match the design
            const opacity = (1 - distance / maxDistance) * 0.25;
            const lineWidth = 0.3;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Subtle purple-gray line matching portfolio theme
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize - use a small delay to ensure DOM is ready
    const init = () => {
      resizeCanvas(false);
      if (canvas.width > 0 && canvas.height > 0) {
        initParticles();
        animate();
      }
    };

    // Try immediate initialization
    init();

    // Fallback: try again after a short delay if canvas wasn't ready
    const timeoutId = setTimeout(() => {
      if (particles.length === 0) {
        init();
      }
    }, 100);

    window.addEventListener('resize', () => resizeCanvas(true));

    const heroSection = canvas.closest('section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', resizeCanvas);
      const heroSection = canvas.closest('section');
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1, pointerEvents: 'none' }}
    />
  );
};

export default ParticleNetwork;

