import React from 'react';

/** Personal brand mark — shared by header, footer, and other brand placements. */
const EditorialBrandMark = ({ className = '' }) => (
  <span
    className={className ? `editorial-brand-mark ${className}` : 'editorial-brand-mark'}
    aria-hidden="true"
  >
    &lt;SK/&gt;
  </span>
);

export default EditorialBrandMark;
