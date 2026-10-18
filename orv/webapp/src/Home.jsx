import React, { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import Navbar from './Navbar';
import gurukripaImg from './assets/gurukripa.png';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ROW_1 = [1, 2].flatMap(() => [
  { type: 'icon', icon: '🧠', bg: 'bg-green', text: 'AI Engine' },
  { type: 'image', src: '/tech_showcase_1.jpg' },
  { type: 'icon', icon: '⚡', bg: 'bg-orange', text: 'Smart CRM' },
  { type: 'image', src: '/tech_showcase_2.png' },
  { type: 'icon', icon: '📊', bg: 'bg-blue', text: 'Analytics' },
  { type: 'image', src: '/tech_showcase_3.png' },
  { type: 'icon', icon: '🔒', bg: 'bg-purple', text: 'Cloud Shield' },
  { type: 'image', src: '/hero_device.png' },
  { type: 'icon', icon: '🤖', bg: 'bg-teal', text: 'Automation' },
  { type: 'image', src: '/tech_showcase_5.jpg' },
  { type: 'icon', icon: '🌐', bg: 'bg-indigo', text: 'PropTech' },
  { type: 'image', src: '/tech_showcase_6.jpg' },
]);

const MARQUEE_ROW_2 = [1, 2].flatMap(() => [
  { type: 'icon', icon: '📱', bg: 'bg-blue', text: 'Mobile Apps' },
  { type: 'image', src: '/tech_showcase_6.jpg' },
  { type: 'icon', icon: '📈', bg: 'bg-emerald', text: 'Metrics Hub' },
  { type: 'image', src: '/tech_showcase_5.jpg' },
  { type: 'icon', icon: '🚀', bg: 'bg-purple', text: 'DevOps' },
  { type: 'image', src: '/hero_device.png' },
  { type: 'icon', icon: '⚙️', bg: 'bg-orange', text: 'API Gateway' },
  { type: 'image', src: '/tech_showcase_2.png' },
  { type: 'icon', icon: '💡', bg: 'bg-green', text: 'User Insights' },
  { type: 'image', src: '/tech_showcase_1.jpg' },
  { type: 'icon', icon: '💾', bg: 'bg-teal', text: 'Data Pipeline' },
  { type: 'image', src: '/tech_showcase_3.png' },
]);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const appDevSectionRef = useRef(null);
  const leftCloudRef = useRef(null);
  const leftCloudRef2 = useRef(null);
  const leftTextCloudRef = useRef(null);
  const rightCloudRef = useRef(null);
  const rightCloudRef2 = useRef(null);
  const rightQrCloudRef = useRef(null);
  const centerCloudRef = useRef(null);
  const centerCloudRef2 = useRef(null);
  const centerPhoneRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightQrRef = useRef(null);
  const linePathRef = useRef(null);
  const lineDotRef = useRef(null);
  const viewBtnRef = useRef(null);
  const socialSectionRef = useRef(null);
  const socialFemaleRef = useRef(null);
  const socialTextRef1 = useRef(null);
  const socialTextRef2 = useRef(null);
  const socialViewBtnRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    let ticking = false;
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          if (currentScroll <= 40) {
            setIsScrolled(false);
            lastScroll = currentScroll;
          } else {
            const diff = currentScroll - lastScroll;
            if (diff > 30) {
              // Scrolled down significantly
              setIsScrolled(true);
              lastScroll = currentScroll;
            } else if (diff < -30) {
              // Scrolled up significantly
              setIsScrolled(false);
              lastScroll = currentScroll;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    let mm = gsap.matchMedia(containerRef);

    // Desktop Animations (>= 769px)
    mm.add("(min-width: 769px)", () => {
      // Pin the hero text and animate scale/fade
      gsap.to(textContainerRef.current, {
        scale: 0.6,
        opacity: 0,
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 140px",
          endTrigger: heroRef.current,
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        }
      });

      // App Development Cloud Parting ScrollTrigger (Pinned Reveal)
      if (appDevSectionRef.current) {
        let appTl = gsap.timeline({
          scrollTrigger: {
            trigger: appDevSectionRef.current,
            start: "top 10%",
            end: "+=800",
            scrub: 1.5,
            pin: true,
            pinSpacing: true,
          }
        });

        // 1. Initial State: Dense White Cloud Blanket, phone/text already in place underneath
        appTl.set(leftCloudRef.current, { xPercent: 40, yPercent: -10, scale: 1.6, opacity: 1 })
          .set(leftCloudRef2.current, { xPercent: 30, yPercent: 15, scale: 1.7, opacity: 1 })
          .set(leftTextCloudRef.current, { xPercent: 15, yPercent: -5, scale: 1.8, opacity: 1 })
          .set(rightCloudRef.current, { xPercent: -40, yPercent: -10, scale: 1.6, opacity: 1 })
          .set(rightCloudRef2.current, { xPercent: -30, yPercent: 15, scale: 1.7, opacity: 1 })
          .set(rightQrCloudRef.current, { xPercent: -15, yPercent: -5, scale: 1.8, opacity: 1 })
          .set(centerCloudRef.current, { xPercent: 0, yPercent: -10, scale: 2.5, opacity: 1 })
          .set(centerCloudRef2.current, { xPercent: 0, yPercent: 15, scale: 2.5, opacity: 1 })
          // Set initial state for phone (hidden, below) and text (static)
          .set(centerPhoneRef.current, { y: 240, scale: 0.75, opacity: 0 })
          .set(leftTextRef.current, { x: 0, opacity: 1 })
          .set(rightQrRef.current, { x: 0, opacity: 1 })

          // Set initial state for connected button animation
          .set(linePathRef.current, { strokeDasharray: 200, strokeDashoffset: 200 })
          .set(lineDotRef.current, { opacity: 0 })
          .set(viewBtnRef.current, { xPercent: -50, y: 20, opacity: 0 })

          // 2. Parting Scroll Phase: Clouds split left & right to reveal static content
          .to(leftCloudRef.current, { xPercent: -75, yPercent: -10, scale: 1.1, opacity: 0.95, duration: 0.65, ease: "power2.inOut" }, 0)
          .to(leftCloudRef2.current, { xPercent: -85, yPercent: 10, scale: 1.05, opacity: 0.9, duration: 0.65, ease: "power2.inOut" }, 0)
          .to(leftTextCloudRef.current, { xPercent: -95, yPercent: -5, scale: 1.0, opacity: 0.85, duration: 0.65, ease: "power2.inOut" }, 0)

          .to(rightCloudRef.current, { xPercent: 75, yPercent: -10, scale: 1.1, opacity: 0.95, duration: 0.65, ease: "power2.inOut" }, 0)
          .to(rightCloudRef2.current, { xPercent: 85, yPercent: 10, scale: 1.05, opacity: 0.9, duration: 0.65, ease: "power2.inOut" }, 0)
          .to(rightQrCloudRef.current, { xPercent: 95, yPercent: -5, scale: 1.0, opacity: 0.85, duration: 0.65, ease: "power2.inOut" }, 0)

          .to(centerCloudRef.current, { xPercent: -120, yPercent: -10, scale: 1.5, opacity: 0.5, duration: 0.65, ease: "power2.inOut" }, 0)
          .to(centerCloudRef2.current, { xPercent: 120, yPercent: 10, scale: 1.5, opacity: 0.5, duration: 0.65, ease: "power2.inOut" }, 0)

          // Animate phone up
          .to(centerPhoneRef.current, { y: -50, scale: 1.0, opacity: 1, duration: 0.58, ease: "back.out(1.1)" }, 0.07)

          // Animate the connected line tracing out, then dot, then button pop
          .to(linePathRef.current, { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" }, "-=0.1")
          .to(lineDotRef.current, { opacity: 1, duration: 0.2 }, "-=0.1")
          .to(viewBtnRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, "-=0.1")

          // 3. Final State: Clouds remain anchored
          .to({}, { duration: 0.2 });
      }

      // 03. Social Media ScrollTrigger
      if (socialSectionRef.current) {
        let socialTl = gsap.timeline({
          scrollTrigger: {
            trigger: socialSectionRef.current,
            start: "top 20%",
            end: "+=600",
            scrub: 1.5,
            pin: true,
            pinSpacing: true,
          }
        });

        socialTl.set(socialFemaleRef.current, { y: 50 })
          .set(socialTextRef2.current, { opacity: 0, scale: 0.8 })
          .set(socialTextRef1.current, { opacity: 0, scale: 0.9 })
          .set(socialViewBtnRef.current, { opacity: 0, y: 20 })

          // Container moves up
          .to(socialFemaleRef.current, { y: 0, duration: 1, ease: "power2.out" })
          // Image fades in first
          .to(socialTextRef2.current, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "<")
          // Text fades in next
          .to(socialTextRef1.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, ">")
          // Button comes last
          .to(socialViewBtnRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.1")
          .to({}, { duration: 0.2 });
      }
    });

    // Mobile Animations (<= 768px)
    mm.add("(max-width: 768px)", () => {
      // Gentle hero text fade without locking/pinning
      gsap.to(textContainerRef.current, {
        opacity: 0.15,
        y: -40,
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 100px",
          end: "bottom 60px",
          scrub: true,
        }
      });

      // App Development Cloud Parting on Mobile (Smooth natural scroll)
      if (appDevSectionRef.current) {
        let appTlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: appDevSectionRef.current,
            start: "top 75%",
            end: "center 40%",
            scrub: 1.2,
          }
        });

        appTlMobile.set(leftCloudRef.current, { xPercent: 30, opacity: 1 })
          .set(rightCloudRef.current, { xPercent: -30, opacity: 1 })
          .set(centerCloudRef.current, { scale: 1.8, opacity: 1 })
          .set(centerCloudRef2.current, { scale: 1.8, opacity: 1 })
          .set(centerPhoneRef.current, { y: 50, opacity: 0 })
          .to(leftCloudRef.current, { xPercent: -100, opacity: 0.4, duration: 1 }, 0)
          .to(rightCloudRef.current, { xPercent: 100, opacity: 0.4, duration: 1 }, 0)
          .to(centerCloudRef.current, { xPercent: -120, opacity: 0, duration: 1 }, 0)
          .to(centerCloudRef2.current, { xPercent: 120, opacity: 0, duration: 1 }, 0)
          .to(centerPhoneRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.2);
      }

      // Social Media Section on Mobile
      if (socialSectionRef.current) {
        let socialTlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: socialSectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        });

        socialTlMobile.fromTo(socialTextRef2.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" })
          .fromTo(socialTextRef1.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
          .fromTo(socialViewBtnRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="app-container">
      {/* Responsive Animated Navbar */}
      <Navbar isScrolled={isScrolled} />

      <section ref={heroRef} className="hero-section">
        <div className="hero-text-wrapper" style={{ minHeight: '350px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="hero-content" ref={textContainerRef}>
            <div className="users-badge">
              <div className="avatars">
                <div className="avatar-circle" style={{ background: '#ff7b72' }}></div>
                <div className="avatar-circle" style={{ background: '#79c0ff', marginLeft: '-10px' }}></div>
                <div className="avatar-circle" style={{ background: '#d2a8ff', marginLeft: '-10px' }}></div>
              </div>
              <span>Trusted by 10+ Brands</span>
            </div>

            <h1 className="hero-title">Elevate Your Brand</h1>

            <p className="hero-subtitle">
              We craft high-performance websites, scalable mobile apps, and data-driven
              social media strategies to scale your digital presence and drive real growth.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>View Our Services <span>→</span></button>
              <Link to="/contact" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Start a Project</Link>
            </div>
          </div>
        </div>

        <img src="/home1.png" alt="Digital Agency Showcase" className="house-img" fetchPriority="high" />
        <img src="/clouds.png" alt="Clouds" className="clouds-img" fetchPriority="high" />
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="services-section">
        <div className="services-header">
          <h2 className="services-main-title">Our Services</h2>
          <p className="services-two-lines-subtitle">
            Elevating your brand with expert social media management,
            high-performance web development, and custom app solutions.
          </p>
        </div>

        {/* 01. Web Application Showcase matching reference screenshot */}
        <div className="service-showcase-container web-app-showcase">
          <div className="service-tagline-badge">
            <span>01</span> WEB DEVELOPMENT
          </div>

          <div className="showcase-layered-wrapper">
            {/* Background Marquee Rows moving in opposite directions */}
            <div
              className="horizontal-marquee-background"
              onMouseEnter={(e) => {
                const tracks = e.currentTarget.querySelectorAll('.track-left-to-right, .track-right-to-left');
                tracks.forEach(track => {
                  track.getAnimations().forEach(a => a.playbackRate = 0.2);
                });
              }}
              onMouseLeave={(e) => {
                const tracks = e.currentTarget.querySelectorAll('.track-left-to-right, .track-right-to-left');
                tracks.forEach(track => {
                  track.getAnimations().forEach(a => a.playbackRate = 1);
                });
              }}
            >
              {/* Line 1: Moves Left to Right */}
              <div className="horizontal-marquee-row">
                <div className="marquee-track-horizontal track-left-to-right">
                  {MARQUEE_ROW_1.map((card, idx) => (
                    card.type === 'icon' ? (
                      <div key={idx} className="floating-card-item icon-card shadow-soft">
                        <div className={`icon-circle ${card.bg}`}>{card.icon}</div>
                        <span className="card-title-text">{card.text}</span>
                      </div>
                    ) : (
                      <div key={idx} className="floating-card-item image-card shadow-soft">
                        <img src={card.src} alt={`Showcase ${idx}`} loading="lazy" decoding="async" />
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Line 2: Moves Right to Left (Opposite Direction!) */}
              <div className="horizontal-marquee-row">
                <div className="marquee-track-horizontal track-right-to-left">
                  {MARQUEE_ROW_2.map((card, idx) => (
                    card.type === 'icon' ? (
                      <div key={idx} className="floating-card-item icon-card shadow-soft">
                        <div className={`icon-circle ${card.bg}`}>{card.icon}</div>
                        <span className="card-title-text">{card.text}</span>
                      </div>
                    ) : (
                      <div key={idx} className="floating-card-item image-card shadow-soft">
                        <img src={card.src} alt={`Showcase ${idx}`} loading="lazy" decoding="async" />
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Center Laptop Mockup */}
            <div className="laptop-wrapper">
              <div className="laptop-outer-frame">
                {/* Laptop Notch Bar */}
                <div className="laptop-notch-bar">
                  <div className="mac-notch"></div>
                </div>

                <div className="laptop-screen" style={{ position: 'relative', padding: 0, overflow: 'hidden', backgroundColor: '#111' }}>
                  <img
                    src={gurukripaImg}
                    alt="Web Development Portfolio"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', bottom: '2rem', left: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Link to="/projects" className="btn-primary" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.3)', textDecoration: 'none' }}>
                      View All Projects <span>→</span>
                    </Link>
                  </div>
                </div>

                {/* Laptop Hinge Base */}
                <div className="laptop-hinge-base">
                  <div className="laptop-hinge-notch"></div>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* 02. App Development Showcase matching reference video app develpment.mp4 */}
        <div ref={appDevSectionRef} className="service-showcase-container app-dev-showcase" style={{ paddingBottom: '0', minHeight: '100vh' }}>
          <div className="service-tagline-badge">
            <span>02</span> APP DEVELOPMENT
          </div>

          <div className="app-dev-viewport">
            {/* 7 Cloud Overlays using clean user cloud PNG (realistic-white-cloud-free-png-removebg-preview.png) multiplied across all layers */}
            <div ref={leftCloudRef} className="cloud-overlay cloud-left cloud-layer-1">
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud 1 Left Overlay" />
            </div>
            <div ref={leftCloudRef2} className="cloud-overlay cloud-left cloud-layer-2">
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud 3 Left Overlay" />
            </div>
            <div ref={leftTextCloudRef} className="cloud-overlay cloud-left cloud-layer-3">
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud Left Text Cover" />
            </div>

            <div ref={rightCloudRef} className="cloud-overlay cloud-right cloud-layer-1">
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud 2 Right Overlay" />
            </div>
            <div ref={rightCloudRef2} className="cloud-overlay cloud-right cloud-layer-2">
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud 4 Right Overlay" />
            </div>
            <div ref={rightQrCloudRef} className="cloud-overlay cloud-right cloud-layer-3">
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud Right QR Cover" />
            </div>

            {/* Bottom cloud removed as requested */}

            <div ref={centerCloudRef} className="cloud-overlay cloud-layer-1" style={{ left: '15%', width: '70%', height: '140%', zIndex: 37 }}>
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud Center 1" />
            </div>
            <div ref={centerCloudRef2} className="cloud-overlay cloud-layer-2" style={{ left: '15%', width: '70%', height: '130%', zIndex: 38 }}>
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud Center 2" />
            </div>

            {/* Left Content Column */}
            <div ref={leftTextRef} className="app-dev-col col-left-text">
              <h3 className="app-title">High-Performance<br />Mobile Experiences</h3>
              <p className="app-subtitle">
                We craft intuitive, scalable native and cross-platform apps designed to engage users and elevate your brand.
              </p>
              <div className="app-download-btns">
                <button className="btn-app-store shadow-soft">
                  <span className="btn-apple-logo"></span> iOS Native Development
                </button>
                <button className="btn-play-store shadow-soft">
                  <span className="btn-android-logo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
                      <path d="M17.523 15.3414L16.2736 13.1772L18.4379 11.9278L17.523 15.3414ZM1.75 3.5L12 13.75L22.25 3.5H1.75ZM3.5 1.75L13.75 12L22.25 3.5V1.75H3.5Z" />
                    </svg>
                  </span> Android & Cross-Platform
                </button>
              </div>
            </div>

            {/* Center iPhone Smartphone Mockup matching reference image */}
            <div ref={centerPhoneRef} className="iphone-wrapper" style={{ position: 'relative' }}>
              <img src="/hand_phone.png" alt="Phone App Showcase" style={{ width: '100%', maxWidth: '680px', height: 'auto', display: 'block', objectFit: 'contain', position: 'relative', zIndex: 10 }} />

              {/* SVG Connected Line and Button */}
              <div className="view-projects-animation" style={{ position: 'absolute', top: '22%', right: '18%', zIndex: 20 }}>
                <svg width="200" height="100" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                  <path ref={linePathRef} d="M 0 0 L 140 0 L 140 -60" fill="transparent" stroke="#111" strokeWidth="2.5" />
                  <circle ref={lineDotRef} cx="140" cy="-60" r="5" fill="#111" />
                </svg>
                <div ref={viewBtnRef} style={{ position: 'absolute', top: '-115px', left: '140px' }}>
                  <Link to="/app-projects" className="view-projects-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>View All Projects</Link>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-180px', left: '-20%', width: '140%', zIndex: 20, pointerEvents: 'none', opacity: 0.95, filter: 'blur(1px)' }}>
                <img src="/realistic-white-cloud-free-png.webp" alt="Cloud masking hand edge" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>

            {/* Right Features Column */}
            <div ref={rightQrRef} className="app-dev-col col-right-qr">
              <h4 className="qr-title">End-to-End<br />App Solutions</h4>
              <div className="feature-list-box shadow-soft" style={{
                background: '#ffffff',
                border: '1px solid #edf0f4',
                borderRadius: '24px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                width: '100%',
                alignItems: 'flex-end'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'flex-end', width: '100%' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111' }}>UI/UX Design & Strategy</span>
                  <div className="check-dot" style={{ backgroundColor: '#ea580c' }}>✓</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'flex-end', width: '100%' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111' }}>Native & Cross-Platform</span>
                  <div className="check-dot" style={{ backgroundColor: '#ea580c' }}>✓</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'flex-end', width: '100%' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111' }}>Custom Backend & APIs</span>
                  <div className="check-dot" style={{ backgroundColor: '#ea580c' }}>✓</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'flex-end', width: '100%' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111' }}>Seamless App Store Launch</span>
                  <div className="check-dot" style={{ backgroundColor: '#ea580c' }}>✓</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Pill at bottom right */}
          <Link to="/contact" className="floating-get-free-pill" style={{ textDecoration: 'none' }}>
            Start Your Project <span>→</span>
          </Link>
        </div>

        {/* 03. Social Media Showcase */}
        <div ref={socialSectionRef} className="service-showcase-container social-media-showcase" style={{ backgroundColor: '#bd5319', padding: '4rem 1rem', width: '100%', maxWidth: 'none', margin: '0', minHeight: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="service-tagline-badge">
            <span>03</span> SOCIAL MEDIA
          </div>
          <div className="social-media-viewport" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '1rem', flex: 1, position: 'relative' }}>
            {/* Animated Group (Text + Image) */}
            <div ref={socialFemaleRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {/* Foreground Text */}
              <div ref={socialTextRef1} style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', fontSize: 'clamp(3.5rem, 14vw, 8.5rem)', fontWeight: 300, lineHeight: 0.9, zIndex: 2, letterSpacing: '-0.02em', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                <div>SOCIAL</div>
                <div>MEDIA</div>
              </div>

              {/* Centered Girl Image */}
              <div ref={socialTextRef2} style={{ height: 'clamp(280px, 46vh, 580px)', maxHeight: '600px', marginTop: '0', marginBottom: '1rem', zIndex: 1, position: 'relative' }}>
                <img src="/socialfemale.png" alt="Social Female" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>

            <div className="social-view-btn-container" ref={socialViewBtnRef} style={{ marginTop: '1rem' }}>
              <Link to="/social-projects" className="view-projects-btn" style={{ background: '#fff', color: '#bd5319', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', fontSize: '1rem', borderRadius: '50px', fontWeight: 600, textDecoration: 'none' }}>
                View All Projects <span style={{ background: '#bd5319', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section has been moved to Contact.jsx */}

      <section className="about-us-normal" ref={aboutRef} id="about">
        <div className="about-us-container">
          <div className="about-us-left">
            <span className="tag">ABOUT OUR WEBSITE</span>
            <h2>We craft digital experiences<br/>that drive real growth</h2>
            <p className="desc-text">
              OneRoof Ventures is dedicated to building high-performance, modern websites and applications. We focus on clean code, exceptional user experiences, and scalable architectures that help businesses thrive in the digital age. Our team works closely with you to transform your vision into a stunning reality.
            </p>
            <ul className="about-features">
              <li>✓ Modern Web & App Development</li>
              <li>✓ Engaging UI/UX Design</li>
              <li>✓ Data-Driven Social Media Strategies</li>
            </ul>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#bd5319', color: '#fff', padding: '0.9rem 2rem', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 8px 20px rgba(189,83,25,0.25)' }}>
                Get in Touch <span>→</span>
              </Link>
            </div>
          </div>
          <div className="about-us-right">
            <img src="/home1.png" alt="About Our Website" className="about-us-image" />
          </div>
        </div>
      </section>
    </div>
  );
}
