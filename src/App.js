import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import HonorsAndAwards from './components/HonorsAndAwards';
import Projects from './components/Projects';
import Expertise from './components/Expertise';
import HowIWork from './components/HowIWork';
import OpenTo from './components/OpenTo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const AIChatbot = lazy(() => import('./components/AIChatbot'));

function DeferredChatbot() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const schedule = () => setMount(true);
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(schedule, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(schedule, 2000);
    return () => window.clearTimeout(t);
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AIChatbot />
    </Suspense>
  );
}

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen font-inter theme-page">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Education />
      <Experience />
      <HonorsAndAwards />
      <Projects />
      <Expertise />
      <HowIWork />
      <OpenTo />
      <Contact />
      <Footer />
      <DeferredChatbot />
    </div>
  );
}

export default App;
