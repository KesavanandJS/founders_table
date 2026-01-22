# Founders Table - Local Testing Guide

## 🚀 Start Testing in 30 Seconds

### Windows Users - Easiest Method
1. Open File Explorer
2. Navigate to: `C:\Storage\Drive - F\Founders table`
3. Double-click: `index.html`
4. Website opens in your default browser
5. ✅ Done!

---

## 🧪 Testing Checklist

### Navigation & Layout
- [ ] Hero section displays correctly
- [ ] Navigation bar is sticky (stays at top when scrolling)
- [ ] Mobile menu button appears on small screens
- [ ] Mobile menu opens/closes when clicked
- [ ] All nav links scroll to correct sections

### Events Section
- [ ] All 4 events display with correct information
- [ ] Prices show correctly (₹499, ₹799, ₹599, ₹899)
- [ ] "Register Now" buttons appear for each event
- [ ] Event dates display properly

### Registration Modal
- [ ] Modal opens when clicking "Register Now"
- [ ] Form fields appear: Name, Email, Phone, Company, Designation
- [ ] Event name displays in the form
- [ ] Total price shows correctly

### Form Validation
- [ ] If Name is empty, shows error when trying to pay
- [ ] If Email is empty, shows error
- [ ] If Phone is empty, shows error
- [ ] Invalid email format shows error
- [ ] Invalid phone number (not 10 digits) shows error

### Payment Integration (Test Mode)
1. Click "Register Now" on any event
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
3. Click "Pay with Razorpay"
4. If Razorpay modal opens: ✅ Integration working
5. Use test card: 4111 1111 1111 1111
6. Expiry: Any future date
7. CVV: Any 3 digits
8. OTP: Any 6 digits
9. Should show success message

### Mobile Responsiveness
- [ ] Test on mobile screen size (Chrome DevTools)
- [ ] Test on tablet screen size
- [ ] Test on desktop
- [ ] Menu hamburger appears below 768px width
- [ ] Text is readable on all sizes
- [ ] Images/cards resize properly
- [ ] Forms work on mobile keyboard

### Sections Testing
- [ ] Hero section - text and buttons visible
- [ ] About section - stats display correctly
- [ ] Benefits section - 6 cards visible
- [ ] Events section - all 4 events show
- [ ] Testimonials section - 4 testimonials display
- [ ] FAQ section - accordion works (click to expand)
- [ ] Footer - all links visible

### FAQ Testing
- [ ] Click first FAQ item - expands and shows answer
- [ ] Click same item again - collapses
- [ ] Click another FAQ - collapses first, opens new one
- [ ] All questions have complete answers

### Animations
- [ ] Hero cards float smoothly
- [ ] Hover effects on buttons
- [ ] Hover effects on benefit cards
- [ ] Scroll animations on cards
- [ ] Modal fade-in animation

### Browser Compatibility
- [ ] Works in Chrome ✅
- [ ] Works in Firefox ✅
- [ ] Works in Edge ✅
- [ ] Works in Safari ✅

---

## 🔧 Testing Payment Gateway

### Without Backend (Current Setup)

**What works:**
✅ Form validation
✅ Payment modal opens
✅ Razorpay integration (if configured)
✅ Registration saved to browser storage

**What needs backend:**
⚠️ Sending confirmation emails
⚠️ Saving to database
⚠️ Advanced analytics
⚠️ Duplicate prevention

### Test Payment Flow

**Step 1:** Open browser DevTools (F12)
**Step 2:** Go to Console tab
**Step 3:** Run this command:
```javascript
logRegistrations()
```
**Step 4:** This shows all registrations saved locally

### Test Data Storage
```javascript
// View all registrations
const registrations = JSON.parse(localStorage.getItem('registrations'));
console.log(registrations);

// Clear all data (if needed)
localStorage.removeItem('registrations');
```

---

## 📊 Performance Testing

### Page Load
- [ ] Page loads in under 3 seconds
- [ ] No console errors
- [ ] All images load
- [ ] CSS styling applies
- [ ] JavaScript functions work

### Visual Testing
- [ ] Colors render correctly
- [ ] Fonts display properly
- [ ] Buttons are clickable
- [ ] Forms are usable
- [ ] Icons display

### Responsiveness
- [ ] Resize browser window - layout adapts
- [ ] Mobile menu works at different sizes
- [ ] Content readable on all sizes

---

## 🔍 Developer Console Testing

### Check for Errors
```
Press F12 → Console tab
Should show: 0 errors
```

### Test Payment Processing
```javascript
// See all form inputs
document.getElementById('fullName').value = 'Test User'
document.getElementById('email').value = 'test@test.com'
document.getElementById('phone').value = '9876543210'

// Simulate payment
processPayment()
```

### Check Registrations
```javascript
// View registrations
logRegistrations()

// View specific registration
const regs = JSON.parse(localStorage.getItem('registrations'))
console.log(regs[0])

// Clear data
localStorage.clear()
```

---

## 🎨 Design Testing

