import React, { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './ContactForm.css';

const ContactForm = () => {
  // Popular country codes for international students
  const countryCodes = [
    { code: '+1', country: 'US/Canada', flag: '🇺🇸' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    course: '',
    experience: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  // CAPTCHA states
  const [mathCaptcha, setMathCaptcha] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef();

  // Configuration - choose your preferred CAPTCHA method
  const USE_GOOGLE_RECAPTCHA = false; // Set to true to use Google reCAPTCHA
  const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY_HERE"; // Add your reCAPTCHA site key

  // Generate math CAPTCHA
  useEffect(() => {
    generateMathCaptcha();
  }, []);

  const generateMathCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let question, answer;
    
    switch(operator) {
      case '+':
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
        break;
      case '-':
        // Ensure positive result
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        question = `${larger} - ${smaller}`;
        answer = larger - smaller;
        break;
      case '×':
        question = `${num1} × ${num2}`;
        answer = num1 * num2;
        break;
      default:
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
    }
    
    setMathCaptcha({ question, answer });
    setUserAnswer('');
    setCaptchaVerified(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCaptchaAnswer = (e) => {
    const answer = e.target.value;
    setUserAnswer(answer);
    setCaptchaVerified(parseInt(answer) === mathCaptcha.answer);
  };

  const onReCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
      setSubmitStatus('validation');
      return false;
    }
    
    if (!captchaVerified) {
      setSubmitStatus('captcha');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace this URL with your Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode} ${formData.phone}`, // Combine country code with phone
          timestamp: new Date().toISOString(),
          captchaVerified: true // We've already verified the CAPTCHA
        })
      });

      // Since mode is 'no-cors', we can't read the response
      // We'll assume success if no error is thrown
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        countryCode: '+1',
        phone: '',
        course: '',
        experience: '',
        message: ''
      });
      
      // Reset CAPTCHA
      generateMathCaptcha();
      if (USE_GOOGLE_RECAPTCHA && recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit} role="form" aria-labelledby="contact-form-title">
        <h3 id="contact-form-title" className="sr-only">Contact Form</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              aria-describedby="name-error"
              aria-invalid={!formData.name && submitStatus === 'error' ? 'true' : 'false'}
            />
            <div id="name-error" className="sr-only" aria-live="polite"></div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <div className="phone-input-container">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="country-code-select"
                required
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code} {country.country}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="phone-number-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="course">Course of Interest *</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select a course</option>
              <option value="Java">Java Development</option>
              <option value="React">React Development</option>
              <option value="Angular">Angular Development</option>
              <option value="Full Stack">Full Stack Development</option>
              <option value="Job Support">Job Support</option>
              <option value="Final Year Projects">Final Year Projects</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Programming Experience</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option value="">Select your experience level</option>
            <option value="Beginner">Beginner (0-1 years)</option>
            <option value="Intermediate">Intermediate (1-3 years)</option>
            <option value="Advanced">Advanced (3+ years)</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about your goals and how we can help you..."
          ></textarea>
        </div>

        {/* CAPTCHA Section */}
        <div className="captcha-section">
          {USE_GOOGLE_RECAPTCHA ? (
            // Google reCAPTCHA
            <div className="form-group">
              <label>Security Verification *</label>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onReCaptchaChange}
                theme="light"
              />
            </div>
          ) : (
            // Math CAPTCHA
            <div className="form-group">
              <label htmlFor="captcha">Security Check: What is {mathCaptcha.question}? *</label>
              <div className="captcha-container">
                <input
                  type="number"
                  id="captcha"
                  value={userAnswer}
                  onChange={handleCaptchaAnswer}
                  placeholder="Enter the answer"
                  className={captchaVerified ? 'captcha-correct' : userAnswer ? 'captcha-incorrect' : ''}
                  required
                />
                <button
                  type="button"
                  className="captcha-refresh"
                  onClick={generateMathCaptcha}
                  title="Generate new question"
                >
                  🔄
                </button>
                {captchaVerified && <span className="captcha-success">✓</span>}
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting || !captchaVerified}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            'Send Message'
          )}
        </button>

        {submitStatus === 'validation' && (
          <div className="status-message error">
            ❌ Please fill in all required fields.
          </div>
        )}

        {submitStatus === 'captcha' && (
          <div className="status-message error">
            ❌ Please complete the security verification.
          </div>
        )}

        {submitStatus === 'success' && (
          <div className="status-message success">
            ✅ Thank you! Your message has been sent successfully. We'll get back to you soon!
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="status-message error">
            ❌ Sorry, there was an error sending your message. Please try again or contact us on WhatsApp.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
