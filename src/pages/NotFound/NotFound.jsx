import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>A página que você está procurando não existe ou foi movida.</p>
        <Link to="/" className="back-home-btn">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
