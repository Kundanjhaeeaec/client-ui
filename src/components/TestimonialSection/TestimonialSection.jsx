import React, { useState, useEffect } from 'react';
import './TestimonialSection.css';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      location: "Mountain View, CA",
      course: "Full Stack Development",
      image: "👩‍💻",
      testimonial: "Intellivia helped me transition from mechanical engineering to software development. The personalized guidance and real-world projects gave me the confidence to land my dream job at Google!",
      achievement: "Landed job at Google within 6 months",
      rating: 5
    },
    {
      id: 2,
      name: "Rajesh Patel",
      role: "MS Student at Stanford",
      location: "Stanford, CA",
      course: "React & JavaScript",
      image: "👨‍🎓",
      testimonial: "The interview preparation and coding practice sessions were incredible. I not only improved my technical skills but also gained the confidence to ace my Stanford MS program interviews.",
      achievement: "Admitted to Stanford MS program",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "Frontend Developer at Microsoft",
      location: "Seattle, WA",
      course: "Angular & TypeScript",
      image: "👩‍🔬",
      testimonial: "As an international student, I struggled with modern web technologies. Intellivia's mentorship and hands-on projects helped me secure a frontend developer role at Microsoft!",
      achievement: "Frontend Developer at Microsoft",
      rating: 5
    },
    {
      id: 4,
      name: "Amit Kumar",
      role: "Final Year Project Success",
      location: "Delhi, India",
      course: "Java & Spring Boot",
      image: "👨‍💼",
      testimonial: "My final year project guidance was exceptional. The mentor helped me build a scalable e-commerce application that impressed my professors and helped me graduate with distinction.",
      achievement: "Graduated with Distinction",
      rating: 5
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      role: "DevOps Engineer at Amazon",
      location: "Austin, TX",
      course: "Full Stack + DevOps",
      image: "👩‍💻",
      testimonial: "The comprehensive training covered everything from frontend to deployment. The real-world approach and career guidance helped me transition into a DevOps role at Amazon.",
      achievement: "DevOps Engineer at Amazon",
      rating: 5
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <h2>Student Success Stories</h2>
          <p>See how our students are transforming their careers and achieving their dreams</p>
        </div>

        <div className="testimonial-carousel">
          <button className="testimonial-nav prev" onClick={prevTestimonial} aria-label="Previous testimonial">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <div className="testimonial-content">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              
              <blockquote className="testimonial-quote">
                "{testimonials[currentTestimonial].testimonial}"
              </blockquote>
              
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonials[currentTestimonial].image}
                </div>
                <div className="author-info">
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <p className="author-role">{testimonials[currentTestimonial].role}</p>
                  <p className="author-location">📍 {testimonials[currentTestimonial].location}</p>
                  <p className="author-course">📚 Studied: {testimonials[currentTestimonial].course}</p>
                </div>
              </div>
              
              <div className="achievement-badge">
                <span className="achievement-icon">🏆</span>
                <span className="achievement-text">{testimonials[currentTestimonial].achievement}</span>
              </div>
            </div>
          </div>

          <button className="testimonial-nav next" onClick={nextTestimonial} aria-label="Next testimonial">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="testimonial-stats">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Students Mentored</span>
          </div>
          <div className="stat">
            <span className="stat-number">95%</span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Companies Joined</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.9/5</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
