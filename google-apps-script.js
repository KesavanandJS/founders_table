// 📊 Google Apps Script - Founders Table Registration Logger
// Copy this entire code into your Google Apps Script editor

// Main function to handle POST requests from your website
function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data from the website
    const data = JSON.parse(e.postData.contents);
    
    // Append a new row with the registration data
    sheet.appendRow([
      data.timestamp,                    // Column A: Timestamp
      data.event_id,                     // Column B: Event ID
      data.event_name,                   // Column C: Event Name
      data.full_name,                    // Column D: Full Name
      data.email,                        // Column E: Email
      data.phone,                        // Column F: Phone
      data.company || 'N/A',             // Column G: Company
      data.designation || 'N/A',         // Column H: Designation
      data.amount,                       // Column I: Amount
      data.payment_id,                   // Column J: Payment ID
      data.registration_date             // Column K: Registration Date
    ]);
    
    // Add automatic formatting (optional)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const range = sheet.getRange(lastRow, 1, 1, 11);
      range.setBackground('#f0f7ff');    // Light blue background
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Registration saved successfully',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to initialize the sheet with headers
function initializeSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Only add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Event ID',
      'Event Name',
      'Full Name',
      'Email',
      'Phone',
      'Company',
      'Designation',
      'Amount',
      'Payment ID',
      'Registration Date'
    ]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 11);
    headerRange.setBackground('#1a73e8');          // Blue background
    headerRange.setFontColor('#ffffff');           // White text
    headerRange.setFontWeight('bold');             // Bold font
    
    // Set column widths
    sheet.setColumnWidth(1, 150);  // Timestamp
    sheet.setColumnWidth(2, 100);  // Event ID
    sheet.setColumnWidth(3, 150);  // Event Name
    sheet.setColumnWidth(4, 150);  // Full Name
    sheet.setColumnWidth(5, 200);  // Email
    sheet.setColumnWidth(6, 120);  // Phone
    sheet.setColumnWidth(7, 150);  // Company
    sheet.setColumnWidth(8, 150);  // Designation
    sheet.setColumnWidth(9, 100);  // Amount
    sheet.setColumnWidth(10, 150); // Payment ID
    sheet.setColumnWidth(11, 200); // Registration Date
  }
}

// Optional: Function to get total registrations count
function getTotalRegistrations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  return sheet.getLastRow() - 1;  // Subtract 1 for header row
}

// Optional: Function to get registrations by event
function getRegistrationsByEvent(eventName) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  let count = 0;
  for (let i = 1; i < data.length; i++) {  // Skip header row
    if (data[i][2] === eventName) {  // Column C is Event Name
      count++;
    }
  }
  
  return count;
}

// Optional: Function to get total revenue
function getTotalRevenue() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  let total = 0;
  for (let i = 1; i < data.length; i++) {  // Skip header row
    total += parseFloat(data[i][8]) || 0;  // Column I is Amount
  }
  
  return total;
}

// Optional: Function to send notification email on each registration
function onNewRegistration(data) {
  // Get spreadsheet owner's email
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const ownerEmail = spreadsheet.getOwner().getEmail();
  
  // Email subject and body
  const subject = `New Registration: ${data.full_name} - ${data.event_name}`;
  const body = `
New registration received!

Event: ${data.event_name}
Name: ${data.full_name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'N/A'}
Designation: ${data.designation || 'N/A'}
Amount: ₹${data.amount}
Payment ID: ${data.payment_id}
Registration Date: ${data.registration_date}

---
This is an automated notification from your Founders Table registration system.
  `;
  
  // Uncomment to enable email notifications
  // GmailApp.sendEmail(ownerEmail, subject, body);
}
