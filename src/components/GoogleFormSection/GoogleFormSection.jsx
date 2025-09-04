import React from 'react';
import './GoogleFormSection.css';

const GoogleFormSection = () => {
  // Replace these URLs with your actual Google Form URLs
  const forms = {
    enrollment: 'https://forms.gle/YOUR_ENROLLMENT_FORM_ID',
    contact: 'https://forms.gle/YOUR_CONTACT_FORM_ID',
    jobSupport: 'https://forms.gle/YOUR_JOB_SUPPORT_FORM_ID',
    finalYear: 'https://forms.gle/YOUR_FINAL_YEAR_FORM_ID'
  };

  const openForm = (formType) => {
    window.open(forms[formType], '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="google-form-section" id="contact">
      <div className="form-section-container">
        <div className="form-section-header">
          <h2>Get Started Today</h2>
          <p>Choose the option that best fits your needs. All forms are quick and secure.</p>
        </div>

        <div className="form-options-grid">
          <div className="form-option">
            <div className="form-icon">🎓</div>
            <h3>Course Enrollment</h3>
            <p>Ready to start learning? Tell us about your goals and we'll create a personalized learning path.</p>
            <ul className="form-features">
              <li>✅ Personalized course recommendations</li>
              <li>✅ Learning timeline planning</li>
              <li>✅ 1-on-1 consultation included</li>
            </ul>
            <button 
              className="form-btn primary"
              onClick={() => openForm('enrollment')}
            >
              Start Enrollment
            </button>
          </div>

          <div className="form-option">
            <div className="form-icon">💼</div>
            <h3>Job Support</h3>
            <p>Need help with interviews, workplace projects, or career advancement? We've got you covered.</p>
            <ul className="form-features">
              <li>✅ Interview preparation</li>
              <li>✅ Resume review & optimization</li>
              <li>✅ Project guidance & support</li>
            </ul>
            <button 
              className="form-btn secondary"
              onClick={() => openForm('jobSupport')}
            >
              Get Job Support
            </button>
          </div>

          <div className="form-option">
            <div className="form-icon">📚</div>
            <h3>Final Year Project</h3>
            <p>Make your final year project stand out with expert guidance and mentorship.</p>
            <ul className="form-features">
              <li>✅ Project topic selection</li>
              <li>✅ Technical implementation guide</li>
              <li>✅ Presentation & documentation help</li>
            </ul>
            <button 
              className="form-btn secondary"
              onClick={() => openForm('finalYear')}
            >
              Project Guidance
            </button>
          </div>

          <div className="form-option">
            <div className="form-icon">💬</div>
            <h3>General Inquiry</h3>
            <p>Have questions? Want to learn more? Get in touch and we'll respond within 24 hours.</p>
            <ul className="form-features">
              <li>✅ Quick response guaranteed</li>
              <li>✅ Free consultation call</li>
              <li>✅ No obligation</li>
            </ul>
            <button 
              className="form-btn outline"
              onClick={() => openForm('contact')}
            >
              Ask Questions
            </button>
          </div>
        </div>

        <div className="form-benefits">
          <div className="benefit">
            <span className="benefit-icon">🔒</span>
            <div className="benefit-text">
              <h4>Secure & Private</h4>
              <p>Your information is protected by Google's enterprise security</p>
            </div>
          </div>
          <div className="benefit">
            <span className="benefit-icon">⚡</span>
            <div className="benefit-text">
              <h4>Quick Response</h4>
              <p>We typically respond within 2-4 hours during business days</p>
            </div>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🎯</span>
            <div className="benefit-text">
              <h4>Personalized Approach</h4>
              <p>Every response is tailored to your specific needs and goals</p>
            </div>
          </div>
        </div>

        <div className="alternative-contact">
          <h3>Prefer Direct Contact?</h3>
          <div className="contact-options">
            <a 
              href="https://wa.me/918249225305" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-option whatsapp"
            >
              <span className="contact-icon">📱</span>
              <div className="contact-info">
                <strong>WhatsApp</strong>
                <span>+91 8249225305</span>
              </div>
            </a>
            <a 
              href="mailto:contact@intellivia.com"
              className="contact-option email"
            >
              <span className="contact-icon">📧</span>
              <div className="contact-info">
                <strong>Email</strong>
                <span>contact@intellivia.com</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleFormSection;
