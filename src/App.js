import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import HonorsAndAwards from './components/HonorsAndAwards';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Expertise from './components/Expertise';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';

function App() {
  useScrollReveal();

  useEffect(() => {
    // Navbar shadow on scroll
    const handleScroll = () => {
      const navbar = document.querySelector('header');
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add('navbar-scrolled');
        } else {
          navbar.classList.remove('navbar-scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter scroll-smooth">
      <Header />
      <Hero />
      <About />
      <Education />
      <Experience />
      <HonorsAndAwards />
      <Projects />
      <Skills />
      <Expertise />
      <Contact />
      <Footer />
      <AIChatbot />
    </div>
  );
}

export default App;

