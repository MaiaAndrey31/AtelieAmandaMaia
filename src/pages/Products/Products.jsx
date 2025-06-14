import React, { useState, useMemo } from 'react';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { useProducts } from '../../hooks/useProducts';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  
  // Usar o hook useProducts com os filtros atuais
  const { 
    products, 
    loading, 
    error, 
    setSelectedCategory: setCategory,
    setSearchTerm: setSearch,
    setSortBy: setSort
  } = useProducts();
  
  // Atualizar a categoria no hook useProducts quando ela mudar
  React.useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory, setCategory]);
  
  // Atualizar a busca no hook useProducts quando ela mudar
  React.useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm, setSearch]);
  
  // Atualizar a ordenação no hook useProducts quando ela mudar
  React.useEffect(() => {
    setSort(sortBy);
  }, [sortBy, setSort]);

  // A filtragem e ordenação já são feitas no hook useProducts
  // Apenas aplicamos o filtro de preço aqui
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
  }, [products, priceRange]);
  
  // Usamos diretamente os produtos filtrados, pois a ordenação já foi aplicada no hook
  const sortedProducts = filteredProducts;

  // Estatísticas dos produtos
  const productStats = {
    total: products.length,
    filtered: sortedProducts.length,
    categories: [...new Set(products.map(p => p.category))].length,
    priceRange: {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    }
  };

  // Resetar filtros
  const resetFilters = () => {
    setSelectedCategory('all');
    setSortBy('name');
    setSearchTerm('');
    setPriceRange({ min: 0, max: 1000 });
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner large"></div>
            <h2>Carregando produtos...</h2>
            <p>Aguarde enquanto buscamos os melhores produtos para você</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Ops! Algo deu errado</h2>
            <p>Não foi possível carregar os produtos: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <div className="header-content">
            <h1>Nossos Produtos</h1>
            <p>Descubra produtos únicos e personalizados para sua festa especial</p>
            <div className="products-stats">
              <div className="stat">
                <span className="stat-number">{productStats.filtered}</span>
                <span className="stat-label">produtos encontrados</span>
              </div>
              <div className="stat">
                <span className="stat-number">{productStats.categories}</span>
                <span className="stat-label">categorias</span>
              </div>
              <div className="stat">
                <span className="stat-number">R$ {productStats.priceRange.min.toFixed(0)} - R$ {productStats.priceRange.max.toFixed(0)}</span>
                <span className="stat-label">faixa de preço</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="products-controls">
          <div className="search-section">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="filters-section">
            <button 
              className="filters-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>Filtros</span>
              <span className={`arrow ${showFilters ? 'up' : 'down'}`}>▼</span>
            </button>

            <div className={`filters-content ${showFilters ? 'open' : ''}`}>
              <div className="filter-group">
                <label>Ordenar por:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="name">Nome (A-Z)</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="popular">Mais Popular</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Faixa de Preço:</label>
                <div className="price-range">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="price-input"
                  />
                  <span>até</span>
                  <input
                    type="number"
                    placeholder="Máx"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="price-input"
                  />
                </div>
              </div>

              <button onClick={resetFilters} className="reset-filters">
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results Info */}
        {(searchTerm || selectedCategory !== 'all' || priceRange.min > 0 || priceRange.max < 1000) && (
          <div className="results-info">
            <p>
              {sortedProducts.length === 0 
                ? 'Nenhum produto encontrado com os filtros aplicados'
                : `${sortedProducts.length} produto${sortedProducts.length > 1 ? 's' : ''} encontrado${sortedProducts.length > 1 ? 's' : ''}`
              }
            </p>
            {sortedProducts.length === 0 && (
              <div className="no-results-suggestions">
                <h3>Dicas para encontrar produtos:</h3>
                <ul>
                  <li>Verifique a ortografia dos termos de busca</li>
                  <li>Tente termos mais gerais</li>
                  <li>Ajuste a faixa de preço</li>
                  <li>Selecione uma categoria diferente</li>
                </ul>
                <button onClick={resetFilters} className="btn-secondary">
                  Ver Todos os Produtos
                </button>
              </div>
            )}
          </div>
        )}

        {/* Products Grid */}
        {sortedProducts.length > 0 && (
          <ProductGrid 
            products={sortedProducts}
            selectedCategory={selectedCategory}
            showPagination={true}
          />
        )}

        {/* Call to Action */}
        <div className="products-cta">
          <div className="cta-content">
            <h2>Não encontrou o que procura?</h2>
            <p>
              Criamos produtos personalizados sob medida para sua necessidade. 
              Entre em contato e vamos criar algo único para você!
            </p>
            <div className="cta-buttons">
              <a href="/contato" className="btn-primary">
                Solicitar Orçamento
              </a>
              <a 
                href="https://wa.me/5518999999999?text=Olá! Gostaria de um produto personalizado." 
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;