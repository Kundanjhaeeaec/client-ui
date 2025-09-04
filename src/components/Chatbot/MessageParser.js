class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    
    // Course-related keywords
    const courseKeywords = {
      java: ['java', 'spring', 'spring boot', 'maven', 'hibernate'],
      react: ['react', 'jsx', 'hooks', 'frontend', 'front-end', 'javascript', 'js'],
      angular: ['angular', 'typescript', 'ts', 'ng'],
      fullstack: ['full stack', 'fullstack', 'full-stack', 'backend', 'back-end', 'database', 'api']
    };

    // Intent detection
    const intents = {
      greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
      courses: ['course', 'learn', 'study', 'training', 'class', 'program'],
      pricing: ['price', 'cost', 'fee', 'how much', 'payment', 'affordable'],
      contact: ['contact', 'phone', 'call', 'whatsapp', 'reach', 'talk'],
      help: ['help', 'assist', 'support', 'guide'],
      availability: ['available', 'schedule', 'time', 'when', 'start'],
      experience: ['experience', 'background', 'level', 'beginner', 'intermediate', 'advanced'],
      job: ['job', 'career', 'placement', 'interview', 'work'],
      enrollment: ['enroll', 'sign up', 'register', 'join', 'apply', 'get started', 'start now'],
      name: ['name is', 'call me', "i'm", 'my name'],
      email: ['email', '@', 'gmail', 'yahoo', 'outlook'],
      phone: ['phone', 'number', 'mobile', 'contact number']
    };

    // Check current conversation stage
    const currentStage = this.state.conversationStage;
    
    // Handle enrollment flow
    if (currentStage === 'collecting_name') {
      this.actionProvider.handleNameCollection(message);
      return;
    }
    
    if (currentStage === 'collecting_email') {
      // Basic email validation
      if (message.includes('@') && message.includes('.')) {
        this.actionProvider.handleEmailCollection(message);
      } else {
        this.actionProvider.updateChatbotState(
          this.actionProvider.createChatBotMessage("Please enter a valid email address (example: john@gmail.com)")
        );
      }
      return;
    }
    
    if (currentStage === 'collecting_phone') {
      // Basic phone validation
      const phoneRegex = /[\d\+\-\(\)\s]{8,}/;
      if (phoneRegex.test(message)) {
        this.actionProvider.handlePhoneCollection(message);
      } else {
        this.actionProvider.updateChatbotState(
          this.actionProvider.createChatBotMessage("Please enter a valid phone number (example: +1234567890 or 1234567890)")
        );
      }
      return;
    }
    
    if (currentStage === 'collecting_course') {
      // Match course selection
      let selectedCourse = '';
      if (lowerCaseMessage.includes('java')) selectedCourse = 'Java';
      else if (lowerCaseMessage.includes('react')) selectedCourse = 'React';
      else if (lowerCaseMessage.includes('angular')) selectedCourse = 'Angular';
      else if (lowerCaseMessage.includes('full stack') || lowerCaseMessage.includes('fullstack')) selectedCourse = 'Full Stack';
      else if (lowerCaseMessage.includes('job support') || lowerCaseMessage.includes('job')) selectedCourse = 'Job Support';
      
      if (selectedCourse) {
        this.actionProvider.handleCourseSelection(selectedCourse);
      } else {
        this.actionProvider.updateChatbotState(
          this.actionProvider.createChatBotMessage("Please choose from: Java, React, Angular, Full Stack, or Job Support")
        );
      }
      return;
    }
    
    if (currentStage === 'collecting_experience') {
      let experienceLevel = '';
      if (lowerCaseMessage.includes('beginner') || lowerCaseMessage.includes('new') || lowerCaseMessage.includes('starter')) {
        experienceLevel = 'Beginner';
      } else if (lowerCaseMessage.includes('intermediate') || lowerCaseMessage.includes('some') || lowerCaseMessage.includes('medium')) {
        experienceLevel = 'Intermediate';
      } else if (lowerCaseMessage.includes('advanced') || lowerCaseMessage.includes('expert') || lowerCaseMessage.includes('experienced')) {
        experienceLevel = 'Advanced';
      }
      
      if (experienceLevel) {
        this.actionProvider.handleExperienceCollection(experienceLevel);
      } else {
        this.actionProvider.updateChatbotState(
          this.actionProvider.createChatBotMessage("Please choose: Beginner, Intermediate, or Advanced")
        );
      }
      return;
    }
    
    if (currentStage === 'collecting_goal') {
      this.actionProvider.handleGoalCollection(message);
      return;
    }

    // Normal conversation flow
    // Check for enrollment intent
    if (this.checkIntent(lowerCaseMessage, intents.enrollment)) {
      this.actionProvider.handleEnrollment();
      return;
    }

    // Intent-based responses for general conversation
    if (this.checkIntent(lowerCaseMessage, intents.greeting)) {
      this.actionProvider.handleGreeting();
    } else if (this.checkIntent(lowerCaseMessage, intents.courses)) {
      this.actionProvider.handleCourseInquiry();
    } else if (this.checkIntent(lowerCaseMessage, intents.pricing)) {
      this.actionProvider.handlePricingInquiry();
    } else if (this.checkIntent(lowerCaseMessage, intents.contact)) {
      this.actionProvider.handleContactInquiry();
    } else if (this.checkIntent(lowerCaseMessage, intents.availability)) {
      this.actionProvider.handleAvailabilityInquiry();
    } else if (this.checkIntent(lowerCaseMessage, intents.job)) {
      this.actionProvider.handleJobSupportInquiry();
    } else if (this.detectCourseInterest(lowerCaseMessage, courseKeywords)) {
      const course = this.detectCourseInterest(lowerCaseMessage, courseKeywords);
      this.actionProvider.handleSpecificCourseInquiry(course);
    } else {
      this.actionProvider.handleDefault(message);
    }
  }

  checkIntent(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  containsKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  detectCourseInterest(message, courseKeywords) {
    for (const [course, keywords] of Object.entries(courseKeywords)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return course;
      }
    }
    return null;
  }
}

export default MessageParser;
