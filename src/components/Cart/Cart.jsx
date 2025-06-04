import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import { formatPrice } from '../../utils/formatPrice';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { 
    items, 
    total, 
    itemCount, 
    clearCart, 
    updateQuantity, 
    removeItem 
  } = useCart();
  
  const [isClosing, setIsClosing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    message: ''
  });

  // Animação de fechamento
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Calcular valores
  const subtotal = total;
  const shipping = subtotal > 150 ? 0 : 15;
  const finalTotal = subtotal + shipping;

  // Gerar mensagem WhatsApp
  const generateWhatsAppMessage = () => {
    let message = `🛍️ *Novo Pedido - Ateliê Amanda Maia*\n\n`;
    message += `👤 *Cliente:* ${customerInfo.name}\n`;
    message += `📱 *Telefone:* ${customerInfo.phone}\n\n`;
    message += `🛒 *Produtos:*\n`;
    
    items.forEach(item => {
      message += `• ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    message += `\n💰 *Resumo do Pedido:*\n`;
    message += `• Subtotal: ${formatPrice(subtotal)}\n`;
    message += `• Frete: ${shipping === 0 ? 'Grátis' : formatPrice(shipping)}\n`;
    message += `• *Total: ${formatPrice(finalTotal)}*\n\n`;
    
    if (customerInfo.message) {
      message += `💬 *Observações:*\n${customerInfo.message}\n\n`;
    }
    
    message += `Obrigado pela preferência! 💖`;
    
    return encodeURIComponent(message);
  };

  // Finalizar pedido
  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Por favor, preencha seu nome e telefone.');
      return;
    }

    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/5514999999999?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Limpar carrinho após envio
    setTimeout(() => {
      clearCart();
      handleClose();
      setShowCheckout(false);
    }, 1000);
  };

  // Continuar comprando
  const handleContinueShopping = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`cart-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`cart-sidebar ${isClosing ? 'slide-out' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <h2>
            🛍️ Meu Carrinho
            {itemCount > 0 && (
              <span className="cart-count">{itemCount}</span>
            )}
          </h2>
          <button 
            className="cart-close-btn"
            onClick={handleClose}
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione alguns produtos incríveis para começar!</p>
              <button 
                className="continue-shopping-btn"
                onClick={handleContinueShopping}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="cart-items">
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                  <span className="summary-value">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Frete</span>
                  <span className="summary-value">
                    {shipping === 0 ? (
                      <span className="free-shipping">Grátis</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                
                {subtotal < 150 && (
                  <div className="free-shipping-notice">
                    <span className="shipping-icon">🚚</span>
                    Falta {formatPrice(150 - subtotal)} para frete grátis!
                  </div>
                )}
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="summary-total">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="cart-actions">
                {!showCheckout ? (
                  <>
                    <button 
                      className="checkout-btn"
                      onClick={() => setShowCheckout(true)}
                    >
                      Finalizar Pedido
                      <span className="btn-icon">💳</span>
                    </button>
                    
                    <div className="secondary-actions">
                      <button 
                        className="continue-shopping-btn"
                        onClick={handleContinueShopping}
                      >
                        Continuar Comprando
                      </button>
                      
                      <button 
                        className="clear-cart-btn"
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
                            clearCart();
                          }
                        }}
                      >
                        Limpar Carrinho
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="checkout-form">
                    <h3>Finalizar Pedido</h3>
                    <p>Preencha seus dados para enviar o pedido via WhatsApp:</p>
                    
                    <div className="form-group">
                      <label htmlFor="customer-name">Nome Completo *</label>
                      <input
                        id="customer-name"
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({
                          ...prev,
                          name: e.target.value
                        }))}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="customer-phone">WhatsApp *</label>
                      <input
                        id="customer-phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({
                          ...prev,
                          phone: e.target.value
                        }))}
                        placeholder="(14) 99999-9999"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="customer-message">Observações (opcional)</label>
                      <textarea
                        id="customer-message"
                        value={customerInfo.message}
                        onChange={(e) => setCustomerInfo(prev => ({
                          ...prev,
                          message: e.target.value
                        }))}
                        placeholder="Alguma observação especial sobre o pedido?"
                        rows="3"
                      />
                    </div>
                    
                    <div className="checkout-actions">
                      <button 
                        className="whatsapp-btn"
                        onClick={handleCheckout}
                      >
                        <span className="whatsapp-icon">📱</span>
                        Enviar via WhatsApp
                      </button>
                      
                      <button 
                        className="back-btn"
                        onClick={() => setShowCheckout(false)}
                      >
                        Voltar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;