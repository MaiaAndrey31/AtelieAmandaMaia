import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './ProductGrid.css';



const ProductGrid = ({ 
  products = [], 
  selectedCategory = 'all',
  searchQuery = '',
  sortBy = 'name',
  loading = false,
  onProductSelect,
  showPagination = true,
  itemsPerPage = 12
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animationClass, setAnimationClass] = useState('');

  // Filtrar e ordenar produtos
  const filteredAndSortedProducts = useMemo(() => {
    // A filtragem por categoria já foi feita no hook useProducts
    // Apenas aplicamos a busca e ordenação aqui
    let filtered = [...products];

    // Filtrar por busca (se houver)
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.features && product.features.some(feature => 
          feature.toLowerCase().includes(query)
        ))
      );
    }

    // Ordenar produtos
    const sortedProducts = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        default:
          return 0;
      }
    });

    return sortedProducts;
  }, [products, searchQuery, sortBy]); // Removido selectedCategory das dependências

  // Paginação
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = showPagination 
    ? filteredAndSortedProducts.slice(startIndex, endIndex)
    : filteredAndSortedProducts;

  // Reset página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
    setAnimationClass('fade-in');
    const timer = setTimeout(() => setAnimationClass(''), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortBy]);

  // Scroll para o topo quando página mudar
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setAnimationClass('fade-in');
    setTimeout(() => setAnimationClass(''), 300);
  };

  const renderPagination = () => {
    if (!showPagination || totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botão anterior
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn pagination-arrow"
          aria-label="Página anterior"
        >
          ←
        </button>
      );
    }

    // Primeira página
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-btn"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    // Páginas visíveis
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="pagination-ellipsis">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-btn"
        >
          {totalPages}
        </button>
      );
    }

    // Botão próximo
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn pagination-arrow"
          aria-label="Próxima página"
        >
          →
        </button>
      );
    }

    return (
      <div className="pagination-container">
        <div className="pagination-info">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} de {filteredAndSortedProducts.length} produtos
        </div>
        <div className="pagination">
          {pages}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="product-grid-loading">
        <LoadingSpinner />
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="no-products">
        <div className="no-products-icon">🔍</div>
        <h3>Nenhum produto encontrado</h3>
        <p>
          {searchQuery 
            ? `Não encontramos produtos para "${searchQuery}"`
            : selectedCategory !== 'all'
            ? 'Não há produtos nesta categoria'
            : 'Nenhum produto disponível'
          }
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-btn"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="products-header">
        <div className="products-count">
          {filteredAndSortedProducts.length} produto{filteredAndSortedProducts.length !== 1 ? 's' : ''} encontrado{filteredAndSortedProducts.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className={`product-grid ${animationClass}`}>
        {currentProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="product-grid-item"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <ProductCard 
              product={product}
              onSelect={onProductSelect}
              showQuickView={true}
            />
          </div>
        ))}
      </div>

      {renderPagination()}
    </div>
  );
};

export default ProductGrid;