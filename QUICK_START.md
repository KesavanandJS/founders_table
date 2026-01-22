# Founders Table - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Open the Site
1. Navigate to the folder: `C:\Storage\Drive - F\Founders table`
2. Double-click `index.html`
3. Your browser will open the landing page

### Step 2: Test the Design
- Browse through all sections
- Click "Register Next Event" buttons
- Try the mobile menu on smaller screens
- Check the FAQ accordion

### Step 3: Set Up Razorpay Payment

#### Option A: Using Test Mode (Recommended for Testing)
1. Open `script.js`
2. Find line 128: `key: 'rzp_live_YOUR_KEY_ID',`
3. Replace with test key: `key: 'rzp_test_1DP5mmOlF5G5ag',`
4. Now you can test with fake cards!

#### Option B: Using Production (Real Payments)
1. Go to https://razorpay.com/
2. Create account → Verify email
3. Complete KYC (Know Your Customer)
4. Dashboard → Settings → API Keys
5. Copy your Key ID
6. Update `script.js` line 128 with your Key ID

### Step 4: Test Event Registration
1. Click "Register Now" on any event
2. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Company: Your Company (optional)
3. Click "Pay with Razorpay"

### Step 5: Complete Payment (Test)
Use these test cards (if using test mode):
- **Card**: 4111 1111 1111 1111
- **Expiry**: Any future date (12/25)
- **CVV**: Any 3 digits (123)
- **OTP**: Any 6 digits (123456)

## 📋 File Structure Explained

```
Founders table/
├── index.html          ← Main page (open this!)
├── styles.css          ← Design and styling
├── script.js           ← Functionality & Razorpay
├── README.md           ← Full documentation
├── BACKEND_SETUP.md    ← Backend integration guide
└── QUICK_START.md      ← This file
```

## 🎨 Customization

### Change Logo/Brand Name
1. Open `index.html`
2. Find: `<div class="logo">Founders Table</div>`
3. Change to your name

### Update Event Information
1. Open `index.html`
2. Find the "Events Section"
3. Edit event details (date, price, title)
4. Update the onclick values

### Change Colors
1. Open `styles.css`
2. Find `:root` section at the top
3. Update the color codes (e.g., #1a73e8 → your color)

### Add Your Content
- Replace placeholder text with real community info
- Add actual founder testimonials
- Update social media links in footer

## 💳 Important: Razorpay Setup

### What You'll Need
1. **Email address** - to create Razorpay account
2. **Business information** - for KYC
3. **Bank account** - to receive payments

### Getting Your Keys
```
Dashboard → Settings → API Keys
├── Key ID (Public) - Use this in frontend
└── Secret Key - Use this in backend (KEEP SECRET!)
```

## 🔒 Security Notes

**NEVER put Secret Key in frontend code!**
- Secret Key should only be on backend
- Key ID can be public (it's in frontend)
- Always validate payments on backend

## 📱 Testing on Mobile

### Method 1: Using Your Phone
1. Find your computer's IP: 
   - Windows: Open CMD, type `ipconfig`
   - Look for IPv4 Address (e.g., 192.168.1.100)
2. On phone, visit: `http://192.168.1.100:8000`
3. Test the responsive design

### Method 2: Browser DevTools
1. Open `index.html` in Chrome
2. Press `F12` to open DevTools
3. Click phone icon in top-left
4. Select device and test

## ✅ Complete Checklist

- [ ] Site opens in browser
- [ ] All sections display correctly
- [ ] Mobile menu works
- [ ] Event registration form opens
- [ ] Razorpay payment modal appears
- [ ] Test payment completes
- [ ] Confirmation message shows
- [ ] Registration saved to localStorage

## 🆘 Common Issues & Solutions

### Issue: Payment Modal Won't Open
**Solution**: 
- Check console for errors (F12)
- Verify form fields are filled
- Check browser compatibility

### Issue: Razorpay Not Loading
**Solution**:
- Check internet connection
- Clear browser cache
- Check CDN link is correct

### Issue: Mobile Menu Not Working
**Solution**:
- Clear browser cache
- Check JavaScript is enabled
- Refresh page

### Issue: Colors Look Wrong
**Solution**:
- Clear browser cache
- Check CSS file is linked
- Verify color codes in styles.css

## 📞 Next Steps

1. **Customize Content**
   - Update founder names and testimonials
   - Add real event information
   - Update social media links

2. **Add Images**
   - Add founder photos
   - Add event images
   - Add community photos

3. **Set Up Backend** (Optional)
   - Follow BACKEND_SETUP.md
   - Save registrations to database
   - Send confirmation emails

4. **Deploy to Live**
   - Choose hosting (Vercel, Netlify, etc.)
   - Update Razorpay keys for production
   - Add custom domain

5. **Monitor & Improve**
   - Track event registrations
   - Collect feedback
   - Improve based on usage

## 🎓 Learning Resources

- **HTML Basics**: https://www.w3schools.com/html/
- **CSS Guide**: https://www.w3schools.com/css/
- **JavaScript**: https://www.w3schools.com/js/
- **Razorpay Docs**: https://razorpay.com/docs/
- **Responsive Design**: https://www.w3schools.com/css/css_rwd_intro.asp

## 💡 Pro Tips

1. **Test Razorpay before going live**
   - Use test keys first
   - Test payment flow completely
   - Then switch to production keys

2. **Save registrations properly**
   - Currently saves to browser's localStorage
   - For production, use backend database
   - Enable email confirmations

3. **Keep it mobile-friendly**
   - Always test on actual devices
   - Check navigation works on small screens
   - Test forms on mobile

4. **Security first**
   - Never share Razorpay Secret Key
   - Always validate on backend
   - Use HTTPS in production

## 📊 What Happens When Someone Registers

1. User fills out form
2. Clicks "Pay with Razorpay"
3. Razorpay payment modal opens
4. User completes payment
5. Razorpay confirms payment
6. Registration saved to localStorage
7. Confirmation message shown
8. Data ready for backend processing

## 🚀 Deploy Your Site

### Quick Deploy to Vercel (FREE)
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select GitHub repo
5. Click "Deploy"
6. Update Razorpay key for production

### Deploy to Netlify (FREE)
1. Go to https://netlify.com
2. Click "New site from Git"
3. Select GitHub repo
4. Deploy settings already configured
5. Click "Deploy"

---

**You're all set! Happy hosting! 🎉**

For detailed documentation, see README.md
For backend setup, see BACKEND_SETUP.md
