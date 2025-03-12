# NeuroConnect Website

This is the website for NeuroConnect, an organization dedicated to empowering special needs families, schools, and individuals across Kenya, Uganda, Tanzania, Sudan, and Rwanda.

## Webinar Registration Google Sheets Integration

The webinar registration form on this website is set up to send registration data directly to a Google Sheet. Follow these steps to set up the integration:

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the spreadsheet to "NeuroConnect Webinar Registrations"
3. The first row will be automatically populated with headers when the first registration is submitted

### Step 2: Set up Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. Delete any code in the editor and paste the contents of the `google-apps-script.js` file from this repository
3. Click **Save** and give your project a name (e.g., "NeuroConnect Webinar Registration Handler")

### Step 3: Deploy as a Web App

1. Click on **Deploy** > **New deployment**
2. Select **Web app** as the deployment type
3. Set the following options:
   - Description: "NeuroConnect Webinar Registration Handler"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone" (this allows the form to submit data without requiring users to log in)
4. Click **Deploy**
5. Copy the Web app URL that is displayed

### Step 4: Update the JavaScript File

1. Open the `js/webinar-registration.js` file in this repository
2. Find the line that says `const googleSheetURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";`
3. Replace `YOUR_SCRIPT_ID_HERE` with the ID from the Web app URL you copied
4. Save the file

### Step 5: Test the Integration

1. Use the included `test-form.html` file to test the integration directly
2. Fill out the form and submit it
3. Check your Google Sheet to make sure the data was added correctly
4. Once confirmed working, test the main website form

## Troubleshooting Form Data Issues

If you're only seeing some fields (like Registration Date and Timestamp) but not the actual form data:

### Check the Google Apps Script Logs

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Click on **Executions** in the left sidebar
3. Look for recent executions and check their logs
4. The logs should show the received parameters and any errors

### Test with the Simple Test Form

1. Open the `test-form.html` file in your browser
2. Fill out and submit the form
3. Check the response displayed on the page
4. Look at the browser console (F12) for any errors or logs

### Common Issues and Solutions

1. **CORS Issues**: If you see CORS errors in the console, the website now uses an iframe-based submission approach to avoid CORS restrictions. The Google Apps Script has been updated to include proper CORS headers in all responses.

2. **Parameter Naming**: Ensure parameter names match exactly between the JavaScript and the Google Apps Script. The most common issue is with the webinar title field - make sure the HTML form uses `name="webinarTitle"` (camelCase) and not `name="webinar-title"` (kebab-case).

3. **URL Encoding**: Make sure all parameters are properly URL encoded, especially if they contain special characters.

4. **Script Permissions**: Verify that your Google Apps Script has permission to access and modify the spreadsheet.

5. **Deployment Settings**: Ensure your web app is deployed with the correct settings (Execute as: Me, Who has access: Anyone).

6. **Query Parameter Limits**: If your form data is very large, you might hit URL length limits. Consider using POST requests instead.

7. **Script Execution Time**: Google Apps Script has execution time limits. If your script is doing too much, it might time out.

8. **Form Field IDs and Names**: Make sure the IDs and names of your form fields match what the JavaScript is looking for. Check the browser console for any errors related to null elements.

### Testing Direct URL Access

You can test the Google Apps Script directly by accessing it with a URL like:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?name=Test&email=test@example.com&phone=1234567890&referral=test&webinarTitle=Test%20Webinar&registrationDate=2023-01-01T00:00:00.000Z
```

This should add a row to your spreadsheet if everything is working correctly.

## How It Works

This integration uses an iframe-based approach to send data to Google Sheets, which avoids CORS restrictions:

1. When a user submits the form, the JavaScript collects all form data
2. A hidden iframe is created, along with a temporary form targeting that iframe
3. The form is submitted to the Google Apps Script web app URL via POST
4. The Google Apps Script processes the request and adds the data to the spreadsheet
5. A response is sent back to the iframe, which is then processed by the main page

### Fallback Mechanism

The form includes multiple fallback mechanisms in case the primary submission method fails:

1. If the iframe submission doesn't complete within 5 seconds, a fallback method is triggered
2. The fallback uses the Image object technique to send data via GET parameters
3. This approach has a higher success rate for certain network configurations
4. Even if the response can't be read due to CORS restrictions, the submission is still processed

### Visual Feedback

The form provides visual feedback to users:

1. Success messages are displayed in green
2. Error messages are displayed in red
3. Fallback attempts are displayed in yellow
4. All messages are shown in a dedicated result area below the form
5. The form automatically scrolls to show the result and then back to the webinars section after a delay

## Security Considerations

- This implementation uses a public web app URL, so anyone who knows the URL could potentially submit data to your Google Sheet
- The data is transmitted via URL parameters, which may be visible in server logs
- For higher security, consider implementing additional validation or authentication mechanisms

## Customization

You can customize the form fields and Google Sheet columns by modifying both the HTML form and the Google Apps Script file. Make sure any changes to field names are consistent between both files. 