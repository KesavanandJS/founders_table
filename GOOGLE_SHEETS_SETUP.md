# 📊 Google Sheets Integration Setup

This guide will help you connect your Founders Table registration system to Google Sheets so all registrations are automatically saved.

---

## 🎯 What You'll Get

Every registration will automatically appear in a Google Sheet with:
- Timestamp
- Event details
- User information (name, email, phone)
- Company and designation
- Payment ID and amount

---

## 📋 Step-by-Step Setup (10 Minutes)

### Step 1: Create a Google Sheet

1. Go to: https://sheets.google.com
2. Create a new spreadsheet
3. Name it: "Founders Table Registrations" (or your preferred name)
4. Create column headers in the first row:
   ```
   Timestamp | Event ID | Event Name | Full Name | Email | Phone | Company | Designation | Amount | Payment ID | Registration Date
   ```

### Step 2: Create a Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
// Function to handle POST requests from your website
function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add a new row with the registration data
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
      data.registration_date
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Registration saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Save the script (Ctrl+S or Cmd+S)
5. Name it: "Founders Table Script"

### Step 3: Deploy the Apps Script

1. Click **Deploy** button (top right)
2. Select **New Deployment**
3. Click the gear icon and select **Apps Script**
4. Fill in:
   - **Type**: Web app
   - **Execute as**: Your Google account
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access** and approve
7. You'll get a deployment URL - **Copy this!**

Example: `https://script.google.com/macros/d/AKfycbz...../userweb?v=1`

### Step 4: Add URL to Your Website

1. Open `script.js` in your project
2. Find this line (around line 380):
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb?v=1';
```

3. Replace `YOUR_SCRIPT_ID` with your deployment URL from Step 3
4. Save the file

Example:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/AKfycbz123abc456def/userweb?v=1';
```

### Step 5: Test It!

1. Open your website: `index.html`
2. Click "Register Now" on any event
3. Fill in the form and complete payment
4. Check your Google Sheet - the registration should appear! ✅

---

## ✅ Verification

After registration, you should see:
- New row in Google Sheet
- All fields populated
- Timestamp automatically added
- Payment ID recorded

If nothing appears:
1. Check browser console (F12) for errors
2. Verify Google Apps Script deployment URL is correct
3. Ensure Google Sheet has proper column headers

---

## 🔧 Troubleshooting

### "No data appearing in Google Sheet?"

1. **Check script.js URL**
   - Make sure you replaced YOUR_SCRIPT_ID with actual deployment URL
   - No extra spaces or typos

2. **Verify Google Apps Script**
   - Open your Apps Script
   - Go to Executions tab
   - Check for errors

3. **Check Browser Console**
   - Open website in browser
   - Press F12 (Developer Tools)
   - Check Console tab for error messages

4. **Verify Google Sheet Permissions**
   - Sheet must be shared with the Apps Script execution account
   - Or set "Who has access" to "Anyone"

### "Error: Invalid postData"

- Make sure the Apps Script is published as "Web app"
- Check that execution is set to your account
- Verify "Who has access" is set to "Anyone"

### "CORS or network errors?"

- This is normal! Google Apps Script has no-cors mode
- Data still gets saved even if you see errors
- Check your Google Sheet to confirm

---

## 📊 Google Sheet Structure

Your sheet will automatically have these columns:

| Column | Data |
|--------|------|
| Timestamp | When they registered (IST) |
| Event ID | Event identifier |
| Event Name | Name of the event |
| Full Name | Registrant's name |
| Email | Their email address |
| Phone | Their phone number |
| Company | Their company name |
| Designation | Their job title |
| Amount | Registration fee paid |
| Payment ID | Razorpay payment ID |
| Registration Date | ISO timestamp |

---

## 🎯 Next Steps

1. ✅ Create Google Sheet
2. ✅ Create Apps Script
3. ✅ Deploy Apps Script
4. ✅ Update script.js with URL
5. ✅ Test with a registration

---

## 💡 Pro Tips

1. **Backup Your Data**
   - Download Google Sheet as CSV weekly
   - Use File > Download > CSV

2. **Add More Columns**
   - Add custom columns to Apps Script
   - Update script.js payload

3. **Filter & Sort**
   - Use Data > Create a filter
   - Sort by date, event, or amount

4. **Share with Team**
   - Share Google Sheet with colleagues
   - They can view registrations in real-time

5. **Export for Analytics**
   - Download as CSV
   - Import to Excel, Sheets, or analytics tool

---

## 🔐 Security Notes

✅ Data sent via HTTPS
✅ Google Sheet link can be shared
✅ No sensitive data stored in code
✅ Apps Script access controlled
✅ Payment info secure (Razorpay handles it)

---

## 📞 Support

If you have issues:

1. **Check browser console** (F12 → Console)
2. **Verify Apps Script deployment** is active
3. **Confirm URL is copied** correctly in script.js
4. **Check Google Sheet** permissions
5. **Review Google Apps Script** execution logs

---

## 🎊 Success!

Once set up, every registration will automatically appear in your Google Sheet! You now have:

✅ Real-time registration tracking
✅ Automatic data collection
✅ Easy data export
✅ Professional analytics-ready format

**Happy registrations! 📊**
