import React, { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '../../utils/constants';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon, HandHeartIcon, StarIcon, TruckIcon } from '@phosphor-icons/react';
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
      window.open(`https://wa.me/5511975578672?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20produtos%20personalizados.`, '_blank');
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
                </div>

                {/* Features */}
                <div className="hero-features">
                  <div className="feature">
                    <StarIcon size={32} color="white" />

                    <span>Produtos Exclusivos</span>
                  </div>
                  <div className="feature">
                    <TruckIcon size={32} color="white" />


                    <span>Entrega Rápida</span>
                  </div>
                  <div className="feature">
                    <HandHeartIcon size={32} color="white" />

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
        <ArrowCircleLeftIcon size={40} />


      </button>
      <button className="hero-nav next" onClick={nextSlide}>
        <ArrowCircleRightIcon size={40} />


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