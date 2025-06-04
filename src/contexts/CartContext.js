import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estados do carrinho
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Item já existe, aumenta a quantidade
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        // Item novo, adiciona ao carrinho
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload };

    case 'LOAD_CART':
      return { ...state, items: action.payload || [] };

    default:
      return state;
  }
};

// Estado inicial do carrinho
const initialState = {
  items: [],
  isOpen: false
};

// Criação do contexto
const CartContext = createContext();

// Hook personalizado para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider do contexto do carrinho
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Carrega o carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salva o carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Função para adicionar item ao carrinho
  const addToCart = (product, quantity = 1, customizations = {}) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      customizable: product.customizable,
      customizations,
      quantity
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  // Função para remover item do carrinho
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
  };

  // Função para atualizar quantidade
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  // Função para limpar carrinho
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Função para abrir/fechar carrinho
  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  // Função para definir estado do carrinho
  const setCartOpen = (isOpen) => {
    dispatch({ type: 'SET_CART_OPEN', payload: isOpen });
  };

  // Função para obter total de itens
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Função para obter total do carrinho
  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Função para verificar se um produto está no carrinho
  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Função para obter quantidade de um produto no carrinho
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Função para calcular frete
  const getShippingCost = () => {
    const total = getTotalPrice();
    const FREE_SHIPPING_THRESHOLD = 200;
    const SHIPPING_COST = 15;
    
    return total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  };

  // Função para obter total com frete
  const getTotalWithShipping = () => {
    return getTotalPrice() + getShippingCost();
  };

  // Função para gerar mensagem do WhatsApp
  const getWhatsAppMessage = () => {
    if (state.items.length === 0) return '';

    let message = '🎉 *Orçamento - Ateliê Amanda Maia*\n\n';
    message += '📋 *Produtos selecionados:*\n';
    
    state.items.forEach(item => {
      message += `• ${item.name} (Qtd: ${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
      
      // Adicionar personalizações se houver
      if (item.customizations && Object.keys(item.customizations).length > 0) {
        Object.entries(item.customizations).forEach(([key, value]) => {
          if (value) {
            message += `  - ${key}: ${value}\n`;
          }
        });
      }
    });
    
    const subtotal = getTotalPrice();
    const shipping = getShippingCost();
    const total = getTotalWithShipping();
    
    message += `\n💰 *Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}*\n`;
    
    if (shipping > 0) {
      message += `🚚 *Frete: R$ ${shipping.toFixed(2).replace('.', ',')}*\n`;
    } else {
      message += `🚚 *Frete: GRÁTIS* 🎉\n`;
    }
    
    message += `💳 *Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    message += `Gostaria de fazer o orçamento destes produtos! 😊`;
    
    return encodeURIComponent(message);
  };

  // Valor do contexto
  const value = {
    // Estado
    items: state.items,
    isOpen: state.isOpen,
    
    // Ações
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    setCartOpen,
    
    // Utilitários
    getTotalItems,
    getTotalPrice,
    getTotalWithShipping,
    getShippingCost,
    isInCart,
    getItemQuantity,
    getWhatsAppMessage,
    
    // Estado derivado
    isEmpty: state.items.length === 0,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    totalWithShipping: getTotalWithShipping(),
    shippingCost: getShippingCost(),
    isFreeShipping: getShippingCost() === 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};