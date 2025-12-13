import React from 'react';
import servicenowLogo from '../logos/servicenow_logo.png';

// ServiceNow logo from local assets
const ServiceNow = ({ className = "w-14 h-14" }) => (
  <img 
    src={servicenowLogo} 
    alt="ServiceNow" 
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export default ServiceNow;

