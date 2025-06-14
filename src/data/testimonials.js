export const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      rating: 5,
      comment: "As velas ficaram perfeitas! Minha filha amou a festa de 5 anos dela. A Amanda é muito atenciosa e caprichosa nos detalhes.",
      product: "Vela Personalizada",
      date: "2024-01-15",
      image: "/images/testimonials/maria.jpg",
      verified: true
    },
    {
      id: 2,
      name: "João Santos",
      rating: 5,
      comment: "O topo de bolo ficou lindo! Superou minhas expectativas. Recomendo muito o trabalho da Amanda!",
      product: "Topo de Bolo Temático",
      date: "2024-01-10",
      image: "/images/testimonials/joao.jpg",
      verified: true
    },
    {
      id: 3,
      name: "Ana Costa",
      rating: 5,
      comment: "As lembrancinhas ficaram um charme! Todos os convidados elogiaram. Já encomendei para o próximo aniversário.",
      product: "Kit Lembrancinhas",
      date: "2023-12-28",
      image: "/images/testimonials/ana.jpg",
      verified: true
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      rating: 5,
      comment: "O Funko Pop personalizado ficou idêntico! Minha esposa ficou emocionada com o presente. Trabalho impecável!",
      product: "Funko Pop Personalizado",
      date: "2023-12-20",
      image: "/images/testimonials/carlos.jpg",
      verified: true
    },
    {
      id: 5,
      name: "Fernanda Lima",
      rating: 5,
      comment: "A família personalizada ficou uma gracinha! As crianças adoraram ver eles em miniatura. Muito criativo!",
      product: "Família Personalizada",
      date: "2023-12-15",
      image: "/images/testimonials/fernanda.jpg",
      verified: true
    },
    {
      id: 6,
      name: "Roberto Souza",
      rating: 5,
      comment: "Chaveiros de ótima qualidade! Entrega rápida e bem embalados. Vou comprar mais para dar de presente.",
      product: "Kit Chaveiros",
      date: "2023-12-10",
      image: "/images/testimonials/roberto.jpg",
      verified: true
    },
    {
      id: 7,
      name: "Juliana Martins",
      rating: 5,
      comment: "Atendimento excelente! A Amanda me ajudou a escolher os melhores produtos para a festa da minha filha. Tudo perfeito!",
      product: "Vários produtos",
      date: "2023-12-05",
      image: "/images/testimonials/juliana.jpg",
      verified: true
    },
    {
      id: 8,
      name: "Pedro Alves",
      rating: 5,
      comment: "Qualidade surpreendente! Os detalhes são impressionantes. Parabéns pelo trabalho artístico!",
      product: "Vela Especial Temática",
      date: "2023-11-30",
      image: "/images/testimonials/pedro.jpg",
      verified: true
    }
  ];
  
  // Função para obter depoimentos por rating
  export const getTestimonialsByRating = (minRating = 4) => {
    return testimonials.filter(testimonial => testimonial.rating >= minRating);
  };
  
  // Função para obter depoimentos recentes
  export const getRecentTestimonials = (limit = 4) => {
    return testimonials
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };
  
  // Função para obter depoimentos verificados
  export const getVerifiedTestimonials = () => {
    return testimonials.filter(testimonial => testimonial.verified);
  };
  
  // Função para calcular média de avaliações
  export const getAverageRating = () => {
    const total = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    return (total / testimonials.length).toFixed(1);
  };
  
  // Função para obter estatísticas de avaliações
  export const getRatingStats = () => {
    const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    testimonials.forEach(testimonial => {
      stats[testimonial.rating]++;
    });
    
    return {
      ...stats,
      total: testimonials.length,
      average: getAverageRating()
    };
  };