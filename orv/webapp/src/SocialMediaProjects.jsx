import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SocialMediaProjects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "ShadesOfU salon",
    duration: "8 months",
    work: "We handled the Insta page and edited the reels with shooting.",
    img: "/social1.jpeg",
    link: "https://www.instagram.com/shadesofu_?igsi=MTljaTR1Nndwa3Jkag==",
    overlayName: "ShadesOfU"
  },
  {
    id: 2,
    name: "Alankruthi house of designs",
    duration: "4 months",
    work: "We were handling the insta page shotting the clips and editing the reels.",
    img: "/social2.jpeg",
    link: "https://www.instagram.com/alankruthihouseofdesigns?igsi=MXdwbzdmc3EzOHA0bg==",
    overlayName: "Alankruthi"
  },
  {
    id: 3,
    name: "Mansi Personal Brand",
    duration: "10 months",
    work: "Shooting, editing and handling the insta page.",
    img: "/social3.jpeg",
    link: "https://www.instagram.com/mansiii_this_side28?igsi=bzdwczMxeTAwZ3U5",
    overlayName: "Mansi"
  },
  {
    id: 4,
    name: "Aman Personal Brand",
    duration: "9 months",
    work: "Shooting, editing and handling the insta page.",
    img: "/social4.jpeg",
    link: "https://www.instagram.com/_aman_1_._?igsi=MTV0c2FpMGRlYjAydw==",
    overlayName: "Aman"
  },
  {
    id: 5,
    name: "Smita Dwitiya Personal Brand",
    duration: "2 months",
    work: "Editing and handling the insta page.",
    img: "/social5.jpeg",
    link: "https://www.instagram.com/smita_dwitiya?igsi=bGdnZnhpMnQza3g3",
    overlayName: "Smita"
  }
];

export default function SocialMediaProjects() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.sp-project-section');
      
      sections.forEach((section, i) => {
        // Pin each section to create the sliding stack effect
        ScrollTrigger.create({
          trigger: section,
          start: "top top", 
          pin: true, 
          pinSpacing: false,
        });

        // Timeline for inner animations (Arrow + Info Cards)
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: i === 0 ? "top 80%" : "top 20%", // First triggers immediately, others wait until mostly slid up
            toggleActions: "play none none reverse"
          }
        });

        // 1. Draw the arrow
        tl.fromTo(section.querySelector('.sp-arrow path'), 
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", delay: i === 0 ? 0.5 : 0 }
        );

        // 2. Slide in the info items sequentially
        const infoItems = section.querySelectorAll('.sp-info-item');
        tl.fromTo(infoItems,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
          "-=0.5" // Start slightly before arrow finishes
        );
      });

      // Refresh ScrollTrigger after a small delay to allow images and DOM to settle
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      // Fade out the scroll indicator when reaching the last project
      if (sections.length > 0) {
        ScrollTrigger.create({
          trigger: sections[sections.length - 1],
          start: "top center",
          onEnter: () => gsap.to(".sp-scroll-indicator", { opacity: 0, duration: 0.3, pointerEvents: "none" }),
          onLeaveBack: () => gsap.to(".sp-scroll-indicator", { opacity: 1, duration: 0.3, pointerEvents: "auto" })
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="social-projects-page" ref={containerRef}>
      <div className="back-btn-container">
        <Link to="/" className="back-btn">
          <span>←</span> Back to Home
        </Link>
      </div>

      {/* Scroll Down Indicator */}
      <div className="sp-scroll-indicator">
        Scroll Down
        <span className="sp-scroll-arrow">↓</span>
      </div>

      {projects.map((proj, index) => (
        <section key={proj.id} className="sp-project-section" style={{ zIndex: index }}>
          <img src="/element.png" alt="Decorative Element" className="sp-top-right-element" />
          <div className="sp-content-wrapper">
            <div className="sp-left">
              <div className="iphone-frame-container">
                <img src="/iphones.png" alt="iPhone Frame" className="iphone-frame" />
                <div className="iphone-screen">
                  <img src={proj.img} alt={proj.name} />
                </div>
              </div>
            </div>
            
            <div className="sp-arrow-container">
              <svg className="sp-arrow" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 H 95 M 85 0 L 95 10 L 85 20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="sp-right">
              <div className="sp-info-card interactive-card">
                <div className="sp-info-item slide-in-1">
                  <div className="sp-info-header">
                    <svg className="sp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <div className="sp-info-label">Client</div>
                  </div>
                  <div className="sp-info-value">{proj.name}</div>
                </div>
                
                <div className="sp-info-item slide-in-2">
                  <div className="sp-info-header">
                    <svg className="sp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <div className="sp-info-label">Duration</div>
                  </div>
                  <div className="sp-info-value">{proj.duration}</div>
                </div>
                
                <div className="sp-info-item slide-in-3">
                  <div className="sp-info-header">
                    <svg className="sp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    <div className="sp-info-label">Our Work</div>
                  </div>
                  <div className="sp-info-value">{proj.work}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sp-phone-overlay">
            {index < 2 ? (
              <img src="/text_business.png" alt="Vertical Text" className="sp-left-text-element sp-text-business" />
            ) : (
              <img src="/text_influencer.png" alt="Vertical Text" className="sp-left-text-element sp-text-influencer" />
            )}
            <div className="sp-phone-overlay-content">
              <span className="sp-project-name">{proj.overlayName}</span>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="sp-explore-btn">
                Explore <span>→</span>
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
