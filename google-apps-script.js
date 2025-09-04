/*
 * Google Apps Script for Contact Form Submission
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Paste this code into the editor
 * 4. Create a new Google Sheet for storing responses
 * 5. Update the SHEET_ID and SHEET_NAME below
 * 6. Deploy as a web app with execute permissions for "Anyone"
 * 7. Copy the web app URL and update it in ContactForm.jsx
 */

// Configuration
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Contact Form Responses'; // Name of the sheet tab

/**
 * Handle POST requests from the contact form
 */
function doPost(e) {
  try {
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Log the received data for debugging
    console.log('Received data:', data);
    
    // Verify CAPTCHA was completed (basic check)
    if (!data.captchaVerified) {
      console.log('CAPTCHA not verified');
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'CAPTCHA verification failed'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Additional spam protection checks
    if (!isValidSubmission(data)) {
      console.log('Invalid submission detected');
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Invalid submission detected'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Write to Google Sheet
    writeToSheet(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to process form submission'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Contact Form API is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Write form data to Google Sheet
 */
function writeToSheet(data) {
  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Add headers
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Course',
        'Experience',
        'Message'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.course || '',
      data.experience || '',
      data.message || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    console.log('Data written to sheet successfully');
    
    // Optional: Send email notification
    sendEmailNotification(data);
    
  } catch (error) {
    console.error('Error writing to sheet:', error);
    throw error;
  }
}

/**
 * Send email notification (optional)
 */
function sendEmailNotification(data) {
  try {
    const subject = `New Contact Form Submission - ${data.name}`;
    const body = `
New contact form submission received:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Course Interest: ${data.course}
Experience: ${data.experience}
Message: ${data.message}

Submitted at: ${data.timestamp}
    `;
    
    // Replace with your email address
    const emailAddress = 'your-email@gmail.com';
    
    // Uncomment the line below to enable email notifications
    // MailApp.sendEmail(emailAddress, subject, body);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

/**
 * Additional spam protection checks
 */
function isValidSubmission(data) {
  // Check for required fields
  if (!data.name || !data.email || !data.phone || !data.course) {
    return false;
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\b(viagra|casino|lottery|winner|million|prize)\b/i,
    /\b(click here|buy now|limited time)\b/i,
    /https?:\/\/[^\s]+/g // Multiple URLs
  ];
  
  const textToCheck = `${data.name} ${data.email} ${data.message}`.toLowerCase();
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(textToCheck)) {
      return false;
    }
  }
  
  // Check for excessive length (possible spam)
  if (data.message && data.message.length > 2000) {
    return false;
  }
  
  // Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return false;
  }
  
  // Rate limiting - check if same email submitted recently
  if (isRateLimited(data.email)) {
    return false;
  }
  
  return true;
}

/**
 * Simple rate limiting check
 */
function isRateLimited(email) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) return false;
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
    
    const data = sheet.getDataRange().getValues();
    let recentSubmissions = 0;
    
    for (let i = data.length - 1; i >= 1; i--) {
      const row = data[i];
      const timestamp = new Date(row[0]);
      const submittedEmail = row[2]; // Email column
      
      if (timestamp < oneHourAgo) break;
      
      if (submittedEmail === email) {
        recentSubmissions++;
      }
    }
    
    // Allow max 3 submissions per hour from same email
    return recentSubmissions >= 3;
    
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return false; // Allow submission if we can't check
  }
}