### Color Scheme
- [ ] Primary color looks good (Blue #1a73e8)
- [ ] Secondary color looks good (Green #34a853)
- [ ] Accent color looks good (Red #ea4335)
- [ ] Gradients blend smoothly
- [ ] Text has good contrast

### Typography
- [ ] Headings are clear and large
- [ ] Body text is readable
- [ ] Font sizes scale on mobile
- [ ] Line heights are comfortable

### Spacing
- [ ] Sections have proper padding
- [ ] Cards have proper margins
- [ ] Elements are not too crowded
- [ ] White space is balanced

---

## 🔐 Security Testing

### Form Security
- [ ] Cannot submit without required fields
- [ ] Email validation works
- [ ] Phone validation works
- [ ] No XSS vulnerabilities
- [ ] CSRF tokens ready

### Data Security
- [ ] No sensitive data in console logs
- [ ] Payment data not exposed
- [ ] Registration data encrypted (if applicable)

---

## 📱 Mobile-Specific Testing

### iPhone/iOS
- [ ] Safari opens website correctly
- [ ] Mobile menu works
- [ ] Forms are usable
- [ ] Payment flow works
- [ ] No horizontal scroll

### Android
- [ ] Chrome opens website correctly
- [ ] Mobile menu works
- [ ] Forms are usable
- [ ] Payment flow works
- [ ] Screen sizes adapt

### Tablet
- [ ] Content displays well
- [ ] Typography scales
- [ ] Mobile menu appears/works
- [ ] Forms are usable

---

## 🧩 Feature Testing

### Navigation
- [ ] All menu links work
- [ ] Smooth scroll enabled
- [ ] Active link highlighting
- [ ] Mobile menu closes when link clicked

### Events
- [ ] All event data displays
- [ ] Prices are correct
- [ ] Dates are correct
- [ ] Locations are correct
- [ ] Times are correct

### Registration
- [ ] Form appears when register clicked
- [ ] Modal closes when X clicked
- [ ] Modal closes when clicking outside
- [ ] Form resets after closing
- [ ] All fields can be filled

### Testimonials
- [ ] All testimonials display
- [ ] Star ratings show
- [ ] Author info displays
- [ ] Formatting is correct

### FAQ
- [ ] All questions visible
- [ ] Click expands question
- [ ] Click again collapses
- [ ] Only one open at a time
- [ ] Answers are complete

---

## 🔄 Razorpay Configuration Testing

### Test Without Razorpay (Initial Setup)
1. Open index.html without configuring Razorpay
2. Click "Register Now"
3. Fill form and click "Pay with Razorpay"
4. Should see error in console about missing key

### Test With Test Key
1. Open script.js
2. Set: `key: 'rzp_test_1DP5mmOlF5G5ag',`
3. Reload page
4. Click "Register Now"
5. Should open Razorpay modal
6. Test cards should work

### Test With Production Key (After Getting Real Key)
1. Get Key ID from Razorpay dashboard
2. Update script.js with your Key ID
3. Use real credit/debit cards
4. Real payments will be processed

---

## 📝 Test Results Template

Date: _______________
Tester: _______________
Browser: _______________
Device: _______________

### Sections Tested
- Hero: ✅ / ⚠️ / ❌
- About: ✅ / ⚠️ / ❌
- Benefits: ✅ / ⚠️ / ❌
- Events: ✅ / ⚠️ / ❌
- Testimonials: ✅ / ⚠️ / ❌
- FAQ: ✅ / ⚠️ / ❌
- Footer: ✅ / ⚠️ / ❌

### Navigation
- Mobile menu: ✅ / ⚠️ / ❌
- Links: ✅ / ⚠️ / ❌
- Scroll: ✅ / ⚠️ / ❌

### Registration
- Form opens: ✅ / ⚠️ / ❌
- Validation works: ✅ / ⚠️ / ❌
- Payment opens: ✅ / ⚠️ / ❌

### Issues Found
1. ________________________
2. ________________________
3. ________________________

### Overall Rating: ⭐ ⭐ ⭐ ⭐ ⭐

---

## 🐛 Common Issues & Solutions

### Issue: Page loads blank
**Solution:** 
- Check file paths are correct
- Ensure all files in same folder
- Hard refresh (Ctrl+F5)

### Issue: Razorpay not loading
**Solution:**
- Check internet connection
- Check Razorpay CDN script loaded
- Check console for errors
- Verify API key is set

### Issue: Mobile menu doesn't work
**Solution:**
- Clear browser cache
- Check JavaScript is enabled
- Hard refresh (Ctrl+F5)
- Test in different browser

### Issue: Form validation not working
**Solution:**
- Check JavaScript is enabled
- Check for console errors
- Verify form IDs match
- Hard refresh

### Issue: Styles not applying
**Solution:**
- Check CSS file is linked
- Hard refresh (Ctrl+F5)
- Check file path in link tag
- Verify styles.css exists

---

## ✅ Final Pre-Launch Checklist

Before going live:
- [ ] All sections tested and working
- [ ] Navigation working on desktop and mobile
- [ ] Events display with correct information
- [ ] Registration form works
- [ ] Payment flow tested (with test key)
- [ ] Form validation works
- [ ] Mobile responsive works
- [ ] No console errors
- [ ] All links working
- [ ] Content is customized
- [ ] Social links updated
- [ ] Contact info updated
- [ ] Production Razorpay key configured
- [ ] HTTPS enabled (if deployed)

---

## 🚀 You're Ready!

Once all tests pass, you're ready to:
1. Deploy the website
2. Go live with payments
3. Start registrations
4. Build your community

**Happy Testing! 🎉**
