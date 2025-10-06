/**
 * Google Apps Script for saving user records to Google Sheets
 * 
 * Setup Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a Google Sheet and copy its ID from the URL
 * 5. Update the SPREADSHEET_ID below
 * 6. Deploy as web app with execute permissions for "Anyone"
 */

// Replace this with your Google Sheet ID (from the URL)
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('SVG_D3_Records');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet('SVG_D3_Records');
      
      // Add headers
      const headers = [
        'Timestamp',
        'Session ID',
        'Operation Type',
        'Input Source',
        'Example Type',
        'Manipulation Type',
        'Model',
        'Provider',
        'Duration (s)',
        'Success',
        'Error Message',
        'Prompt',
        'Input SVG Length',
        'Result Length',
        'Input SVG (full text)',
        'Result (full text)'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
    }
    
    // Prepare row data
    const timestamp = new Date(data.timestamp).toLocaleString('ko-KR');
    const inputSvgFull = data.inputSvg || '';
    const resultFull = data.result || '';
    
    const rowData = [
      timestamp,
      data.sessionId || '',
      data.operationType || '',
      data.inputSource || '',
      data.exampleType || '',
      data.manipulationType || '',
      data.model || '',
      data.provider || '',
      data.duration || '',
      data.success ? 'Yes' : 'No',
      data.errorMessage || '',
      data.prompt || '',
      data.inputSvg ? data.inputSvg.length : 0,
      data.result ? data.result.length : 0,
      inputSvgFull,
      resultFull
    ];
    
    // Add new row
    sheet.appendRow(rowData);
    
    // Auto-resize columns for new data
    sheet.autoResizeColumns(1, rowData.length);
    
    // Add conditional formatting for success/failure
    const lastRow = sheet.getLastRow();
    const successColumn = 10; // Column J
    const successRange = sheet.getRange(lastRow, successColumn);
    
    if (data.success) {
      successRange.setBackground('#d9ead3'); // Light green
    } else {
      successRange.setBackground('#f4cccc'); // Light red
    }
    
    // Add borders to new row
    const newRowRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    newRowRange.setBorder(true, true, true, true, true, true);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        rowNumber: lastRow,
        message: 'Record added to Google Sheets successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('SVG to D3 Records API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}