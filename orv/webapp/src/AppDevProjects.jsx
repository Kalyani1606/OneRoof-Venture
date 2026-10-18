import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './AppDevProjects.css';

export default function AppDevProjects() {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const linePathRef = useRef(null);
  const dotRef = useRef(null);
  const badgeRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({ delay: 0.2 });
      
      // Animate phone popping in
      tl.fromTo(phoneRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
        
      // Animate the line drawing
      tl.fromTo(linePathRef.current, { strokeDasharray: 400, strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, "-=0.3")
      
      // Pop in the dot
      tl.fromTo(dotRef.current, { scale: 0, opacity: 0, transformOrigin: "center" }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" })
      
      // Pop in the badge
      tl.fromTo(badgeRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="app-dev-page" ref={containerRef}>
      {/* Back Button */}
      <div className="ad-back-btn-container">
        <Link to="/" className="ad-back-btn">
          <span>←</span> Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="app-dev-content-wrapper">
        <div className="center-phone-container" ref={phoneRef}>
          {/* Phone Frame matching Social Media */}
          <div className="ad-iphone-frame-container">
            <img src="/iphones.png" alt="iPhone Frame" className="ad-iphone-frame" />
            <div className="ad-iphone-screen">
              <img src="/app.jpeg" alt="App Preview" />
            </div>
          </div>

          {/* SVG Line & Badge connecting to the phone */}
          <div className="coming-soon-connection">
            <svg width="250" height="150" viewBox="0 0 250 150" className="connection-svg">
              <path ref={linePathRef} d="M 0 75 L 120 75 L 150 20 L 220 20" fill="transparent" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle ref={dotRef} cx="220" cy="20" r="6" fill="#111" />
            </svg>
            <div ref={badgeRef} className="coming-soon-badge">
              COMING SOON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
