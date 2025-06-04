import { useState, useEffect, useMemo } from 'react';
import { products } from '../data/products';
import { categories } from '../data/categories';

export function useProducts() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);

  // Filtrar produtos baseado na categoria e termo de busca
  const filterProducts = useMemo(() => {
    let filtered = [...products];
    
    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filtrar por termo de busca
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchLower)
        )
      );
    }
    
    // Ordenar produtos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
          return b.isPopular - a.isPopular;
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  // Atualizar produtos filtrados
  useEffect(() => {
    setIsLoading(true);
    
    // Simular delay de loading
    const timer = setTimeout(() => {
      setFilteredProducts(filterProducts);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filterProducts]);

  // Função para buscar produto por ID
  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  // Função para obter produtos populares
  const getPopularProducts = (limit = 6) => {
    return products
      .filter(product => product.isPopular)
      .slice(0, limit);
  };

  // Função para obter produtos por categoria
  const getProductsByCategory = (categoryId, limit = null) => {
    const categoryProducts = products.filter(product => product.category === categoryId);
    return limit ? categoryProducts.slice(0, limit) : categoryProducts;
  };

  // Função para obter produtos relacionados
  const getRelatedProducts = (productId, limit = 4) => {
    const currentProduct = getProductById(productId);
    if (!currentProduct) return [];
    
    return products
      .filter(product => 
        product.id !== productId && 
        product.category === currentProduct.category
      )
      .slice(0, limit);
  };

  return {
    // Estados
    products: filteredProducts,
    allProducts: products,
    categories,
    selectedCategory,
    searchTerm,
    sortBy,
    isLoading,
    
    // Setters
    setSelectedCategory,
    setSearchTerm,
    setSortBy,
    
    // Funções utilitárias
    getProductById,
    getPopularProducts,
    getProductsByCategory,
    getRelatedProducts,
    
    // Estatísticas
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    categoriesCount: categories.length
  };
}

export default useProducts;