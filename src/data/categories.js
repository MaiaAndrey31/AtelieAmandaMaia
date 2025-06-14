export const categories = [
    {
      id: "all",
      name: "Todos os Produtos",
      icon: "🎨",
      color: "#FF6B9D",
      description: "Veja toda nossa coleção de produtos personalizados"
    },
    {
      id: "velas",
      name: "Velas Personalizadas",
      icon: "🕯️",
      color: "#FF6B9D",
      description: "Velas únicas com números e decorações especiais",
      featured: true
    },
    {
      id: "topos",
      name: "Topos de Bolo",
      icon: "🎂",
      color: "#8B5FBF",
      description: "Topos temáticos para deixar seu bolo ainda mais especial",
      featured: true
    },
    {
      id: "lembrancinhas",
      name: "Lembrancinhas",
      icon: "🎁",
      color: "#A8E6CF",
      description: "Lembrancinhas personalizadas para todos os tipos de festa",
      featured: true
    },
    {
      id: "familia",
      name: "Família Personalizada",
      icon: "👨‍👩‍👧‍👦",
      color: "#FFD700",
      description: "Miniaturas personalizadas da sua família",
      featured: false
    },
    {
      id: "funko",
      name: "Funko Pop",
      icon: "🎭",
      color: "#FF8E9B",
      description: "Funko Pop personalizados com suas características",
      featured: true
    },
    {
      id: "chaveiros",
      name: "Chaveiros",
      icon: "🔑",
      color: "#87CEEB",
      description: "Chaveiros personalizados para lembrança ou presente",
      featured: false
    }
  ];
  
  // Função para obter categoria por ID
  export const getCategoryById = (id) => {
    return categories.find(category => category.id === id);
  };
  
  // Função para obter categorias em destaque
  export const getFeaturedCategories = () => {
    return categories.filter(category => category.featured);
  };
  
  // Função para obter todas as categorias exceto "todos"
  export const getProductCategories = () => {
    return categories.filter(category => category.id !== "todos");
  };