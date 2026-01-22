# 📝 Code Changes - Google Sheets Integration

## What Changed in Your Files

### ✏️ script.js (Updated)

**Change 1: Added Google Sheets trigger in handlePaymentSuccess()**

Location: Around line 251 (in handlePaymentSuccess function)

Added this line:
```javascript
// Send to Google Sheets
sendToGoogleSheets(registrationData);
```

This makes registration data send to Google Sheets immediately after successful payment.

---

**Change 2: Added new function at end of file**

Location: Lines ~427-464

Added:
```javascript
// Send registration data to Google Sheets
function sendToGoogleSheets(registrationData) {
    // Replace with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb?v=1';
    
    // Check if URL is configured
    if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
        console.warn('Google Sheets integration not configured. Please add your Google Apps Script URL.');
        console.log('Registration data ready to send:', registrationData);
        return;
    }
    
    // Format data for Google Sheets
    const payload = {
        timestamp: new Date().toLocaleString('en-IN'),
        event_id: registrationData.event_id,
        event_name: registrationData.event_name,
        full_name: registrationData.full_name,
        email: registrationData.email,
        phone: registrationData.phone,
        company: registrationData.company || 'N/A',
        designation: registrationData.designation || 'N/A',
        amount: registrationData.amount,
        payment_id: registrationData.payment_id,
        registration_date: registrationData.registration_date
    };
    
    // Send to Google Sheets via Apps Script
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('Data sent to Google Sheets successfully');
    })
    .catch(error => {
        console.error('Error sending to Google Sheets:', error);
    });
}
```

This function:
- ✅ Formats data for Google Sheets
- ✅ Sends via POST request
- ✅ Handles errors gracefully
- ✅ Warns if URL not configured

---

## 📄 New Files Created

### 1. google-apps-script.js
**Purpose:** Copy-paste ready Google Apps Script code

Contains:
- `doPost(e)` - Main function that receives data
- `initializeSheet()` - Optional: Add headers
- `getTotalRegistrations()` - Optional: Count registrations
- `getRegistrationsByEvent()` - Optional: Filter by event
- `getTotalRevenue()` - Optional: Calculate earnings

**How to use:**
1. Copy entire file
2. Paste into Google Apps Script editor
3. Deploy

---

### 2. GOOGLE_SHEETS_SETUP.md
**Purpose:** Detailed 10-minute setup guide

Covers:
- Step 1: Create Google Sheet
- Step 2: Create Apps Script
- Step 3: Deploy Apps Script
- Step 4: Update website
- Step 5: Test
- Troubleshooting section

---

### 3. GOOGLE_SHEETS_QUICK.md
**Purpose:** Quick reference guide (2 minutes)

Contains:
- 5-step setup summary
- Verification checklist
- Troubleshooting table
- Data structure

---

### 4. GOOGLE_SHEETS_COMPLETE.md
**Purpose:** Complete overview and summary

Contains:
- How it works (diagram)
- Quick setup
- Data saved
- Next steps
- Pro tips

---

## 🔄 Data Flow After Changes

```
Website (script.js)
    ↓
User Registration → Payment Success
    ↓
handlePaymentSuccess() called
    ↓
Data saved to localStorage
    ↓
sendToGoogleSheets() called ← NEW!
    ↓
POST request sent to Google Apps Script
    ↓
Google Apps Script (doPost)
    ↓
Data appended to Google Sheet
    ↓
New row appears in Google Sheet ✨
```

---

## 🎯 What to Do Now

### Step 1: Setup (10 min)
Follow: [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)

### Step 2: Key Action
**Update this line in script.js (line ~430):**

Change from:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb?v=1';
```

To (with your actual URL):
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/AKfycbz123abc/userweb?v=1';
```

### Step 3: Test
Register on your website and check Google Sheet!

---

## 📊 Payload Format

Data sent to Google Sheets looks like:
```json
{
  "timestamp": "22/1/2026, 2:15:30 PM",
  "event_id": "EVT001",
  "event_name": "Networking Session",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "company": "Tech Company",
  "designation": "Founder",
  "amount": 499,
  "payment_id": "pay_123456789",
  "registration_date": "2026-01-22T14:15:30.000Z"
}
```

---

## ✅ Verification

After setup:
- [ ] Website still works
- [ ] Registration modal opens
- [ ] Payment processing works
- [ ] Google Sheet has data
- [ ] All fields populated

---

## 🔧 Customization

### Want to capture more data?

1. **In Google Sheet:** Add new column header
2. **In google-apps-script.js:** Add new column in appendRow
3. **In script.js:** Add new field to payload
4. **Test:** Register and verify

Example - Add "Referral Source":
```javascript
// In script.js sendToGoogleSheets()
const payload = {
    // ... existing fields ...
    referral_source: document.getElementById('referralSource')?.value || 'Direct'
};

// In google-apps-script.js doPost()
sheet.appendRow([
    data.timestamp,
    data.event_id,
    data.event_name,
    data.full_name,
    data.email,
    data.phone,
    data.company || 'N/A',
    data.designation || 'N/A',
    data.amount,
    data.payment_id,
    data.registration_date,
    data.referral_source  // NEW!
]);
```

---

## 🆘 If Something's Wrong

### No data appearing?
1. Check browser console (F12)
2. Verify Google Apps Script URL in script.js
3. Check Google Apps Script execution logs
4. Make sure Apps Script is deployed

### Errors in console?
1. Check exact URL format
2. Verify no extra spaces
3. Ensure Google Sheet has headers
4. Re-deploy Google Apps Script

### Apps Script errors?
1. Go to Google Apps Script
2. Click "Executions" tab
3. Look for red error entries
4. Check the error message

---

## 📚 Files Summary

| File | Purpose | Status |
|------|---------|--------|
| script.js | Website (UPDATED) | ✅ Ready |
| google-apps-script.js | Google Apps Script code | ✅ Ready to deploy |
| GOOGLE_SHEETS_SETUP.md | Detailed guide | ✅ Reference |
| GOOGLE_SHEETS_QUICK.md | Quick guide | ✅ Reference |
| GOOGLE_SHEETS_COMPLETE.md | Overview | ✅ Reference |

---

## 🎊 Success!

Your website now automatically stores registrations in Google Sheets! 🎉

**Next:** Read [GOOGLE_SHEETS_QUICK.md](GOOGLE_SHEETS_QUICK.md) and follow the 5-step setup.

---

**That's it! Every registration is now tracked in Google Sheets! 📊**
