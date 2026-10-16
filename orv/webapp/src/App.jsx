import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Footer from './Footer';

const ProjectsGallery = lazy(() => import('./ProjectsGallery'));
const SocialMediaProjects = lazy(() => import('./SocialMediaProjects'));
const AppDevProjects = lazy(() => import('./AppDevProjects'));
const Contact = lazy(() => import('./Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const showFooter = location.pathname === '/' || location.pathname === '/contact';

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsGallery />} />
          <Route path="/social-projects" element={<SocialMediaProjects />} />
          <Route path="/app-projects" element={<AppDevProjects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      {showFooter && <Footer />}
    </>
  );
}
