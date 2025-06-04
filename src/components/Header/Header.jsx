import React, { useState, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext.jsx';
import { WHATSAPP_NUMBER, SOCIAL_LINKS } from '../../utils/constants';
import Logo from '../../assets/images/products/logotipo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems = [] } = useContext(CartContext);
  
  const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de fazer um orçamento para produtos personalizados.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <img src={Logo} alt="Ateliê Amanda Maia" />
          <span>Ateliê Amanda Maia</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <ul>
            <li><button onClick={() => scrollToSection('home')}>Home</button></li>
            <li><button onClick={() => scrollToSection('products')}>Produtos</button></li>
            <li><button onClick={() => scrollToSection('gallery')}>Galeria</button></li>
            <li><button onClick={() => scrollToSection('about')}>Sobre</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contato</button></li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Social Links */}
          <div className="social-links">
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href={SOCIAL_LINKS.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>

          {/* Cart Button */}
          <button className="cart-button" onClick={() => scrollToSection('cart')}>
            <i className="fas fa-shopping-cart"></i>
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </button>

          {/* WhatsApp Button */}
          <button className="whatsapp-button" onClick={handleWhatsAppClick}>
            <i className="fab fa-whatsapp"></i>
            <span>Orçamento</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><button onClick={() => scrollToSection('home')}>Home</button></li>
          <li><button onClick={() => scrollToSection('products')}>Produtos</button></li>
          <li><button onClick={() => scrollToSection('gallery')}>Galeria</button></li>
          <li><button onClick={() => scrollToSection('about')}>Sobre</button></li>
          <li><button onClick={() => scrollToSection('contact')}>Contato</button></li>
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;