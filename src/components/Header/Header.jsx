import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext.jsx';
import { WHATSAPP_NUMBER, SOCIAL_LINKS } from '../../utils/constants';
import Logo from '../../assets/images/products/logotipo.png';
import { InstagramLogoIcon, FacebookLogoIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = useContext(CartContext);

  const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleNavigation = (path) => {
    // Se já estiver na mesma página, rola para o topo
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de fazer um orçamento para produtos personalizados.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  // Função para rolar para o topo da página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => {
          handleNavigation('/');
          scrollToTop();
        }}>
          <img src={Logo} alt="Ateliê Amanda Maia" />
          <span>Ateliê Amanda Maia</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <ul>
            <li><button onClick={() => handleNavigation('/')}>Home</button></li>
            <li><button onClick={() => handleNavigation('/produtos')}>Produtos</button></li>
            <li><button onClick={() => handleNavigation('/galeria')}>Galeria</button></li>
            <li><button onClick={() => handleNavigation('/sobre')}>Sobre</button></li>
            <li><button onClick={() => handleNavigation('/contato')}>Contato</button></li>
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
              <InstagramLogoIcon size={24} color="white" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookLogoIcon size={24} color="white" />
            </a>
          </div>

          {/* Cart Button */}
          <button
            className="cart-button"
            onClick={() => {
              handleNavigation('/carrinho');
              setIsMenuOpen(false);
            }}
          >
            <ShoppingCartIcon size={24} color="white" />

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
          <li><button onClick={() => handleNavigation('/')}>Home</button></li>
          <li><button onClick={() => handleNavigation('/produtos')}>Produtos</button></li>
          <li><button onClick={() => handleNavigation('/galeria')}>Galeria</button></li>
          <li><button onClick={() => handleNavigation('/sobre')}>Sobre</button></li>
          <li><button onClick={() => handleNavigation('/contato')}>Contato</button></li>
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