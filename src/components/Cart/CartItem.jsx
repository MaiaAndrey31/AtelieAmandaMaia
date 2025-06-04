import React, { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item.id);
    }, 300);
  };

  return (
    <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <div className="item-image-container">
        <img 
          src={item.image} 
          alt={item.name}
          className="item-image"
          loading="lazy"
        />
        {item.customizable && (
          <div className="customizable-badge">
            ✨
          </div>
        )}
      </div>

      <div className="item-details">
        <div className="item-header">
          <h4 className="item-name">{item.name}</h4>
          <button 
            className="remove-item-btn"
            onClick={handleRemove}
            aria-label="Remover item"
            title="Remover do carrinho"
          >
            🗑️
          </button>
        </div>

        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
          <div className="item-options">
            {Object.entries(item.selectedOptions).map(([key, value]) => (
              <span key={key} className="option-tag">
                {key}: {value}
              </span>
            ))}
          </div>
        )}

        <div className="item-pricing">
          <div className="price-info">
            <span className="unit-price">{formatPrice(item.price)} cada</span>
            <span className="total-price">{formatPrice(item.price * item.quantity)}</span>
          </div>
          
          <div className="quantity-controls">
            <button 
              className="quantity-btn decrease"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            
            <input
              type="number"
              className="quantity-input"
              value={item.quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                handleQuantityChange(value);
              }}
              min="1"
              max="99"
            />
            
            <button 
              className="quantity-btn increase"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 99}
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>
        </div>

        {item.features && item.features.length > 0 && (
          <div className="item-features">
            {item.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;