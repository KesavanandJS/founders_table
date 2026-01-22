# ⚡ Google Sheets Integration - Quick Start

## What It Does
Every registration automatically saves to Google Sheets in real-time ✨

---

## 🚀 5-Step Setup (10 Minutes)

### 1. Create Google Sheet
- Go to https://sheets.google.com
- New spreadsheet
- Name: "Founders Table Registrations"
- Add headers in row 1: `Timestamp | Event ID | Event Name | Full Name | Email | Phone | Company | Designation | Amount | Payment ID | Registration Date`

### 2. Create Apps Script
- In Google Sheet: **Extensions > Apps Script**
- Delete existing code
- Copy code from [google-apps-script.js](google-apps-script.js)
- Save (Ctrl+S)

### 3. Deploy Script
- Click **Deploy** > **New Deployment**
- Type: **Web app**
- Execute as: Your account
- Access: **Anyone**
- Click **Deploy**
- **Copy the URL** ✅

Example URL:
```
https://script.google.com/macros/d/AKfycbz.../userweb?v=1
```

### 4. Update Website
- Open `script.js`
- Find line ~382:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb?v=1';
```
- Paste your URL
- Save file

### 5. Test!
- Open website
- Register for event
- **Check Google Sheet** - data should appear! 📊

---

## ✅ Verification

After registration, check:
- ✅ New row in Google Sheet
- ✅ All fields filled
- ✅ Timestamp added
- ✅ Payment ID recorded

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| Data not appearing | Check browser F12 console for errors |
| Wrong URL | Verify deployment URL is complete in script.js |
| Apps Script error | Check Apps Script execution logs |
| Permissions denied | Set Apps Script access to "Anyone" |

---

## 📊 Your Data Structure

| Column | Contains |
|--------|----------|
| A | Timestamp (IST) |
| B | Event ID |
| C | Event Name |
| D | Full Name |
| E | Email |
| F | Phone |
| G | Company |
| H | Designation |
| I | Amount (₹) |
| J | Payment ID |
| K | Registration Date |

---

## 🎯 Done!

Every registration now auto-saves to Google Sheets! 🎉

Need help? See [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) for detailed guide.
