import React, { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '../../utils/constants';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Sua festa começa aqui!",
      subtitle: "Transforme momentos especiais em memórias únicas",
      description: "Velas personalizadas, topos de bolo e lembrancinhas exclusivas para tornar sua celebração inesquecível.",
      image: "/assets/images/hero-bg.jpg",
      cta: "Ver Catálogo"
    },
    {
      title: "Criações Exclusivas",
      subtitle: "Cada peça é única, assim como seu momento",
      description: "Desenvolvemos produtos personalizados com todo carinho e atenção aos detalhes que você merece.",
      image: "/assets/images/hero-bg-2.jpg",
      cta: "Fazer Orçamento"
    },
    {
      title: "Qualidade Garantida",
      subtitle: "Materiais de primeira e acabamento perfeito",
      description: "Utilizamos apenas os melhores materiais para garantir que sua festa tenha o brilho que merece.",
      image: "/assets/images/hero-bg-3.jpg",
      cta: "Conhecer Produtos"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleCTAClick = (index) => {
    if (index === 1) {
      // Fazer Orçamento - WhatsApp
      const message = encodeURIComponent('Olá! Gostaria de fazer um orçamento para produtos personalizados.');
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    } else {
      // Ver Catálogo/Conhecer Produtos - Scroll to products
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  {slide.title}
                  <span className="title-accent">✨</span>
                </h1>
                <h2 className="hero-subtitle">{slide.subtitle}</h2>
                <p className="hero-description">{slide.description}</p>
                
                <div className="hero-actions">
                  <button 
                    className="cta-button primary"
                    onClick={() => handleCTAClick(index)}
                  >
                    {slide.cta}
                    <i className="fas fa-arrow-right"></i>
                  </button>
                  
                  <button 
                    className="cta-button secondary"
                    onClick={() => {
                      const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos.');
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
                    }}
                  >
                    <i className="fab fa-whatsapp"></i>
                    Falar Conosco
                  </button>
                </div>

                {/* Features */}
                <div className="hero-features">
                  <div className="feature">
                    <i className="fas fa-star"></i>
                    <span>Produtos Exclusivos</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-shipping-fast"></i>
                    <span>Entrega Rápida</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-heart"></i>
                    <span>Feito com Amor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button className="hero-nav prev" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="hero-nav next" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element star">⭐</div>
        <div className="floating-element heart">💖</div>
        <div className="floating-element sparkle">✨</div>
        <div className="floating-element cake">🎂</div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Role para ver mais</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;