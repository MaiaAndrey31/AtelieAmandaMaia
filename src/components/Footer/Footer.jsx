import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Ateliê Amanda Maia</h3>
              <p>Transformando momentos especiais em lembranças únicas</p>
            </div>
            <div className="social-links">
              <a 
                href="https://wa.me/5518999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link whatsapp"
              >
                📱
              </a>
              <a 
                href="https://instagram.com/atelieamandamaia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                📸
              </a>
              <a 
                href="mailto:contato@atelieamandamaia.com"
                className="social-link email"
              >
                📧
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Produtos</h4>
            <ul className="footer-links">
              <li><a href="#products">Velas Personalizadas</a></li>
              <li><a href="#products">Topos de Bolo</a></li>
              <li><a href="#products">Lembrancinhas</a></li>
              <li><a href="#products">Família Personalizada</a></li>
              <li><a href="#products">Funko Pop</a></li>
              <li><a href="#products">Chaveiros</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Atendimento</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contato</a></li>
              <li><a href="#about">Sobre Nós</a></li>
              <li><a href="#gallery">Galeria</a></li>
              <li><a href="#testimonials">Depoimentos</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Informações</h4>
            <div className="footer-info">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <span>Adamantina - SP</span>
              </div>
              <div className="info-item">
                <span className="info-icon">⏰</span>
                <span>Seg à Sex: 8h às 18h</span>
              </div>
              <div className="info-item">
                <span className="info-icon">📱</span>
                <span>(18) 99999-9999</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-policies">
          <div className="policy-section">
            <h5>💳 Formas de Pagamento</h5>
            <p>PIX • Cartão de Crédito • Débito • Transferência</p>
            <small>10% desconto no PIX</small>
          </div>
          
          <div className="policy-section">
            <h5>🚚 Entrega</h5>
            <p>Entrega local gratuita • Correios para todo Brasil</p>
            <small>Consulte prazos e valores</small>
          </div>
          
          <div className="policy-section">
            <h5>⏱️ Produção</h5>
            <p>Prazo padrão: 3 a 5 dias úteis</p>
            <small>Urgências sob consulta</small>
          </div>
        </div>

        <div className="footer-features">
          <div className="feature-badge">
            <span className="badge-icon">🎨</span>
            <span>100% Personalizado</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">✨</span>
            <span>Qualidade Premium</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">💝</span>
            <span>Feito com Amor</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">🤝</span>
            <span>Atendimento Exclusivo</span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} Ateliê Amanda Maia. Todos os direitos reservados.</p>
            <p>Desenvolvido com 💖 para criar momentos especiais</p>
          </div>
          
          <div className="footer-legal">
            <a href="#privacy">Política de Privacidade</a>
            <span className="separator">•</span>
            <a href="#terms">Termos de Uso</a>
            <span className="separator">•</span>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;