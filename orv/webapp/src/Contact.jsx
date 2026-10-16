import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setResponseMsg('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/oneroofventures1@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Inquiry from ${formData.name} - OneRoofVentures`,
          _replyto: formData.email,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setResponseMsg('Thank you! Your message has been sent to oneroofventures1@gmail.com. We will be in touch shortly.');
        setFormData({ name: '', email: '', message: '' });
      } else if (data.message && data.message.includes('Activation')) {
        setStatus('success');
        setResponseMsg("Message submitted! FormSubmit has sent a one-time activation email to oneroofventures1@gmail.com. Once confirmed, all inquiries will arrive directly in your inbox.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setResponseMsg('Unable to send the message right now. Please try again or reach out to us directly via email.');
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Dynamic Animated Navbar */}
      <nav className="navbar scrolled" style={{ background: '#fff' }}>
        <div className="nav-side nav-left">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="OneRoofVentures Logo" style={{ height: '2.5rem', objectFit: 'contain' }} />
          </Link>
        </div>
        <div className="nav-center">
          <div className="links">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>HOME</Link>
            <Link to="/#services">SERVICES</Link>
            <Link to="/#about">ABOUT</Link>
          </div>
        </div>
        <div className="nav-side nav-right">
          <div className="actions">
            <a href="mailto:oneroofventures1@gmail.com" className="btn-contact" style={{ textDecoration: 'none' }}>Email Us <span>→</span></a>
          </div>
        </div>
      </nav>

      {/* Main Contact Section */}
      <section id="contact" style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '8rem 2rem 4rem', 
        background: '#fff' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          
          {/* Left Side: Large Image & Contact Info */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* The Sticky Note Contact Image */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(189,83,25,0.18) 0%, rgba(189,83,25,0) 70%)', borderRadius: '50%', zIndex: 0 }}></div>
              <img 
                src="/contact-note.png" 
                alt="Contact Us" 
                style={{ 
                  width: '100%', 
                  maxWidth: '430px', 
                  height: 'auto', 
                  zIndex: 1, 
                  objectFit: 'contain', 
                  filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.12))',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.04) rotate(-1.5deg)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              />
            </div>

            {/* Additional Contact Elements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '440px', margin: '0.5rem auto 0' }}>
              <a 
                href="mailto:oneroofventures1@gmail.com" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.2rem', 
                  background: '#f8fafc', 
                  padding: '1.2rem 1.5rem', 
                  borderRadius: '16px', 
                  border: '1px solid #edf0f4', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#bd5319'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(189,83,25,0.12)' }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#edf0f4'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)' }}
              >
                <div style={{ background: '#bd5319', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', boxShadow: '0 5px 15px rgba(189,83,25,0.25)', flexShrink: 0 }}>
                  ✉️
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: '#777', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Email Us Directly</h4>
                  <p style={{ fontSize: '1.05rem', color: '#111', fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>oneroofventures1@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', borderRadius: '24px', padding: '3.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', border: '1px solid #edf0f4' }}>
            <div className="service-tagline-badge" style={{ alignSelf: 'flex-start', marginBottom: '1.5rem', background: '#fff' }}>
              <span style={{ color: '#111', fontWeight: 700 }}>CONTACT US</span>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem', letterSpacing: '-1px', lineHeight: 1.1 }}>Let's build something epic.</h1>
            <p style={{ color: '#555', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>Whether you have a specific project in mind or just want to explore possibilities, our team is ready to listen.</p>
            
            {status === 'success' && (
              <div style={{
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                border: '1px solid #a7f3d0',
                padding: '1.1rem 1.3rem',
                borderRadius: '14px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: 500,
                lineHeight: 1.5,
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)'
              }}>
                <span style={{ fontSize: '1.3rem', lineHeight: 1, color: '#10b981' }}>✓</span>
                <span>{responseMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div style={{
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                padding: '1.1rem 1.3rem',
                borderRadius: '14px',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                fontSize: '0.95rem',
                fontWeight: 500,
                lineHeight: 1.5
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>⚠️</span>
                  <span>{responseMsg}</span>
                </div>
                <a 
                  href={`mailto:oneroofventures1@gmail.com?subject=${encodeURIComponent(`Project Inquiry from ${formData.name || 'Website Visitor'}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                  style={{ color: '#bd5319', textDecoration: 'underline', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  Click here to send directly via your email client →
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>Full Name</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', backgroundColor: '#fff', transition: 'border-color 0.2s' }} 
                  onFocus={(e) => e.target.style.borderColor = '#bd5319'} 
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>Email Address</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="you@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', backgroundColor: '#fff', transition: 'border-color 0.2s' }} 
                  onFocus={(e) => e.target.style.borderColor = '#bd5319'} 
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>How can we help?</label>
                <textarea 
                  name="message" 
                  required 
                  placeholder="Tell us about your project or inquiry..." 
                  rows="4" 
                  value={formData.message}
                  onChange={handleChange}
                  style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', resize: 'vertical', backgroundColor: '#fff', transition: 'border-color 0.2s' }} 
                  onFocus={(e) => e.target.style.borderColor = '#bd5319'} 
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                style={{ 
                  backgroundColor: status === 'submitting' ? '#993f11' : '#bd5319', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '1.2rem', 
                  fontSize: '1.1rem', 
                  marginTop: '1rem', 
                  borderRadius: '50px', 
                  fontWeight: 600,
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s',
                  boxShadow: status === 'submitting' ? 'none' : '0 10px 25px rgba(189,83,25,0.25)',
                  opacity: status === 'submitting' ? 0.85 : 1
                }}
                onMouseOver={(e) => { 
                  if (status !== 'submitting') {
                    e.currentTarget.style.transform = 'translateY(-3px)'; 
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(189,83,25,0.3)'; 
                  }
                }}
                onMouseOut={(e) => { 
                  if (status !== 'submitting') {
                    e.currentTarget.style.transform = 'translateY(0)'; 
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(189,83,25,0.25)'; 
                  }
                }}
              >
                {status === 'submitting' ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message 
                    <span style={{ background: '#fff', color: '#bd5319', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', marginLeft: '8px' }}>→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

