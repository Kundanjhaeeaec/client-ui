
import { useState, useEffect } from 'react'
import './App.css'
import ChatBotComponent from './components/Chatbot/ChatBot'
import ContactForm from './components/ContactForm/ContactForm'
import HeroSlider from './components/HeroSlider/HeroSlider'
import TestimonialSection from './components/TestimonialSection/TestimonialSection'
import GoogleFormSection from './components/GoogleFormSection/GoogleFormSection'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
        // Loading screen will show for 7 seconds total (animation completes at ~5s, then 2s pause)
    const timer1 = setTimeout(() => {
      setIsLoading(false)
    }, 7000) // was 5000ms, now 7000ms for 2 extra seconds after animation

    const timer2 = setTimeout(() => {
      setShowContent(true)
    }, 7500) // was 6000ms, now 7500ms

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <svg className="loading-logo-icon" viewBox="0 0 40 40" width="80" height="80">
              <defs>
                <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="36" height="36" rx="12" fill="url(#loadingGradient)" className="logo-bg-animate" />
              <circle cx="20" cy="12" r="3" fill="#ffffff" className="circle-animate" style={{animationDelay: '0.4s'}} />
              <circle cx="28" cy="18" r="3.5" fill="#ffffff" className="circle-animate" style={{animationDelay: '0.8s'}} />
              <circle cx="12" cy="25" r="3" fill="#ffffff" className="circle-animate" style={{animationDelay: '1.2s'}} />
              <path d="M20 15 Q24 16 28 21" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" className="path-animate" style={{animationDelay: '1.6s'}} />
              <path d="M25 21 Q20 24 15 25" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" className="path-animate" style={{animationDelay: '2s'}} />
              <path d="M20 28 Q18 30 16 32" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" className="path-animate" style={{animationDelay: '2.4s'}} />
            </svg>
          </div>
          <div className="loading-text">
            <span className="loading-letter" style={{animationDelay: '2.8s'}}>I</span>
            <span className="loading-letter" style={{animationDelay: '3.0s'}}>n</span>
            <span className="loading-letter" style={{animationDelay: '3.2s'}}>t</span>
            <span className="loading-letter" style={{animationDelay: '3.4s'}}>e</span>
            <span className="loading-letter" style={{animationDelay: '3.6s'}}>l</span>
            <span className="loading-letter" style={{animationDelay: '3.8s'}}>l</span>
            <span className="loading-letter" style={{animationDelay: '4.0s'}}>i</span>
            <span className="loading-letter" style={{animationDelay: '4.2s'}}>v</span>
            <span className="loading-letter" style={{animationDelay: '4.4s'}}>i</span>
            <span className="loading-letter" style={{animationDelay: '4.6s'}}>a</span>
          </div>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`main-container ${showContent ? 'content-loaded' : ''}`}>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <nav className={`navbar ${showContent ? 'navbar-animate' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="brand">
          <div className="logo">
            <svg 
              className="logo-icon" 
              viewBox="0 0 40 40" 
              width="32" 
              height="32"
              role="img"
              aria-label="Intellivia company logo"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              {/* Background rounded square */}
              <rect x="2" y="2" width="36" height="36" rx="12" fill="url(#logoGradient)" />
              
              {/* Abstract figure design */}
              <circle cx="20" cy="12" r="3" fill="#ffffff" />
              <circle cx="28" cy="18" r="3.5" fill="#ffffff" />
              <circle cx="12" cy="25" r="3" fill="#ffffff" />
              
              {/* Connecting curved paths */}
              <path d="M20 15 Q24 16 28 21" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M25 21 Q20 24 15 25" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M20 28 Q18 30 16 32" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              
              {/* Small accent dots */}
              <circle cx="25" cy="19" r="1" fill="#059669" />
              <circle cx="14" cy="26" r="1" fill="#059669" />
            </svg>
            <span className="brand-text">Intellivia</span>
          </div>
        </div>
        <div className="nav-menu">
          <div className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`} role="menubar" id="nav-menu">
            <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)} role="menuitem">About</a>
            <a href="#courses" className="nav-link" onClick={() => setIsMenuOpen(false)} role="menuitem">Courses</a>
            <a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)} role="menuitem">Services</a>
            <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)} role="menuitem">Contact Us</a>
          </div>
          <a className="nav-contact" href="https://wa.me/918249225305" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp at 8249225305">WhatsApp: 8249225305</a>
          <button 
            className="hamburger" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            type="button"
          >
            <span className={`bar ${isMenuOpen ? 'bar-active' : ''}`} aria-hidden="true"></span>
            <span className={`bar ${isMenuOpen ? 'bar-active' : ''}`} aria-hidden="true"></span>
            <span className={`bar ${isMenuOpen ? 'bar-active' : ''}`} aria-hidden="true"></span>
          </button>
        </div>
      </nav>
      
      <main id="main-content" role="main">
        <HeroSlider />
        
        {/* About Section for SEO */}
        <section className={`about-section ${showContent ? 'section-animate' : ''}`} id="about" style={{animationDelay: '0.8s'}} aria-labelledby="about-heading">
          <div className="container">
            <h2 id="about-heading">About Intellivia - Your Premier Technology Learning Partner</h2>
          <div className="about-content">
            <p>
              <strong>Intellivia</strong> is a leading online technology education platform specializing in <strong>Java programming</strong>, <strong>Angular development</strong>, <strong>Spring Boot</strong>, <strong>DevOps practices</strong>, and comprehensive <strong>full-stack development</strong> training. With years of industry experience, we provide personalized tutoring that transforms beginners into confident developers.
            </p>
            <p>
              Our expert instructors offer <strong>hands-on programming courses</strong>, <strong>real-world project experience</strong>, and <strong>career guidance</strong> to help you succeed in the competitive tech industry. Whether you're looking for <strong>Java certification training</strong>, <strong>Angular web development courses</strong>, or <strong>DevOps career preparation</strong>, Intellivia provides the comprehensive education you need.
            </p>
            <div className="key-features">
              <h3>Why Choose Intellivia for Your Technology Education?</h3>
              <ul>
                <li>✅ <strong>Expert Instructors</strong> with 5+ years industry experience</li>
                <li>✅ <strong>Personalized Learning</strong> paths tailored to your goals</li>
                <li>✅ <strong>Hands-on Projects</strong> using real-world scenarios</li>
                <li>✅ <strong>Job Support</strong> and interview preparation</li>
                <li>✅ <strong>Flexible Scheduling</strong> for working professionals</li>
                <li>✅ <strong>Affordable Pricing</strong> with maximum value</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
            <section className={`cards-section ${showContent ? 'section-animate' : ''}`} id="courses" style={{animationDelay: '1.2s'}} aria-labelledby="courses-heading">
        <div className="container">
          <header>
            <h2 id="courses-heading">Popular Technology Courses - Master In-Demand Programming Skills</h2>
            <p>Advance your career with our comprehensive programming and development courses designed for today's tech industry</p>
          </header>
          <div className="cards" role="list">
            <article className={`card ${showContent ? 'card-animate' : ''}`} style={{animationDelay: '1.6s'}} role="listitem" tabIndex="0">
              <span className="card-icon" role="img" aria-label="Java programming course">☕</span>
              <h3>Java Programming Mastery</h3>
              <p>Master <strong>core Java</strong> and <strong>advanced Java concepts</strong> including OOP, collections, multithreading, and Spring framework with hands-on projects and real-world applications for enterprise development.</p>
              <div className="course-keywords" aria-label="Course technologies">
                <span>Java SE</span> <span>Java EE</span> <span>Spring Boot</span> <span>Maven</span>
              </div>
            </article>
            <article className={`card ${showContent ? 'card-animate' : ''}`} style={{animationDelay: '2.0s'}} role="listitem" tabIndex="0">
              <span className="card-icon" role="img" aria-label="Angular development course">🅰️</span>
              <h3>Angular Web Development</h3>
              <p>Build <strong>dynamic, responsive web applications</strong> using <strong>Angular framework</strong>, TypeScript, RxJS, and modern web development practices. Perfect for front-end developer career path.</p>
              <div className="course-keywords" aria-label="Course technologies">
                <span>Angular 15+</span> <span>TypeScript</span> <span>RxJS</span> <span>Material UI</span>
              </div>
            </article>
            <article className={`card ${showContent ? 'card-animate' : ''}`} style={{animationDelay: '2.4s'}} role="listitem" tabIndex="0">
              <span className="card-icon" role="img" aria-label="React development course">⚛️</span>
              <h3>React Development</h3>
              <p>Learn <strong>modern React development</strong> with hooks, context, Redux, and state management libraries. Build scalable single-page applications for web development career.</p>
              <div className="course-keywords" aria-label="Course technologies">
                <span>React 18</span> <span>Redux</span> <span>Next.js</span> <span>React Hooks</span>
              </div>
            </article>
            <article className={`card ${showContent ? 'card-animate' : ''}`} style={{animationDelay: '2.8s'}} role="listitem" tabIndex="0">
              <span className="card-icon" role="img" aria-label="Full stack development course">🌐</span>
              <h3>Full Stack Development</h3>
              <p>Become a <strong>complete full-stack developer</strong> with front-end (React/Angular) and back-end (Java/Node.js) technologies. Includes database design and <strong>DevOps deployment</strong>.</p>
              <div className="course-keywords" aria-label="Course technologies">
                <span>MEAN/MERN</span> <span>REST APIs</span> <span>MongoDB</span> <span>Docker</span>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="cards-section" id="services" aria-labelledby="services-heading">
        <h2 id="services-heading">Our Services</h2>
        <div className="cards" role="list">
          <div className="card" role="listitem" tabIndex="0">
            <span className="card-icon" role="img" aria-label="Job support service">💼</span>
            <h3>Job Support</h3>
            <p>Get expert assistance with interviews, workplace projects, and career advancement strategies.</p>
          </div>
          <div className="card" role="listitem" tabIndex="0">
            <span className="card-icon" role="img" aria-label="Training service">🎓</span>
            <h3>Training</h3>
            <p>Comprehensive training programs designed for all skill levels, from beginner to advanced.</p>
          </div>
          <div className="card" role="listitem" tabIndex="0">
            <span className="card-icon" role="img" aria-label="Final year projects service">📁</span>
            <h3>Final Year Projects</h3>
            <p>Expert guidance and mentorship for impactful final year projects and academic excellence.</p>
          </div>
          <div className="card" role="listitem" tabIndex="0">
            <span className="card-icon" role="img" aria-label="Application development service">⚙️</span>
            <h3>Application Development & Maintenance</h3>
            <p>End-to-end application development services and ongoing maintenance support for web and mobile applications.</p>
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      
      <section className="lead-capture" id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Get in Touch</h2>
        <p>Fill out the form below or contact us on WhatsApp!</p>
        <div className="form-container">
          <ContactForm />
        </div>
        <a className="whatsapp-btn" href="https://wa.me/918249225305" target="_blank" rel="noopener noreferrer">
          Contact on WhatsApp: 8249225305
        </a>
      </section>
      
      {/* Social Media Section */}
      <section className="social-media-section">
        <div className="social-container">
          <h2>Connect With Us</h2>
          <p>Follow us on social media for updates, tips, and tech insights!</p>
          <div className="social-links">
            <a href="https://linkedin.com/company/intellivia" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://twitter.com/intellivia" target="_blank" rel="noopener noreferrer" className="social-link twitter">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X (Twitter)</span>
            </a>
            <a href="https://instagram.com/intellivia" target="_blank" rel="noopener noreferrer" className="social-link instagram">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a href="https://facebook.com/intellivia" target="_blank" rel="noopener noreferrer" className="social-link facebook">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </section>
      </main>
      
      <footer className="footer" role="contentinfo">
        <p>&copy; {new Date().getFullYear()} Intellivia. All rights reserved.</p>
      </footer>
      
      {/* AI Chatbot */}
      <ChatBotComponent />
    </div>
  )
}

export default App
