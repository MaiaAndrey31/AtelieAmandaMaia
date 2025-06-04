import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    product: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Criar mensagem do WhatsApp
    const whatsappMessage = `
🎉 *Nova Solicitação de Orçamento*

👤 *Nome:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Telefone:* ${formData.phone}
🎯 *Produto de Interesse:* ${formData.product}
💰 *Orçamento:* ${formData.budget}

📝 *Mensagem:*
${formData.message}

---
_Enviado através do site do Ateliê Amanda Maia_
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/5511999999999?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      product: '',
      budget: ''
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Entre em Contato</h1>
            <p>Vamos criar algo especial juntos! Entre em contato para fazer seu orçamento.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Formulário de Contato */}
            <div className="contact-form-section">
              <h2>Solicite seu Orçamento</h2>
              <p>Preencha o formulário abaixo e receba uma proposta personalizada via WhatsApp.</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nome Completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">WhatsApp *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product">Produto de Interesse</label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione um produto</option>
                      <option value="Velas Personalizadas">Velas Personalizadas</option>
                      <option value="Topos de Bolo">Topos de Bolo</option>
                      <option value="Lembrancinhas">Lembrancinhas</option>
                      <option value="Família Personalizada">Família Personalizada</option>
                      <option value="Funko Pop">Funko Pop</option>
                      <option value="Chaveiros">Chaveiros</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Orçamento Aproximado</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione uma faixa</option>
                    <option value="Até R$ 100">Até R$ 100</option>
                    <option value="R$ 100 - R$ 200">R$ 100 - R$ 200</option>
                    <option value="R$ 200 - R$ 500">R$ 200 - R$ 500</option>
                    <option value="R$ 500 - R$ 1000">R$ 500 - R$ 1000</option>
                    <option value="Acima de R$ 1000">Acima de R$ 1000</option>
                    <option value="A combinar">A combinar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Descreva seu Projeto *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Conte-nos sobre sua festa, tema, quantidade de produtos, prazo desejado e qualquer detalhe importante..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : '📱 Enviar Orçamento via WhatsApp'}
                </button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div className="contact-info-section">
              <h2>Informações de Contato</h2>
              
              <div className="contact-info-cards">
                <div className="info-card">
                  <div className="info-icon">📱</div>
                  <div className="info-content">
                    <h3>WhatsApp</h3>
                    <p>(11) 99999-9999</p>
                    <a 
                      href="https://wa.me/5511999999999" 
                      className="info-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enviar mensagem
                    </a>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <h3>E-mail</h3>
                    <p>contato@atelieamandamaia.com</p>
                    <a 
                      href="mailto:contato@atelieamandamaia.com" 
                      className="info-link"
                    >
                      Enviar e-mail
                    </a>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <h3>Localização</h3>
                    <p>São Paulo - SP</p>
                    <p className="info-detail">Atendimento em toda Grande SP</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📷</div>
                  <div className="info-content">
                    <h3>Instagram</h3>
                    <p>@atelieamandamaia</p>
                    <a 
                      href="https://instagram.com/atelieamandamaia" 
                      className="info-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Seguir no Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* Horário de Funcionamento */}
              <div className="business-hours">
                <h3>Horário de Atendimento</h3>
                <div className="hours-list">
                  <div className="hour-item">
                    <span>Segunda à Sexta</span>
                    <span>9h às 18h</span>
                  </div>
                  <div className="hour-item">
                    <span>Sábado</span>
                    <span>9h às 14h</span>
                  </div>
                  <div className="hour-item">
                    <span>Domingo</span>
                    <span>Fechado</span>
                  </div>
                </div>
              </div>

              {/* Informações Importantes */}
              <div className="important-info">
                <h3>Informações Importantes</h3>
                <ul>
                  <li>⏰ Prazo mínimo: 7 dias úteis</li>
                  <li>💳 Aceitamos PIX, cartão e transferência</li>
                  <li>🚚 Entregamos em toda Grande São Paulo</li>
                  <li>✨ Todos os produtos são personalizados</li>
                  <li>📋 Orçamentos válidos por 15 dias</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Qual o prazo mínimo para produção?</h3>
              <p>O prazo mínimo é de 7 dias úteis para produtos simples. Para peças mais elaboradas, o prazo pode ser maior. Sempre confirmamos o prazo antes de iniciar o projeto.</p>
            </div>
            <div className="faq-item">
              <h3>Vocês fazem entrega?</h3>
              <p>Sim! Fazemos entregas em toda a Grande São Paulo. O valor da entrega varia conforme a localização e será informado no orçamento.</p>
            </div>
            <div className="faq-item">
              <h3>Como funciona o pagamento?</h3>
              <p>Aceitamos PIX (com desconto), cartão de crédito, débito e transferência bancária. Para pedidos acima de R$ 200, oferecemos parcelamento.</p>
            </div>
            <div className="faq-item">
              <h3>Posso fazer alterações após aprovar o projeto?</h3>
              <p>Pequenas alterações podem ser feitas antes do início da produção. Após iniciada, alterações podem gerar custos adicionais.</p>
            </div>
            <div className="faq-item">
              <h3>Vocês têm produtos prontos?</h3>
              <p>Todos os nossos produtos são personalizados e feitos sob encomenda. Isso garante que cada peça seja única e especial para sua festa.</p>
            </div>
            <div className="faq-item">
              <h3>E se eu não gostar do resultado final?</h3>
              <p>Trabalhamos com aprovação prévia do projeto. Caso haja algum problema na execução, faremos todos os ajustes necessários sem custo adicional.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;