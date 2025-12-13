import React from 'react';

const Hero = () => {
  return (
    <section
      id="hero"
      className="pt-32 md:pt-36 pb-32 flex flex-col items-center gradient-bg hero-pattern px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <img
          src="/images/pic.jpg"
          alt="Sourav Kumar"
          className="w-40 h-40 md:w-48 md:h-48 rounded-full shadow-2xl mb-8 object-cover border-4 border-white mx-auto hover:scale-105 transition-transform duration-500"
        />
        <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 text-gray-800 tracking-tight leading-tight">
          Sourav Kumar
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 font-semibold mb-6">
        Frontend Developer — Building Scalable React Applications
        </h2>
        <p className="max-w-2xl mx-auto text-center text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
        I build performant, accessible, and user-focused interfaces — translating complex product requirements into reliable, production-ready web experiences using React and TypeScript.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

