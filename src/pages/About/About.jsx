import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>Sobre o Ateliê Amanda Maia</h1>
            <p className="hero-subtitle">
              Transformando momentos especiais em memórias únicas há mais de 5 anos
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="our-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <img src="/images/amanda-working.jpg" alt="Amanda Maia trabalhando" />
            </div>
            <div className="story-content">
              <h2>Nossa História</h2>
              <p>
                O Ateliê Amanda Maia nasceu da paixão por criar peças únicas e especiais 
                para tornar cada celebração ainda mais memorável. Começamos em 2019 com 
                o sonho de personalizar festas e eventos com produtos artesanais de alta qualidade.
              </p>
              <p>
                Hoje, somos reconhecidos pela dedicação aos detalhes, pela qualidade dos 
                nossos produtos e pelo carinho com que tratamos cada cliente. Cada peça 
                é feita com amor e atenção especial.
              </p>
              <div className="story-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Clientes Satisfeitos</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Produtos Entregues</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Anos de Experiência</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="our-values">
        <div className="container">
          <h2>Nossos Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Qualidade</h3>
              <p>
                Utilizamos apenas materiais de primeira qualidade para garantir 
                que cada produto seja perfeito e durável.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Personalização</h3>
              <p>
                Cada cliente é único, por isso cada produto é pensado e criado 
                especialmente para atender suas necessidades.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">⏰</div>
              <h3>Pontualidade</h3>
              <p>
                Respeitamos prazos e nos comprometemos com a entrega no tempo 
                acordado, sempre com a qualidade esperada.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Criatividade</h3>
              <p>
                Estamos sempre inovando e criando novos designs para surpreender 
                e encantar nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Processo de Trabalho */}
      <section className="work-process">
        <div className="container">
          <h2>Como Trabalhamos</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Consulta Inicial</h3>
                <p>Conversamos sobre suas ideias e necessidades para entender exatamente o que você deseja.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Desenvolvimento</h3>
                <p>Criamos o design personalizado e enviamos para sua aprovação antes de iniciar a produção.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Produção</h3>
                <p>Cada peça é cuidadosamente produzida à mão com atenção aos mínimos detalhes.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Entrega</h3>
                <p>Embalamos com carinho e entregamos seu produto no prazo combinado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="testimonials-section">
        <div className="container">
          <h2>O que Nossos Clientes Dizem</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p>
                "Amanda é uma artista! A vela personalizada ficou perfeita e foi o 
                destaque da festa do meu filho. Super recomendo!"
              </p>
              <div className="testimonial-author">
                <strong>Maria Silva</strong>
                <span>Mãe do Gabriel</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p>
                "Os topos de bolo são lindos demais! Sempre compro aqui para os 
                aniversários da família. Qualidade excepcional!"
              </p>
              <div className="testimonial-author">
                <strong>Ana Santos</strong>
                <span>Cliente Fiel</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p>
                "Atendimento impecável e produtos únicos. A Amanda tem um talento 
                incrível para transformar ideias em realidade!"
              </p>
              <div className="testimonial-author">
                <strong>Carlos Oliveira</strong>
                <span>Pai da Sofia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para Criar Algo Especial?</h2>
            <p>Entre em contato e vamos transformar sua festa em um momento inesquecível!</p>
            <div className="cta-buttons">
              <a href="https://wa.me/5511999999999" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <span className="whatsapp-icon">📱</span>
                Falar no WhatsApp
              </a>
              <a href="/contact" className="btn btn-secondary">
                Ver Contatos
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;