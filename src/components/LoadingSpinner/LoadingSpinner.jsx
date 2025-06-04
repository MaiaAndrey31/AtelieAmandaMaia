import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium',
  color = 'primary',
  fullScreen = false,
  message = 'Carregando...'
}) => {
  const sizeClasses = {
    small: 'loading-spinner--small',
    medium: 'loading-spinner--medium',
    large: 'loading-spinner--large'
  };

  const colorClasses = {
    primary: 'loading-spinner--primary',
    secondary: 'loading-spinner--secondary',
    white: 'loading-spinner--white'
  };

  if (fullScreen) {
    return (
      <div className="loading-spinner-overlay">
        <div className="loading-spinner-container">
          <div 
            className={`loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`}
            role="status"
            aria-label="Carregando"
          >
            <div className="loading-spinner__circle"></div>
            <div className="loading-spinner__circle"></div>
            <div className="loading-spinner__circle"></div>
          </div>
          {message && (
            <p className="loading-spinner__message">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-spinner-container">
      <div 
        className={`loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="Carregando"
      >
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
      </div>
      {message && (
        <p className="loading-spinner__message">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;