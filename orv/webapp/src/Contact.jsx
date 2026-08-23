import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);
  const laptop2Ref = useRef(null);
  const laptop3Ref = useRef(null);
  const contactLogoRef = useRef(null);
  const contactFormRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (contactRef.current) {
        let contactTl = gsap.timeline({
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top top",
            end: "+=1200",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          }
        });

        contactTl.to(laptop2Ref.current, { opacity: 0, duration: 1 }, 0)
                 .to(laptop3Ref.current, { opacity: 1, duration: 1 }, 0)
                 .to(contactLogoRef.current, { opacity: 0, duration: 1 }, 0)
                 .fromTo(contactFormRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1);
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="app-container" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Dynamic Animated Navbar */}
      <nav className="navbar scrolled">
        <div className="nav-side nav-left">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="OneRoofVentures Logo" style={{ height: '2.5rem', objectFit: 'contain' }} />
          </Link>
        </div>
        <div className="nav-center">
          <div className="links">
            <Link to="/">HOME</Link>
            <Link to="/#services">SERVICES</Link>
            <Link to="/#about">ABOUT</Link>
          </div>
        </div>
        <div className="nav-side nav-right">
          <div className="actions">
            <button className="btn-contact">Contact Us <span>→</span></button>
          </div>
        </div>
      </nav>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="contact-section" style={{ height: '100vh', width: '100vw', backgroundColor: '#fff', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
          
          {/* Laptop 2 (Angled) */}
          <img ref={laptop2Ref} src="/laptop2.png" alt="Contact Laptop Angled" style={{ width: '100%', height: 'auto', position: 'absolute', top: 0, left: 0, opacity: 1, zIndex: 1 }} />
          
          {/* Laptop 3 (Straight) */}
          <img ref={laptop3Ref} src="/laptop3.png" alt="Contact Laptop Straight" style={{ width: '100%', height: 'auto', position: 'relative', opacity: 0, zIndex: 2 }} />
          
          {/* Logo on Laptop 2 */}
          <div ref={contactLogoRef} style={{ 
            position: 'absolute', 
            top: '22%', 
            left: '15%', 
            width: '46%', 
            height: '63.5%',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 3,
            transform: 'perspective(1200px) rotateY(25deg) rotateX(2deg) rotateZ(0deg)',
            transformOrigin: 'center center'
          }}>
            <img src="/logo.png" alt="OneRoofVentures Logo" style={{ width: '45%', objectFit: 'contain' }} />
          </div>

          {/* Form on Laptop 3 */}
          <div ref={contactFormRef} style={{
            position: 'absolute',
            top: '19.5%', 
            left: '26.8%',
            width: '38.5%',
            height: '49%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'perspective(1000px) rotateY(12deg) rotateX(2deg) rotateZ(-1deg)',
            transformOrigin: 'center center',
            zIndex: 4, 
            opacity: 0 
          }}>
            <h2 style={{ fontSize: '1.8vw', marginBottom: '1vw', color: '#111', fontWeight: 600 }}>Talk to us</h2>
            <form style={{ width: '85%', display: 'flex', flexDirection: 'column', gap: '0.8vw' }}>
              <input type="text" placeholder="Your Name" style={{ padding: '0.6vw', border: 'none', borderBottom: '1px solid #111', width: '100%', fontSize: '0.9vw', backgroundColor: 'transparent', outline: 'none' }} />
              <input type="email" placeholder="Email Address" style={{ padding: '0.6vw', border: 'none', borderBottom: '1px solid #111', width: '100%', fontSize: '0.9vw', backgroundColor: 'transparent', outline: 'none' }} />
              <textarea placeholder="Tell us about your website needs..." rows="2" style={{ padding: '0.6vw', border: 'none', borderBottom: '1px solid #111', width: '100%', resize: 'none', fontSize: '0.9vw', backgroundColor: 'transparent', outline: 'none' }}></textarea>
              <button type="button" className="btn-primary" style={{ width: '100%', padding: '0.8vw', fontSize: '0.9vw', borderRadius: '4px', marginTop: '1vw' }}>Submit</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
