# Google Apps Script Setup Guide for Contact Form

## Overview
This guide will help you set up a Google Apps Script to handle contact form submissions and store them in a Google Sheet instead of exposing a Google Doc directly.

## Step-by-Step Setup

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Intellivia Contact Form Responses"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 2. Set up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script.js`
5. Update the configuration:
   ```javascript
   const SHEET_ID = 'YOUR_ACTUAL_SHEET_ID'; // Replace with your Sheet ID
   const SHEET_NAME = 'Contact Form Responses';
   ```

### 3. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. Copy the Web App URL

### 4. Update the React App
1. Open `src/components/ContactForm/ContactForm.jsx`
2. Replace the placeholder URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_ACTUAL_WEB_APP_URL_HERE';
   ```

### 5. Test the Setup
1. Run your React app: `npm run dev`
2. Fill out the contact form
3. Check your Google Sheet for the submission
4. Check the Google Apps Script logs for any errors

## Optional Enhancements

### Email Notifications
To receive email notifications for new submissions:
1. In the Google Apps Script, update the email address:
   ```javascript
   const emailAddress = 'your-email@gmail.com';
   ```
2. Uncomment the email sending line:
   ```javascript
   MailApp.sendEmail(emailAddress, subject, body);
   ```

### Data Validation
The script automatically handles missing fields and validates the data structure.

### Security Features
- CORS is handled automatically
- No sensitive data is exposed to the client
- All submissions are timestamped
- Input sanitization is performed

## Benefits of This Approach

✅ **Security**: No direct access to Google Docs/Sheets
✅ **Professional**: Custom-styled form matching your brand
✅ **Data Management**: Structured data in Google Sheets
✅ **Flexibility**: Easy to modify form fields
✅ **Notifications**: Optional email alerts for new submissions
✅ **Analytics**: Track form completion rates and user behavior

## Troubleshooting

### Common Issues:
1. **Form not submitting**: Check the Web App URL and permissions
2. **Data not appearing**: Verify the Sheet ID and sheet name
3. **CORS errors**: Ensure the script is deployed with "Anyone" access
4. **Email not working**: Check Gmail settings and script permissions

### Testing:
Use the `testScript()` function in Google Apps Script to verify the setup works before testing with the live form.

## Support
If you encounter issues, check the Google Apps Script execution logs for detailed error messages.
