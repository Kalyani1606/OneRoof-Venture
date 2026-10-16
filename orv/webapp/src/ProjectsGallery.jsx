import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './ProjectsGallery.css';
import gurukripaImg from './assets/gurukripa.png';
import petgoImg from './assets/petgo.png';
import naturalskinImg from './assets/naturalskin.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "Gurukripa\nConstruction",
    subtitle: "Construction Company",
    url: "https://gurukripaconstruction.in/",
    image: gurukripaImg,
    tag: "Completed"
  },
  {
    id: 2,
    name: "Petgo",
    subtitle: "College Project",
    url: "https://pet-go.onrender.com/",
    image: petgoImg,
    tag: "Completed"
  },
  {
    id: 3,
    name: "NaturalSkin",
    subtitle: "College Project",
    url: "https://natural-skin.onrender.com/",
    image: naturalskinImg,
    tag: "Completed"
  }
];

export default function ProjectsGallery() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Ensure the page starts at the top when navigating from another route
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".project-panel");
      
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top", 
          pin: true, 
          pinSpacing: false
        });
      });

      // Fade out the scroll indicator when reaching the last project
      if (panels.length > 0) {
        ScrollTrigger.create({
          trigger: panels[panels.length - 1],
          start: "top center",
          onEnter: () => gsap.to(".pg-scroll-indicator", { opacity: 0, duration: 0.3, pointerEvents: "none" }),
          onLeaveBack: () => gsap.to(".pg-scroll-indicator", { opacity: 1, duration: 0.3, pointerEvents: "auto" })
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="projects-container">
      {/* Back button */}
      <Link to="/" className="back-btn">
        <span>←</span> Back to Home
      </Link>

      {/* Scroll Down Indicator */}
      <div className="pg-scroll-indicator">
        Scroll Down
        <span className="pg-scroll-arrow">↓</span>
      </div>

      {projects.map((project, index) => (
        <section key={project.id} className="project-panel" style={{ zIndex: index }}>
          {/* Background full screen image with blur overlay */}
          <div className="project-bg">
            <img 
              src={project.image} 
              alt={project.name} 
              className="bg-full-image" 
              decoding="async" 
              loading={index === 0 ? "eager" : "lazy"} 
            />
            <div className="bg-blur-layer"></div>
          </div>
          
          <div className="project-content">
            <div className="project-card">
              {project.tag && <div className="project-tag">{project.tag}</div>}
              <h1 className="project-brand-small">
                {project.name.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
              <a href={project.url} className="explore-btn-small">
                Explore <span className="arrow-box">→</span>
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
