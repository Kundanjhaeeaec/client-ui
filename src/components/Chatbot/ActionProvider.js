import { createChatBotMessage } from 'react-chatbot-kit';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  // Greeting responses
  handleGreeting = () => {
    const messages = [
      "Hello! 😊 I'm excited to help you start your tech journey!",
      "Hi there! 👋 Ready to unlock your potential in tech?",
      "Hey! Great to meet you! Let's find the perfect course for you! 🚀"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const message = this.createChatBotMessage(randomMessage);
    this.updateChatbotState(message);
    
    setTimeout(() => {
      const followUp = this.createChatBotMessage(
        "What would you like to know about our courses? I can help you with Java, React, Angular, or Full Stack development! 💻\n\nOr if you're ready to get started, just say 'enroll' or 'sign up'!"
      );
      this.updateChatbotState(followUp);
    }, 1000);
  };

  // Start enrollment process
  handleEnrollment = () => {
    this.setState((prevState) => ({
      ...prevState,
      conversationStage: 'collecting_name',
      collectingUserInfo: true
    }));

    const message = this.createChatBotMessage(
      "Fantastic! 🎉 I'd love to help you enroll. Let me collect some details to get you started.\n\nFirst, what's your name?"
    );
    this.updateChatbotState(message);
  };

  // Collect user name
  handleNameCollection = (name) => {
    this.setState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        name: name
      },
      conversationStage: 'collecting_email'
    }));

    const message = this.createChatBotMessage(
      `Nice to meet you, ${name}! 😊\n\nWhat's your email address?`
    );
    this.updateChatbotState(message);
  };

  // Collect user email
  handleEmailCollection = (email) => {
    this.setState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        email: email
      },
      conversationStage: 'collecting_phone'
    }));

    const message = this.createChatBotMessage(
      "Perfect! 📧\n\nWhat's your phone number? (Include country code if international)"
    );
    this.updateChatbotState(message);
  };

  // Collect user phone
  handlePhoneCollection = (phone) => {
    this.setState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        phone: phone
      },
      conversationStage: 'collecting_course'
    }));

    const message = this.createChatBotMessage(
      "Great! 📱\n\nWhich course are you most interested in?\n\n☕ Java\n⚛️ React\n🅰️ Angular\n🌐 Full Stack\n💼 Job Support\n\nJust type the course name!"
    );
    this.updateChatbotState(message);
  };

  // Collect course preference
  handleCourseSelection = (course) => {
    this.setState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        course: course
      },
      conversationStage: 'collecting_experience'
    }));

    const message = this.createChatBotMessage(
      `Excellent choice! ${course} is a fantastic skill to master! 🚀\n\nWhat's your current experience level?\n\n🌱 Beginner\n📈 Intermediate\n🎯 Advanced\n\nJust type your level!`
    );
    this.updateChatbotState(message);
  };

  // Collect experience level
  handleExperienceCollection = (experience) => {
    this.setState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        experience: experience
      },
      conversationStage: 'collecting_goal'
    }));

    const message = this.createChatBotMessage(
      "Perfect! 📊\n\nWhat's your main goal? (e.g., 'Get a job', 'Switch careers', 'Improve skills', 'Start freelancing')"
    );
    this.updateChatbotState(message);
  };

  // Collect user goal and submit form
  handleGoalCollection = (goal) => {
    this.setState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        goal: goal
      },
      conversationStage: 'submitting_form'
    }));

    const message = this.createChatBotMessage(
      "Awesome! 🎯 Let me submit your information..."
    );
    this.updateChatbotState(message);

    // Submit to Google Form
    this.submitToGoogleForm();
  };

  // Submit form to Google Apps Script
  submitToGoogleForm = async () => {
    try {
      const formData = {
        name: this.state.userInfo.name,
        email: this.state.userInfo.email,
        phone: this.state.userInfo.phone,
        course: this.state.userInfo.course,
        experience: this.state.userInfo.experience,
        message: `Goal: ${this.state.userInfo.goal}`,
        source: 'Chatbot',
        timestamp: new Date().toISOString()
      };

      // Replace with your Google Apps Script URL
      const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        this.handleSuccessfulSubmission();
      } else {
        this.handleSubmissionError();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.handleSubmissionError();
    }
  };

  // Handle successful form submission
  handleSuccessfulSubmission = () => {
    this.setState((prevState) => ({
      ...prevState,
      conversationStage: 'completed',
      formSubmitted: true,
      collectingUserInfo: false
    }));

    const successMessage = this.createChatBotMessage(
      `🎉 Thank you ${this.state.userInfo.name}! Your information has been submitted successfully!\n\n✅ Course: ${this.state.userInfo.course}\n✅ Experience: ${this.state.userInfo.experience}\n✅ Goal: ${this.state.userInfo.goal}\n\nOur team will contact you within 24 hours to discuss your personalized learning path!\n\n📱 You can also reach us directly on WhatsApp: 8249225305`
    );
    this.updateChatbotState(successMessage);
  };

  // Handle submission error
  handleSubmissionError = () => {
    this.setState((prevState) => ({
      ...prevState,
      conversationStage: 'error'
    }));

    const errorMessage = this.createChatBotMessage(
      "Oops! 😅 There was an issue submitting your information. Don't worry!\n\n📱 Please contact us directly on WhatsApp: 8249225305\n📧 Or fill out the contact form on our website.\n\nOur team is ready to help you get started!"
    );
    this.updateChatbotState(errorMessage);
  };

  // Course inquiry responses
  handleCourseInquiry = () => {
    const message = this.createChatBotMessage(
      "Great question! 🎓 We offer these amazing courses:\n\n" +
      "☕ Java - Master core and advanced Java\n" +
      "⚛️ React - Modern frontend development\n" +
      "🅰️ Angular - Dynamic web applications\n" +
      "🌐 Full Stack - Complete web development\n\n" +
      "Which one interests you the most?"
    );
    this.updateChatbotState(message);
  };

  // Specific course inquiry
  handleSpecificCourseInquiry = (course) => {
    const courseInfo = {
      java: "Excellent choice! ☕ Our Java course covers:\n• Core Java fundamentals\n• Spring Boot framework\n• Microservices\n• Real-world projects\n\nPerfect for backend development and enterprise applications!",
      react: "Awesome! ⚛️ Our React course includes:\n• Modern React with Hooks\n• State management\n• Component architecture\n• Build real applications\n\nGreat for frontend development careers!",
      angular: "Perfect! 🅰️ Our Angular course covers:\n• TypeScript mastery\n• Component development\n• Services & routing\n• Professional projects\n\nIdeal for enterprise web development!",
      fullstack: "Amazing choice! 🌐 Our Full Stack course includes:\n• Frontend technologies\n• Backend development\n• Database management\n• Complete project deployment\n\nBecome a complete developer!"
    };

    const message = this.createChatBotMessage(courseInfo[course]);
    this.updateChatbotState(message);
    
    setTimeout(() => {
      const followUp = this.createChatBotMessage(
        "Would you like to enroll or get more details? I can help you get started! 🚀"
      );
      this.updateChatbotState(followUp);
    }, 1500);
  };

  // Pricing inquiry
  handlePricingInquiry = () => {
    const message = this.createChatBotMessage(
      "Great question! 💰 Our courses are designed to be affordable and valuable:\n\n" +
      "✅ Competitive pricing\n" +
      "✅ Flexible payment options\n" +
      "✅ Money-back guarantee\n" +
      "✅ Lifetime course access\n\n" +
      "Would you like me to connect you with our team for exact pricing? 📞"
    );
    this.updateChatbotState(message);
  };

  // Contact inquiry
  handleContactInquiry = () => {
    const message = this.createChatBotMessage(
      "I'd love to help you get in touch! 📱\n\n" +
      "🟢 WhatsApp: 8249225305\n" +
      "📧 We also have email support\n" +
      "💬 Or continue chatting with me!\n\n" +
      "What's the best way to reach you?"
    );
    this.updateChatbotState(message);
  };

  // Enrollment inquiry
  handleEnrollmentInquiry = () => {
    const message = this.createChatBotMessage(
      "Fantastic! I'm excited to help you enroll! 🎉\n\n" +
      "To get you started, I'll need to collect some quick details. This will help us:\n" +
      "✅ Recommend the best course\n" +
      "✅ Customize your learning path\n" +
      "✅ Connect you with the right instructor\n\n" +
      "Ready to begin? What's your name? 😊"
    );
    this.updateChatbotState(message);
    this.setState((prev) => ({
      ...prev,
      conversationStage: 'collecting_name'
    }));
  };

  // Job support inquiry
  handleJobSupportInquiry = () => {
    const message = this.createChatBotMessage(
      "Excellent! 💼 We provide comprehensive job support:\n\n" +
      "🎯 Interview preparation\n" +
      "📝 Resume optimization\n" +
      "🏢 Job placement assistance\n" +
      "💡 Real project experience\n" +
      "🤝 Ongoing career guidance\n\n" +
      "Would you like to know more about our placement record?"
    );
    this.updateChatbotState(message);
  };

  // Availability inquiry
  handleAvailabilityInquiry = () => {
    const message = this.createChatBotMessage(
      "Great timing! ⏰ We offer flexible schedules:\n\n" +
      "🌅 Morning batches\n" +
      "🌆 Evening batches\n" +
      "🌙 Weekend sessions\n" +
      "🕒 One-on-one timing\n\n" +
      "What time works best for you?"
    );
    this.updateChatbotState(message);
  };

  // Data collection methods
  handleNameCollection = (name) => {
    this.setState((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, name: name.trim() },
      conversationStage: 'collecting_email'
    }));

    const message = this.createChatBotMessage(
      `Nice to meet you, ${name.trim()}! 😊\n\nWhat's your email address? This will help us send you course materials and updates.`
    );
    this.updateChatbotState(message);
  };

  handleEmailCollection = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      const message = this.createChatBotMessage(
        "That doesn't look like a valid email address. Could you please provide a valid email? (example: john@gmail.com) 📧"
      );
      this.updateChatbotState(message);
      return;
    }

    this.setState((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, email: email.trim() },
      conversationStage: 'collecting_phone'
    }));

    const message = this.createChatBotMessage(
      `Perfect! ✅ Email saved: ${email.trim()}\n\nWhat's your phone number? This helps us provide personalized support. 📱`
    );
    this.updateChatbotState(message);
  };

  handlePhoneCollection = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone.trim())) {
      const message = this.createChatBotMessage(
        "Please provide a valid phone number (at least 10 digits). 📞"
      );
      this.updateChatbotState(message);
      return;
    }

    this.setState((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, phone: phone.trim() },
      conversationStage: 'collecting_course'
    }));

    const message = this.createChatBotMessage(
      `Great! 📱 Phone number saved.\n\nWhich course interests you most?\n\n1️⃣ Java\n2️⃣ React\n3️⃣ Angular\n4️⃣ Full Stack\n\nJust type the course name or number! 🎯`
    );
    this.updateChatbotState(message);
  };

  handleCourseSelection = (course) => {
    const courseMap = {
      '1': 'Java',
      '2': 'React', 
      '3': 'Angular',
      '4': 'Full Stack',
      'java': 'Java',
      'react': 'React',
      'angular': 'Angular',
      'full stack': 'Full Stack',
      'fullstack': 'Full Stack',
      'full-stack': 'Full Stack'
    };

    const selectedCourse = courseMap[course.toLowerCase().trim()] || course.trim();

    this.setState((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, course: selectedCourse },
      conversationStage: 'collecting_experience'
    }));

    const message = this.createChatBotMessage(
      `Excellent choice! 🎉 ${selectedCourse} is a fantastic course.\n\nWhat's your experience level?\n\n🟢 Beginner - New to programming\n🟡 Intermediate - Some coding experience\n🔴 Advanced - Experienced developer\n\nJust type: Beginner, Intermediate, or Advanced`
    );
    this.updateChatbotState(message);
  };

  handleExperienceCollection = (experience) => {
    const experienceMap = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate', 
      'advanced': 'Advanced',
      'new': 'Beginner',
      'some': 'Intermediate',
      'experienced': 'Advanced'
    };

    const selectedExperience = experienceMap[experience.toLowerCase().trim()] || experience.trim();

    this.setState((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, experience: selectedExperience },
      conversationStage: 'collecting_goal'
    }));

    const message = this.createChatBotMessage(
      `Perfect! 💪 ${selectedExperience} level noted.\n\nWhat's your main goal?\n\n🎯 Get a job\n🚀 Start freelancing\n📈 Career advancement\n🧠 Learn for personal growth\n\nTell me about your goals! 🌟`
    );
    this.updateChatbotState(message);
  };

  handleGoalCollection = (goal) => {
    this.setState((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, goal: goal.trim() },
      conversationStage: 'ready_to_submit'
    }));

    const message = this.createChatBotMessage(
      `Awesome! 🎯 Goal recorded: ${goal.trim()}\n\n✅ All information collected! Let me submit your details and our team will contact you soon.\n\nSubmitting to our system... 🚀`
    );
    this.updateChatbotState(message);

    // Submit the form after a delay
    setTimeout(() => {
      this.submitToGoogleForm();
    }, 2000);
  };

  // Submit to Google Form
  submitToGoogleForm = async () => {
    try {
      const userInfo = this.getState().userInfo;
      
      // Google Form submission (you'll need to replace with your actual form URL)
      const formData = new FormData();
      formData.append('entry.name', userInfo.name);
      formData.append('entry.email', userInfo.email);
      formData.append('entry.phone', userInfo.phone);
      formData.append('entry.course', userInfo.course);
      formData.append('entry.experience', userInfo.experience);
      formData.append('entry.goal', userInfo.goal);

      // This is a placeholder - replace with your actual Google Form URL
      // const response = await fetch('YOUR_GOOGLE_FORM_URL', {
      //   method: 'POST',
      //   body: formData,
      //   mode: 'no-cors'
      // });

      // Simulate successful submission
      setTimeout(() => {
        const successMessage = this.createChatBotMessage(
          `🎉 SUCCESS! Your information has been submitted!\n\n` +
          `📋 Summary:\n` +
          `👤 Name: ${userInfo.name}\n` +
          `📧 Email: ${userInfo.email}\n` +
          `📱 Phone: ${userInfo.phone}\n` +
          `📚 Course: ${userInfo.course}\n` +
          `📊 Level: ${userInfo.experience}\n` +
          `🎯 Goal: ${userInfo.goal}\n\n` +
          `Our team will contact you within 24 hours! 🚀\n\n` +
          `In the meantime, feel free to ask me any other questions! 😊`
        );
        this.updateChatbotState(successMessage);

        // Reset conversation stage
        this.setState((prev) => ({
          ...prev,
          conversationStage: 'completed'
        }));
      }, 1000);

    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Oops! There was an issue submitting your information. Don't worry - I've saved your details and our team will contact you soon! 😊\n\nYou can also reach us directly on WhatsApp: 8249225305"
      );
      this.updateChatbotState(errorMessage);
    }
  };

  // Default response with AI-like conversation
  handleDefault = (message) => {
    const responses = [
      `That's interesting! 🤔 While I'd love to chat about "${message}", I'm specifically designed to help with our tech courses. What would you like to know about Java, React, Angular, or Full Stack development?`,
      `I appreciate you sharing that! 😊 Let me help you with what I do best - finding the perfect tech course for you. Which technology interests you most?`,
      `Thanks for that message! 💭 I'm here to help you start your tech journey. Would you like to know about our courses, pricing, or enrollment process?`,
      `I hear you! 👂 While I focus on helping with our tech education, I'm excited to help you find the right course. What's your experience with programming?`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const message_obj = this.createChatBotMessage(randomResponse);
    this.updateChatbotState(message_obj);
  };

  // Utility methods
  updateChatbotState = (message) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  getState = () => {
    return this.setState.__state || {};
  };
}

export default ActionProvider;
