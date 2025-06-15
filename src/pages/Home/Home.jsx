import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../../components/Hero/Hero';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import ContactSection from '../../components/ContactSection/ContactSection';
import { useProducts } from '../../hooks/useProducts';
import { testimonials } from '../../data/testimonials';
import CountUp from 'react-countup';
import Atelie from '../../assets/images/atelie.jpg'
import { useInView } from 'react-intersection-observer';
import './Home.css';

const Home = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  // Filtrar produtos populares para a home, considerando a categoria selecionada
  const featuredProducts = useMemo(() => {
    let filtered = products.filter(product => product.isPopular);

    // Aplicar filtro de categoria se não for 'all'
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered.slice(0, 8);
  }, [products, selectedCategory]);

  const stats = [
    { number: 500, suffix: '+', label: 'Clientes Felizes', icon: '😊' },
    { number: 1000, suffix: '+', label: 'Produtos Criados', icon: '🎨' },
    { number: 12, suffix: '', label: 'Anos de Experiência', icon: '⭐' },
    { number: 100, suffix: '%', label: 'Personalizado', icon: '✨' }
  ];

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid" ref={ref}>
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">
                  {inView && (
                    <CountUp
                      end={stat.number}
                      duration={2.5}
                      separator="."
                      decimals={0}
                      useEasing={true}
                    />
                  )}
                  {stat.suffix}
                </div>
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
                Há mais de 12 anos, me dedico a transformar sonhos em peças únicas e personalizadas. Cada criação que sai do meu ateliê carrega cuidado, amor e atenção aos mínimos detalhes.
              
                Eu não vendo apenas produtos. Eu entrego memórias afetivas que fazem parte de momentos especiais na vida das pessoas.
              
                Sou especialista em velas personalizadas, topos de bolo, lembrancinhas e outras peças que deixam qualquer celebração ainda mais marcante.
              </p>
              <p>
                Minha missão é simples, mas poderosa: criar com o coração para que você viva momentos inesquecíveis. Aqui, cada pedido é tratado com exclusividade, respeito e o compromisso de entregar algo que realmente faça sentido para você.
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
              <div className="image-container">
                <img
                  src={Atelie}
                  alt="Ateliê Amanda Maia"
                  className="about-image-content"

                />
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