/**
 * Formata um número para o padrão de moeda brasileira
 * @param {number} price - Preço a ser formatado
 * @param {boolean} includeSymbol - Se deve incluir o símbolo R$
 * @returns {string} - Preço formatado
 */
export const formatPrice = (price, includeSymbol = true) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return includeSymbol ? 'R$ 0,00' : '0,00';
    }
  
    const formatted = price.toFixed(2).replace('.', ',');
    return includeSymbol ? `R$ ${formatted}` : formatted;
  };
  
  /**
   * Formata preço com desconto
   * @param {number} originalPrice - Preço original
   * @param {number} discountedPrice - Preço com desconto
   * @returns {object} - Objeto com preços formatados e porcentagem de desconto
   */
  export const formatPriceWithDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    
    return {
      original: formatPrice(originalPrice),
      discounted: formatPrice(discountedPrice),
      discount: Math.round(discount),
      savings: formatPrice(originalPrice - discountedPrice)
    };
  };
  
  /**
   * Calcula e formata parcelamento
   * @param {number} price - Preço total
   * @param {number} installments - Número de parcelas
   * @param {number} interestRate - Taxa de juros (opcional)
   * @returns {object} - Informações do parcelamento
   */
  export const formatInstallments = (price, installments = 12, interestRate = 0) => {
    if (installments <= 1) {
      return {
        installments: 1,
        installmentValue: formatPrice(price),
        totalValue: formatPrice(price),
        interestFree: true
      };
    }
  
    let totalValue = price;
    let installmentValue = price / installments;
  
    if (interestRate > 0) {
      const monthlyRate = interestRate / 100;
      installmentValue = price * (monthlyRate * Math.pow(1 + monthlyRate, installments)) / 
                       (Math.pow(1 + monthlyRate, installments) - 1);
      totalValue = installmentValue * installments;
    }
  
    return {
      installments,
      installmentValue: formatPrice(installmentValue),
      totalValue: formatPrice(totalValue),
      interestFree: interestRate === 0
    };
  };
  
  /**
   * Formata texto para URL amigável
   * @param {string} text - Texto a ser formatado
   * @returns {string} - Texto formatado para URL
   */
  export const formatSlug = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };
  
  /**
   * Formata número de telefone brasileiro
   * @param {string} phone - Número de telefone
   * @returns {string} - Telefone formatado
   */
  export const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    
    return phone;
  };
  
  /**
   * Formata CEP brasileiro
   * @param {string} cep - CEP a ser formatado
   * @returns {string} - CEP formatado
   */
  export const formatCEP = (cep) => {
    const cleaned = cep.replace(/\D/g, '');
    
    if (cleaned.length === 8) {
      return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    }
    
    return cep;
  };
  
  /**
   * Trunca texto com ellipsis
   * @param {string} text - Texto a ser truncado
   * @param {number} maxLength - Comprimento máximo
   * @returns {string} - Texto truncado
   */
  export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.substring(0, maxLength).trim() + '...';
  };
  
  /**
   * Formata data para padrão brasileiro
   * @param {Date|string} date - Data a ser formatada
   * @returns {string} - Data formatada
   */
  export const formatDate = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return 'Data inválida';
    }
    
    return dateObj.toLocaleDateString('pt-BR');
  };
  
  /**
   * Calcula tempo de produção em dias úteis
   * @param {number} days - Número de dias
   * @returns {string} - Texto formatado do prazo
   */
  export const formatProductionTime = (days) => {
    if (days === 1) {
      return '1 dia útil';
    } else if (days <= 7) {
      return `${days} dias úteis`;
    } else {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      
      if (remainingDays === 0) {
        return weeks === 1 ? '1 semana' : `${weeks} semanas`;
      } else {
        return `${weeks} semana${weeks > 1 ? 's' : ''} e ${remainingDays} dia${remainingDays > 1 ? 's' : ''}`;
      }
    }
  };