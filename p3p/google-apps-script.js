/**
 * Google Apps Script for saving user records to Google Drive
 * 
 * Setup Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Save the project
 * 5. Deploy as web app with execute permissions for "Anyone"
 * 6. Copy the web app URL and replace YOUR_SCRIPT_ID in the HTML file
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Create a folder for storing records (if it doesn't exist)
    const folderName = 'SVG_D3_Records';
    let folder = getOrCreateFolder(folderName);
    
    // Create a subfolder for the session
    const sessionFolderName = data.sessionId || 'unknown_session';
    let sessionFolder = getOrCreateFolder(sessionFolderName, folder.getId());
    
    // Save the record as a JSON file
    const fileName = `${data.timestamp}_${data.manipulationType}.json`;
    const fileContent = JSON.stringify(data, null, 2);
    
    // Create the file
    const file = DriveApp.createFile(fileName, fileContent, 'application/json');
    
    // Move file to session folder
    file.moveTo(sessionFolder);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, fileId: file.getId()}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error saving record:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder(folderName, parentFolderId = null) {
  let folders;
  
  if (parentFolderId) {
    const parentFolder = DriveApp.getFolderById(parentFolderId);
    folders = parentFolder.getFoldersByName(folderName);
  } else {
    folders = DriveApp.getFoldersByName(folderName);
  }
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    if (parentFolderId) {
      const parentFolder = DriveApp.getFolderById(parentFolderId);
      return parentFolder.createFolder(folderName);
    } else {
      return DriveApp.createFolder(folderName);
    }
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('SVG to D3 Records API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
