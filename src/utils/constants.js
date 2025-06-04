// Informações de contato
export const CONTACT_INFO = {
    whatsapp: '5511999999999',
    instagram: '@atelier_amanda_maia',
    email: 'contato@atelieamandamaia.com.br',
    address: 'São Paulo, SP'
  };
  
  // URLs das redes sociais
  export const SOCIAL_LINKS = {
    whatsapp: `https://wa.me/${CONTACT_INFO.whatsapp}`,
    instagram: 'https://instagram.com/atelier_amanda_maia',
    email: `mailto:${CONTACT_INFO.email}`
  };
  
  // Configurações do carrinho
  export const CART_CONFIG = {
    minOrder: 50.00,
    freeShipping: 200.00,
    shippingFee: 15.00
  };
  
  // Configurações de paginação
  export const PAGINATION = {
    productsPerPage: 12,
    loadMore: 6
  };
  
  // Breakpoints responsivos
  export const BREAKPOINTS = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1440
  };
  
  // Tempo de produção (em dias)
  export const PRODUCTION_TIME = {
    velas: 3,
    topos: 2,
    lembrancinhas: 5,
    familia: 7,
    funko: 10,
    chaveiros: 3
  };
  
  // Mensagens padrão para WhatsApp
  export const WHATSAPP_MESSAGES = {
    cart: (items, total) => {
      let message = `🎉 *Orçamento - Ateliê Amanda Maia*\n\n`;
      message += `📋 *Produtos selecionados:*\n`;
      
      items.forEach(item => {
        message += `• ${item.name} (Qtd: ${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
      });
      
      message += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
      message += `Gostaria de fazer o orçamento destes produtos! 😊`;
      
      return encodeURIComponent(message);
    },
    
    product: (product) => {
      const message = `🎨 Olá! Tenho interesse no produto:\n\n*${product.name}*\nPreço: R$ ${product.price.toFixed(2).replace('.', ',')}\n\nPoderia me enviar mais informações? 😊`;
      return encodeURIComponent(message);
    },
    
    budget: (formData) => {
      let message = `📝 *Solicitação de Orçamento*\n\n`;
      message += `👤 *Nome:* ${formData.name}\n`;
      message += `📱 *Telefone:* ${formData.phone}\n`;
      message += `🎂 *Tipo de Evento:* ${formData.eventType}\n`;
      message += `📅 *Data do Evento:* ${formData.eventDate}\n`;
      message += `👥 *Número de Convidados:* ${formData.guests}\n\n`;
      message += `📋 *Descrição:*\n${formData.description}`;
      
      return encodeURIComponent(message);
    }
  };
  
  // Meta tags para SEO
  export const SEO_META = {
    title: 'Ateliê Amanda Maia - Velas e Decorações Personalizadas',
    description: 'Velas personalizadas, topos de bolo, lembrancinhas e decorações únicas para sua festa. Criações artesanais com muito carinho em São Paulo.',
    keywords: 'velas personalizadas, topos de bolo, lembrancinhas, decoração festa, artesanal, São Paulo, personalizado',
    author: 'Ateliê Amanda Maia',
    image: '/images/logo.png',
    url: 'https://atelieamandamaia.com.br'
  };