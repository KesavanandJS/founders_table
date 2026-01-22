# Founders Table - Community Landing Page

A modern, aesthetic landing page for the Founders Table community - connecting business owners through curated events, mentorship, and collaboration.

## 🚀 Features

- **Modern Design**: Sleek, gradient-based aesthetic with smooth animations
- **Responsive Layout**: Fully mobile-optimized design
- **Event Management**: Display upcoming events with detailed information
- **Razorpay Integration**: Secure payment gateway for event registration
- **User Registration**: Comprehensive registration form with validation
- **Testimonials**: Showcase community success stories
- **FAQ Section**: Answer common questions
- **Social Integration**: Links to social media platforms
- **Newsletter-ready**: Easy to extend with newsletter signup

## 📋 Project Structure

```
founders-table/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality & Razorpay integration
└── README.md           # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: #1a73e8 (Google Blue)
- **Secondary**: #34a853 (Google Green)
- **Accent**: #ea4335 (Google Red)
- **Dark Background**: #0f1419
- **Light Background**: #ffffff

### Sections
1. **Navigation Bar** - Sticky navigation with mobile menu
2. **Hero Section** - Compelling headline with CTA buttons
3. **About Section** - Community mission and statistics
4. **Benefits Section** - 6 key features of the community
5. **Events Section** - Upcoming events with registration
6. **Testimonials** - Success stories from members
7. **FAQ Section** - Accordion-style FAQ
8. **CTA Section** - Final call-to-action
9. **Footer** - Links and social media

## 🔧 Setup Instructions

### 1. Basic Setup (No Server Required)
Simply open `index.html` in your web browser to view the landing page.

```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

### 2. Razorpay Configuration

#### Get Your Razorpay Keys:
1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Log in or create an account
3. Go to **Settings → API Keys**
4. Copy your **Key ID** (Public Key)

#### Update Script:
In `script.js`, find line 128 and replace:
```javascript
key: 'rzp_live_YOUR_KEY_ID', // Replace with your actual Razorpay Key ID
```

With your actual Razorpay Key ID:
```javascript
key: 'rzp_live_A1B2C3D4E5F6G7H8I9J0', // Example
```

### 3. Running with a Local Server (Recommended)

#### Using Python 3:
```bash
# Navigate to project directory
cd "C:\Storage\Drive - F\Founders table"

# Start server
python -m http.server 8000

# Open browser
http://localhost:8000
```

#### Using Node.js (http-server):
```bash
# Install http-server
npm install -g http-server

# Navigate to project directory
cd "C:\Storage\Drive - F\Founders table"

# Start server
http-server

# Open browser
http://localhost:8080
```

#### Using PHP:
```bash
# Navigate to project directory
php -S localhost:8000

# Open browser
http://localhost:8000
```

## 💳 Payment Integration

### Razorpay Setup Steps:

1. **Create Razorpay Account**
   - Visit [Razorpay](https://razorpay.com/)
   - Sign up for a business account
   - Complete KYC verification

2. **Generate API Keys**
   - Dashboard → Settings → API Keys
   - Copy Key ID (public key)
   - Store Secret Key safely

3. **Update Configuration**
   - Open `script.js`
   - Replace `rzp_live_YOUR_KEY_ID` with your actual Key ID
   - Optional: Add logo URL in options.image

4. **Test Payments**
   - Use Razorpay test credentials
   - Key ID: `rzp_test_1DP5mmOlF5G5ag`
   - Try test cards provided by Razorpay

### Test Cards (Razorpay):
- **Success**: 4111 1111 1111 1111 (Visa)
- **Failure**: 4111 1111 1111 1112 (Visa)
- **OTP**: Use any 6-digit OTP

## 📧 Backend Integration (Optional)

To persist registration data to your backend:

1. **Uncomment line in `script.js`:**
   ```javascript
   sendRegistrationToBackend(registrationData);
   ```

2. **Create backend endpoint** that accepts POST at `/api/register-event`:
   ```javascript
   // Expected data structure:
   {
       event_id: number,
       event_name: string,
       full_name: string,
       email: string,
       phone: string,
       company: string,
       designation: string,
       amount: number,
       payment_id: string,
       registration_date: string
   }
   ```

## 🔐 Security Considerations

1. **Never expose Secret Key** in frontend code
2. **Verify payments on backend** using Razorpay signature
3. **Use HTTPS** in production
4. **Validate all user inputs** server-side
5. **Store sensitive data** securely on backend

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 Customization Guide

### Change Colors
Edit `:root` variables in `styles.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Update Events
Edit event cards in `index.html`:
```html
<div class="event-card">
    <div class="event-date">
        <span class="month">FEB</span>
        <span class="day">15</span>
    </div>
    <div class="event-info">
        <h3>Event Name</h3>
        <!-- Update event details -->
    </div>
</div>
```

### Add Testimonials
Add new testimonial cards in the testimonials section:
```html
<div class="testimonial-card">
    <div class="stars"><!-- Star ratings --></div>
    <p>"Testimonial text here"</p>
    <div class="testimonial-author">
        <div class="author-avatar">AB</div>
        <div>
            <h4>Name</h4>
            <p>Title, Company</p>
        </div>
    </div>
</div>
```

## 📊 Data Storage

### Local Storage
Registration data is saved to browser's localStorage:
```javascript
// Access registrations
const registrations = JSON.parse(localStorage.getItem('registrations'));

// View in console
logRegistrations();
```

### Data Structure
```javascript
{
    event_id: 1,
    event_name: "Event Name",
    full_name: "John Doe",
    email: "john@example.com",
    phone: "+91987654321",
    company: "Company Name",
    designation: "Role",
    amount: 499,
    payment_id: "pay_K123ABC456DEF",
    registration_date: "2025-01-22T10:30:00.000Z"
}
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Select main branch as source

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel: [https://vercel.com](https://vercel.com)
3. Deploy automatically on push

### Netlify
1. Connect GitHub repository
2. Set build command: None (static site)
3. Set publish directory: ./

### Traditional Hosting
1. Upload files via FTP/SFTP
2. Ensure `index.html` is in root
3. Update Razorpay key for production

## 🐛 Troubleshooting

### Razorpay Not Loading
- Check internet connection
- Verify Razorpay CDN script is loaded
- Check browser console for errors

### Payment Modal Not Opening
- Ensure form validation passes
- Check JavaScript console for errors
- Verify Razorpay key is correctly set

### Mobile Menu Not Working
- Clear browser cache
- Check JavaScript is enabled
- Verify hamburger menu HTML is present

### Events Not Displaying
- Ensure CSS is properly linked
- Check for console errors
- Verify HTML structure

## 📞 Support & Resources

- **Razorpay Documentation**: https://razorpay.com/docs/
- **MDN Web Docs**: https://developer.mozilla.org/
- **CSS-Tricks**: https://css-tricks.com/
- **JavaScript Guide**: https://javascript.info/

## 📝 License

This project is open source and available for personal and commercial use.

## 🎉 Next Steps

1. ✅ Customize content with your community details
2. ✅ Set up Razorpay account and API keys
3. ✅ Test payment flow with test cards
4. ✅ Add your logo and images
5. ✅ Deploy to production
6. ✅ Set up email notifications (optional backend)
7. ✅ Monitor analytics and conversions

---

**Built with ❤️ for the Founders Table Community**
