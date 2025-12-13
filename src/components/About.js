import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800">
            About Me
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
        </div>
        <div className="text-lg md:text-xl text-center text-gray-700 leading-relaxed space-y-4">
          <p>
            I'm currently working as a Software Developer at <span className="font-bold text-blue-700">Aimleap</span>, contributing to the development of scalable web applications focused on performance, usability, and maintainability.
          </p>
          <p>
            My role involves building modern React-based interfaces, collaborating across teams, and turning real-world product requirements into reliable, production-grade features.
          </p>
          <p>
            This experience has strengthened my understanding of <span className="font-bold text-blue-700">frontend architecture</span>, <span className="font-bold text-blue-700">agile collaboration</span>, and <span className="font-bold text-blue-700">shipping code that impacts real users</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

