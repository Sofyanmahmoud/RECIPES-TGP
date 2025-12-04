import React from 'react';

export const UserIcon = () => (
  <div style={{
    position: 'relative',
    width: '40px',
    height: '40px',
    overflow: 'hidden',
    backgroundColor: '#6b7280', 
    borderRadius: '50%',        
    flexShrink: 0              
  }}>
    <svg 
      style={{
        position: 'absolute',
        width: '48px',
        height: '48px',
        color: '#e5e7eb',       
        left: '-4px',          
        top: '0'
      }}
      fill="currentColor" 
      viewBox="0 0 20 20" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
    </svg>
  </div>
);