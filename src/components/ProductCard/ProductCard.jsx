import React, { useState, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { WHATSAPP_NUMBER } from '../../utils/constants';
import './ProductCard.css';

const ProductCard = ({ product, onProductClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    
    // Simular loading
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
    }, 500);
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${product.name}\n\nPreço: ${formatPrice(product.price)}\n\nGostaria de mais informações!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card" onClick={() => onProductClick(product)}>
      {/* Product Badges */}
      <div className="product-badges">
        {product.isPopular && (
          <span className="badge popular">
            <i className="fas fa-fire"></i>
            Popular
          </span>
        )}
        {product.customizable && (
          <span className="badge customizable">
            <i className="fas fa-palette"></i>
            Personalizável
          </span>
        )}
        {product.discount && (
          <span className="badge discount">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="product-image">
        {!imageError ? (
          <img 
            src={product.image} 
            alt={product.name}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <i className="fas fa-image"></i>
            <span>Imagem não disponível</span>
          </div>
        )}
        
        {/* Quick Actions Overlay */}
        <div className="quick-actions">
          <button 
            className="quick-action"
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            title="Ver detalhes"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            className="quick-action"
            onClick={handleWhatsAppClick}
            title="Perguntar via WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {/* Product Features */}
        {product.features && product.features.length > 0 && (
          <div className="product-features">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="feature-tag">
                <i className="fas fa-check"></i>
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="feature-more">
                +{product.features.length - 2} mais
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="price-section">
          {product.originalPrice && (
            <span className="original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <div className="price-wrapper">
            <span className="price-label">A partir de</span>
            <span className="current-price">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button 
            className={`add-to-cart-btn ${isLoading ? 'loading' : ''}`}
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Adicionando...
              </>
            ) : (
              <>
                <i className="fas fa-shopping-cart"></i>
                Adicionar ao Carrinho
              </>
            )}
          </button>
          
          <button 
            className="whatsapp-btn"
            onClick={handleWhatsAppClick}
          >
            <i className="fab fa-whatsapp"></i>
            Orçamento
          </button>
        </div>

        {/* Product Rating */}
        {product.rating && (
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <i 
                  key={index}
                  className={`fas fa-star ${index < Math.floor(product.rating) ? 'filled' : ''}`}
                ></i>
              ))}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviewCount || 0} avaliações)
            </span>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="hover-effect"></div>
    </div>
  );
};

export default ProductCard;