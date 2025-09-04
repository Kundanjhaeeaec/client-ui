import { useState, useEffect } from 'react'
import './HeroSlider.css'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Unlock Your Tech Career",
      subtitle: "Expert-led online tutoring for International MS & Indian Engineering Students",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      title: "Master Modern Technologies",
      subtitle: "Learn React, Angular, Java, and Full Stack Development with industry experts",
      background: "linear-gradient(135deg, #059669 0%, #047857 100%)"
    },
    {
      title: "Get Job-Ready Skills",
      subtitle: "Real-world projects, interview preparation, and career guidance for success",
      background: "linear-gradient(135deg, #047857 0%, #065f46 100%)"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <header className="hero-slider" id="about">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ background: slide.background }}
        >
          <div className="hero-content">
            <h1>{slide.title}</h1>
            <p className="subtitle">{slide.subtitle}</p>
            <a className="cta-btn" href="#contact">Get Started</a>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button className="slider-btn prev-btn" onClick={prevSlide} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      <button className="slider-btn next-btn" onClick={nextSlide} aria-label="Next slide">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
      
      {/* Dots Navigation */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  )
}

export default HeroSlider
