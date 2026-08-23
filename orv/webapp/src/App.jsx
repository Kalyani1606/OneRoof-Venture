import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import ProjectsGallery from './ProjectsGallery';
import SocialMediaProjects from './SocialMediaProjects';
import AppDevProjects from './AppDevProjects';
import Contact from './Contact';
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
        <Route path="/app-projects" element={<AppDevProjects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}
