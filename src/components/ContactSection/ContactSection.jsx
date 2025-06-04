import React, { useState } from 'react';
import { validateEmail, validatePhone } from '../../utils/validators';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }

    if (!formData.service) {
      newErrors.service = 'Selecione um serviço';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Format WhatsApp message
      const message = `🎨 *Novo Contato - Ateliê Amanda Maia*\n\n` +
        `👤 *Nome:* ${formData.name}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📱 *Telefone:* ${formData.phone}\n` +
        `🎯 *Serviço:* ${formData.service}\n\n` +
        `💬 *Mensagem:*\n${formData.message}\n\n` +
        `Enviado através do site! 🌟`;

      const whatsappUrl = `https://wa.me/5518999999999?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: ''
      });

      alert('Mensagem enviada com sucesso! Você será redirecionado para o WhatsApp.');
    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Velas Personalizadas',
    'Topos de Bolo',
    'Lembrancinhas',
    'Família Personalizada',
    'Funko Pop',
    'Chaveiros',
    'Orçamento Personalizado'
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-header">
          <h2>Vamos conversar?</h2>
          <p>Entre em contato e vamos criar algo especial juntos!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">📱</div>
              <h3>WhatsApp</h3>
              <p>Atendimento rápido e personalizado</p>
              <a 
                href="https://wa.me/5518999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                (18) 99999-9999
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <p>Para orçamentos e dúvidas</p>
              <a 
                href="mailto:contato@atelieamandamaia.com"
                className="contact-link"
              >
                contato@atelieamandamaia.com
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Localização</h3>
              <p>Atendemos toda a região</p>
              <span className="contact-link">
                Adamantina - SP
              </span>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📸</div>
              <h3>Instagram</h3>
              <p>Acompanhe nossos trabalhos</p>
              <a 
                href="https://instagram.com/atelieamandamaia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                @atelieamandamaia
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Seu nome completo"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="(18) 99999-9999"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">Serviço de Interesse *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={errors.service ? 'error' : ''}
                >
                  <option value="">Selecione um serviço</option>
                  {services.map(service => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && <span className="error-message">{errors.service}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Conte-nos sobre seu projeto, data do evento, quantidade, cores preferidas, etc."
                  rows="5"
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Enviando...
                  </>
                ) : (
                  <>
                    📱 Enviar pelo WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-features">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Resposta em até 2 horas</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span>Orçamento personalizado</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚚</span>
            <span>Entrega para toda região</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💳</span>
            <span>Pagamento facilitado</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;