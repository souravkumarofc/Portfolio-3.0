import React from 'react';

const EditorialCard = ({ index, icon, title, description, footer, children }) => (
  <article className="editorial-card theme-card card-hover">
    <span className="editorial-card-index">{index}</span>
    {icon && (
      <div className="editorial-card-icon-wrap" aria-hidden="true">
        <i className={`fa-solid ${icon}`} />
      </div>
    )}
    <h3 className="editorial-card-title font-playfair">{title}</h3>
    <p className="editorial-card-description">{description}</p>
    {children}
    {footer && <p className="editorial-card-footer">{footer}</p>}
  </article>
);

export default EditorialCard;
