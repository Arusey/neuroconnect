// Google Apps Script to handle form submissions and add them to a Google Sheet
// Copy this code into the Google Apps Script editor

// Set up the doGet function to handle GET requests with query parameters
function doGet(e) {
  // Log the entire request for debugging
  Logger.log("Request received: " + JSON.stringify(e));
  
  // Get parameters from the request
  const params = e.parameter;
  
  // Log received parameters for debugging
  Logger.log("Received parameters: " + JSON.stringify(params));
  
  try {
    // Get the active spreadsheet and the first sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];
    
    // Check if we need to set up headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Name", 
        "Email", 
        "Phone", 
        "Referral", 
        "Webinar Title", 
        "M-PESA Number",
        "Payment Reference",
        "Registration Date", 
        "Timestamp"
      ]);
    }
    
    // Append the data to the sheet
    sheet.appendRow([
      params.name || "No name provided", 
      params.email || "No email provided", 
      params.phone || "No phone provided", 
      params.referral || "None", 
      params.webinarTitle || "No webinar specified", 
      params.mpesaNumber || "No M-PESA number provided",
      params.paymentReference || "No payment reference provided",
      params.registrationDate || "No date provided", 
      new Date().toISOString()
    ]);
    
    // Create a response with CORS headers
    const response = {
      status: "success",
      timestamp: new Date().toISOString(),
      message: "Registration successful!",
      data: {
        name: params.name,
        email: params.email,
        phone: params.phone,
        referral: params.referral,
        webinarTitle: params.webinarTitle,
        mpesaNumber: params.mpesaNumber,
        paymentReference: params.paymentReference,
        registrationDate: params.registrationDate
      }
    };
    
    // Check if this is a JSONP request
    if (params.callback) {
      // Return JSONP response
      return ContentService.createTextOutput(params.callback + "(" + JSON.stringify(response) + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET, POST')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    } else {
      // Return the response with CORS headers
      return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET, POST')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
      
  } catch (error) {
    // Log the error
    Logger.log("Error: " + error.toString());
    
    // Create an error response with CORS headers
    const errorResponse = {
      status: "error",
      timestamp: new Date().toISOString(),
      message: "Error processing registration: " + error.toString()
    };
    
    // Check if this is a JSONP request
    if (params.callback) {
      // Return JSONP error response
      return ContentService.createTextOutput(params.callback + "(" + JSON.stringify(errorResponse) + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET, POST')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    } else {
      // Return the error response with CORS headers
      return ContentService.createTextOutput(JSON.stringify(errorResponse))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET, POST')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
  }
}

// Handle POST requests
function doPost(e) {
  // For POST requests, we need to parse the payload if it's JSON
  if (e.postData && e.postData.type === "application/json") {
    try {
      // Parse the JSON payload
      const jsonData = JSON.parse(e.postData.contents);
      
      // Add the parsed data to the parameter object
      e.parameter = e.parameter || {};
      for (const key in jsonData) {
        e.parameter[key] = jsonData[key];
      }
    } catch (error) {
      Logger.log("Error parsing JSON payload: " + error.toString());
    }
  }
  
  // Process the request using the same logic as doGet
  return doGet(e);
}

// Handle OPTIONS requests (for CORS preflight)
function doOptions(e) {
  // Create a response with CORS headers for preflight
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
} 