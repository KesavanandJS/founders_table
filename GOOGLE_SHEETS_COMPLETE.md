# ✅ Google Sheets Integration - Setup Complete

## What's Done ✨

I've integrated Google Sheets with your Founders Table so **every registration automatically saves** to a Google Sheet in real-time!

---

## 📁 Files Created/Updated

### Updated Files:
- **script.js** - Now sends registration data to Google Sheets after payment

### New Files:
- **GOOGLE_SHEETS_SETUP.md** - Detailed setup guide (10 min)
- **GOOGLE_SHEETS_QUICK.md** - Quick reference (2 min)
- **google-apps-script.js** - Ready-to-use Google Apps Script code

---

## 🚀 How It Works

```
User Registration Flow:
    ↓
1. User fills form & pays
    ↓
2. Payment successful
    ↓
3. Data saved to browser (localStorage)
    ↓
4. Data ALSO sent to Google Sheets ✨
    ↓
5. Google Apps Script receives it
    ↓
6. New row appears in your Google Sheet
    ↓
Complete! 📊
```

---

## ⚡ Quick Setup (10 Minutes)

### Step 1: Create Google Sheet
```
https://sheets.google.com → New Spreadsheet
Name: "Founders Table Registrations"
Add headers: Timestamp | Event ID | Event Name | Full Name | Email | Phone | Company | Designation | Amount | Payment ID | Registration Date
```

### Step 2: Create Apps Script
```
Google Sheet → Extensions > Apps Script
Delete existing code
Paste code from: google-apps-script.js file
Save (Ctrl+S)
```

### Step 3: Deploy Script
```
Click Deploy > New Deployment
Type: Web app
Execute as: Your account
Access: Anyone
Copy the URL from deployment
```

### Step 4: Update Website
```
Open script.js
Find line ~382: const GOOGLE_SCRIPT_URL = '...'
Paste your deployment URL
Save
```

### Step 5: Test
```
Open website
Register for an event
Check Google Sheet - data appears! ✅
```

---

## 📊 What Gets Saved

Every registration row includes:
- ✅ Timestamp (when they registered)
- ✅ Event ID & Event Name
- ✅ Full Name, Email, Phone
- ✅ Company & Designation
- ✅ Amount paid
- ✅ Razorpay Payment ID
- ✅ Registration Date

---

## 📝 Your Google Apps Script Code

Ready to paste! Located in: **google-apps-script.js**

Includes:
- ✅ Main function to receive data
- ✅ Auto-append to Google Sheet
- ✅ Error handling
- ✅ Optional: Sheet initialization
- ✅ Optional: Statistics functions
- ✅ Optional: Email notifications

---

## 🔄 Data Flow

```
Website Registration
    ↓ (POST request)
Google Apps Script doPost()
    ↓ (validates data)
Parse JSON payload
    ↓ (format data)
Get active Google Sheet
    ↓ (append row)
New row added to Sheet
    ↓ (return success)
Browser console confirms
```

---

## ✨ Features

### Automatic
✅ Runs on every successful payment
✅ No manual data entry
✅ Real-time updates
✅ No delays

### Smart
✅ Handles missing fields (company, designation)
✅ Error logging
✅ Success feedback
✅ ISO timestamps

### Optional
✅ Sheet auto-formatting
✅ Statistics functions
✅ Email notifications
✅ Auto-initialization

---

## 🎯 Next Steps

1. **Read:** [GOOGLE_SHEETS_QUICK.md](GOOGLE_SHEETS_QUICK.md) (2 minutes)
2. **Follow:** 5-step setup above (10 minutes)
3. **Test:** Register and check Google Sheet
4. **Done!** ✅

---

## 🔍 Verification Checklist

- [ ] Google Sheet created with headers
- [ ] Apps Script created with code
- [ ] Apps Script deployed as Web app
- [ ] Deployment URL copied
- [ ] script.js updated with URL
- [ ] Website registration tested
- [ ] Data appears in Google Sheet
- [ ] All fields populated correctly

---

## 🆘 Common Issues

### "Data not appearing?"
1. Check script.js - is URL correct? (no YOUR_SCRIPT_ID?)
2. Open website → F12 → Console → look for errors
3. Check Google Apps Script → Executions tab for errors
4. Try test registration again

### "Error in Apps Script?"
1. Copy code from google-apps-script.js again
2. Make sure no extra spaces
3. Save and re-deploy
4. Check execution logs

### "URL is wrong?"
1. Get new deployment URL from Apps Script
2. Update script.js line ~382
3. Make sure entire URL is pasted (long URL)
4. No extra spaces or characters

### "Still not working?"
1. Verify Google Sheet has proper headers
2. Confirm Apps Script "Who has access" = "Anyone"
3. Check browser console (F12) for specific errors
4. Review Google Apps Script logs for errors

---

## 💡 Pro Tips

### Manage Your Data
- Download Google Sheet weekly as CSV: File > Download > CSV
- Share sheet with team: Click Share button
- Filter registrations: Data > Create filter
- Sort by date/event: Click column header

### Customize Further
- Add more columns to Google Sheet
- Update google-apps-script.js to capture them
- Update script.js payload to send them

### Analytics
- Use Google Sheets built-in charts
- Export to Google Analytics
- Use formulas for statistics (SUM, COUNT, etc.)

### Notifications
- Uncomment email notification code in google-apps-script.js
- Get email on each registration
- Forward to team members

---

## 📊 Example Google Sheet

After setup, your sheet will look like:

| Timestamp | Event ID | Event Name | Full Name | Email | Phone | Company | Designation | Amount | Payment ID | Registration Date |
|-----------|----------|-----------|-----------|-------|-------|---------|-------------|--------|------------|-------------------|
| 22/01/2026, 2:15 PM | EVT001 | Networking | John Doe | john@email.com | 9876543210 | Tech Co | Founder | 499 | pay_123456 | 2026-01-22T14:15:00 |

---

## 🔐 Security

✅ Data sent via HTTPS (POST)
✅ Google Apps Script handles securely
✅ Google Sheet access controlled
✅ No sensitive credentials exposed
✅ Payment info handled by Razorpay

---

## 📞 Support

For detailed help:
1. Read [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)
2. Check troubleshooting section above
3. Review google-apps-script.js code

---

## 🎉 You're All Set!

Every registration now automatically saves to Google Sheets! 

**Start here:** [GOOGLE_SHEETS_QUICK.md](GOOGLE_SHEETS_QUICK.md) ⚡

---

**Happy tracking! 📊✨**
