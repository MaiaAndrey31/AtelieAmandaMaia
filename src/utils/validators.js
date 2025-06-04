/**
 * Valida se o email tem formato correto
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se válido
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Valida telefone brasileiro
   * @param {string} phone - Telefone a ser validado
   * @returns {boolean} - True se válido
   */
  export const isValidPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
  };
  
  /**
   * Valida CEP brasileiro
   * @param {string} cep - CEP a ser validado
   * @returns {boolean} - True se válido
   */
  export const isValidCEP = (cep) => {
    const cleaned = cep.replace(/\D/g, '');
    return cleaned.length === 8;
  };
  
  /**
   * Valida se o nome tem pelo menos 2 palavras
   * @param {string} name - Nome a ser validado
   * @returns {boolean} - True se válido
   */
  export const isValidName = (name) => {
    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.includes(' ');
  };
  
  /**
   * Valida se a data é futura
   * @param {string} date - Data a ser validada (YYYY-MM-DD)
   * @returns {boolean} - True se válida
   */
  export const isValidFutureDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
  };
  
  /**
   * Valida quantidade (deve ser maior que 0)
   * @param {number|string} quantity - Quantidade a ser validada
   * @returns {boolean} - True se válida
   */
  export const isValidQuantity = (quantity) => {
    const num = parseInt(quantity);
    return !isNaN(num) && num > 0;
  };
  
  /**
   * Valida preço (deve ser maior que 0)
   * @param {number|string} price - Preço a ser validado
   * @returns {boolean} - True se válido
   */
  export const isValidPrice = (price) => {
    const num = parseFloat(price);
    return !isNaN(num) && num > 0;
  };
  
  /**
   * Valida formulário de contato
   * @param {object} formData - Dados do formulário
   * @returns {object} - Objeto com erros encontrados
   */
  export const validateContactForm = (formData) => {
    const errors = {};
    
    // Validar nome
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    // Validar email
    if (!formData.email) {
      errors.email = 'Email é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    // Validar telefone
    if (!formData.phone) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = 'Telefone inválido';
    }
    
    // Validar mensagem
    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    return errors;
  };
  
  /**
   * Valida formulário de orçamento
   * @param {object} formData - Dados do formulário
   * @returns {object} - Objeto com erros encontrados
   */
  export const validateBudgetForm = (formData) => {
    const errors = {};
    
    // Validar nome
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Nome é obrigatório';
    }
    
    // Validar telefone
    if (!formData.phone) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = 'Telefone inválido';
    }
    
    // Validar tipo de evento
    if (!formData.eventType) {
      errors.eventType = 'Tipo de evento é obrigatório';
    }
    
    // Validar data do evento
    if (!formData.eventDate) {
      errors.eventDate = 'Data do evento é obrigatória';
    } else if (!isValidFutureDate(formData.eventDate)) {
      errors.eventDate = 'Data deve ser futura';
    }
    
    // Validar número de convidados
    if (!formData.guests || !isValidQuantity(formData.guests)) {
      errors.guests = 'Número de convidados deve ser maior que 0';
    }
    
    // Validar descrição
    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = 'Descrição deve ter pelo menos 10 caracteres';
    }
    
    return errors;
  };
  
  /**
   * Valida dados do produto
   * @param {object} productData - Dados do produto
   * @returns {object} - Objeto com erros encontrados
   */
  export const validateProductData = (productData) => {
    const errors = {};
    
    // Validar nome
    if (!productData.name || productData.name.trim().length < 2) {
      errors.name = 'Nome do produto é obrigatório';
    }
    
    // Validar preço
    if (!productData.price || !isValidPrice(productData.price)) {
      errors.price = 'Preço deve ser maior que 0';
    }
    
    // Validar categoria
    if (!productData.category) {
      errors.category = 'Categoria é obrigatória';
    }
    
    // Validar descrição
    if (!productData.description || productData.description.trim().length < 10) {
      errors.description = 'Descrição deve ter pelo menos 10 caracteres';
    }
    
    return errors;
  };
  
  /**
   * Verifica se um objeto de erros está vazio
   * @param {object} errors - Objeto com erros
   * @returns {boolean} - True se não há erros
   */
  export const isFormValid = (errors) => {
    return Object.keys(errors).length === 0;
  };
  
  /**
   * Sanitiza string removendo caracteres especiais
   * @param {string} str - String a ser sanitizada
   * @returns {string} - String sanitizada
   */
  export const sanitizeString = (str) => {
    return str
      .trim()
      .replace(/[<>\"']/g, '')
      .substring(0, 500); // Limita a 500 caracteres
  };
  
  /**
   * Valida arquivo de imagem
   * @param {File} file - Arquivo a ser validado
   * @returns {object} - Resultado da validação
   */
  export const validateImageFile = (file) => {
    const result = { isValid: true, errors: [] };
    
    // Verificar se é um arquivo
    if (!file) {
      result.isValid = false;
      result.errors.push('Nenhum arquivo selecionado');
      return result;
    }
    
    // Verificar tipo do arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      result.isValid = false;
      result.errors.push('Apenas arquivos JPEG, PNG e GIF são permitidos');
    }
    
    // Verificar tamanho do arquivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
      result.isValid = false;
      result.errors.push('Arquivo deve ter no máximo 5MB');
    }
    
    return result;
  };