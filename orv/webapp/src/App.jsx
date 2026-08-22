import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProjectsGallery from './ProjectsGallery';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsGallery />} />
    </Routes>
  );
}
