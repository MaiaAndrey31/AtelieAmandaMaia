import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto
const ThemeContext = createContext();

// Hook personalizado para usar o contexto do tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Temas disponíveis
const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#FF6B9D',
      secondary: '#8B5FBF',
      accent: '#A8E6CF',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#2D3748',
      textSecondary: '#718096',
      border: '#E2E8F0',
      success: '#48BB78',
      warning: '#ED8936',
      error: '#F56565',
      info: '#4299E1'
    },
    gradients: {
      header: 'linear-gradient(135deg, #FF6B9D, #8B5FBF)',
      card: 'linear-gradient(145deg, #FFFFFF, #F8F9FA)',
      button: 'linear-gradient(135deg, #FF6B9D, #FF8E9B)',
      hero: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(139,95,191,0.1))'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#FF6B9D',
      secondary: '#8B5FBF',
      accent: '#A8E6CF',
      background: '#1A202C',
      surface: '#2D3748',
      text: '#F7FAFC',
      textSecondary: '#CBD5E0',
      border: '#4A5568',
      success: '#68D391',
      warning: '#F6AD55',
      error: '#FC8181',
      info: '#63B3ED'
    },
    gradients: {
      header: 'linear-gradient(135deg, #FF6B9D, #8B5FBF)',
      card: 'linear-gradient(145deg, #2D3748, #4A5568)',
      button: 'linear-gradient(135deg, #FF6B9D, #FF8E9B)',
      hero: 'linear-gradient(135deg, rgba(255,107,157,0.2), rgba(139,95,191,0.2))'
    }
  }
};

// Provider do contexto do tema
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [systemTheme, setSystemTheme] = useState('light');

  // Detecta o tema do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Define o tema inicial baseado no sistema
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Escuta mudanças no tema do sistema
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Carrega o tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Se não há tema salvo, usa o tema do sistema
      setCurrentTheme(systemTheme);
    }
  }, [systemTheme]);

  // Salva o tema no localStorage e aplica no documento
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    
    // Remove classes de tema anteriores
    document.documentElement.classList.remove('light', 'dark');
    
    // Adiciona a classe do tema atual
    document.documentElement.classList.add(currentTheme);
    
    // Define variáveis CSS customizadas
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });
  }, [currentTheme]);

  // Função para alternar tema
  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Função para definir tema específico
  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  // Função para usar tema do sistema
  const useSystemTheme = () => {
    setCurrentTheme(systemTheme);
    localStorage.removeItem('theme');
  };

  // Função para verificar se está usando tema escuro
  const isDark = () => {
    return currentTheme === 'dark';
  };

  // Função para obter cor específica do tema atual
  const getColor = (colorName) => {
    return themes[currentTheme]?.colors[colorName] || '#000000';
  };

  // Função para obter gradiente específico do tema atual
  const getGradient = (gradientName) => {
    return themes[currentTheme]?.gradients[gradientName] || 'linear-gradient(135deg, #FF6B9D, #8B5FBF)';
  };

  // Função para obter tema completo
  const getTheme = () => {
    return themes[currentTheme];
  };

  // Função para obter configurações de contraste
  const getContrastConfig = () => {
    return {
      textOnPrimary: currentTheme === 'dark' ? '#FFFFFF' : '#FFFFFF',
      textOnSecondary: currentTheme === 'dark' ? '#FFFFFF' : '#FFFFFF',
      textOnBackground: currentTheme === 'dark' ? '#F7FAFC' : '#2D3748',
      textOnSurface: currentTheme === 'dark' ? '#F7FAFC' : '#2D3748'
    };
  };

  // Valor do contexto
  const value = {
    // Estado atual
    currentTheme,
    systemTheme,
    theme: themes[currentTheme],
    isDark: isDark(),
    
    // Ações
    toggleTheme,
    setTheme,
    useSystemTheme,
    
    // Utilitários
    getColor,
    getGradient,
    getTheme,
    getContrastConfig,
    
    // Temas disponíveis
    availableThemes: Object.keys(themes),
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};