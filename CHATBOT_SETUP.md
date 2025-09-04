# Chatbot Google Form Integration Setup

## Overview
Your chatbot now collects user information through a conversational flow and submits it to Google Sheets via Google Apps Script.

## Setup Steps

### 1. Update Google Apps Script URL
In `src/components/Chatbot/ActionProvider.js`, find this line:
```javascript
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

Replace it with your actual Google Apps Script web app URL.

### 2. Google Apps Script Code
Use the existing `google-apps-script.js` file in your project. The script already includes:
- Form data processing
- Anti-spam protection
- Rate limiting
- Email validation
- Data sanitization

### 3. Test the Chatbot Flow
Users can now:
1. Say "enroll", "sign up", or "get started" to begin enrollment
2. Provide their name, email, phone number
3. Select a course (Java, React, Angular, Full Stack, Job Support)
4. Choose experience level (Beginner, Intermediate, Advanced)
5. Share their goal (e.g., "Get a job", "Switch careers")
6. Automatically submit to your Google Sheet

## Chatbot Features

### 🤖 **Intelligent Conversation Flow**
- Natural language processing for user inputs
- Step-by-step data collection
- Input validation for email and phone
- Friendly, conversational tone

### 📝 **Data Collected**
- Name
- Email address
- Phone number
- Course interest
- Experience level
- Career goals
- Source: "Chatbot"
- Timestamp

### ✅ **Validation & Error Handling**
- Email format validation
- Phone number format checking
- Course selection from predefined list
- Experience level validation
- Graceful error handling with fallback to WhatsApp

### 🎯 **User Experience**
- Emoji-rich responses for engagement
- Clear instructions at each step
- Success confirmation with summary
- Fallback contact options if submission fails

## Testing Keywords

### To Start Enrollment:
- "enroll"
- "sign up"
- "register"
- "get started"
- "join"
- "apply"

### Course Options:
- "Java"
- "React"
- "Angular"
- "Full Stack" or "fullstack"
- "Job Support"

### Experience Levels:
- "Beginner", "new", "starter"
- "Intermediate", "some experience", "medium"
- "Advanced", "expert", "experienced"

## Success Flow
1. User says "enroll" → Chatbot starts data collection
2. Collects: Name → Email → Phone → Course → Experience → Goal
3. Submits to Google Apps Script
4. Shows success message with summary
5. Provides contact information for follow-up

## Error Handling
If submission fails:
- Shows friendly error message
- Provides WhatsApp contact: 8249225305
- Suggests using the website contact form
- Maintains positive user experience

## Next Steps
1. Deploy your Google Apps Script with the updated code
2. Update the `scriptURL` in ActionProvider.js
3. Test the full enrollment flow
4. Monitor submissions in your Google Sheet

Your chatbot is now a powerful lead generation tool! 🚀
