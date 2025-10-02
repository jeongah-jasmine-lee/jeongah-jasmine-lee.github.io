# Google Drive Integration Setup

## Overview
This setup allows automatic saving of user records (input SVG, prompt, model, result) to your Google Drive without any user interaction.

## Setup Steps

### 1. Create Google Apps Script Project
1. Go to [https://script.google.com/](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script.js`
4. Save the project (Ctrl+S or Cmd+S)
5. Give it a name like "SVG D3 Records Saver"

### 2. Deploy as Web App
1. In the Apps Script editor, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. **Copy the web app URL** - you'll need this for the next step

### 3. Update the HTML File
1. Open `index.html` in your editor
2. Find this line:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. Replace `YOUR_SCRIPT_ID` with the actual script ID from your web app URL
4. Save the file

### 4. Test the Integration
1. Open your HTML file in a browser
2. Try converting an SVG to D3
3. Check your Google Drive for a new folder called "SVG_D3_Records"
4. Each session will create a subfolder with the session ID

## What Gets Saved
Each record includes:
- **timestamp**: When the operation was performed
- **inputSvg**: The original SVG code
- **prompt**: The conversion or manipulation prompt used
- **model**: The AI model used (OpenAI, Gemini, etc.)
- **result**: The generated D3 code
- **manipulationType**: Type of operation (conversion, filter, etc.)
- **sessionId**: Groups related operations together

## File Structure in Google Drive
```
SVG_D3_Records/
├── session_1234567890_abc123def/
│   ├── 2024-01-15T10:30:00.000Z_conversion.json
│   ├── 2024-01-15T10:35:00.000Z_filter.json
│   └── 2024-01-15T10:40:00.000Z_darkMode.json
└── session_1234567891_xyz789ghi/
    ├── 2024-01-15T11:00:00.000Z_conversion.json
    └── 2024-01-15T11:05:00.000Z_sort.json
```

## Troubleshooting
- If records aren't saving, check the browser console for error messages
- Make sure the Apps Script URL is correct
- Verify the Apps Script is deployed with "Anyone" access
- Check that the Apps Script has permission to access Google Drive

## Security Notes
- The Apps Script runs with your Google account permissions
- Only you can see the saved records
- The web app is set to "Anyone" access but only accepts POST requests with valid data
- No sensitive API keys are stored in the records
