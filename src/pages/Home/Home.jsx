import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import ContactSection from '../../components/ContactSection/ContactSection';
import { useProducts } from '../../hooks/useProducts';
import { testimonials } from '../../data/testimonials';
import './Home.css';

const Home = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Rotação automática dos depoimentos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filtrar produtos populares para a home
  const featuredProducts = products.filter(product => product.isPopular).slice(0, 8);

  const stats = [
    { number: '500+', label: 'Clientes Felizes', icon: '😊' },
    { number: '1000+', label: 'Produtos Criados', icon: '🎨' },
    { number: '3', label: 'Anos de Experiência', icon: '⭐' },
    { number: '100%', label: 'Personalizado', icon: '✨' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Sobre o Ateliê Amanda Maia</h2>
              <p>
                Com mais de 3 anos de experiência, nosso ateliê se dedica a criar 
                produtos únicos e personalizados para tornar sua festa ainda mais especial. 
                Cada peça é cuidadosamente desenvolvida com amor e atenção aos detalhes.
              </p>
              <p>
                Especializamos em velas personalizadas, topos de bolo, lembrancinhas 
                e muito mais. Nossa missão é transformar seus sonhos em realidade, 
                criando memórias que durarão para sempre.
              </p>
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">🎨</span>
                  <span>100% Personalizado</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">⚡</span>
                  <span>Entrega Rápida</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">💝</span>
                  <span>Feito com Amor</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span className="placeholder-icon">🎭</span>
                <p>Foto do Ateliê</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Produtos em Destaque</h2>
            <p>Conheça alguns dos nossos produtos mais populares</p>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Carregando produtos...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>Erro ao carregar produtos: {error}</p>
            </div>
          ) : (
            <ProductGrid 
              products={featuredProducts}
              selectedCategory={selectedCategory}
              showPagination={false}
            />
          )}

          <div className="view-all-products">
            <a href="/produtos" className="btn-primary">
              Ver Todos os Produtos
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>O que nossos clientes dizem</h2>
            <p>Depoimentos de quem já confiou em nosso trabalho</p>
          </div>

          <div className="testimonials-carousel">
            <div className="testimonial-card active">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p>{testimonials[currentTestimonial].text}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonials[currentTestimonial].name}</h4>
                    <span>{testimonials[currentTestimonial].event}</span>
                  </div>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>Como Funciona</h2>
            <p>Seu pedido personalizado em 4 passos simples</p>
          </div>

          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Contato</h3>
                <p>Entre em contato conosco via WhatsApp ou formulário</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Orçamento</h3>
                <p>Receba um orçamento personalizado em até 24h</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Produção</h3>
                <p>Criamos seu produto com todo cuidado e atenção</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Entrega</h3>
                <p>Produto pronto e entregue no prazo combinado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Home;