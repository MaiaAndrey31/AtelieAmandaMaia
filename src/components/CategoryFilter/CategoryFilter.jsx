import React, { useState } from 'react';
import { categories } from '../../data/categories';
import './CategoryFilter.css';

const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange, 
  productCounts = {},
  showCounts = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
    setIsOpen(false);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || 
    { name: 'Todas as Categorias', icon: '🎉' };

  return (
    <div className="category-filter">
      <div className="category-filter-header">
        <h3>Categorias</h3>
        <p>Encontre exatamente o que procura</p>
      </div>

      {/* Desktop Filter */}
      <div className="category-grid desktop-filter">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-info">
              <span className="category-name">{category.name}</span>
            </div>
            <div className="category-hover-effect"></div>
          </button>
        ))}
      </div>

      {/* Mobile Filter Dropdown */}
      <div className="mobile-filter">
        <button 
          className="mobile-filter-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="selected-category">
            <span className="selected-icon">{selectedCategoryData.icon}</span>
            <span className="selected-name">{selectedCategoryData.name}</span>
          </div>
          <i className={`fas fa-chevron-down ${isOpen ? 'rotated' : ''}`}></i>
        </button>

        <div className={`mobile-filter-dropdown ${isOpen ? 'open' : ''}`}>
          <div className="dropdown-content">
            <button
              className={`dropdown-item ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              <span className="item-icon">🎉</span>
              <div className="item-info">
                <span className="item-name">Todas as Categorias</span>
                {showCounts && (
                  <span className="item-count">
                    {Object.values(productCounts).reduce((sum, count) => sum + count, 0)} produtos
                  </span>
                )}
              </div>
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                className={`dropdown-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="item-icon">{category.icon}</span>
                <div className="item-info">
                  <span className="item-name">{category.name}</span>
                  {showCounts && (
                    <span className="item-count">
                      {productCounts[category.id] || 0} produtos
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;