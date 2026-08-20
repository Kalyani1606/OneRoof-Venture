import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);
  const houseRef = useRef(null);
  const cloudsRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const appDevSectionRef = useRef(null);
  const leftCloudRef = useRef(null);
  const leftCloudRef2 = useRef(null);
  const leftTextCloudRef = useRef(null);
  const rightCloudRef = useRef(null);
  const rightCloudRef2 = useRef(null);
  const rightQrCloudRef = useRef(null);
  const bottomCloudRef = useRef(null);
  const centerCloudRef = useRef(null);
  const centerCloudRef2 = useRef(null);
  const centerPhoneRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightQrRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

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

    let ctx = gsap.context(() => {
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

      // App Development Cloud Parting & iPhone Emergence ScrollTrigger (Pinned Reveal)
      if (appDevSectionRef.current) {
        let appTl = gsap.timeline({
          scrollTrigger: {
            trigger: appDevSectionRef.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
          }
        });

        // 1. Initial State (Progress 0% to 28%): 100% Dense Pure White Cloud Blanket completely covering screen (text, phone, QR)
        appTl.set(leftCloudRef.current, { xPercent: 40, yPercent: -10, scale: 1.6, opacity: 1 })
          .set(leftCloudRef2.current, { xPercent: 30, yPercent: 15, scale: 1.7, opacity: 1 })
          .set(leftTextCloudRef.current, { xPercent: 15, yPercent: -5, scale: 1.8, opacity: 1 })
          .set(rightCloudRef.current, { xPercent: -40, yPercent: -10, scale: 1.6, opacity: 1 })
          .set(rightCloudRef2.current, { xPercent: -30, yPercent: 15, scale: 1.7, opacity: 1 })
          .set(rightQrCloudRef.current, { xPercent: -15, yPercent: -5, scale: 1.8, opacity: 1 })
          .set(bottomCloudRef.current, { yPercent: -20, scale: 1.9, opacity: 1 })
          .set(centerCloudRef.current, { xPercent: 0, yPercent: -10, scale: 2.5, opacity: 1 })
          .set(centerCloudRef2.current, { xPercent: 0, yPercent: 15, scale: 2.5, opacity: 1 })
          .set(centerPhoneRef.current, { y: 240, scale: 0.75, opacity: 0 })
          .set(leftTextRef.current, { x: -60, opacity: 0 })
          .set(rightQrRef.current, { x: 60, opacity: 0 })

          // Initial scroll hold window: Clouds stay 100% closed with zero motion on first scroll
          .to({}, { duration: 0.28 })

          // 2. Parting Scroll Phase (Progress 28% to 85%): Clouds split left & right, phone emerges up, text & QR fade in
          .to(leftCloudRef.current, { xPercent: -75, yPercent: -10, scale: 1.1, opacity: 0.95, duration: 0.65, ease: "power2.inOut" }, 0.28)
          .to(leftCloudRef2.current, { xPercent: -85, yPercent: 10, scale: 1.05, opacity: 0.9, duration: 0.65, ease: "power2.inOut" }, 0.28)
          .to(leftTextCloudRef.current, { xPercent: -95, yPercent: -5, scale: 1.0, opacity: 0.85, duration: 0.65, ease: "power2.inOut" }, 0.28)

          .to(rightCloudRef.current, { xPercent: 75, yPercent: -10, scale: 1.1, opacity: 0.95, duration: 0.65, ease: "power2.inOut" }, 0.28)
          .to(rightCloudRef2.current, { xPercent: 85, yPercent: 10, scale: 1.05, opacity: 0.9, duration: 0.65, ease: "power2.inOut" }, 0.28)
          .to(rightQrCloudRef.current, { xPercent: 95, yPercent: -5, scale: 1.0, opacity: 0.85, duration: 0.65, ease: "power2.inOut" }, 0.28)

          .to(centerCloudRef.current, { xPercent: -120, yPercent: -10, scale: 1.5, opacity: 0.5, duration: 0.65, ease: "power2.inOut" }, 0.28)
          .to(centerCloudRef2.current, { xPercent: 120, yPercent: 10, scale: 1.5, opacity: 0.5, duration: 0.65, ease: "power2.inOut" }, 0.28)

          .to(bottomCloudRef.current, { yPercent: 35, scale: 1.25, opacity: 0.85, duration: 0.65, ease: "power2.inOut" }, 0.28)

          .to(centerPhoneRef.current, { y: 20, scale: 0.7, opacity: 1, duration: 0.58, ease: "back.out(1.1)" }, 0.35)
          .to(leftTextRef.current, { x: 0, opacity: 1, duration: 0.52, ease: "power2.out" }, 0.4)
          .to(rightQrRef.current, { x: 0, opacity: 1, duration: 0.52, ease: "power2.out" }, 0.4)

          // 3. Final State (Progress 85% to 100%): Clouds remain anchored on outer sides framing the screen
          .to({}, { duration: 0.2 });
      }
    }, containerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="app-container">
      {/* Dynamic Animated Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-side nav-left">
          <div className="logo">
            OneRoofVentures
          </div>
        </div>
        <div className="nav-center">
          <div className="links">
            <a href="#home" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>HOME</a>
            <a href="#services" onClick={(e) => {
              e.preventDefault();
              servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}>SERVICES</a>
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}>ABOUT</a>
          </div>
        </div>
        <div className="nav-side nav-right">
          <div className="actions">
            <button className="btn-contact">Contact Us <span>→</span></button>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="hero-section">
        <div className="hero-text-wrapper" style={{ minHeight: '350px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="hero-content" ref={textContainerRef}>
            <div className="users-badge">
              <div className="avatars">
                <div className="avatar-circle" style={{ background: '#ff7b72' }}></div>
                <div className="avatar-circle" style={{ background: '#79c0ff', marginLeft: '-10px' }}></div>
                <div className="avatar-circle" style={{ background: '#d2a8ff', marginLeft: '-10px' }}></div>
              </div>
              <span>3,500+ Pro Users</span>
            </div>

            <h1 className="hero-title">Find Your Dream</h1>

            <p className="hero-subtitle">
              Explore thoughtfully designed homes in premium locations, crafted to<br />
              match modern lifestyles with comfort, elegance, and long-term value.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary">Explore Homes <span>→</span></button>
              <button className="btn-secondary">Book a Visit</button>
            </div>
          </div>
        </div>

        <img ref={houseRef} src="/image.png" alt="House" className="house-img" />
        <img ref={cloudsRef} src="/clouds.png" alt="Clouds" className="clouds-img" />
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="services-section">
        <div className="services-header">
          <h2 className="services-main-title">Our Services</h2>
          <p className="services-two-lines-subtitle">
            Elevating your brand with expert social media management,<br />
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
                  {[1, 2].flatMap(() => [
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
                  ]).map((card, idx) => (
                    card.type === 'icon' ? (
                      <div key={idx} className="floating-card-item icon-card shadow-soft">
                        <div className={`icon-circle ${card.bg}`}>{card.icon}</div>
                        <span className="card-title-text">{card.text}</span>
                      </div>
                    ) : (
                      <div key={idx} className="floating-card-item image-card shadow-soft">
                        <img src={card.src} alt={`Showcase ${idx}`} />
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Line 2: Moves Right to Left (Opposite Direction!) */}
              <div className="horizontal-marquee-row">
                <div className="marquee-track-horizontal track-right-to-left">
                  {[1, 2].flatMap(() => [
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
                  ]).map((card, idx) => (
                    card.type === 'icon' ? (
                      <div key={idx} className="floating-card-item icon-card shadow-soft">
                        <div className={`icon-circle ${card.bg}`}>{card.icon}</div>
                        <span className="card-title-text">{card.text}</span>
                      </div>
                    ) : (
                      <div key={idx} className="floating-card-item image-card shadow-soft">
                        <img src={card.src} alt={`Showcase ${idx}`} />
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

                <div className="laptop-screen" style={{ position: 'relative', padding: 0, overflow: 'hidden' }}>
                  <img
                    src="/web.png"
                    alt="Web Development Portfolio"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', bottom: '2rem', left: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <button className="btn-primary" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                      View All Projects <span>→</span>
                    </button>
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
        <div ref={appDevSectionRef} className="service-showcase-container app-dev-showcase">
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

            <div ref={bottomCloudRef} className="cloud-overlay cloud-bottom-center">
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud Bottom Floor Overlay" />
            </div>

            <div ref={centerCloudRef} className="cloud-overlay cloud-layer-1" style={{ left: '15%', width: '70%', height: '140%', zIndex: 37 }}>
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud Center 1" />
            </div>
            <div ref={centerCloudRef2} className="cloud-overlay cloud-layer-2" style={{ left: '15%', width: '70%', height: '130%', zIndex: 38 }}>
              <img src="/realistic-white-cloud-free-png.webp" alt="Cloud Center 2" />
            </div>

            {/* Left Content Column */}
            <div ref={leftTextRef} className="app-dev-col col-left-text">
              <h3 className="app-title">Build better habits<br />with less effort</h3>
              <p className="app-subtitle">
                Track what matters, stay organized,<br />
                and improve at your own pace.
              </p>
              <div className="app-download-btns">
                <button className="btn-app-store shadow-soft">
                  <span className="btn-apple-logo"></span> Download for iPhone
                </button>
                <button className="btn-play-store shadow-soft">
                  <span className="btn-android-logo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
                      <path d="M17.523 15.3414L16.2736 13.1772L18.4379 11.9278L17.523 15.3414ZM1.75 3.5L12 13.75L22.25 3.5H1.75ZM3.5 1.75L13.75 12L22.25 3.5V1.75H3.5Z" />
                    </svg>
                  </span> Get it on Android
                </button>
              </div>
            </div>

            {/* Center iPhone Smartphone Mockup matching reference image */}
            <div ref={centerPhoneRef} className="iphone-wrapper">
              <div className="iphone-outer-frame">
                {/* iPhone Dynamic Island */}
                <div className="iphone-top-bar">
                  <div className="iphone-dynamic-island">
                    <div className="camera-lens"></div>
                  </div>
                </div>

                <div className="iphone-screen">
                  {/* Phone Status Bar */}
                  <div className="phone-status-bar">
                    <span className="phone-clock">19:02</span>
                    <div className="status-right-icons">
                      <svg width="18" height="10" viewBox="0 0 20 12" fill="#111">
                        <path d="M0 3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3z" />
                      </svg>
                    </div>
                  </div>

                  {/* Phone Header / Greeting */}
                  <div className="phone-user-header">
                    <div className="user-info-row">
                      <div className="phone-avatar-box">
                        <span className="avatar-placeholder">👤</span>
                      </div>
                      <div className="user-greeting-text">
                        <span className="greeting-small">Good Morning</span>
                        <strong className="user-name">Jack Paul</strong>
                      </div>
                      <div className="user-bell-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Date Selector Row */}
                  <div className="phone-date-selector">
                    <div className="date-month-title">📅 November 2025 ▾</div>
                    <div className="date-days-row">
                      <div className="date-day-col"><span className="day-num">14</span><span className="day-name">Wed</span></div>
                      <div className="date-day-col active-green"><span className="day-num">15</span><span className="day-name">Thu</span></div>
                      <div className="date-day-col active-green"><span className="day-num">16</span><span className="day-name">Fri</span></div>
                      <div className="date-day-col selected-white"><span className="day-num">17</span><span className="day-name">Sat</span></div>
                      <div className="date-day-col"><span className="day-num">18</span><span className="day-name">Sun</span></div>
                      <div className="date-day-col"><span className="day-num">19</span><span className="day-name">Mon</span></div>
                      <div className="date-day-col"><span className="day-num">20</span><span className="day-name">Tue</span></div>
                    </div>
                  </div>

                  {/* Month Streak Card */}
                  <div className="phone-streak-card">
                    <div className="streak-left">
                      <span className="fire-icon">🔥</span>
                      <div>
                        <strong className="streak-count">16/28</strong>
                        <span className="streak-label">Total Month Streak Active</span>
                      </div>
                    </div>
                    <div className="streak-circle-progress">
                      <span className="progress-val">65%</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="phone-stats-grid">
                    <div className="stat-card-mini">
                      <div className="stat-num-row">
                        <span className="stat-big-num">07</span>
                        <div className="stat-ring purple-ring">85%</div>
                      </div>
                      <span className="stat-card-label">Today streak</span>
                    </div>
                    <div className="stat-card-mini">
                      <div className="stat-num-row">
                        <span className="stat-big-num">32</span>
                        <div className="stat-ring pink-ring">92%</div>
                      </div>
                      <span className="stat-card-label">This Week streak</span>
                    </div>
                  </div>

                  {/* Routine Section */}
                  <div className="phone-routine-section">
                    <span className="routine-title">Today's routine</span>
                    <div className="routine-item-card green-card">
                      <div className="routine-item-left">
                        <span className="check-dot">✓</span>
                        <div>
                          <strong>Morning stretch</strong>
                          <span className="routine-sub">Completed at 7:18 am</span>
                        </div>
                      </div>
                      <span className="badge-today">Today</span>
                    </div>
                    <div className="routine-item-card focus-card">
                      <div className="routine-item-left">
                        <span className="target-dot">🎯</span>
                        <div>
                          <strong>Focus block</strong>
                          <span className="routine-sub">45 min deep work</span>
                        </div>
                      </div>
                      <span className="badge-afternoon">This afternoon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right QR Code Column */}
            <div ref={rightQrRef} className="app-dev-col col-right-qr">
              <h4 className="qr-title">Scan the QR code to<br />download the app</h4>
              <div className="qr-code-box shadow-soft">
                <div className="qr-svg-wrapper">
                  <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                    <rect width="140" height="140" rx="16" fill="#ffffff" />
                    <path d="M16 16h36v36H16zM88 16h36v36H88zM16 88h36v36H16z" fill="#111" />
                    <path d="M24 24h20v20H24zM96 24h20v20H96zM24 96h20v20H24z" fill="#fff" />
                    <path d="M30 30h8v8h-8zM102 30h8v8h-8zM30 102h8v8h-8z" fill="#111" />
                    <path d="M60 16h16v16H60zM16 60h16v16H16zM60 60h20v20H60zM96 60h28v16H96zM60 96h16v28H60zM96 96h28v28H96z" fill="#111" />
                    {/* Center Brand Dot */}
                    <circle cx="70" cy="70" r="14" fill="#ffffff" />
                    <circle cx="70" cy="70" r="9" fill="#ea580c" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Pill at bottom right */}
          <div className="floating-get-free-pill">
            Get it for FREE <span className="apple-icon"></span>
          </div>
        </div>
      </section>

      <section className="about-section" ref={aboutRef}>
        <div className="about-header-top">
          <span className="tag">OUR IMPACT</span>
          <div className="about-header-content">
            <h2>Real insights behind<br />every property decision</h2>
            <p className="desc-text">
              Built to make modern home discovery simple,<br />transparent, and more confident for every user.
            </p>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>$4.6M+</h3>
            <p>TOTAL VALUE</p>
          </div>
          <div className="stat-card">
            <h3>320+</h3>
            <p>ACTIVE HOMES</p>
          </div>
          <div className="stat-card">
            <h3>98%</h3>
            <p>HAPPY CLIENTS</p>
          </div>
        </div>

        <div className="images-container">
          <img src="/image.png" alt="House 1" className="img-left" />
          <img src="/image.png" alt="House 2" className="img-right" />
        </div>

        <div className="focused-section">
          <h2>
            Focused on <span>discovery</span>, built for <span>real choices</span>.
          </h2>
        </div>
      </section>
    </div>
  );
}
