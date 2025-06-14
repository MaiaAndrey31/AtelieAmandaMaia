import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '../components/Loading/Loading';

// Lazy load das páginas
const Home = lazy(() => import('../pages/Home/Home'));
const Products = lazy(() => import('../pages/Products/Products'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Gallery = lazy(() => import('../pages/Gallery/Gallery'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Página Inicial */}
        <Route path="/" element={<Home />} />
        
        {/* Páginas Principais */}
        <Route path="/produtos" element={<Products />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/galeria" element={<Gallery />} />
        
        {/* Rota 404 - Página não encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
