import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import ProjectsGallery from './ProjectsGallery';
import SocialMediaProjects from './SocialMediaProjects';
import Footer from './Footer';

export default function App() {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsGallery />} />
        <Route path="/social-projects" element={<SocialMediaProjects />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}
