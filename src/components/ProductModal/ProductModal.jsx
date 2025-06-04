import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      customization: customization || null
    });
    onClose();
    setQuantity(1);
    setCustomization('');
  };

  const handleWhatsAppInquiry = () => {
    const message = `🎨 *Interesse no produto:*\n\n` +
      `📦 ${product.name}\n` +
      `💰 ${formatPrice(product.price)}\n` +
      `📝 ${product.description}\n\n` +
      (customization ? `✨ Personalização: ${customization}\n\n` : '') +
      `Gostaria de mais informações sobre este produto! 😊`;

    const whatsappUrl = `https://wa.me/5518999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const images = product.images || [product.image];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <span>×</span>
        </button>

        <div className="modal-content">
          <div className="modal-images">
            <div className="main-image">
              <img 
                src={images[activeImageIndex]} 
                alt={product.name}
              />
              {product.isPopular && (
                <div className="popular-badge">
                  ⭐ Popular
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-details">
            <div className="product-header">
              <h2 className="product-title">{product.name}</h2>
              <div className="product-price">
                {product.priceRange ? (
                  <span className="price-range">
                    A partir de {formatPrice(product.price)}
                  </span>
                ) : (
                  <span className="price">{formatPrice(product.price)}</span>
                )}
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            {product.features && (
              <div className="product-features">
                <h4>✨ Características:</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.customizable && (
              <div className="customization-section">
                <h4>🎨 Personalização:</h4>
                <textarea
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                  placeholder="Descreva como gostaria de personalizar (nome, cores, tema, etc.)"
                  rows="3"
                />
              </div>
            )}

            <div className="quantity-section">
              <h4>Quantidade:</h4>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="total-price">
              <strong>Total: {formatPrice(product.price * quantity)}</strong>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-add-cart"
                onClick={handleAddToCart}
              >
                🛒 Adicionar ao Carrinho
              </button>
              <button 
                className="btn-whatsapp-inquiry"
                onClick={handleWhatsAppInquiry}
              >
                📱 Perguntar no WhatsApp
              </button>
            </div>

            <div className="product-info">
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <span>Prazo: 3-5 dias úteis</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🚚</span>
                <span>Entrega para toda região</span>
              </div>
              <div className="info-item">
                <span className="info-icon">💳</span>
                <span>Pagamento facilitado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;