import React from 'react';

const SectionHeader = ({ index, title, subtitle, align = 'left' }) => {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <header className={`section-header mb-10 md:mb-14 flex flex-col ${alignment}`}>
      <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="section-index font-mono text-sm tracking-widest">{index}</span>
        <span className="section-index-line hidden sm:block" aria-hidden="true" />
      </div>
      <h2 className="section-title font-playfair mt-4">{title}</h2>
      {subtitle && <p className="section-subtitle mt-3 max-w-2xl">{subtitle}</p>}
    </header>
  );
};

export default SectionHeader;
