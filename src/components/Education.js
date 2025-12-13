import React from 'react';

const Education = () => {
  return (
    <section id="education" className="py-16 bg-white px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800">
            Education
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
        </div>
        <ol className="relative border-l border-blue-200 ml-4">
          <li className="mb-10 ml-6">
            <div className="bg-gray-50 rounded-xl shadow p-6 hover:shadow-lg transition card-hover">
              <h3 className="font-bold text-lg text-blue-700 mb-1 flex items-center gap-2">
                <i className="fa-solid fa-graduation-cap"></i> B.Tech — Computer
                Science & Engineering
              </h3>
              <p className="text-gray-700 mb-1">
                Gandhi Engineering College (BPUT), Bhubaneswar
              </p>
              <p className="text-gray-500 text-sm mb-1">
                2018 — 2022 • CGPA: 8.79
              </p>
              <ul className="list-disc ml-5 text-gray-600 text-sm">
                <li>
                  Strong foundation in algorithms, data structures, and software
                  engineering
                </li>
                <li>Worked on multiple web projects during studies</li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default Education;

