import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SocialMediaProjects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "ShadesOfU Salon",
    duration: "8 Months",
    work: "Managed the brand’s Instagram presence through content planning, on-site reel shooting, and professional video editing. We focused on creating engaging beauty and salon content that strengthened the brand’s online presence and audience engagement.",
    img: "/social1.jpeg",
    link: "https://www.instagram.com/shadesofu_?igsi=MTljaTR1Nndwa3Jkag==",
    overlayName: "ShadesOfU"
  },
  {
    id: 2,
    name: "Alankruthi House of Designs",
    duration: "4 Months",
    work: "Handled Instagram content creation, including on-site shooting and reel editing. We created visually engaging fashion and bridal content that showcased the brand’s designs, collections, and overall aesthetic while maintaining a consistent social media presence.",
    img: "/social2.jpeg",
    link: "https://www.instagram.com/alankruthihouseofdesigns?igsi=MXdwbzdmc3EzOHA0bg==",
    overlayName: "Alankruthi"
  },
  {
    id: 3,
    name: "Mansi Personal Brand",
    duration: "10 Months",
    work: "Managed the Instagram page from content creation to shooting and editing. We developed engaging personal-brand content designed to showcase Mansi’s personality, ideas, and expertise while building a consistent and recognizable digital presence.",
    img: "/social3.jpeg",
    link: "https://www.instagram.com/mansiii_this_side28?igsi=bzdwczMxeTAwZ3U5",
    overlayName: "Mansi"
  },
  {
    id: 4,
    name: "Aman Personal Brand",
    duration: "9 Months",
    work: "Managed the complete Instagram content workflow, including content planning, shooting, editing, and page management. The focus was on creating engaging, informative, and personality-driven content to strengthen the brand’s online identity and audience reach.",
    img: "/social4.jpeg",
    link: "https://www.instagram.com/_aman_1_._?igsi=MTV0c2FpMGRlYjAydw==",
    overlayName: "Aman"
  },
  {
    id: 5,
    name: "Smita Dwitiya Personal Brand",
    duration: "2 Months",
    work: "Managed and edited Instagram content with a focus on creating visually appealing and engaging reels. We helped maintain a consistent content style while highlighting Smita’s personality, lifestyle, and beauty-focused content.",
    img: "/social5.jpeg",
    link: "https://www.instagram.com/smita_dwitiya?igsi=bGdnZnhpMnQza3g3",
    overlayName: "Smita"
  }
];

export default function SocialMediaProjects() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    let mm = gsap.matchMedia(containerRef);
    const sections = gsap.utils.toArray('.sp-project-section');

    // Desktop: Sliding Stack Effect
    mm.add("(min-width: 769px)", () => {
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
            start: i === 0 ? "top 80%" : "top 20%",
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
          "-=0.5"
        );
      });
    });

    // Mobile: Smooth scroll-driven reveal for phone and info
    mm.add("(max-width: 768px)", () => {
      sections.forEach((section) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "center 48%",
            scrub: 1,
          }
        });

        const iphoneFrame = section.querySelector('.iphone-frame-container');
        const projectName = section.querySelector('.sp-project-name');
        const infoCard = section.querySelector('.sp-info-card');
        const exploreBtn = section.querySelector('.sp-explore-btn');

        if (iphoneFrame) {
          tl.fromTo(iphoneFrame,
            { opacity: 0.25, y: 50, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
          );
        }

        if (projectName) {
          tl.fromTo(projectName,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.4"
          );
        }

        if (infoCard) {
          tl.fromTo(infoCard,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
        }

        if (exploreBtn) {
          tl.fromTo(exploreBtn,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
            "-=0.2"
          );
        }
      });
    });

    // Fade out the scroll indicator when reaching the last project
    if (sections.length > 0) {
      ScrollTrigger.create({
        trigger: sections[sections.length - 1],
        start: "top center",
        onEnter: () => gsap.to(".sp-scroll-indicator", { opacity: 0, duration: 0.3, pointerEvents: "none" }),
        onLeaveBack: () => gsap.to(".sp-scroll-indicator", { opacity: 1, duration: 0.3, pointerEvents: "auto" })
      });
    }

    // Refresh ScrollTrigger after a small delay to allow images and DOM to settle
    const timerId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timerId);
      mm.revert();
    };
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
          <img src="/element.png" alt="Decorative Element" className="sp-top-right-element" decoding="async" loading="lazy" />
          <div className="sp-content-wrapper">
            <div className="sp-left">
              <div className="iphone-frame-container">
                <img src="/iphones.png" alt="iPhone Frame" className="iphone-frame" decoding="async" />
                <div className="iphone-screen">
                  <img src={proj.img} alt={proj.name} decoding="async" loading={index === 0 ? "eager" : "lazy"} />
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
