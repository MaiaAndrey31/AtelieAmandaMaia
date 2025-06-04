import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredImages, setFilteredImages] = useState([]);

  // Mock data para a galeria
  const galleryImages = [
    {
      id: 1,
      src: '/images/gallery/vela-1.jpg',
      alt: 'Vela personalizada tema Frozen',
      category: 'velas',
      title: 'Vela Frozen',
      description: 'Vela personalizada com tema Frozen para aniversário de 5 anos'
    },
    {
      id: 2,
      src: '/images/gallery/vela-2.jpg', 
      alt: 'Vela personalizada tema Super-heróis',
      category: 'velas',
      title: 'Vela Super-heróis',
      description: 'Vela com tema de super-heróis para festa de menino'
    },
    {
      id: 3,
      src: '/images/gallery/topo-1.jpg',
      alt: 'Topo de bolo Princesas',
      category: 'topos',
      title: 'Topo Princesas',
      description: 'Topo de bolo temático das Princesas Disney'
    },
    {
      id: 4,
      src: '/images/gallery/topo-2.jpg',
      alt: 'Topo de bolo Unicórnio',
      category: 'topos',
      title: 'Topo Unicórnio',
      description: 'Topo de bolo com tema unicórnio em tons pastéis'
    },
    {
      id: 5,
      src: '/images/gallery/lembrancinha-1.jpg',
      alt: 'Lembrancinhas personalizadas',
      category: 'lembrancinhas',
      title: 'Lembrancinhas Safari',
      description: 'Conjunto de lembrancinhas com tema safari'
    },
    {
      id: 6,
      src: '/images/gallery/lembrancinha-2.jpg',
      alt: 'Lembrancinhas tema Festa Junina',
      category: 'lembrancinhas',
      title: 'Lembrancinhas Junina',
      description: 'Lembrancinhas temáticas para festa junina'
    },
    {
      id: 7,
      src: '/images/gallery/familia-1.jpg',
      alt: 'Família personalizada',
      category: 'familia',
      title: 'Família Personalizada',
      description: 'Bonequinhos representando toda a família'
    },
    {
      id: 8,
      src: '/images/gallery/familia-2.jpg',
      alt: 'Família com pets',
      category: 'familia',
      title: 'Família com Pets',
      description: 'Família personalizada incluindo os pets'
    },
    {
      id: 9,
      src: '/images/gallery/funko-1.jpg',
      alt: 'Funko Pop personalizado',
      category: 'funko',
      title: 'Funko Pop Personalizado',
      description: 'Funko Pop customizado com características únicas'
    },
    {
      id: 10,
      src: '/images/gallery/funko-2.jpg',
      alt: 'Casal de Funko Pop',
      category: 'funko',
      title: 'Casal Funko Pop',
      description: 'Casal de noivos em versão Funko Pop'
    },
    {
      id: 11,
      src: '/images/gallery/chaveiro-1.jpg',
      alt: 'Chaveiros personalizados',
      category: 'chaveiros',
      title: 'Chaveiros Personalizados',
      description: 'Chaveiros com nomes e desenhos personalizados'
    },
    {
      id: 12,
      src: '/images/gallery/chaveiro-2.jpg',
      alt: 'Chaveiros tema profissões',
      category: 'chaveiros',
      title: 'Chaveiros Profissões',
      description: 'Chaveiros temáticos representando diferentes profissões'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os Trabalhos', icon: '🎨' },
    { id: 'velas', name: 'Velas Personalizadas', icon: '🕯️' },
    { id: 'topos', name: 'Topos de Bolo', icon: '🎂' },
    { id: 'lembrancinhas', name: 'Lembrancinhas', icon: '🎁' },
    { id: 'familia', name: 'Família Personalizada', icon: '👨‍👩‍👧‍👦' },
    { id: 'funko', name: 'Funko Pop', icon: '🎭' },
    { id: 'chaveiros', name: 'Chaveiros', icon: '🗝️' }
  ];

  useEffect(() => {
    // Simular loading
    setIsLoading(true);
    setTimeout(() => {
      if (selectedCategory === 'all') {
        setFilteredImages(galleryImages);
      } else {
        setFilteredImages(galleryImages.filter(img => img.category === selectedCategory));
      }
      setIsLoading(false);
    }, 500);
  }, [selectedCategory]);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <div className="gallery-hero-content">
            <h1>Galeria de Trabalhos</h1>
            <p>Confira alguns dos nossos trabalhos mais especiais e se inspire para sua próxima festa!</p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-filters">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                <span className="filter-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          {isLoading ? (
            <div className="gallery-loading">
              <LoadingSpinner />
              <p>Carregando trabalhos...</p>
            </div>
          ) : (
            <>
              <div className="gallery-stats">
                <p>
                  Mostrando <strong>{filteredImages.length}</strong> {filteredImages.length === 1 ? 'trabalho' : 'trabalhos'}
                  {selectedCategory !== 'all' && (
                    <span> da categoria <strong>{categories.find(cat => cat.id === selectedCategory)?.name}</strong></span>
                  )}
                </p>
              </div>
              
              <div className="gallery-grid">
                {filteredImages.map(image => (
                  <div 
                    key={image.id} 
                    className="gallery-item"
                    onClick={() => openModal(image)}
                  >
                    <div className="image-container">
                      <img src={image.src} alt={image.alt} loading="lazy" />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <h3>{image.title}</h3>
                          <p>{image.description}</p>
                          <span className="view-btn">Ver Detalhes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="gallery-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Gostou do Nosso Trabalho?</h2>
            <p>Entre em contato e vamos criar algo especial para sua festa também!</p>
            <div className="cta-buttons">
              <a href="https://wa.me/5511999999999" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <span className="whatsapp-icon">📱</span>
                Fazer Orçamento
              </a>
              <a href="/contact" className="btn btn-secondary">
                Ver Contatos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <button className="modal-nav modal-prev" onClick={prevImage}>
              ‹
            </button>
            <button className="modal-nav modal-next" onClick={nextImage}>
              ›
            </button>
            
            <div className="modal-image-container">
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
            
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <div className="modal-actions">
                <a 
                  href={`https://wa.me/5511999999999?text=Olá! Vi o trabalho "${selectedImage.title}" na galeria e gostaria de fazer um orçamento similar.`}
                  className="btn btn-primary btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero Igual
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;